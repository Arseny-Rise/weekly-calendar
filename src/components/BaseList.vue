<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseListTable from '@/components/BaseListTable.vue'
import { ref, watch, onMounted } from 'vue'
import { defaultWeek, str } from '@/scheme/weekMok.js'
import type { Iproduct, IweekGenerator } from '@/scheme/interfaces.js'
import { useShedulerStore } from '../stores/sheduler';
import router from '../router/index';

const shedulerStore = useShedulerStore()

const products = ref<Iproduct[]>([])

const week = [
  {
    name: 'Пн',
  },
  {
    name: 'Вт',
  },
  {
    name: 'Ср',
  },
  {
    name: 'Чт',
  },
  {
    name: 'Пт',
  },
]

const removeItem = (name: string) => {
  products.value = products.value.filter((item) => item.name !== name)
}

const addItem = () => {
  products.value.push({
    name: '',
    hours: 0,
    daily: false,
    weekday: '',
  })
}

const exportDefault = () => {
  products.value = defaultWeek
}

const exportWeek = (str: string) => {
  const items: Array<string | number>[] = []
  let itemCur: Array<string | number> = []
  let itemsMass = str.split('\n\n')
  itemsMass = itemsMass.filter(
    (item) =>
      ![
        'Направление',
        'Задача',
        'Трудозатраты запланированные',
        'Внутренние задачи',
        'Проектные задачи',
      ].some((exclusion) => item.includes(exclusion)),
  )
  itemsMass.forEach((item) => {
    if (item.length < 2) return

    if (item.search(/[^А-Яа-яA-Za-z/,. ]/g) == -1) {
      itemCur.push(item)
    } else {
      // console.log(item)
      let trueHours = 0
      if (item.indexOf('м') != -1 || item.indexOf('m') != -1) {
        trueHours = parseFloat(item.slice(0, item.indexOf('м'))) / 60
      }
      if (item.indexOf('ч') != -1 || item.indexOf('h') != -1) {
        trueHours = parseFloat(item.slice(0, item.indexOf('ч')))
      }

      itemCur.push(trueHours)
      items.push(itemCur)
      itemCur = []
    }
  })

  products.value = items.map(
    (item): Iproduct => ({
      name: item[0] as string,
      hours: item[item.length - 1] as number,
      daily: false,
      weekday: '',
    }),
  )

  console.log(items)
}

const generateScheduler = () => {
  const weekGenerator: IweekGenerator[] = week.map(
    ({ name }) => ({
      name,
      tasks: [],
      count: 0,
    }),
  )

  products.value.forEach((item) => {
    if(item.weekday) {
      weekGenerator.forEach((day) => {
        if(day.name === item.weekday) {
          day.tasks.push(item)
          day.count += item.hours
        }
      })
    }
  })

  products.value.forEach((item) => {
    if(item.weekday) {
      return;
    }

    if (item.daily) {
      weekGenerator.forEach((day) => {
        day.tasks.push(item)
        day.count += item.hours
      })
    } else {
      if (item.hours > 3) {
        const tasks = []
        const countTask = Math.ceil(item.hours / 3)
        let timeOut = item.hours
        for (let index = 0; index < countTask; index++) {
          tasks.push({
            ...item,
            hours: timeOut >= 3 ? 3 : timeOut,
          })
          timeOut -= 3
        }
        // console.log(tasks)
        tasks.forEach((task) => {
          for (let index = 0; index < weekGenerator.length; index++) {
            if (weekGenerator[index].count + task.hours < 8) {
              weekGenerator[index].tasks.push(task)
              weekGenerator[index].count += task.hours
              break
            }
          }
        })
      } else {
        for (let index = 0; index < weekGenerator.length; index++) {
          if (weekGenerator[index].count + item.hours < 8) {
            weekGenerator[index].tasks.push(item)
            weekGenerator[index].count += item.hours
            break
          }
        }
      }
    }
  })

  shedulerStore.updateSheduler(weekGenerator)
  localStorage.setItem('preset ' + new Date().toLocaleString(), JSON.stringify(weekGenerator))

  router.push({ name: 'sheduler' })

  console.log(
    weekGenerator,
    weekGenerator.reduce((a, b) => a + b.count, 0),
  )
}

const updateRowHours = () => {
  products.value.forEach((item) => {
    // console.log(item)
    if (item.daily) {
      item.all = item.hours * 5
    } else {
      item.all = item.hours
    }
  })
}

onMounted(() => {
  const preset = router.currentRoute.value.query.preset;
  if(preset) {
    const data = JSON.parse(localStorage.getItem(preset)).map(item => item.tasks).flat()
    console.log(data)
    products.value = data
  }

  updateRowHours()
})

watch(
  () => [products.value],
  () => {
    updateRowHours()
  },
  { deep: true },
)
</script>

<template>
  <div class="panel">
    <BaseButton text="Экспортировать" @click="() => exportWeek(str)" />
    <BaseButton text="Экспортировать дефолтное" @click="() => exportDefault()" />
  </div>

  <BaseListTable :products="products" :week="week" @removeItem="removeItem" @addItem="addItem" />

  <div class="panel">
    <BaseButton text="Сгенерировать" @click="generateScheduler" />
  </div>
</template>

<style scoped>
.panel {
  display: flex;
  gap: 8px;
  padding: 16px;
  background-color: #ff8181;
}
</style>
