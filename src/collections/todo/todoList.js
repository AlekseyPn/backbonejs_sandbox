import {
  Collection,
} from 'backbone';
import Store from 'backbone.localstorage';
import TodoItem from '@/models/todo/todoItem.js';

class TodoList extends Collection {
  constructor(options) {
    super(options);
    this.model = TodoItem;
    this.localStorage = new Store('todos');
  }

  done() {
    return this.filter(todo => todo.get('done'));
  }

  remaining() {
    return this.without(...this.done());
  }

  nextOrder() {
    return !this.length ? this.length + 1 : this.last().get('order') + 1;
  }

  static comparator(todo) {
    return todo.get('order');
  }
}

export default new TodoList();

