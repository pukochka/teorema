import { CONTENT_UPDATED_AT_ISO } from "@/seo/manifest";
import type { RedirectRule } from "@/types/page";

export const defaultRedirects: RedirectRule[] = [
  {
    id: "legacy-repair",
    fromPath: "/repair",
    toPath: "/uslugi/remont-avtomobiley",
    createdAt: CONTENT_UPDATED_AT_ISO
  },
  {
    id: "legacy-auto-service",
    fromPath: "/auto-service",
    toPath: "/uslugi/remont-avtomobiley",
    createdAt: CONTENT_UPDATED_AT_ISO
  },
  {
    id: "legacy-frame-repair",
    fromPath: "/frame-repair",
    toPath: "/uslugi/kuzovnoy-remont",
    createdAt: CONTENT_UPDATED_AT_ISO
  },
  {
    id: "legacy-body-repair",
    fromPath: "/body-repair",
    toPath: "/uslugi/kuzovnoy-remont",
    createdAt: CONTENT_UPDATED_AT_ISO
  },
  {
    id: "legacy-painting",
    fromPath: "/painting",
    toPath: "/uslugi/pokraska-avtomobilya",
    createdAt: CONTENT_UPDATED_AT_ISO
  },
  {
    id: "legacy-polishing",
    fromPath: "/polishing",
    toPath: "/uslugi/polirovka-kuzova",
    createdAt: CONTENT_UPDATED_AT_ISO
  },
  {
    id: "legacy-commercial",
    fromPath: "/commercial-vehicles",
    toPath: "/",
    createdAt: CONTENT_UPDATED_AT_ISO
  },
  {
    id: "legacy-fleet",
    fromPath: "/fleet",
    toPath: "/",
    createdAt: CONTENT_UPDATED_AT_ISO
  },
  {
    id: "legacy-equipment",
    fromPath: "/equipment",
    toPath: "/",
    createdAt: CONTENT_UPDATED_AT_ISO
  }
];
