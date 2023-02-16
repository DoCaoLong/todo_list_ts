import { ITodo } from '../../@types/todo.type'
import style from './taskList.module.scss'
interface ITaskListProps {
  doneTaskList?: boolean
  todos?: ITodo[]
  handleDoneTodo: (id: string, done: boolean) => void
}
export default function TaskList(props: ITaskListProps) {
  const { doneTaskList, todos, handleDoneTodo } = props
  // c1
  // const handleChangeCheckbox = (todoId: string, e: React.ChangeEvent<HTMLInputElement>) => {
  //   handleDoneTodo(todoId, e.target.checked)
  // }

  // c2: using curring
  const handleChangeCheckBox2 = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDoneTodo(id, e.target.checked)
  }

  return (
    <div className='mb-2'>
      <h2 className={style.title}>{doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</h2>
      <div className={style.tasks}>
        {todos?.map((item: ITodo) => (
          <div key={item.id} className={style.task}>
            <input
              // onChange={(e) => handleChangeCheckbox(item.id, e)}
              onChange={handleChangeCheckBox2(item.id)}
              type='checkbox'
              className={style.taskCheckbox}
              checked={item.done}
            />
            <span className={`${style.taskName} ${item.done ? style.taskNameDone : ''}`}>{item.name}</span>
            <div className={style.taskActions}>
              <button className={style.taskBtn}>🖋</button>
              <button className={style.taskBtn}>🗑</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
