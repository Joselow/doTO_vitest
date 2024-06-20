import { expect, test } from "vitest";
import { STATES, doTO } from "./doTO.js";

const mainDoTO =  new doTO()

const tasksMocks = [
  { id:1, name: 'play', state: STATES.PENDING },
  { id:2, name: 'sleep', state: STATES.COMPLETED },
  { id:3, name: 'cook', state: STATES.COMPLETED },
  { id:4, name: 'run', state: STATES.PENDING },
]

test('create news task', async() => {
  await mainDoTO.addTask({ ...tasksMocks[0] })
  const tasks = mainDoTO.listTasks()

  expect(tasks).toStrictEqual([tasksMocks[0]])

  await mainDoTO.addTask(tasksMocks[2])

  expect(mainDoTO.listTasks()).toStrictEqual([tasksMocks[0], tasksMocks[2] ])
})


test('check tasks as completed', async() => {
  await mainDoTO.checkTask(1)
  await mainDoTO.checkTask(4)

  expect(mainDoTO.listTasks()[0]).toStrictEqual(
    { id:1, name: 'play', state: STATES.COMPLETED },
  )
})

test('delete tasks', async() => {
  await mainDoTO.deleteTask(1)
  await mainDoTO.deleteTask(3)
  expect(mainDoTO.listTasks()).toStrictEqual([])

  await mainDoTO.deleteTask(4)
  
})

test('list tasks', async() => {  
  const DoTO =  new doTO('otherTasks',tasksMocks)
  expect(DoTO.listTasks()).toStrictEqual(tasksMocks)
})