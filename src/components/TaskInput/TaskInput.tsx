import { useState } from 'react'
import style from './taskinput.module.scss'
import { ITodo } from '../../@types/todo.type'
import { finished } from 'stream'
interface ITaskInputProps {
  addTodo: (name: string) => void
  currentTodo: ITodo | null
  editTodo: (name: string) => void
  finishEditTodo: () => void
}
export default function TaskInput(props: ITaskInputProps) {
  const { addTodo, currentTodo, editTodo, finishEditTodo } = props
  const [value, setValue] = useState<string>('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentTodo) {
      finishEditTodo()
      if (value) setValue('')
    } else {
      addTodo(value)
      setValue('')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    currentTodo ? editTodo(value) : setValue(value)
  }

  return (
    <div className='mb-2'>
      <h1 className={style.title}>Todo List</h1>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          value={currentTodo ? currentTodo.name : value}
          onChange={handleChange}
          type='text'
          placeholder='Note here'
        />
        <button className={currentTodo ? style.add : style.edit} type='submit'>
          {currentTodo ? '✔' : '+'}
        </button>
      </form>
    </div>
  )
}
