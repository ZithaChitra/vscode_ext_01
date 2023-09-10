<script setup>
import { ref, reactive, onMounted } from 'vue'
import useTaskManStore from '../store/index.js'


const props = defineProps(['projectTasks', 'activeProjId'])
const store = useTaskManStore()

let currAction = ref('');
onMounted(()=>{
})


let newTask = reactive({
  title: '',
  desc:  '',
  projectId: props.activeProject
})

let taskToUpdate = reactive({
  title: '',
  desc:  '',
  projectId: props.activeProjId,
  status: 'backlog',
  userId: 1
})

const allowedActions = {
    add: true,
    edit: true
}

function saveNewTask(){
    console.log(`saving with project id: ${props.activeProjId}`)
    newTask.projectId = props.activeProjId 
    store.saveNewTask(newTask)
}

function changeTaskToUpdate(taskId){
    taskToUpdate = store.getTaskById(taskId)
    console.log(taskToUpdate)
}

function openTaskEditForm(taskId){
    changeTaskToUpdate(taskId);
    updateCurrAction('edit')
}

function updateTask(){
    store.updateTask(taskToUpdate)
}

function updateCurrAction(action){
    if(action in allowedActions){
        currAction.value = action
    }
}

</script>

<template>
    <div class="md:grid grid-cols-12 p-2 gap-4 border rounded-md">
        <div class="col-span-6">
            <div class="flex justify-between border-b p-1 mb-2">
                <h3>All Tasks</h3>
                <button @click="updateCurrAction('add')"
                    class="bg-primary text-black px-2 rounded hover:bg-white">Add New Task</button>
            </div>
            <ul>
                <li>
                    <div v-for="task of props.projectTasks" :key="task.id"
                        class="flex justify-between">
                        <p>{{ task.title }}</p>
                        <button 
                            @click="openTaskEditForm(task.id)">Edit</button>
                    </div>
                </li>
            </ul>
        </div>
        <div class="col-span-6">
            <div v-show="currAction == 'edit'">
                <h2 class="text-lg mb-5 border-b-4 border-white text-center">Task Details</h2>
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
                <h2 class="text-lg mb-5 border-b-4 border-white text-center">New Task</h2>
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
        </div>
    </div>
</template>
