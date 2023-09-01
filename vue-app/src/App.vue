<script setup>
import { ref } from 'vue'
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
// import * as vscode from 'vscode'




let backlogTasks = ref({
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


let inDevTasks = ref({
  item5ID: {
    id: 'item5ID',
    title: 'Item 5',
    status: 'indevelopment',
  },
})

let completedTasks = ref({
  item8ID: {
    id: 'item8ID',
    title: 'Item 8',
    status: 'completed',
  },
});


let allowedStatuses = {
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
}

function updateTaskStatus(task, updatedStatus) {
  console.log(allowedStatuses)
  console.log('updated status: ', updatedStatus)
  if(updatedStatus in allowedStatuses && allowedStatuses[updatedStatus].isAllowed){
    if(!(task.id in allowedStatuses[updatedStatus].value)){
      allowedStatuses[updatedStatus].tasks.value[task.id] = task

      delete allowedStatuses[task.status].tasks.value[task.id]
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
          <li v-for="itemID in backlogTasks" :key="itemID"
            @click="updateTaskStatus(itemID, 'completed')"
            class="border border-gray-100 rounded p-1 mb-1">
            <p>{{ itemID.title }} </p>
          </li>
        </ul>
      </div>
      <div class="border rounded p-2">
        <h3 class="border-b-4 border-white text-lg mb-5">In Development</h3>
        <ul>
          <li v-for="itemID in inDevTasks" :key="itemID"
            class="border border-gray-100 rounded p-1 mb-1">
            <p>{{ itemID.title }} </p>
          </li>
        </ul>
      </div>
      <div class="border rounded p-2">
        <h3 class="border-b-4 border-white text-lg mb-5">Completed</h3>
        <ul>
          <li v-for="itemID in completedTasks" :key="itemID"
            class="border border-gray-100 rounded p-1 mb-1">
            <p>{{ itemID.title }} </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
