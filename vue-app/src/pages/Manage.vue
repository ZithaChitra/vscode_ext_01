<script setup>
import { ref, reactive } from 'vue'
import useTaskManStore from '../store/index.js'

const store = useTaskManStore()
let managePageActive = ref('tasks')

const managePageTabs= {
  tasks:      'Add Task',
  projects:   'Projects',
  settings:   'Other Settings'
}

let newTask = reactive({
  title: 'My New Task',
  desc:  'My very Long Task Description'
})

function updateManagePageActive(tabName){
  if(tabName in managePageTabs){
    managePageActive.value = tabName
  }
}

function saveNewTask(){
  store.saveNewTask(newTask)
}

</script>

<template>
  <div class="grid grid-cols-12 gap-2">
      <div class="col-span-3 border-y border-r rounded-r-lg overflow-hidden">
        <ul class="divide-y divide-dashed">
          <li class="">
            <button 
              @click="updateManagePageActive('tasks')"
              :class="{'bg-accent': managePageActive == 'tasks'}"
              class="w-full h-full text-left  p-2 ">Add Task</button>
          </li>
          <li class="">
            <button 
              @click="updateManagePageActive('projects')"
              :class="{'bg-accent': managePageActive == 'projects'}"
              class="w-full h-full text-left p-2">Projects</button>
          </li>
          <li class="">
            <button 
              @click="updateManagePageActive('settings')"
              :class="{'bg-accent': managePageActive == 'settings'}"
              class="w-full h-full text-left p-2">Other Settings</button>
          </li>
        </ul>
      </div>
      <div class="col-span-8 flex justify-center">
        <div>
          <h2 class="text-lg mb-5 border-b-4 border-white">New Task</h2>
          <div>
            <div class="mb-3">
              <label 
                class="block mb-2 text-sm font-medium text-white" 
                for="taskTitle">Task Title</label>
              <input v-model="newTask.title"
                class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                name="taskTitle" id="taskTitle" type="text" placeholder="Task name">
            </div>
            <div class="mb-3">
              <label
                class="block mb-2 text-sm font-medium text-white" 
                for="tasDesc">Task Description</label>
              <input v-model="newTask.desc"
                class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                name="taskDesc" id="taskDesc" type="text" placeholder="Task description">
            </div>
            <div>
              <button
                @click="saveNewTask"
                class="text-black focus:ring-1 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-primary hover:bg-white  focus:ring-blue-800">Add task</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
