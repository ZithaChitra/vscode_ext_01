<script setup>
import { reactive } from 'vue'

// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
// import * as vscode from 'vscode'


let backlogTasks = reactive({
  item1ID: {
    id: 'item1ID',
    title: 'Item 1',
    status: 'backlog',
  },
  item2ID: {
    id: 'item2ID',
    title: 'Item 2',
    status: 'backlog',
  },
  item3ID: {
    id: 'item3ID',
    title: 'Item 3',
    status: 'backlog',
  },
});


let inDevTasks = reactive({
  item5ID: {
    id: 'item5ID',
    title: 'Item 5',
    status: 'indevelopment',
  },
})

let completedTasks = reactive({
  item8ID: {
    id: 'item8ID',
    title: 'Item 8',
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


</script>

  

<template>
  <div class="text-white p-5">
    <h2 class="text-center text-xl mb-10">
      Task Manager
    </h2>

    <div class="grid grid-cols-3 gap-2">
      <div class="border rounded p-2">
        <h3 class="border-b-4 border-white text-lg mb-5">BackLog</h3>
        <ul>
          <li v-for="itemID in backlogTasks" :key="itemID" class="border border-gray-100 rounded p-1 mb-3">
            <div class="grid grid-cols-12 gap-1">
              <p class="col-span-6">{{ itemID.title }}</p>
              <button @click="updateTaskStatus(itemID, 'indevelopment')"
                class="col-span-3 border rounded text-center">dev</button>
              <button @click="updateTaskStatus(itemID, 'completed')"
                class="col-span-3 border rounded text-center">done</button>
            </div>
          </li>
        </ul>
      </div>
      <div class="border rounded p-2">
        <h3 class="border-b-4 border-white text-lg mb-5">In Development</h3>
        <ul>
          <li v-for="itemID in inDevTasks" :key="itemID" class="border border-gray-100 rounded p-1 mb-3">
            <div class="grid grid-cols-12 gap-1">
              <p class="col-span-6">{{ itemID.title }}</p>
              <button @click="updateTaskStatus(itemID, 'backlog')"
                class="col-span-3 border rounded text-center">backlog</button>
              <button @click="updateTaskStatus(itemID, 'completed')"
                class="col-span-3 border rounded text-center">done</button>
            </div>
          </li>
        </ul>
      </div>
      <div class="border rounded p-2">
        <h3 class="border-b-4 border-white text-lg mb-5">Completed</h3>
        <ul>
          <li v-for="itemID in completedTasks" :key="itemID" class="border border-gray-100 rounded p-1 mb-3">
            <div class="grid grid-cols-12 gap-1">
              <p class="col-span-6">{{ itemID.title }}</p>
              <button @click="updateTaskStatus(itemID, 'backlog')"
                class="col-span-3 border rounded text-center">backlog</button>
              <button @click="updateTaskStatus(itemID, 'indevelopment')"
                class="col-span-3 border rounded text-center">dev</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>
