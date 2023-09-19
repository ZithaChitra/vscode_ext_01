<script setup>
import useTaskManStore from '../store/index.js'
import { ref } from 'vue'


let taskManStore = useTaskManStore()
let activeProject = ref(taskManStore.activeProject);

</script>



<template>
    <div class="col-span-4 flex justify-between text-black mb-2">
      <h3 class="text-white mr-4">Project</h3>
      <select v-model="activeProject" name="" id="" class="w-full">
        <option v-for="(project, index) in taskManStore.projects" :key="index"
         :value="project.id">{{ project.title }}</option>
      </select>
    </div>
</template>
