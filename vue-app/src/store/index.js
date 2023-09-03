import { defineStore } from 'pinia'

const useTaskManStore = defineStore('taskmanstore', {
    state: () => {
        return {
            tasks: {
                backlog: {
                    item1ID: {
                        id: 'item1ID',
                        title: 'Task 1',
                        status: 'backlog'
                    }
                },
                indevelopment: {
                    item5ID: {
                        id: 'item5ID',
                        title: 'Task 5',
                        status: 'indevelopment'
                    }
                },
                completed: {
                    item2ID: {
                        id: 'item2ID',
                        title: 'Task 2',
                        status: 'completed'
                    },
                    item8ID: {
                        id: 'item8ID',
                        title: 'Task 8',
                        status: 'completed'
                    }
                }          
            },
            allowedTaskStatuses: {
                backlog: {
                    isAllowed: true,
                },
                indevelopment: {
                    isAllowed: true,
                },
                completed: {
                    isAllowed: true,
                }
            }
        }
    },

    actions: {
        updateTaskStatus(task, updatedStatus) {
            // console.log('updating to status: ', updatedStatus, ' from: ', task.status)
        
            if (updatedStatus in this.allowedTaskStatuses && this.allowedTaskStatuses[updatedStatus].isAllowed) {
                if (!(task.id in this.tasks[updatedStatus])) {
                    delete this.tasks[task.status][task.id]
                    task.status = updatedStatus
                    this.tasks[updatedStatus][task.id] = task
                    // console.log('Updated Task Status from Store')
                }
            }else{
                // console.log('Could not update task status')
            }
        },
        deleteTask(task){
            delete this.tasks[task.status][task.id]
        },

        saveNewTask(newTask){
            function getRandomInt(max) {
                return Math.floor(Math.random() * max);
            }

            if(newTask.title){
              const key = getRandomInt(10000).toString() + getRandomInt(100).toString()
              console.log('random key: ', key)
              this.tasks.backlog[key] = {
                id:     key,
                title:  newTask.title,
                desc:   newTask.description ?? '',
                status: 'backlog'
              }
          
              newTask.title = ''
              newTask.description = ''
            }
          }

    }
})


export default useTaskManStore