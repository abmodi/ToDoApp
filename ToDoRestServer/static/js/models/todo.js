var app = app||{};

app.Todo = Backbone.Model.extend({
	defaults:{
	title:'',
	completed:false,
	starred:false	
	},
	urlRoot:'/api/todos',
	toggleStatus:function(){
		if(this.get("completed"))
		{
			this.set({"completed":false});
		}
		else
		{
			this.set({'completed':true});
		}
		this.save();
	},
	remove:function(){
		this.destroy();
	}
});

