import TodoApp from './views/todo/todo';

$(() => {
  const App = new TodoApp();
  return App;
});
// import Backbone, {
//   Router,
//   View,
//   Model,
//   Collection,
// } from 'backbone';

// class AppState extends Model {
//   constructor(defaults) {
//     super(defaults = {
//       username: '',
//       state: 'start',
//     });
//   }
// }
// class AppRouter extends Router {
//   constructor(options) {
//     super(options);
//     this.routes = {
//       '': 'start', // Пустой hash-тэг
//       '!/': 'start', // Начальная страница
//       '!/success': 'success', // Блок удачи
//       '!/error': 'error',
//     };
//   }
//   start() {
//     if (Views.start !== null) {
//       appState.set({
//         state: 'start',
//       });
//     }
//   }

//   success() {
//     if (Views.success !== null) {
//       appState.set({
//         state: 'start',
//       });
//     }
//   }

//   error() {
//     if (Views.error !== null) {
//       appState.set({
//         state: 'start',
//       });
//     }
//   }
// }
// class AppViews extends View {
//   constructor(options) {
//     super(Object.assign({}, options, {
//       el: $('#app'),
//       events: {
//         'click #handler': 'check',
//       },
//     }));
//     this.templates = {
//       start: _.template($('#start').html()),
//       error: _.template($('#error').html()),
//       success: _.template($('#success').html()),
//     };
//   }
//   initialize() {
//     this.model.bind('change', this.render, this);
//   }
//   render() {
//     const state = this.model.get('state');
//     $(this.el).html(this.templates[state](this.model.toJSON()));
//     return this;
//   }
//   check() {
//     const username = $(this.el).find('input:text').val();
//     const state = FamilyCollection.checkUser(username) ? 'success' : 'error';
//     appState.set({
//       username,
//       state,
//     });
//   }
// }

// class UserNameModel extends Model {
//   constructor(options) {
//     super(Object.assign({}, options, {
//       defaults: {
//         Name: '',
//       },
//     }));
//   }
// }
// class Family extends Collection {
//   constructor(options) {
//     super(options);
//     this.model = new UserNameModel();
//   }

//   checkUser(username) {
//     return this.find(user => user.get('Name') == username) !== null;
//   }
// }
// let appState = new AppState();
// const appRouter = new AppRouter();
// const appViews = new AppViews({
//   model: appState,
// });
// const familyList = [{
//   Name: 'Bob',
// },
// {
//   Name: 'Patrick',
// },
// {
//   Name: 'Elza',
// },
// ];
// let FamilyCollection = new Family(familyList);
// appState.trigger('change');
// appState.bind('change:state', function (options) {
//   const state = this.get(state);
//   appRouter.navigate(`!/${state == 'start' ? '' : state}`, false);
// });
// Backbone.history.start();
