import type { ManagedPage } from "@/types/page";

export const TITLE_HINT_MIN = 40;
export const TITLE_HINT_MAX = 60;
export const DESCRIPTION_HINT_MIN = 120;
export const DESCRIPTION_HINT_MAX = 160;

export function titleLengthHint(value: string): string {
  const length = value.trim().length;
  if (!length) return "Заголовок пустой.";
  if (length < TITLE_HINT_MIN) {
    return `${length} символов. Обычно хватает ${TITLE_HINT_MIN}–${TITLE_HINT_MAX}.`;
  }
  if (length > TITLE_HINT_MAX) {
    return `${length} символов. Поисковик может показать короче, текст не обрезаем.`;
  }
  return `${length} символов.`;
}

export function descriptionLengthHint(value: string): string {
  const length = value.trim().length;
  if (!length) return "Описание пустое.";
  if (length < DESCRIPTION_HINT_MIN) {
    return `${length} символов. Обычно хватает ${DESCRIPTION_HINT_MIN}–${DESCRIPTION_HINT_MAX}.`;
  }
  if (length > DESCRIPTION_HINT_MAX) {
    return `${length} символов. Поисковик может показать короче, текст не обрезаем.`;
  }
  return `${length} символов.`;
}

export function findDuplicateSeo(
  page: ManagedPage,
  pages: ManagedPage[]
): { title: boolean; description: boolean } {
  const title = page.seoTitle.trim();
  const description = page.seoDescription.trim();
  return {
    title: Boolean(
      title &&
        pages.some(item => item.id !== page.id && item.seoTitle.trim() === title)
    ),
    description: Boolean(
      description &&
        pages.some(
          item => item.id !== page.id && item.seoDescription.trim() === description
        )
    )
  };
}

export function isSlugTaken(
  slug: string,
  pageId: string,
  pages: ManagedPage[]
): boolean {
  return pages.some(
    item => item.id !== pageId && item.slug === slug && item.type === "service"
  );
}
