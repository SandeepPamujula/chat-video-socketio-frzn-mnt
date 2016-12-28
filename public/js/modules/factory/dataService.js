app.factory('dataService',function() {
	'use strict';
	
	var userName=""; 
	var dataServices={};
	dataServices.setUserName=function(user){
        userName = user;
	} 
	dataServices.getUserName=function(){
		return userName;
	}
	
	return dataServices;
});