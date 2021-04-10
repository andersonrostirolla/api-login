export default interface Command<T, U> {
  execute(params: T): Promise<U>
}
