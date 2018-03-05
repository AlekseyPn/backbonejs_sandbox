import {
  Collection,
} from 'backbone';
import TodoItem from '@/models/todo/todoItem.js';
import LocalStorage from 'backbone.localstorage';

class TodoList extends Collection {
  constructor(model, options) {
    super(model, options);
    this.model = TodoItem;
    this.localStorage = new LocalStorage('todossss');
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

