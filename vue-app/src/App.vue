<script setup>

import { ref} from 'vue'
// import store from './store/index.js'
import Tasks from './pages/Tasks.vue'
import Manage from './pages/Manage.vue'


let page = ref('tasks')

const pages = {
  tasks:  true,
  manage: true
}

function updateActivePage(pageName){
  if(page.value == pageName) return
  if(pageName in pages){
    page.value = pageName
  }
}

</script>

  

<template>
  <div class="text-white p-5">
    <h2 class="text-center text-xl mb-10">
      Task Manager
    </h2>
    <div class="grid grid-cols-12 gap-2 mb-10 border-b">
      <button 
        @click="updateActivePage('tasks')"
        :class="{'border-x border-t rounded-t-lg bg-primary text-black': page == 'tasks'}"
        class="col-span-2 p-2 text-center ">
        Tasks
      </button>
      <button 
        @click="updateActivePage('manage')"
        :class="{'border-x border-t rounded-t-lg bg-primary text-black': page == 'manage'}"
        class="col-span-2 p-2 text-center">
        Manage
      </button>
    </div>

    <div v-show="page == 'tasks'">
      <Tasks />
    </div>

    <div v-show="page == 'manage'">
      <Manage />
    </div>

  </div>

</template>
