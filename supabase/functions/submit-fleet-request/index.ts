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

    const company = requireText(body.company, "Компания");
    const contactName = requireText(body.contactName, "Контактное лицо");
    const phone = requirePhone(body.phone);
    const ip = getClientIp(req);
    await assertRateLimit("fleet_requests", phone, ip);

    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("fleet_requests")
      .insert({
        company,
        contact_name: contactName,
        phone,
        email: optionalText(body.email),
        vehicle_count: optionalText(body.vehicleCount),
        vehicle_types: optionalText(body.vehicleTypes),
        services: Array.isArray(body.services) ? body.services : [],
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
        title: "Заявка на автопарк",
        fields: {
          Имя: contactName,
          Компания: company,
          Телефон: phone,
          Автомобиль: optionalText(body.vehicleTypes),
          Услуга: Array.isArray(body.services) ? body.services.join(", ") : "",
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
