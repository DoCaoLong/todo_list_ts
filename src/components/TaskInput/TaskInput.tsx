import { useState } from 'react'
import style from './taskinput.module.scss'
interface ITaskInputProps {
  addTodo: (name: string) => void
}
export default function TaskInput(props: ITaskInputProps) {
  const { addTodo } = props
  const [value, setValue] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (value !== '') addTodo(value)
    e.preventDefault()
    setValue('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div className='mb-2'>
      <h1 className={style.title}>Todo list type script</h1>
      <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
        <input value={value} onChange={handleChange} type='text' placeholder='caption goes here' />
        <button type='submit'>+</button>
      </form>
    </div>
  )
}
