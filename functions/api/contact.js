export async function onRequestPost(context) {
  const { request, env } = context;

  const json = (obj, status = 200) =>
    new Response(JSON.stringify(obj), {
      status,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    });

  // ---- read body (JSON or form) ----
  const ct = (request.headers.get("content-type") || "").toLowerCase();
  let data = {};
  try {
    if (ct.includes("application/json")) {
      data = await request.json();
    } else if (
      ct.includes("application/x-www-form-urlencoded") ||
      ct.includes("multipart/form-data")
    ) {
      const fd = await request.formData();
      data = Object.fromEntries(fd.entries());
    } else {
      data = await request.json().catch(() => ({}));
    }
  } catch {
    data = {};
  }

  // ---- honeypot anti-bot ----
  if ((data.website || "").trim().length > 0) {
    // udaj sukces, nic nie wysyłaj
    return json({ ok: true });
  }

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const phone = (data.phone || "").trim();
  const company = (data.company || "").trim();
  const subject = (data.subject || "").trim();
  const message = (data.message || "").trim();

  // ---- basic validation ----
  if (name.length < 2 || email.length < 5 || message.length < 5) {
    return json({ ok: false, error: "validation" }, 400);
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return json({ ok: false, error: "email" }, 400);
  }

  // ---- Turnstile verify (required if TURNSTILE_SECRET is set) ----
  const turnstileSecret = (env.TURNSTILE_SECRET || "").trim();
  if (turnstileSecret) {
    const token = (data.turnstileToken || data["cf-turnstile-response"] || "").trim();
    if (!token) return json({ ok: false, error: "turnstile_missing" }, 400);

    const ip =
      request.headers.get("CF-Connecting-IP") ||
      request.headers.get("x-forwarded-for") ||
      "";

    const form = new FormData();
    form.append("secret", turnstileSecret);
    form.append("response", token);
    if (ip) form.append("remoteip", ip);

    const vr = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
    });

    const vout = await vr.json().catch(() => ({}));
    if (!vout.success) {
      return json({ ok: false, error: "turnstile_failed" }, 403);
    }
  }

  // ---- send email via Resend (recommended) ----
  const resendKey = (env.RESEND_API_KEY || "").trim();
  const to = (env.RESEND_TO || "biuro@stallift.com").trim();
  const from = (env.RESEND_FROM || "StalLIFT <noreply@stallift.com>").trim();

  if (!resendKey) {
    // Endpoint działa, ale bez wysyłki (dopóki nie ustawisz RESEND_API_KEY).
    return json({ ok: true, note: "RESEND_API_KEY not set" });
  }

  const subj = `[StalLIFT] ${subject || "Zapytanie ze strony"}`;
  const text =
`Nowe zapytanie z formularza:

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
      "authorization": `Bearer ${resendKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: subj,
      text,
      reply_to: email,
    }),
  });

  if (!rr.ok) {
    const details = await rr.text().catch(() => "");
    return json({ ok: false, error: "email_send", details: details.slice(0, 500) }, 502);
  }

  return json({ ok: true });
}
