<script setup lang="ts">
import router from '../router/index';
import { useShedulerStore } from '../stores/sheduler';
import { ref, onMounted } from 'vue';
import BaseButton from '@/components/BaseButton.vue';

const shedulerStore = useShedulerStore()
const presets = ref([])

const getPresets = () => {
  // console.log(window.localStorage)
  // for (item in window.localStorage) {
  //   console.log(item)
  //     // if(item.indexOf('preset') != -1) {
  //     //   presets.value.push(item)
  //     // }
  // }
  const localStorageSize = window.localStorage.length
    for (let i = 0; i < localStorageSize; i++) {
      let item = window.localStorage.key(i)
      if(item.indexOf('preset') != -1) {
        presets.value.push({name: item,value: window.localStorage.getItem(localStorage.key(i))})
        console.log(item, window.localStorage.getItem(localStorage.key(i)))
      }
    }
}

const editPreset = (name: string) => {
  shedulerStore.updateSheduler(JSON.parse(localStorage.getItem(name)))
  router.push({ name: 'list' , query: { preset: name } })
}

const openPreset = (name: string) => {
  shedulerStore.updateSheduler(JSON.parse(localStorage.getItem(name)))
  router.push({ name: 'sheduler' , query: { preset: name } })
}

onMounted(() => {
  getPresets()
})
</script>

<template>
  <div class="presets-wrap">
    <h2>Предустановки</h2>
    <div class="presets">
      <div v-for="item in presets" class="preset" :key="item.name">
        {{item.name}}
        <div class="preset__actions">
          <BaseButton label="изменить" @click="() => editPreset(item.name)" />
          <BaseButton label="открыть" @click="() => openPreset(item.name)" />
        </div>
      </div>
    </div>
    <BaseButton @click="() => router.push({ name: 'list' })" label="Создать новый" />
  </div>
</template>

<style scoped lang="scss">
.presets-wrap {
  margin: 8px;
}
.presets{
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 8px 0;
  max-width: 500px;
}
.preset{
  display: flex;
  justify-content: space-between;
  padding: 8px;
  background-color: #fff;
  border-radius: 8px;

  &__actions {
    display: flex;
    gap: 8px;
  }
}
</style>
