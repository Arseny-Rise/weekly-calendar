<script setup lang="ts">
import { DataTable, Column, InputText, InputNumber, Checkbox, Select } from 'primevue'
import { computed } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import type { Iproduct } from '@/scheme/interfaces.js'

const props = defineProps<{
  products: Array<Iproduct>
  week: Array<{ name: string }>
}>()
// console.log(props.products)
const total = computed<number>(() => props.products.reduce((a, b) => (b.all ? a + b.all : 0), 0))

defineEmits(['removeItem', 'addItem'])

const columns = [
  { field: 'name', header: 'Название' },
  { field: 'hours', header: 'Часов' },
  { field: 'weekday', header: 'День недели' },
  { field: 'daily', header: 'Ежедневная' },
  { field: 'all', header: 'Всего' },
  { field: 'delete', header: 'Удалить' },
]
</script>

<template>
  <DataTable :value="props.products" tableStyle="min-width: 50rem" rowGroupMode="subheader">
    <Column :field="columns[0].field" :header="columns[0].header">
      <template #body="slotProps">
        <InputText v-model="slotProps.data.name" />
      </template>
    </Column>

    <Column :field="columns[1].field" :header="columns[1].header">
      <template #body="{ data }">
        <InputNumber :maxFractionDigits="2" v-model.number="data.hours" />
      </template>
    </Column>

    <Column :field="columns[2].field" :header="columns[2].header">
      <template #body="slotProps">
        <Select
          v-if="!slotProps.data.daily"
          v-model="slotProps.data.weekday"
          :options="week.map(item => item.name)"
          placeholder="Select"
        />
      </template>
    </Column>

    <Column :field="columns[3].field" :header="columns[3].header">
      <template #body="{ data }">
        <Checkbox
          v-if="!data.datepicker && !data.weekday"
          v-model="data.daily"
          :name="columns[3].header"
          :inputId="columns[3].header + data.name"
          binary
        />
      </template>
    </Column>

    <Column :field="columns[4].field" :header="columns[4].header">
      <template #body="{ data }">
        {{ data.all }}
      </template>
    </Column>

    <Column :field="columns[5].field" :header="columns[5].header">
      <template #body="{ data }">
        <Checkbox
          :name="columns[3].header + data.name"
          :inputId="columns[3].header + data.name"
          :key="columns[3].header + data.name"
          binary
          @change="() => $emit('removeItem', data.name)"
        />
      </template>
    </Column>

    <template #footer>
      <BaseButton text="Добавить" @click="$emit('addItem')" />
      <span>
        Total {{ total }}
      </span>
    </template>

    <template #empty> Ничего не найдено </template>
  </DataTable>
</template>

<style scoped>
:deep(.p-datatable-footer) {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
