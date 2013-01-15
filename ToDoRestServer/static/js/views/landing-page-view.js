app = app||{};

app.LandingPageView = Backbone.View.extend({
template: _.template($('#landing-page-template').html()),
events:{
	"click #sign-in-submit":"signin",
	"click #sign-up-submit":"signup"
},
signin:function(e){
	e.preventDefault();
	console.log("Signing In");
	var username = $('#signin-username').val();
	var password = $('#signin-password').val();
	var thisClass = this;
	$.ajax('/api/session',{type:'post',data:{'username':username,'password':password},
	success:function(result){
		console.log("Success");
		console.log(result);
		var obj = JSON.parse(result);
		if(obj.success)
			app.ToDoApp.navigate('#content',{trigger:true});
		else
			thisClass.render(obj.error);	
	},
	error:function(response){
		thisClass.render("Cannot connect to the server");
		console.log("Error");
	}
	});
},
signup:function(e){
	e.preventDefault();
	console.log("Signing Up");
	var username = $('#signup-username').val();
	var password = $('#signup-password').val();
	var email = $('#signup-email').val();
	var thisClass = this;
	$.ajax('/api/session/signup',{type:'post',data:{'username':username,'password':password,'email':email},
	success:function(result){
		var obj = JSON.parse(result);
		if(obj.success)
			app.ToDoApp.navigate('#content',{trigger:true});
		else
			thisClass.render(obj.error);	
	},
	error:function(response){
		thisClass.render("Cannot connect to the server");
		console.log("Error");
	}
	});
},
initialize:function(){
},
render:function(error){
	$('.ui-page-active').removeClass('ui-page-active').addClass('hidden');
	this.setElement("#landing-page");
	if (error === undefined)
		error = '';
	this.$el.empty().html(this.template({error:error})).removeClass('hidden');
	this.$el.addClass('ui-page-active');
	return this;
}
});