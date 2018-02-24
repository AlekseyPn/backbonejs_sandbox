import Backbone, {
    Router,
    View,
    Model,
    Collection
} from 'backbone'
function props(value) {
    return function decorator(target) {
        _.extend(target.prototype, value);
    }
}
class AppState extends Model {
    constructor(defaults) {
        super(
            defaults = {
                username: '',
                state: 'start'
            }
        )
    }

}
const Names = ['billy', 'dilly', 'willy']
let Views = {

}
class AppRouter extends Router {
    constructor(options) {
        super(options)
        this.routes = {
            '': 'start', // Пустой hash-тэг
            '!/': 'start', // Начальная страница
            '!/success': 'success', // Блок удачи
            '!/error': 'error'
        }
    }
    start() {
        if (Views.start !== null) {
            appState.set({
                state: 'start'
            })
        }
    }

    success() {
        if (Views.success !== null) {
            appState.set({
                state: 'start'
            })
        }
    }

    error() {
        if (Views.error !== null) {
            appState.set({
                state: 'start'
            })
        }
    }
}
class AppViews extends View {
    constructor(options) {
        super(Object.assign({}, options, {
            el: $('#app'),
            events: {
                "click #handler": "check"
            }
        }))
        this.templates = {
            start: _.template($('#start').html()),
            error: _.template($('#error').html()),
            success: _.template($('#success').html())
        }
    }
    initialize() {
        this.model.bind('change', this.render, this)
    }
    render() {
        let state = this.model.get('state')
        $(this.el).html(this.templates[state](this.model.toJSON()))
        return this
    }
    check() {
        let username = $(this.el).find("input:text").val();
        let state = FamilyCollection.checkUser(username) ? 'success' : 'error'
        appState.set({
            username,
            state
        })
    }
}

class UserNameModel extends Model {
    constructor(options) {
        super(Object.assign({},options,{            
            defaults: {
                'Name': ''
            }
        }))
    }
}
class Family extends Collection {
    constructor(options) {
        super(options)
        this.model = new UserNameModel()
    }

    checkUser(username) {
        return this.find((user) => user.get('Name') == username) !== null
    }
}
let appState = new AppState()
let appRouter = new AppRouter()
let appViews = new AppViews({
    model: appState
})
let familyList = [{
        Name: 'Bob'
    },
    {
        Name: 'Patrick'
    },
    {
        Name: 'Elza'
    }
]
let FamilyCollection = new Family(familyList)
appState.trigger('change')
appState.bind('change:state', function(options) {
    let state = this.get(state)
    appRouter.navigate(`!/${state == 'start' ? '' : state}`, false)
})
Backbone.history.start()