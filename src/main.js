import Backbone,{Router, View} from 'backbone'
let AppState = {
    username: ""
}
const Names = ['billy', 'dilly', 'willy']
let Views = {

}
class AppRouter extends Router {
    constructor() {
        super()
    }
    get routes () {
        return {
            '': 'start', // Пустой hash-тэг
            '!/': 'start', // Начальная страница
            '!/success': 'success', // Блок удачи
            '!/error': 'error'
        }
    }
    start() {
        if (Views.start !== null) {
            Views.start.render()
        }
    }

    success() {
        if (Views.success !== null) {
            Views.success.render()
        }
    }

    error() {
        if (Views.error !== null) {
            Views.error.render()
        }
    }
}

class Start extends View {
    get el () {
        return $('#app')
    }
    get template() {
        return _.template($('#start').html())
    }
    get events () {
        return {
            "click #handler": "check"
        }
    }
    check() {        
        AppState.username = $(this.el).find("input:text").val();
        if (_.detect(Names, (name) => name === AppState.username)) // Проверка имени пользователя
            appRouter.navigate('!/success', true); // переход на страницу success
        else
            appRouter.navigate('!/error', true); // переход на страницу error
    }

    render() {
        $(this.el).html(this.template());
    }
}

class ErrorTemplate extends View {
    get el() {
        return $('#app')
    }
    get template() {
        return _.template($('#error').html())
    }   
    render() {
        $(this.el).html(this.template(AppState));
    }
}
class Success extends View {    
    get el() {
        return $('#app')
    }
    get template() {
        return _.template($('#success').html())
    }
    render() {
        $(this.el).html(this.template(AppState));
    }
}
Views = {
    start: new Start(),
    error: new ErrorTemplate(),
    success: new Success()
}
let appRouter = new AppRouter()
Backbone.history.start()