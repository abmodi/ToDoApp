var app = app||{};

app.TodoView = Backbone.View.extend({
	tagName: "li",
	template: _.template( $('#item-template').html() ),
	initialize:function(){
		console.log("view initialized");
		this.model.on("change",this.render,this);
		this.model.on("remove",this.remove,this);
		this.model.on("visible",this.visible,this);
	},
	events: {
		"click .toggle":"toggleCheckBox",
		"click button.destroy":"deleteToDo",
		"dblclick label":"editToDo",
		"blur .edit":"close",
		"keypress .edit":"updateOnEnter",
		"click button#star":"toggleStar"
	},

	toggleStar:function(){

		this.model.toggleStar();
		/*if(this.model.get("starred"))
		{
			$("#star").removeClass("starred").addClass("no-starred");
		}
		else
		{
			$("#star").removeClass("no-starred").addClass("starred");
		}*/
	},
	visible:function(){
		if(app.ToDoFilter == "active")
		{
			if(this.model.get("completed"))
				this.hide();
			else
				this.show();
		}
		else if(app.ToDoFilter == "completed")
		{
			if(!this.model.get("completed"))
				this.hide();
			else
				this.show();
		}
		else if(app.ToDoFilter == "starred")
		{
			if(this.model.get("starred"))
				this.show();
			else
				this.hide();
		}
		else
			this.show();
	},
	toggleCheckBox:function(){
		console.log("Check box toggled");
		this.$el.toggleClass('completed');
		this.model.toggleStatus();
		this.visible();
	},
	deleteToDo:function(){
		this.model.remove();
	},
	editToDo:function(){
		console.log("Editing");
		this.$el.addClass('editing');
		this.$('.edit').focus();
	},
	close:function(){
		
		this.$el.removeClass('editing');

	},
	updateOnEnter:function(e){
		if(e.which == 13)
		{
			this.$el.removeClass('editing');
			var newTitle = this.$('.edit').val().trim(); 	
			if(newTitle && (newTitle != this.model.get("title")))
			{
				console.log("Updating");
				this.model.set({"title":newTitle});
				this.model.save();
			}
		}

	},
	remove:function(){
		this.$el.remove();

	},
	hide:function(){
		this.$el.hide();
	},
	show:function(){
		this.$el.show();
	},
	render:function(){
		console.log("Rendering a single todo");
		this.$el.html(this.template(this.model.toJSON()));
		if(this.model.get("completed"))
			this.$el.addClass("completed");
		else
			this.$el.removeClass("completed");
		console.log("Finished: Rendering a single todo");
		return this;
	}
});