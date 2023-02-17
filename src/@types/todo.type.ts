export interface ITodo {
  name: string
  id: string
  done: boolean
}
export interface IHandleNewTodos {
  (todos: ITodo[]): ITodo[]
}
