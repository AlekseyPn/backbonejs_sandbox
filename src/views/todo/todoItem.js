import { View } from 'backbone';
import todoItemHtml from '@/partials/todo/todoItem.html';

class TodoView extends View {
  constructor(options) {
    super(options);
    this.template = _.template(todoItemHtml.html());
    this.events = {
      'click .toggle': 'toggleDone',
      'dbclick .view': 'edit',
      'click .remove': 'clear',
      'keypress .edit': 'updateOnEnter',
      'blur .edit': 'close',
    };
  }

  initialize() {
    this.model.bind('change', this.render, this);
    this.model.bind('destroy', this.remove, this);
  }

  render() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.toggleClass('done', this.model.get('done'));
  }

  toggleDone() {
    this.model.toggle();
  }
}

export default TodoView;
