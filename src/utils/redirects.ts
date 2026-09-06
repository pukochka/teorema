import type { RedirectRule } from "@/types/page";
import { normalizePath } from "./paths";

function toMap(rules: RedirectRule[]): Map<string, string> {
  return new Map(
    rules.map(rule => [normalizePath(rule.fromPath), normalizePath(rule.toPath)])
  );
}

export function resolveRedirectTarget(
  path: string,
  rules: RedirectRule[]
): string | null {
  const map = toMap(rules);
  const seen = new Set<string>();
  let current = normalizePath(path);

  while (map.has(current)) {
    if (seen.has(current)) return null;
    seen.add(current);
    current = map.get(current) || current;
  }

  return current === normalizePath(path) ? null : current;
}

export function wouldCreateCycle(
  rules: RedirectRule[],
  fromPath: string,
  toPath: string
): boolean {
  const from = normalizePath(fromPath);
  const to = normalizePath(toPath);
  if (from === to) return true;

  const map = toMap(rules);
  map.set(from, to);

  const seen = new Set<string>();
  let current = to;
  while (map.has(current)) {
    if (current === from || seen.has(current)) return true;
    seen.add(current);
    current = map.get(current) || current;
  }
  return false;
}

export function flattenRedirects(rules: RedirectRule[]): RedirectRule[] {
  const map = toMap(rules);
  const flattened: RedirectRule[] = [];

  for (const rule of rules) {
    const from = normalizePath(rule.fromPath);
    const seen = new Set<string>([from]);
    let current = normalizePath(rule.toPath);

    while (map.has(current) && !seen.has(current)) {
      seen.add(current);
      current = map.get(current) || current;
    }

    if (from === current) continue;
    flattened.push({
      ...rule,
      fromPath: from,
      toPath: current
    });
  }

  const unique = new Map<string, RedirectRule>();
  for (const rule of flattened) {
    unique.set(rule.fromPath, rule);
  }
  return [...unique.values()];
}
