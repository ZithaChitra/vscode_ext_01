import { defineStore } from 'pinia'

const useTaskManStore = defineStore('taskmanstore', {
    state: () => {
        return {
            tasks: {
                backlog: {
                    item1ID: {
                        id:        'item1ID',
                        title:     'Task 1',
                        status:    'backlog',
                        projectId: 'projID1',
                        userId:    1,
                    },
                    item2ID: {
                        id:        'item2ID',
                        title:     'Proj 2 Task ',
                        status:    'backlog',
                        projectId: 'projID2',
                        userId:    1,
                    },
                    item3ID: {
                        id:        'item3ID',
                        title:     'Proj 3 Task',
                        status:    'backlog',
                        projectId: 'projID3',
                        userId:    1,
                    },
                },
                indevelopment: {
                    item5ID: {
                        id:        'item5ID',
                        title:     'Task 5',
                        status:    'indevelopment',
                        projectId: 'projID1',
                        userId:    1,
                    }
                },
                completed: {
                    item2ID: {
                        id:       'item2ID',
                        title:    'Task 2',
                        status:   'completed',
                        projectId: 'projID1',
                        userId:    1,
                    },
                    item8ID: {
                        id:       'item8ID',
                        title:    'Task 8',
                        status:   'completed',
                        projectId: 'projID1',
                        userId:    1,
                    }
                }          
            },
            projects: {
                projID1: {
                    id:    'projID1',
                    title: 'default',
                    userId: 1
                },
                projID2: {
                    id:    'projID2',
                    title: 'First Project',
                    userId: 1
                },
                projID3: {
                    id:    'projID3',
                    title: 'Second Project',
                    userId: 1
                },
            },
            activeProject: 'projID1',
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

    getters: {
        getTaskById(state){
            return (taskId) => {
                if(taskId in state.tasks){
                    return state.tasks[taskId]
                }
                return null
            }
        },
        getProjectTasks(state){
            return (projectId, statusFilter = ['backlog']) => {
                if(projectId in state.projects){
                    let projTasks = []
                    for(let currState of statusFilter){
                        for(let task in state.tasks[currState]){
                            if(state.tasks[currState][task].projectId == projectId){
                                projTasks.push(state.tasks[currState][task])
                            }
                        }
                    }
                    return projTasks
                }
                return []
            }
        },
    },

    actions: {
        // ----------- Tasks -------------------------------------------
        updateTaskStatus(task, updatedStatus) {
            if (updatedStatus in this.allowedTaskStatuses && this.allowedTaskStatuses[updatedStatus].isAllowed) {
                if (!(task.id in this.tasks[updatedStatus])) {
                    delete this.tasks[task.status][task.id]
                    task.status = updatedStatus
                    this.tasks[updatedStatus][task.id] = task
                }
            }else{
                console.log('Could not update task status')
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
        },
        // ----------- Tasks -------------------------------------------

        
        // ----------- Projects -------------------------------------------
        changeActiveProject(projectId){
            if(projectId in this.projects){
                this.activeProject = this.projects[projectId]
            }
            return
        }

        // ----------- Projects -------------------------------------------
    }
})


export default useTaskManStore