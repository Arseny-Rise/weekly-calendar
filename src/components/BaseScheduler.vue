<script setup lang="ts">
import { onMounted, unref } from 'vue';
import { useShedulerStore } from '../stores/sheduler';
import { storeToRefs } from 'pinia';
import router from '@/router';
const shedulerStore = useShedulerStore()

const { sheduler } = storeToRefs(shedulerStore)

onMounted(() => {
  if(sheduler.value?.length === 0) router.push({ name: 'presets' })
})

const changeStatus = (colIdx:number, taskIdx:number) => {
  console.log(colIdx, taskIdx)
  if(sheduler.value[colIdx].tasks[taskIdx]?.disabled) {
    sheduler.value[colIdx].tasks[taskIdx].disabled = false
  } else {
    sheduler.value[colIdx].tasks[taskIdx].disabled = true
  }

  const preset = router.currentRoute.value.query.preset as string;
  if(preset) {
    localStorage.setItem(preset, JSON.stringify(unref(sheduler)))
  }
}

</script>

<template>
  <div class="columns">
    <div class="column" v-for="(item,colIdx) in sheduler" :key="item.name">
      <div>
        <h2 class="column__title">{{ item.name }}</h2>
        <div class="cards">
          <div :class="['card', task?.disabled && '_completed']" @click="(e) => changeStatus(colIdx, taskIdx)" :style="{height: task.hours * 100 + 'px'}" v-for="(task, taskIdx) in item.tasks" :key="task.name + taskIdx">
            <div class="card__inner">
              <span class="card__title" v-tooltip.top="task.name.length > 40 && task.name">{{ task.name }}<span style="opacity: 0;">;</span></span>

              <span>{{ task.hours.toLocaleString('ru-RU') }}</span>
            </div>
          </div>
        </div>
      </div>
      <span class="column__total">
        {{ item.count }} ч
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.columns{
  display: flex;
  gap: 8px;
  margin: 8px;
}
.column{
  display: flex;
  width: 20%;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 8px;
  background-color: #f69898;
  border-radius: 8px;
  &__title{
    margin-bottom: 8px;
    color: #fff;
  }
  &__total{
    padding: 4px 16px;
    background-color: #fff;
    border-radius: 8px;
  }
}
.cards {
  display: flex;
  flex-direction: column;
  gap: 1px;
  position: relative;
  margin-bottom: 16px;
}
.card {
  position: relative;
  padding: 2px 8px 0;
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    user-select: none;
    pointer-events: none;
    background: repeating-linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5) 1px,
      transparent 1px,
      transparent 50px
    );
  }
  &._completed {
    opacity: 0.5;
    background: #838383;
  }
  &__title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &__inner{
    display: flex;
    justify-content: space-between;
  }
}
</style>
