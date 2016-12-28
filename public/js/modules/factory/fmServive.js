

app.service("fmService",["$http","$rootScope", 
                           function($http, $rootScope) {
	'use strict';
    
    console.log('fmService started.. -->');
	
                               
//    var appFM = {};
    var fmService = {};
    fm.util.addOnLoad(function (){
            
             // Create new App.
            var appFM = new App();
            
            console.log('fm.util.addOnLoad -->');
            
            var startSignalling = function()
            {
                appFM.startSignalling(function(error)
                {
                    if (error != null)
                    {
                        alert(error);
                    }
                    else
                    {
                        // Stop signalling when the page unloads.
                        fm.util.observe(window, 'unload', function()
                        {
                            stopSignalling();
                        });
                    }
                });
            };
            
            var stopSignalling = function()
            {
                appFM.stopSignalling(function(error)
                {
                    if (error != null)
                    {
                        alert(error);
                    }
                });
            };
            
            
            var startLocalMedia = function()
            {
                var video = document.getElementById('videoID');
                appFM.startLocalMedia(video, false, function(error)
                {
                    
                    if (error != null)
                    {
                        alert(error);
                    }
                    else
                    {
                        // Enable the media controls.
//                        toggleAudioMute.removeAttribute('disabled');
//                        toggleVideoMute.removeAttribute('disabled');

                        // Stop local media when the page unloads.
                        fm.util.observe(window, 'unload', function()
                        {
                            stopLocalMedia();
                        });
                        
                        // Hide the loading indicator.
//                        loading.style.display = 'none';

                        // Show the video feed(s).
//                        video.style.display = 'block';

                        // Start conference now that the local media is available.
                        startConference();
                    }
                });
            };
            
             var stopLocalMedia = function()
            {
                appFM.stopLocalMedia(function(error)
                {
                    if (error != null)
                    {
                        alert(error);
                    }
                    else
                    {
                        // Disable the media controls.
//                        toggleAudioMute.setAttribute('disabled', 'disabled');
//                        toggleVideoMute.setAttribute('disabled', 'disabled');
                    }
                });
            };
            
            var startConference = function()
            {
                appFM.startConference(function(error)
                {
                    if (error != null)
                    {
                        alert(error);
                    }
                    else
                    {
                        // Enable the leave button.
//                        leaveButton.removeAttribute('disabled');

                        // Stop conference when the page unloads.
                        fm.util.observe(window, 'unload', function()
                        {
                            stopConference();
                        });
                    }
                });
            };
            
            var stopConference = function()
            {
                appFM.stopConference(function(error)
                {
                    if (error != null)
                    {
                        alert(error);
                    }
                    else
                    {
                        // Disable the leave button.
//                        leaveButton.setAttribute('disabled', 'disabled');
                    }
                });
            };
            
            var switchToVideoChat = function(sessionId)
            {
                if (sessionId.length == 6)
                {
                    appFM.sessionId = sessionId;

                    fm.log.info('Session ID: <span style="font-size: 1.5em;">' + app.sessionId + '</span>');

//                    location.hash = app.sessionId + '&screen=' + (false? '1' : '0');

                    // Show the video chat.
//                    videoChat.style.display = 'block';

                    // Hide the session selector.
//                    sessionSelector.style.display = 'none';

                    // Start local media.
                    startLocalMedia();
                }
                else
                {
                    alert('Session ID must be 6 digits long.');
                }
            };
            
            var toggle = false;
            
            fmService.startVideoChat = function(sessionID) {
                
                var session  = ''+ sessionID;
               
                if ( toggle ) {
                    
                    stopLocalMedia();
                    stopConference();
                    
                }else {
                    console.log('videoChat started: '+ session + ' len '+ session.length);
                    switchToVideoChat(session);
                }
                
                toggle = !toggle;
                
            };
            
            // Ready? Start signalling when the page loads.
            startSignalling();
  
        });
                               
    return fmService;
}]);
    