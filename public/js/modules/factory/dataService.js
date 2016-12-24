app.factory('dataService',function() {
	'use strict';
	
	var userName="sande"; 
	var dataServices={};
	dataServices.setUserName=function(user){
        userName = user;
	} 
	dataServices.getUserName=function(){
		return userName;
	}
	
	return dataServices;
});