<template>
  <q-btn
    :href="href"
    :unelevated="unelevated"
    :outline="outline"
    :flat="flat"
    :color="color"
    :text-color="textColor"
    no-caps
    :icon="showIcon ? 'mdi-phone' : undefined"
    :label="label || phoneDisplay"
    :aria-label="`Позвонить ${phoneDisplay}`"
    @click="onClick"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAnalytics } from "@/composables/useAnalytics";
import { toTelHref, usePhone } from "@/composables/usePhone";

const props = withDefaults(
  defineProps<{
    raw?: string;
    display?: string;
    label?: string;
    color?: string;
    textColor?: string;
    unelevated?: boolean;
    outline?: boolean;
    flat?: boolean;
    showIcon?: boolean;
  }>(),
  {
    color: "primary",
    unelevated: true,
    showIcon: true
  }
);

const phone = usePhone();
const phoneRaw = computed(() => props.raw || phone.primaryRaw.value);
const phoneDisplay = computed(
  () => props.display || phone.primaryDisplay.value
);
const href = computed(() => toTelHref(phoneRaw.value));
const { trackEvent } = useAnalytics();

function onClick() {
  trackEvent("phone_click", { place: "button" });
}
</script>
