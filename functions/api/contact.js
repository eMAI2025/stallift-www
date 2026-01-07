// functions/api/contact.js
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // Tylko JSON
    const ct = request.headers.get("content-type") || "";
    if (!ct.toLowerCase().includes("application/json")) {
      return json({ ok: false, error: "Unsupported content-type" }, 415);
    }

    const body = await request.json().catch(() => ({}));

    // Honeypot (ukryte pole anty-bot) — jeśli wypełnione, udaj sukces i nic nie rób
    if (typeof body.website === "string" && body.website.trim().length > 0) {
      return json({ ok: true }, 200);
    }

    // Walidacja pól
    const name = s(body.name, 120);
    const email = s(body.email, 180);
    const phone = s(body.phone, 80);
    const company = s(body.company, 160);
    const subject = s(body.subject, 160);
    const message = s(body.message, 4000);

    if (!name || !email || !message) {
      return json({ ok: false, error: "Missing required fields" }, 400);
    }
    if (!isEmail(email)) {
      return json({ ok: false, error: "Invalid email" }, 400);
    }

    // Turnstile (opcjonalnie, ale zalecane)
    // Front wysyła token jako turnstileToken (z input[name="cf-turnstile-response"])
    if (env.TURNSTILE_SECRET_KEY) {
      const token = s(body.turnstileToken, 4096);
      if (!token) return json({ ok: false, error: "Turnstile token missing" }, 400);

      const ok = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, token);
      if (!ok) return json({ ok: false, error: "Turnstile verification failed" }, 403);
    }

    // Wysyłka maila przez Resend (zalecane)
    // Wymaga: env.RESEND_API_KEY oraz sensownego FROM w Twojej domenie (zweryfikowanej w Resend)
    if (!env.RESEND_API_KEY) {
      return json({ ok: false, error: "Server not configured (RESEND_API_KEY missing)" }, 500);
    }

    const to = env.CONTACT_TO || "kontakt@stallift.com";
    const from = env.CONTACT_FROM || "StalLIFT <kontakt@stallift.com>";
    const subj = `[StalLIFT] ${subject || "Zapytanie z formularza"}`;

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
        authorization: `Bearer ${env.RESEND_API_KEY}`,
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
      const t = await rr.text().catch(() => "");
      return json({ ok: false, error: "Email provider error", details: t.slice(0, 800) }, 502);
    }

    return json({ ok: true }, 200);
  } catch (e) {
    return json({ ok: false, error: "Server error" }, 500);
  }
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function s(v, max) {
  if (typeof v !== "string") return "";
  const x = v.trim();
  return x.length > max ? x.slice(0, max) : x;
}

function isEmail(x) {
  // prosta walidacja “wystarczająca” na formularz
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x);
}

async function verifyTurnstile(secret, token) {
  const form = new URLSearchParams();
  form.set("secret", secret);
  form.set("response", token);

  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
  });

  if (!r.ok) return false;
  const data = await r.json().catch(() => null);
  return !!(data && data.success);
}
