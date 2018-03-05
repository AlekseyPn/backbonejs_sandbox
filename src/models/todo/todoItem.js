import { Model } from 'backbone';
import TodoList from '@/collections/todo/todoList.js';

const TodoItem = Model.extend({
  defaults: () => ({
    title: 'New Task',
    order: TodoList.nextOrder(),
    done: false,
  }),

  initialize() {
    if (!this.get('title')) { this.set({ title: this.defaults.title }); }
  },

  toggle() {
    this.save({ done: this.get('done') });
  },

  clear() {
    this.destroy();
  },
});
// class TodoItem extends Model {
//   constructor(attr, options) {
//     debugger;
//     super(attr, options);
//     this.defaults = () => ({
//       title: 'New Task',
//       order: TodoList.nextOrder(),
//       done: false,
//     });
//   }

//   initialize() {
//     if (!this.get('title')) { this.set({ title: this.defaults.title }); }
//   }

//   toggle() {
//     this.save({ done: this.get('done') });
//   }

//   clear() {
//     this.destroy();
//   }
// }
export default TodoItem;
