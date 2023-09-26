<script setup>
import useTaskManStore from '../store/index.js'
import { ref } from 'vue'


let taskManStore = useTaskManStore()
let activeProject = ref(taskManStore.activeProject);

function handleOptionChange(){
  taskManStore.changeActiveProject(activeProject.value)

}
</script>

<template>
    <div class="col-span-4 md:grid grid-cols-12 gap-1 text-black mb-2">
      <h3 class="col-span-2  text-white ">Active Project</h3>
      <select v-model="activeProject" name="" id="" class="w-full col-span-4 lg:col-span-2" @change="handleOptionChange">
        <option v-for="(project, index) in taskManStore.projects" :key="index"
         :value="project.id">{{ project.title }}</option>
      </select>
    </div>
</template>
