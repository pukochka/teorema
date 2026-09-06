interface LeadEmail {
  title: string;
  fields: Record<string, string | number | null | undefined>;
  photoLinks?: string[];
}

export async function sendLeadEmail(payload: LeadEmail): Promise<void> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  const to = Deno.env.get("LEADS_NOTIFICATION_EMAIL");

  if (!apiKey || !to) {
    console.info(
      "Email не отправлен: нет RESEND_API_KEY или LEADS_NOTIFICATION_EMAIL"
    );
    return;
  }

  const rows = Object.entries(payload.fields)
    .filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
    .map(
      ([key, value]) =>
        `<tr><td><b>${key}</b></td><td>${String(value)}</td></tr>`
    )
    .join("");

  const photos = (payload.photoLinks || [])
    .map(link => `<li><a href="${link}">${link}</a></li>`)
    .join("");

  const html = `
    <h1>Новая заявка Teorema Service</h1>
    <p>${payload.title}</p>
    <table>${rows}</table>
    ${photos ? `<h2>Ссылка на изображения</h2><ul>${photos}</ul>` : ""}
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "Teorema Service <noreply@teorema-service.local>",
      to: [to],
      subject: "Новая заявка Teorema Service",
      html
    })
  });

  if (!response.ok) {
    console.error("Resend error", await response.text());
  }
}
