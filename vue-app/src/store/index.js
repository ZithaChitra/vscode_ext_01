import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

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
            return (taskId, statusFilter=['backlog']) => {
                for(let currState of statusFilter){
                    if(taskId in state.tasks[currState]){
                        return state.tasks[currState][taskId]
                    }
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

        getAllProjectsAsArray(state){
            const projects  = Object.keys(state.projects)
            let projectsArr = []
            projects.forEach(projKey => {
                projectsArr.push(state.projects[projKey])
            });
            return projectsArr
        },

        getProjectById(state){
            return (projId) => {
                if(projId in state.projects){
                    return state.projects[projId]
                }

                return null
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
            if(newTask.title){
              const key = uuidv4()
              this.tasks.backlog[key] = {
                id:        key,
                title:     newTask.title,
                desc:      newTask.desc ?? '',
                status:    'backlog',
                projectId: newTask.projectId
              }
          
              newTask.title = ''
              newTask.desc  = ''

            }
        },

        updateTask(task, statusFilter = ['backlog', 'indevelopment', 'completed']){
            let { id } = task
            for(let currState of statusFilter){
                if(id in this.tasks[currState]){
                    this.tasks[currState][id].title     = task.title
                    this.tasks[currState][id].status    = task.status
                    this.tasks[currState][id].projectId = task.projectId
                    this.tasks[currState][id].desc      = task.desc
                }
            }
        },
        // ----------- Tasks -------------------------------------------

        
        // ----------- Projects -------------------------------------------
        changeActiveProject(projectId){
            if(projectId in this.projects){
                this.activeProject = this.projects[projectId]
            }
            return
        },


        saveNewProject(newProject){
            // TODO: check if project title already exists
            const id = uuidv4()
            newProject['id'] = id
            this.projects[id] = {
                id:     newProject.id,
                title:  newProject.title,
                userId: newProject.userId
            }
        },

        updateProject(proj){
            if(proj.id in this.projects){
                this.projects[proj.id].title = proj.title
            }

        },

        // ----------- Projects -------------------------------------------
    }
})


export default useTaskManStore