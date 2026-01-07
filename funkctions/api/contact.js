export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type",
    },
  });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function pickClientIp(req) {
  return (
    req.headers.get("cf-connecting-ip") ||
    (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    ""
  );
}

async function verifyTurnstile({ secret, token, ip }) {
  if (!secret) return { ok: false, reason: "missing_turnstile_secret" };
  if (!token) return { ok: false, reason: "missing_turnstile_token" };

  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);

  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
  });

  const out = await r.json().catch(() => ({}));
  return { ok: !!out.success, out };
}

function sanitize(s, max = 5000) {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, max);
}

export async function onRequestPost(context) {
  const { request, env } = context;

  let payload = {};
  const ct = (request.headers.get("content-type") || "").toLowerCase();

  try {
    if (ct.includes("application/json")) {
      payload = await request.json();
    } else {
      // fallback: form-data / urlencoded
      const fd = await request.formData();
      payload = Object.fromEntries(fd.entries());
    }
  } catch {
    return json({ ok: false, error: "invalid_payload" }, 400);
  }

  // Honeypot (jeśli bot wypełni ukryte pole, odrzucamy)
  const honeypot = sanitize(payload.website, 200);
  if (honeypot) return json({ ok: true }); // udajemy sukces, żeby bot nie próbował dalej

  const name = sanitize(payload.name, 200);
  const email = sanitize(payload.email, 200);
  const phone = sanitize(payload.phone, 200);
  const company = sanitize(payload.company, 200);
  const subject = sanitize(payload.subject, 200);
  const message = sanitize(payload.message, 8000);

  if (!name || !email || !message) {
    return json({ ok: false, error: "missing_fields" }, 400);
  }

  // Turnstile token – standardowo Turnstile daje "cf-turnstile-response"
  const turnstileToken =
    sanitize(payload["cf-turnstile-response"], 5000) ||
    sanitize(payload.turnstileToken, 5000);

  const ip = pickClientIp(request);
  const ts = await verifyTurnstile({
    secret: env.TURNSTILE_SECRET_KEY,
    token: turnstileToken,
    ip,
  });

  if (!ts.ok) {
    return json({ ok: false, error: "turnstile_failed", detail: ts.out || ts.reason }, 403);
  }

  // Resend
  const resendKey = env.RESEND_API_KEY;
  const to = env.CONTACT_TO;
  const from = env.CONTACT_FROM;

  if (!resendKey || !to || !from) {
    return json({ ok: false, error: "missing_env_vars" }, 500);
  }

  const subj = `[StalLIFT] ${subject || "Nowe zapytanie z formularza"}`;
  const text =
`Nowe zapytanie z formularza (stallift.com)

Imię: ${name}
E-mail: ${email}
Telefon: ${phone || "-"}
Firma: ${company || "-"}
Temat: ${subject || "-"}

Wiadomość:
${message}
`;

  const rr = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${resendKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: subj,
      text,
      reply_to: email, // wg API Resend :contentReference[oaicite:1]{index=1}
    }),
  });

  if (!rr.ok) {
    const err = await rr.text().catch(() => "");
    return json({ ok: false, error: "resend_failed", detail: err }, 502);
  }

  return json({ ok: true });
}
