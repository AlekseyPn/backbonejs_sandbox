const todoItem = `<div class="todo__view">
    <label>{{title}}</label>
    <input type="checkbox" class="todo__toggle" {{#done}}checked="checked"{{/done}}>
    <button class="todo__remove">delete item</button>
  </div>
  <input type="text" class="todo__edit" value="{{title}}">`;
export default todoItem;
