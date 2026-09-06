<template>
  <div v-if="items.length" class="row q-col-gutter-sm messenger-buttons">
    <div
      v-for="item in items"
      :key="item.id"
      :class="fullWidth ? 'col-12' : 'col-12 col-sm-auto'"
    >
      <q-btn
        class="full-width"
        :class="buttonClass(item.id)"
        :unelevated="variant === 'filled'"
        :outline="variant === 'outline'"
        :flat="variant === 'flat'"
        :round="round"
        :dense="dense"
        no-caps
        :icon="item.icon"
        :label="round ? undefined : item.label"
        :href="item.href"
        :target="item.id === 'telegram' ? '_blank' : undefined"
        rel="noopener noreferrer"
        :aria-label="item.label"
        @click="onClick(item.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAnalytics } from "@/composables/useAnalytics";
import { messengerHref, useMessengers } from "@/composables/useMessengers";
import { useSiteStore } from "@/stores/site";
import type { MessengerId } from "@/types/contact";

const props = withDefaults(
  defineProps<{
    message?: string | undefined;
    variant?: "filled" | "outline" | "flat";
    tone?: "brand" | "header" | "on-dark";
    dense?: boolean;
    round?: boolean;
    fullWidth?: boolean;
  }>(),
  {
    variant: "filled",
    tone: "brand",
    dense: false,
    round: false,
    fullWidth: false
  }
);

const site = useSiteStore();
const { messengers } = useMessengers();
const { trackEvent } = useAnalytics();

function onClick(id: MessengerId) {
  trackEvent("messenger_click", { network: id });
}

const items = computed(() =>
  messengers.value.map(item => ({
    id: item.id,
    icon: item.icon,
    href: messengerHref(item, props.message),
    label:
      item.id === "telegram" ? site.config.cta.telegram : site.config.cta.viber
  }))
);

function buttonClass(id: MessengerId) {
  if (props.tone === "header" || props.tone === "on-dark") {
    return "";
  }
  return id === "telegram" ? "btn-telegram" : "btn-viber";
}
</script>
