import { useEffect, useState } from 'react'
import { ITodo } from '../../@types/todo.type'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import style from './todolist.module.scss'

interface IHandleNewTodos {
  (todos: ITodo[]): ITodo[]
}
// c2
// type IHandleNewTodos = (todos: ITodo[]) => ITodo[]

const syncReactToLocal = (handleNewTodos: IHandleNewTodos) => {
  const todoString = localStorage.getItem('todos')
  const todosObj: ITodo[] = JSON.parse(todoString || '[]')
  const newTodosObj = handleNewTodos(todosObj)
  localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

export default function Todolist() {
  const [todos, setTodos] = useState<ITodo[]>([])
  console.log(todos)
  // chế độ edit
  const [currentTodo, setCurrentTodo] = useState<ITodo | null>(null)
  const doneTodos = todos.filter((todo: ITodo) => todo.done)
  const notDoneTodos = todos.filter((todo: ITodo) => !todo.done)

  useEffect(() => {
    const todoString = localStorage.getItem('todos')
    const todosObj: ITodo[] = JSON.parse(todoString || '[]')
    setTodos(todosObj)
  }, [])

  // add todo
  const addTodo = (name: string) => {
    const todo: ITodo = {
      done: false,
      id: new Date().toISOString(),
      name
    }
    // setTodos((prev) => [...prev, todo])
    setTodos([...todos, todo])
    const handler = (todosObj: ITodo[]) => {
      return [...todosObj, todo]
    }
    syncReactToLocal(handler)
  }

  // done todo
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

  // start edit
  const startEditTodo = (id: string) => {
    const findedTodo = todos.find((todo) => todo.id === id)
    if (findedTodo) {
      setCurrentTodo(findedTodo)
    }
  }

  // edit todo
  const editTodo = (name: string) => {
    setCurrentTodo((prev) => {
      if (prev) return { ...prev, name }
      return null
    })
  }

  const finishEditTodo = () => {
    const handler = (todoObj: ITodo[]) => {
      return todoObj.map((todo) => {
        if (todo.id === (currentTodo as ITodo).id) {
          return currentTodo as ITodo
        }
        return todo
      })
    }

    setTodos(handler)
    setCurrentTodo(null) // sau khi edit thì clear value input

    // thêm todo vào local storage
    syncReactToLocal(handler)
  }

  const deleteTodo = (id: string) => {
    if (currentTodo) {
      setCurrentTodo(null)
    }
    const handler = (todoObj: ITodo[]) => {
      const findeIndexTodo = todoObj.findIndex((todo) => todo.id === id)
      if (findeIndexTodo > -1) {
        const result = [...todoObj]
        result.splice(findeIndexTodo, 1)
        return result
      }
      return todoObj
    }
    setTodos(handler)
    syncReactToLocal(handler)
  }

  return (
    <div>
      <div className={style.todoList}>
        <div className={style.todoListContainer}>
          <TaskInput addTodo={addTodo} currentTodo={currentTodo} editTodo={editTodo} finishEditTodo={finishEditTodo} />
          <TaskList
            todos={notDoneTodos}
            handleDoneTodo={handleDoneTodo}
            startEditTodo={startEditTodo}
            deleteTodo={deleteTodo}
          />
          <TaskList
            doneTaskList
            todos={doneTodos}
            handleDoneTodo={handleDoneTodo}
            startEditTodo={startEditTodo}
            deleteTodo={deleteTodo}
          />
        </div>
      </div>
    </div>
  )
}
