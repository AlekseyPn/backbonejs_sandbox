import {
  View,
} from 'backbone';
import todoItem from '@/partials/todo/todoItem';
import Mustache from 'mustache';
import viewsConstanst from './viewsConstanst';

export default View.extend({
  tagName: 'li',
  events: {
    'click .todo__toggle': 'toggleDone',
    'dbclick .todo__view': 'edit',
    'click .todo__remove': 'clear',
    'keypress .todo__edit': 'updateOnEnter',
    'blur .todo__edit': 'close',
  },
  template: todoItem,
  initialize() {
    this.input = '';
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  },
  render() {
    this.input = this.$('new-todo');
    this.$el.html(Mustache.render(this.template, this.model.toJSON()));
    this.$el.toggleClass('done', this.model.get('done'));
    return this;
  },

  toggleDone() {
    this.model.toggle();
  },

  edit() {
    debugger;
    this.$el.addClass('editing');
    this.input.focus();
  },

  close() {
    const title = this.input.val();
    if (!title) this.clear();
    this.model.save({ title });
    this.$el.removeClass('editing');
  },

  updateOnEnter(e) {
    if (e.keyCode === viewsConstanst.enterKeyCode) this.close();
  },

  clear() {
    this.model.clear();
  },

});
// class TodoView extends View {
//   constructor(options) {
//     _.defaults(options, {
//       tagName: 'li',
//       events: {
//         'click .toggle': 'toggleDone',
//         'dbclick .view': 'edit',
//         'click .remove': 'clear',
//         'keypress .edit': 'updateOnEnter',
//         'blur .edit': 'close',
//       },
//     });
//     super(options);
//     this.template = todoItem;
//     this.input = '';
//     this.listenTo(this.model, 'change', this.render);
//     this.listenTo(this.model, 'destroy', this.remove);
//   }

//   render() {
//     this.input = this.$('new-todo');
//     this.$el.html(Mustache.render(this.template, this.model.toJSON()));
//     this.$el.toggleClass('done', this.model.get('done'));
//     return this;
//   }

//   toggleDone() {
//     this.model.toggle();
//   }

//   edit() {
//     this.$el.addClass('editing');
//     this.input.focus();
//   }

//   close() {
//     const title = this.input.val();
//     if (!title) this.clear();
//     this.model.save({ title });
//     this.$el.removeClass('editing');
//   }

//   updateOnEnter(e) {
//     if (e.keyCode === viewsConstanst.enterKeyCode) this.close();
//   }

//   clear() {
//     this.model.clear();
//   }
// }

