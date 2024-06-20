import { writeTasks } from "./hepers/fs.js"

export const STATES = {
  COMPLETED : 'completed',
  PENDING: 'pending'
}

export class doTO {
  
  constructor (path = 'tasks',  tasks = []) {
    this.path = path + '.json'
    this.tasks = tasks;
    this.saveTasks()
  } 

  async addTask (task) {
    this.tasks = [...this.tasks, task]
    await this.saveTasks()
  }

  async checkTask (taskId) {  
    const taskIndex = this.tasks.findIndex(({id}) => id === taskId)

    if (taskIndex !== -1) {
      const newTaskFound = { ...this.tasks[taskIndex] }
      newTaskFound.state = STATES.COMPLETED
      const arrayTasks = [...this.tasks]

      arrayTasks[taskIndex] = newTaskFound

      this.tasks = [...arrayTasks]
      await this.saveTasks()
    }else {
      console.error(`No se encontró la tarea con ID ${taskId}`);
    }
  }

  async deleteTask (taskId) {
    const taskIndex = this.tasks.findIndex(({id}) => id === taskId)

    if (taskIndex !== -1) {
      const arrayTasks = [...this.tasks]
      arrayTasks.splice(taskIndex, 1)
      this.tasks = arrayTasks

      await this.saveTasks();
    }
    else {
      console.log(`No se encontró la tarea con ID ${taskId}`);
    }
  }

  listTasks () {
    // console.log(this.tasks);
    return this.tasks;
  }

  async saveTasks () {
    const res = await writeTasks(this.path, this.tasks); 
    if (!res.success) {
      console.error('Error al guardar las tareas:', error);
    }
  }
}

const mainDoTO =  new doTO()

async function run () {
  await mainDoTO.addTask({ id:1, name: 'jugar', state: STATES.PENDING })
  mainDoTO.listTasks()

  await mainDoTO.checkTask(1)
  mainDoTO.listTasks()
  
  await mainDoTO.deleteTask(1)
  mainDoTO.listTasks()
}

// run()






