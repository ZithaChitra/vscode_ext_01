<script setup>
import { ref, reactive, onMounted } from 'vue'
import useTaskManStore from '../store/index.js'


const props = defineProps(['projectTasks'])
const store = useTaskManStore()


onMounted(()=>{
    console.log('active proj id', store.activeProject)
    console.log('activeProject: ', store.getProjectTasks(store.activeProject))
})

let newTask = reactive({
  title: 'My New Task',
  desc:  'My very Long Task Description'
})

function saveNewTask(){
  store.saveNewTask(newTask)
}

let addTask = ref(true);
</script>

<template>
    <div class="md:grid grid-cols-12 p-2 gap-4 border rounded-md">
        <div class="col-span-6">
            <div class="flex justify-between">
                <h3>All Tasks</h3>
                <button>Add New Task</button>
            </div>
            <ul>
                <li>
                    <div v-for="task of props.projectTasks" :key="task.id"
                        class="flex justify-between">
                        <p>{{ task.title }}</p>
                        <button>Edit</button>
                    </div>
                </li>
            </ul>
        </div>
        <div class="col-span-6">
            <div v-show="!addTask">Selected Task Details</div>
            <div v-show="addTask">
                <h2 class="text-lg mb-5 border-b-4 border-white">New Task</h2>
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
