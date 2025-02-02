<script setup lang="ts">
import { Button } from 'primevue'

defineProps({
  text: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <Button size="small" :label="text" severity="secondary" />
</template>

<style scoped></style>
