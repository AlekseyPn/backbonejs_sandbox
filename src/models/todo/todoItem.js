import { Model } from 'backbone'
import TodoList from 'src/collections/todo/todoList'
class TodoItem extends Model {
    constructor(options) {
        super(options)
        this.defaults = {
            title: 'New Task',
            order: TodoList.nextOrder(),
            done: false
        }
    }

    initialize() {
        if (!this.get(`title`))
            this.set({title: this.defaults.title})
    }

    toggle() {
        this.save({done: this.get(`done`)})
    }

    clear() {
        this.destroy()
    }
}
export default TodoItem 