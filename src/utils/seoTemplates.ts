import type { SeoTemplateVars } from "@/types/page";

export const DEFAULT_TITLE_TEMPLATE =
  "Автосервис в {городе} — ремонт и обслуживание | {название}";
export const DEFAULT_TITLE_TEMPLATE_NO_CITY =
  "Ремонт и обслуживание автомобилей | {название}";

export function fillSeoTemplate(
  template: string,
  vars: SeoTemplateVars
): string {
  return template
    .replaceAll("{название}", vars.name)
    .replaceAll("{name}", vars.name)
    .replaceAll("{город}", vars.city)
    .replaceAll("{city}", vars.city)
    .replaceAll("{городе}", vars.cityPrepositional)
    .replaceAll("{cityPrep}", vars.cityPrepositional);
}

export function resolveTitleTemplate(
  withCity: string,
  withoutCity: string,
  vars: SeoTemplateVars
): string {
  if (!vars.city.trim()) {
    return fillSeoTemplate(withoutCity || DEFAULT_TITLE_TEMPLATE_NO_CITY, vars);
  }
  return fillSeoTemplate(withCity || DEFAULT_TITLE_TEMPLATE, vars);
}

export function hasUnresolvedPlaceholders(value: string): boolean {
  return /\{[а-яa-z0-9_]+\}/i.test(value);
}
