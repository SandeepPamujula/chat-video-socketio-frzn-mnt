app.factory('sharedService', function($rootScope) {
    var sharedService = {};

    sharedService.message = '';

    sharedService.prepForBroadcast = function(msg) {
        this.message = msg;
        this.broadcastItem();
    };

    sharedService.broadcastItem = function() {
        $rootScope.$broadcast('chat-user');
    };
    
    sharedService.broadcastLoginUsers = function (users) {
      this.loginUsers = users;
        console.log('broadcastLoginUsers');
      $rootScope.$broadcast('login-users');
    };
    
    sharedService.broadcastOnlineUsers = function (users) {
      this.onlineUsers = users;  
      $rootScope.$broadcast('online-users');
    };
    
    sharedService.broadcastVideoChat = function (videoData) {
      this.videoData = videoData;  
      $rootScope.$broadcast('online-video');
    };
    
    
    
    

    return sharedService;
});