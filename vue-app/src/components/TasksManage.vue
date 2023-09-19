<script setup>
import { ref, reactive, onMounted } from 'vue'
import useTaskManStore from '../store/index.js'
import ListEditor from './ListEditor.vue'

const props = defineProps(['projectTasks', 'activeProjId'])
const store = useTaskManStore()

let currAction = ref('');


let newTask = reactive({
    title:     '',
    desc:      '',
    projectId: props.activeProject
})

let taskToUpdate = reactive({
    id:         '',
    title:      '',
    desc:       '',
    projectId:  props.activeProjId,
    status:     'backlog',
    userId:     1
})

const allowedActions = {
    add:  true,
    edit: true
}

function saveNewTask(){
    console.log(`saving with project id: ${props.activeProjId}`)
    newTask.projectId = props.activeProjId 
    store.saveNewTask(newTask)
}

function resetTaskToUpdate(){
    taskToUpdate.id        = ''
    taskToUpdate.title     = ''
    taskToUpdate.desc      = ''
    taskToUpdate.projectId = ''
    taskToUpdate.status    = ''
}

function changeTaskToUpdate(taskId){
    resetTaskToUpdate()
    let task = store.getTaskById(taskId)
    if(task){
        taskToUpdate.id         = task.id
        taskToUpdate.title      = task.title
        taskToUpdate.desc       = task.desc
        taskToUpdate.projectId  = task.projectId
        taskToUpdate.status     = task.status
        return true
    }

    console.log(taskToUpdate)
    return false
}

function updateTask(){
    if(taskToUpdate.id){
        store.updateTask(taskToUpdate)
        resetTaskToUpdate()
        updateCurrAction('')
    }
}

function updateCurrAction(action){
    if(action in allowedActions || action == ''){
        currAction.value = action
    }
}

function onAddHandler(){
    currAction.value = 'add'
}

function onEditHandler(taskId){
    console.log('Edit Handler')
    let canEdit = changeTaskToUpdate(taskId);
    if(canEdit){
        updateCurrAction('edit')
    }
}

</script>

<template>

    <ListEditor title="Project Tasks" :data="projectTasks" 
        :onAdd="onAddHandler" :onEdit="onEditHandler">

        <template v-slot:action>
            <div v-show="currAction == 'edit'">
                <h2 class="text-center">Edit Task</h2>
                <div>
                    <div class="mb-3">
                        <label class="block mb-2 text-sm font-medium text-white" for="taskTitle">Task Title</label>
                        <input
                            v-model="taskToUpdate.title"
                            class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            name="taskTitle" id="taskTitle" type="text" placeholder="Task name" />
                    </div>
                    <div class="mb-3">
                        <label class="block mb-2 text-sm font-medium text-white" for="tasDesc">Task Description</label>
                        <input
                            v-model="taskToUpdate.desc"
                            class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            name="taskDesc" id="taskDesc" type="text" placeholder="Task description"/>
                    </div>
                    <div class="mb-3">
                        <label class="block mb-2 text-sm font-medium text-white" for="tasDesc">Project</label>
                        <input
                            v-model="taskToUpdate.projectId"
                            class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            name="taskDesc" id="taskDesc" type="text" placeholder="Task description"/>
                    </div>
                    <div class="mb-3">
                        <label class="block mb-2 text-sm font-medium text-white" for="tasDesc">Status</label>
                        <input
                            v-model="taskToUpdate.status"
                            class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            name="taskDesc" id="taskDesc" type="text" placeholder="Task description"/>
                    </div>
                    <div>
                        <button
                            @click="updateTask"
                            class="text-black focus:ring-1 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-primary hover:bg-white focus:ring-blue-800" >
                            Update task 
                        </button>
                    </div>
                </div>
                
            </div>
            <div v-show="currAction == 'add'">
                <h2 class="text-center">New Task</h2>
                <div>
                    <div class="mb-3">
                        <label class="block mb-2 text-sm font-medium text-white" for="taskTitle">Task Title</label>
                        <input
                            v-model="newTask.title"
                            class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            name="taskTitle" id="taskTitle" type="text" placeholder="Task name" />
                    </div>
                    <div class="mb-3">
                        <label class="block mb-2 text-sm font-medium text-white" for="tasDesc">Task Description</label>
                        <input
                            v-model="newTask.desc"
                            class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            name="taskDesc" id="taskDesc" type="text" placeholder="Task description"/>
                    </div>
                    <div>
                        <button
                            @click="saveNewTask"
                            class="text-black focus:ring-1 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-primary hover:bg-white focus:ring-blue-800" >
                            Add task 
                        </button>
                    </div>
                </div>
            </div>
        </template>

    </ListEditor>
</template>
