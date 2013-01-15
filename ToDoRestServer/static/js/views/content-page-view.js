app = app||{};

app.ContentPageView = Backbone.View.extend({
template: _.template($('#content-page-template').html()),
initialize:function(){
	
},
render:function(){
	$('.ui-page-active').removeClass('ui-page-active').addClass('hidden');
	this.setElement("#content-page");
	this.$el.empty().html(this.template());
	this.$el.addClass('ui-page-active').removeClass('hidden');
	if (app.Todos == null) 
		app.Todos = new app.TodoList();
	if (app.appView == null)
		app.appView = new app.AppView({collection:app.Todos});
	return this;
}
});