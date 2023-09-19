<script setup>
import { ref } from 'vue'
import useTaskManStore from '../store/index.js'
import TasksManage from '../components/TasksManage.vue'
import ProjectsManage from '../components/ProjectsManage.vue'

const store = useTaskManStore()
let managePageActive = ref('tasks')
let activeProject = ref(store.activeProject)

const managePageTabs= {
  tasks:      'Tasks',
  projects:   'Projects',
  settings:   'Other Settings'
}

function updateManagePageActive(tabName){
  if(tabName in managePageTabs){
    managePageActive.value = tabName
  }
}

</script>

<template>
  <div v-show="managePageActive == 'tasks'" class="md:grid grid-cols-12 gap-2">
    <div class="hidden md:block col-span-3"></div>
    <div class="col-span-4 flex justify-between text-black mb-2">
      <h3 class="text-white mr-4">Project</h3>
      <select v-model="activeProject" name="" id="" class="w-full">
        <option v-for="(project, index) in store.projects" :key="index"
         :value="project.id">{{ project.title }}</option>
      </select>
    </div>
  </div>
  <div class="grid grid-cols-12 gap-2">
      <div class="col-span-3 border-y border-r rounded-r-lg overflow-hidden">
        <ul class="divide-y divide-dashed">
          <li class="">
            <button 
              @click="updateManagePageActive('tasks')"
              :class="{'bg-accent': managePageActive == 'tasks'}"
              class="w-full h-full text-left  p-2 ">Tasks</button>
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
      <div class="col-span-9 ">
        <TasksManage :projectTasks="store.getProjectTasks(activeProject)" :activeProjId="activeProject"
          v-show="managePageActive == 'tasks'"/>

        
        <ProjectsManage  v-show="managePageActive == 'projects'" />
        

        <div class="flex justify-center items-center"
          v-show="managePageActive == 'settings'">
          <p>
            Other Settings Comp
          </p>
        </div>
      </div>
    </div>
</template>
