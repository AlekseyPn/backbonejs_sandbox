import { Collection } from 'backbone'
import TodoItem from 'src/models/todo/todoItem'
import Store from 'backbone.localstorage'
class TodoList extends Collection {
    constructor(options) {
        super(options)
        this.model = TodoItem
        this.localStorage = new Store('todos')
    }

    done() {
        return this.filter(todo => todo.get(`done`))
    }

    remaining() {
        return this.without.apply(this, this.done())
    }

    nextOrder() {
        return !this.length ? ++this.length : ++this.last().get(`order`)
    }

    comparator(todo) {
        return todo.get(`order`)
    }
}

export default new TodoList