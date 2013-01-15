var app = app||{};

Router = Backbone.Router.extend({
	routes:{
		"":'index',
		"content":'content',
		"content/*filter":'setFilter'
	},
	initialize: function(){
		console.log("Initializing Router");
		app.landingPageView = new app.LandingPageView();
		app.contentPageView = new app.ContentPageView();
	},
	start: function(){
		Backbone.history.start();
		
	},
	index:function(){
		app.landingPageView.render();
	},
	content:function(){
		app.contentPageView.render();
	},
	setFilter:function(filter){
		console.log("Set Filter" + filter);
		
		app.ToDoFilter = filter.trim() || '';

		app.Todos.trigger('filter');
	}
});

app.ToDoApp = new Router();

