var app = app||{};

app.AppView = Backbone.View.extend({
	el: 'body',
	statsTemplate: _.template( $('#stats-template').html() ),
	initialize:function(){
		this.collection.on('add',this.addOne, this);
		this.collection.on('reset',this.addAll, this);
		this.collection.on('remove',this.remove, this);
		this.collection.on('filter',this.setFilter,this);
		this.collection.on('all',this.render,this);
		this.input = this.$("#new-todo");
		this.collection.fetch();

	},
	events:{
		"keypress #new-todo":"createOnEnter",
		"click #toggle-all":"toggleAll",
		"click #clear-completed":"deleteAllCompleted",
	},
	deleteAllCompleted:function(){
		this.collection.each(function(todo){
			if(todo.get("completed"))
				todo.remove();
			});
	},
	setFilter:function(){
		console.log('filter called'+ app.ToDoFilter);
		this.filterAll();

	},
	filterAll:function(){
		this.collection.each(this.filterOne,this);
	},
	filterOne:function(todo){
		todo.trigger('visible');
	},
	createOnEnter:function(e){
		console.log("Create On Enter");
		if(e.which == 13 && $("#new-todo").val().trim())
		{
			//this.collection.create({"title":$("#new-todo").val(),"completed":false,"starred":false,"id":(this.collection.length+1)});
			var newModel = new app.Todo({"title":$("#new-todo").val(),"completed":false,"starred":false});
			newModel.save({},{
				success:function(model,response){
					console.log("Success");
					console.log(response);
					newModel.set({"id":response});
					}});
			this.collection.add(newModel);
			$("#new-todo").val("");
		}
	},
	toggleAll:function(e){
		console.log("Toggled All");
		var completed = $("#toggle-all")[0].checked;
		console.log(completed);
		this.collection.each(function(todo){
			todo.set({"completed":completed});
			todo.save();
		});
	},
	render:function(){
		console.log("Rendering all todos");
		
		//this.collection.forEach(this.addOne,this);
		var completed = this.collection.completed().length;
		var remaining = this.collection.remaining().length;
		if(this.collection.length)
		{
			$("#main").show();
			$("#footer").show();
			$("#footer").html(this.statsTemplate({"completed":completed,"remaining":remaining}));
			this.$('#filters li a').removeClass('selected')
			.filter('[href="#/' + ( app.ToDoFilter || '' ) + '"]')
			.addClass('selected');
		}
		else
		{
			$("#footer").hide();
			$("#main").hide();
		}
			
	},
	addAll:function(){
		$("#todo-list").html("");
		this.collection.each(this.addOne,this);	
	},
	addOne:function(todoItem){
		console.log("Adding Item");
		var todoView = new app.TodoView({model:todoItem});
		console.log(todoView);
		todoView.render();
		$('#todo-list').append(todoView.el);
	},
	remove:function(todoItem){
		
	}

});

