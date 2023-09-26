<script setup>
import useTaskManStore from '../store/index.js'
import { } from 'pinia'
import { ref, watch } from 'vue'

const store  = useTaskManStore();
let activeProject = ref(store.activeProject);


watch(store.$state, (state) => {
  activeProject.value = state.activeProject
}, {deep: true})

const unsubscribe = store.$onAction(({name}) => {
  console.log(name)
})

unsubscribe()



// watch(() => store.activeProject, (newVal) => {
//   activeProject.value = newVal
// });

</script>


<template>
  <div class="md:grid grid-cols-3 gap-2">
    <div class="border rounded p-2 mb-4 md:mb-0">
      <h3 class="border-b-4 border-white text-lg mb-5">BackLog</h3>
      <ul>
        <li v-for="task in store.getProjectTasks(activeProject)" :key="task.id" class="border border-gray-100 rounded p-1 mb-3">
          <div class="grid grid-cols-12 gap-1">
            <p class="col-span-5">{{ task.title }}</p>
            <button @click="store.updateTaskStatus(task, 'indevelopment')"
              class="col-span-3 border rounded text-center">dev</button>
            <button @click="store.updateTaskStatus(task, 'completed')"
              class="col-span-3 border rounded text-center">done</button>
            <button @click="store.deleteTask(task)"  class="col-span-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>                
            </button>
          </div>
        </li>
      </ul>
    </div>
    <div class="border rounded p-2 mb-4 md:mb-0">
      <h3 class="border-b-4 border-white text-lg mb-5">In Development</h3>
      <ul>
        <li v-for="task in store.getProjectTasks(activeProject, ['indevelopment'])" :key="task.id" class="border border-gray-100 rounded p-1 mb-3">
          <div class="grid grid-cols-12 gap-1">
            <p class="col-span-5">{{ task.title }}</p>
            <button @click="store.updateTaskStatus(task, 'backlog')"
              class="col-span-3 border rounded text-center">backlog</button>
            <button @click="store.updateTaskStatus(task, 'completed')"
              class="col-span-3 border rounded text-center">done</button>
            <button @click="store.deleteTask(task)"  class="col-span-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>                
            </button>
          </div>
        </li>
      </ul>
    </div>
    <div class="border rounded p-2 mb-4 md:mb-0">
      <h3 class="border-b-4 border-white text-lg mb-5">Completed</h3>
      <ul>
        <li v-for="task in store.getProjectTasks(activeProject, ['completed'])" :key="task.id" class="border border-gray-100 rounded p-1 mb-3">
          <div class="grid grid-cols-12 gap-1">
            <p class="col-span-5">{{ task.title }}</p>
            <button @click="store.updateTaskStatus(task, 'backlog')"
              class="col-span-3 border rounded text-center">backlog</button>
            <button @click="store.updateTaskStatus(task, 'indevelopment')"
              class="col-span-3 border rounded text-center">dev</button>
            <button @click="store.deleteTask(task)"  class="col-span-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>                
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
