import { useState } from 'react'
import { ITodo } from '../../@types/todo.type'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import style from './todolist.module.scss'
export default function Todolist() {
  const [todos, setTodos] = useState<ITodo[]>([])
  const doneTodos = todos.filter((todo: ITodo) => todo.done)
  const notDoneTodos = todos.filter((todo: ITodo) => !todo.done)
  const addTodo = (name: string) => {
    const todo: ITodo = {
      done: false,
      id: new Date().toISOString(),
      name
    }
    setTodos((prev) => [...prev, todo])
  }
  const handleDoneTodo = (id: string, done: boolean) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })
    })
  }
  return (
    <div>
      <div className={style.todoList}>
        <div className={style.todoListContainer}>
          <TaskInput addTodo={addTodo} />
          <TaskList todos={notDoneTodos} handleDoneTodo={handleDoneTodo} />
          <TaskList doneTaskList todos={doneTodos} handleDoneTodo={handleDoneTodo} />
        </div>
      </div>
    </div>
  )
}
