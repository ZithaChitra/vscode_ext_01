<script setup>

import { onMounted,ref, reactive } from 'vue'
import ListEditor from './ListEditor.vue'
import useTaskManStore from '../store/index.js'


let taskManStore = useTaskManStore();
let currAction   = ref('');

let newProject = reactive({
    title: '',
    userId: 1,
})

let projectToUpdate = reactive({
    id:     '',
    title:  '',
})


function onEditHandler(projId){
    projectToUpdate.id    = ''
    projectToUpdate.title = ''

    let proj = taskManStore.getProjectById(projId)
    if(proj){
        projectToUpdate.id    = proj.id
        projectToUpdate.title = proj.title
        currAction.value      = 'edit'

    }
}

function onAddHandler(){
    currAction.value = 'add'
}

function saveNewProject(){
    if(!newProject.title) return 

    taskManStore.saveNewProject(newProject)
    newProject.title = ''
    currAction.value = ''
    return 
}

function updateProject(projId) {
    if(projId){
        taskManStore.updateProject(projectToUpdate)
    }
}

</script>


<template>
    <ListEditor title="All Projects" :data="taskManStore.getAllProjectsAsArray"
        :onAdd="onAddHandler" :onEdit="onEditHandler">
        <template v-slot:action>
            <div v-show="currAction == 'add'">
                <h2 class="text-center">New Project</h2>
                <div>
                    <div class="mb-3">
                        <label class="block mb-2 text-sm font-medium text-white" for="taskTitle">Project Title</label>
                        <input
                            v-model="newProject.title"
                            class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            name="taskTitle" id="taskTitle" type="text" placeholder="Project name" />
                    </div>
                    <div>
                        <button
                            @click="saveNewProject"
                            class="text-black focus:ring-1 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-primary hover:bg-white focus:ring-blue-800" >
                            Save Project
                        </button>
                    </div>
                </div>
            </div>
            <div v-show="currAction == 'edit'">
                <h2 class="text-center">Edit Project</h2>
                <div>
                    <div class="mb-3">
                        <label class="block mb-2 text-sm font-medium text-white" for="taskTitle">Project Title</label>
                        <input
                            v-model="projectToUpdate.title"
                            class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            name="taskTitle" id="taskTitle" type="text" placeholder="Project name" />
                    </div>
                    <div>
                        <button
                            @click="updateProject(projectToUpdate.id)"
                            class="text-black focus:ring-1 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-primary hover:bg-white focus:ring-blue-800" >
                            Save Project
                        </button>
                    </div>
                </div>
            </div>
        </template>

    </ListEditor>
</template>
