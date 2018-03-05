const todoStats = `{{#done}}
  <button id="clear-completed" class="todo__clear">
    Clear {{#done}} completed {{donePlurals}} {{/done}}
  </button>
  {{/done}}
  <div class="todo__count">
    {{remaining}}
    {{remainingPlurals}}
  </div>`;
export default todoStats;

