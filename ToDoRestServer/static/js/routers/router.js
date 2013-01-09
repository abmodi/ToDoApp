var app = app||{};

Router = Backbone.Router.extend({
	routes:{
		"*filter":'setFilter',
	},
	initialize: function(){
		console.log("Initializing Router");
		app.Todos = new app.TodoList();
		app.appView = new app.AppView({collection:app.Todos});
	},
	start: function(){
		Backbone.history.start();	
	},
	setFilter:function(filter){
		console.log("Set Filter" + filter);
		
		app.ToDoFilter = filter.trim() || '';

		app.Todos.trigger('filter');
	}
});

app.ToDoApp = new Router();

