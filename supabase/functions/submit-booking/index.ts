import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { sendLeadEmail } from "../_shared/email.ts";
import { assertRateLimit, createServiceClient } from "../_shared/supabase.ts";
import {
  getClientIp,
  isHoneypot,
  isTooFast,
  optionalText,
  requirePhone,
  requireText
} from "../_shared/validation.ts";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    if (isHoneypot(body.website)) {
      return jsonResponse({ ok: true, id: "ignored" });
    }
    if (isTooFast(body.startedAt)) {
      return jsonResponse({ ok: false, message: "Повторите отправку" }, 400);
    }

    const name = requireText(body.name, "Имя");
    const phone = requirePhone(body.phone);
    const service = requireText(body.service, "Услуга");
    const ip = getClientIp(req);
    await assertRateLimit("bookings", phone, ip);

    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("bookings")
      .insert({
        name,
        phone,
        brand: optionalText(body.brand),
        model: optionalText(body.model),
        year: body.year || null,
        vehicle_type: optionalText(body.vehicleType),
        service,
        preferred_date: optionalText(body.preferredDate) || null,
        preferred_time: optionalText(body.preferredTime),
        comment: optionalText(body.comment),
        ip
      })
      .select("id")
      .single();

    if (error || !data) {
      console.error(error);
      return jsonResponse(
        { ok: false, message: "Не удалось сохранить заявку" },
        500
      );
    }

    try {
      await sendLeadEmail({
        title: "Онлайн-запись",
        fields: {
          Имя: name,
          Телефон: phone,
          Автомобиль:
            `${optionalText(body.brand)} ${optionalText(body.model)}`.trim(),
          Услуга: service,
          Комментарий: optionalText(body.comment)
        }
      });
    } catch (emailError) {
      console.error("Email failed", emailError);
    }

    return jsonResponse({
      ok: true,
      id: data.id,
      message: "Заявка отправлена"
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Не удалось отправить заявку";
    return jsonResponse({ ok: false, message }, 400);
  }
});
