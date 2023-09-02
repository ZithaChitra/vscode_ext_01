<script setup>
import { reactive, ref } from 'vue'

// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
// import * as vscode from 'vscode'

let page = ref('tasks')

const pages = {
  tasks: true,
  manage: true
}

let backlogTasks = reactive({
  item1ID: {
    id: 'item1ID',
    title: 'Task 1',
    status: 'backlog',
  },
  item2ID: {
    id: 'item2ID',
    title: 'Task 2',
    status: 'backlog',
  },
  item3ID: {
    id: 'item3ID',
    title: 'Task 3',
    status: 'backlog',
  },
});


let inDevTasks = reactive({
  item5ID: {
    id: 'item5ID',
    title: 'Task 5',
    status: 'indevelopment',
  },
})

let completedTasks = reactive({
  item8ID: {
    id: 'item8ID',
    title: 'Task 8',
    status: 'completed',
  },
});


let allowedStatuses = reactive({
  backlog: {
    isAllowed: true,
    tasks: backlogTasks,
  },
  indevelopment: {
    isAllowed: true,
    tasks: inDevTasks,
  },
  completed: {
    isAllowed: true,
    tasks: completedTasks
  },
})

let newTask = reactive({
  title: 'My Task',
  description: 'My very Long Task Description'
})


function updateTaskStatus(task, updatedStatus) {
  console.log('updated status: ', updatedStatus)

  if (updatedStatus in allowedStatuses && allowedStatuses[updatedStatus].isAllowed) {
    if (!(task.id in allowedStatuses[updatedStatus])) {
      delete allowedStatuses[task.status].tasks[task.id]
      task.status = updatedStatus
      allowedStatuses[updatedStatus].tasks[task.id] = task
    }
  }
}

function updateActivePage(pageName){
  if(page.value == pageName) return
  if(pageName in pages){
    page.value = pageName
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function saveNewTask(){
  const key = getRandomInt(10000).toString() + getRandomInt(100).toString()
  console.log('random key: ', key)
  backlogTasks[key] = {
    id:     key,
    title:  newTask.title,
    desc:   newTask.description,
    status: 'backlog'
  }

  newTask.title = ''
  newTask.description = ''
}

function deleteTask(task){
  console.log(task)
  delete allowedStatuses[task.status].tasks[task.id]
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
        :class="{'border-x border-t rounded-t-lg': page == 'tasks'}"
        class="col-span-2 p-2 text-center">
        Tasks
      </button>
      <button 
        @click="updateActivePage('manage')"
        :class="{'border-x border-t rounded-t-lg': page == 'manage'}"
        class="col-span-2 p-2 text-center">
        Manage
      </button>
    </div>

    <div v-show="page == 'tasks'" class="grid grid-cols-3 gap-2">
      <div class="border rounded p-2">
        <h3 class="border-b-4 border-white text-lg mb-5">BackLog</h3>
        <ul>
          <li v-for="itemID in backlogTasks" :key="itemID" class="border border-gray-100 rounded p-1 mb-3">
            <div class="grid grid-cols-12 gap-1">
              <p class="col-span-5">{{ itemID.title }}</p>
              <button @click="updateTaskStatus(itemID, 'indevelopment')"
                class="col-span-3 border rounded text-center">dev</button>
              <button @click="updateTaskStatus(itemID, 'completed')"
                class="col-span-3 border rounded text-center">done</button>
              <button @click="deleteTask(itemID)"  class="col-span-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>                
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div class="border rounded p-2">
        <h3 class="border-b-4 border-white text-lg mb-5">In Development</h3>
        <ul>
          <li v-for="itemID in inDevTasks" :key="itemID" class="border border-gray-100 rounded p-1 mb-3">
            <div class="grid grid-cols-12 gap-1">
              <p class="col-span-5">{{ itemID.title }}</p>
              <button @click="updateTaskStatus(itemID, 'backlog')"
                class="col-span-3 border rounded text-center">backlog</button>
              <button @click="updateTaskStatus(itemID, 'completed')"
                class="col-span-3 border rounded text-center">done</button>
              <button @click="deleteTask(itemID)"  class="col-span-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>                
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div class="border rounded p-2">
        <h3 class="border-b-4 border-white text-lg mb-5">Completed</h3>
        <ul>
          <li v-for="itemID in completedTasks" :key="itemID" class="border border-gray-100 rounded p-1 mb-3">
            <div class="grid grid-cols-12 gap-1">
              <p class="col-span-5">{{ itemID.title }}</p>
              <button @click="updateTaskStatus(itemID, 'backlog')"
                class="col-span-3 border rounded text-center">backlog</button>
              <button @click="updateTaskStatus(itemID, 'indevelopment')"
                class="col-span-3 border rounded text-center">dev</button>
              <button @click="deleteTask(itemID)"  class="col-span-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>                
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>

    
    <div v-show="page == 'manage'" class="grid grid-cols-12 gap-2">
      <div class="col-span-3 border-y border-r rounded-r-lg">
        <ul class="divide-y divide-dashed">
          <li class="p-2">
            <button class="w-full h-full text-left">Add Task</button>
          </li>
          <li class="p-2">
            <button class="w-full h-full text-left">Projects</button>
          </li>
          <li class="p-2">
            <button class="w-full h-full text-left">Other Settings</button>
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
              <input v-model="newTask.description"
                class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                name="taskDesc" id="taskDesc" type="text" placeholder="Task description">
            </div>
            <div>
              <button
                @click="saveNewTask"
                class="text-white hover:bg-blue-800 focus:ring-1 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700  focus:ring-blue-800">Add Task</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
