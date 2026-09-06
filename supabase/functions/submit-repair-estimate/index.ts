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
    const serviceType = requireText(body.serviceType, "Услуга");
    const photoPaths = Array.isArray(body.photoPaths) ? body.photoPaths : [];
    if (photoPaths.length < 1) {
      return jsonResponse(
        { ok: false, message: "Для фотооценки нужна минимум одна фотография" },
        400
      );
    }

    const ip = getClientIp(req);
    await assertRateLimit("repair_estimates", phone, ip);

    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("repair_estimates")
      .insert({
        name,
        phone,
        email: optionalText(body.email),
        vehicle_type: optionalText(body.vehicleType),
        brand: optionalText(body.brand),
        model: optionalText(body.model),
        year: body.year || null,
        plate: optionalText(body.plate),
        vin: optionalText(body.vin),
        service_type: serviceType,
        description: optionalText(body.description),
        photo_paths: photoPaths,
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

    const photoLinks: string[] = [];
    for (const path of photoPaths) {
      const { data: signed } = await supabase.storage
        .from("repair-photos")
        .createSignedUrl(String(path), 60 * 60 * 24 * 7);
      if (signed?.signedUrl) photoLinks.push(signed.signedUrl);
    }

    try {
      await sendLeadEmail({
        title: "Оценка ремонта по фото",
        fields: {
          Имя: name,
          Телефон: phone,
          Автомобиль:
            `${optionalText(body.brand)} ${optionalText(body.model)}`.trim(),
          Услуга: serviceType,
          Комментарий: optionalText(body.description)
        },
        photoLinks
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
