import TodoList from '@/collections/todo/todoList';
import { View } from 'backbone';
import todoStats from '@/partials/todo/todoStats';
import Mustache from 'mustache';
import TodoView from './todoItem';
import viewsConstanst from './viewsConstanst';
import './todo.scss';

export default View.extend({
  statsTemplate: todoStats,
  events: {
    'keypress #new-todo': 'createOnEnter',
    'click #clear-completed': 'clearCompleted',
    'click #toggle-all': 'toggleAllComplete',
  },
  initialize() {
    this.setElement($('#todoapp'));
    this.input = this.$('#new-todo');
    this.allCheckbox = _.first(this.$('#toggle-all'));
    this.footer = this.$('#footer');
    this.main = $('#main');
    this.listenTo(TodoList, 'add', this.addOne);
    this.listenTo(TodoList, 'reset', this.addAll);
    this.listenTo(TodoList, 'all', this.render);
    TodoList.fetch();
  },
  render() {
    const done = TodoList.done().length;
    const remaining = TodoList.remaining().length;

    if (TodoList.length) {
      this.main.show();
      this.footer.show();
      this.footer.html(Mustache.render(this.statsTemplate, {
        done,
        remaining,
        remainingPlurals: this.pluralsText(remaining),
        donePlurals: this.pluralsText(done),
      }));
    } else {
      this.main.hide();
      this.footer.hide();
    }

    this.allCheckbox.checked = !remaining;
  },

  addOne(todo) {
    const todoItem = new TodoView({ model: todo });
    $('#todo-list').append(todoItem.render().el);
  },

  addAll() {
    this.$('#todo-list').html('');
    TodoList.each(this.addOne, this);
  },

  createOnEnter(e) {
    if (e.keyCode !== viewsConstanst.enterKeyCode || !this.input.val()) return;
    TodoList.create({ title: this.input.val() });
    this.input.val('');
  },

  clearCompleted() {
    _.each(TodoList.done(), todo => todo.clear());
    return false;
  },

  toggleAllComplete() {
    const done = this.allCheckbox.checked;
    TodoList.each((todo) => { todo.save({ done }); });
  },
  pluralsText(number) {
    return number === 1 ? 'item' : 'items';
  },
});
// export default class TodoApp extends View {
//   constructor(options) {
//     _.defaults(options, {
//       events: {
//         'keypress #new-todo': 'createOnEnter',
//         'click #clear-completed': 'clearCompleted',
//         'click #toggle-all': 'toggleAllComplete',
//       },
//     });
//     super(options);
//     this.setElement($('#todoapp'));
//     this.statsTemplate = todoStats;
//     this.input = this.$('#new-todo');
//     this.allCheckbox = _.first(this.$('#toggle-all'));
//     this.footer = this.$('#footer');
//     this.main = $('#main');
//     this.listenTo(TodoList, 'add', this.addOne);
//     this.listenTo(TodoList, 'reset', this.addAll);
//     this.listenTo(TodoList, 'all', this.render);
//     TodoList.fetch({ reset: true });
//     // this.setElement($('#todoapp'), true);
//     // this.statsTemplate = Mustache.parse(todoStats);
//     // this.events = {
//     //   'keypress #new-todo': 'createOnEnter',
//     //   'click #clear-completed': 'clearCompleted',
//     //   'click #toggle-all': 'toggleAllComplete',
//     // };
//   }

//   render() {
//     const done = TodoList.done().length;
//     const remaining = TodoList.remaining().length;

//     if (TodoList.length) {
//       this.main.show();
//       this.footer.show();
//       this.footer.html(Mustache.render(this.statsTemplate, { done, remaining }));
//     } else {
//       this.main.hide();
//       this.footer.hide();
//     }

//     this.allCheckbox.checked = !remaining;
//   }

//   static addOne(todo) {
//     const todoItem = new TodoView({ model: todo });
//     $('#todo-list').append(todoItem.render().el);
//   }

//   addAll() {
//     this.$('#todo-list').html('');
//     TodoList.each(this.addOne, this);
//   }

//   createOnEnter(e) {
//     if (e.keyCode !== viewsConstanst.enterKeyCode || !this.input.val()) return;
//     TodoList.create({ title: this.input.val() });
//     this.input.val();
//   }

//   static clearCompleted() {
//     _.each(TodoList.done(), todo => todo.clear);
//     return false;
//   }

//   toggleAllComplete() {
//     const done = this.allCheckbox.checked;
//     TodoList.each((todo) => { todo.save({ done }); });
//   }
// }

