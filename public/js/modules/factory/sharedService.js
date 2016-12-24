app.factory('sharedService', function($rootScope) {
    var sharedService = {};

    sharedService.message = '';

    sharedService.prepForBroadcast = function(msg) {
        this.message = msg;
        this.broadcastItem();
    };

    sharedService.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };
    
    sharedService.broadcastOnlineUsers = function (users) {
      this.onlineUsers = users;  
      $rootScope.$broadcast('online-users');
    };
    

    return sharedService;
});