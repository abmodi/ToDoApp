var app = app||{};

app.TodoList = Backbone.Collection.extend({
	model:app.Todo,
	url:'/api/todos',
	completed:function(){
		return this.filter(function(todo){
			return todo.get("completed");
			});
	},
	remaining:function(){
		return this.filter(function(todo){
			return !todo.get("completed");
		});
	}
		
});
