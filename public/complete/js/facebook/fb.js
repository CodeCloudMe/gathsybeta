//enter your API Key here (between the "")

  var fbAPIKey="1467628250149883";

  //array that will store our first Facebook response with the user's info
  var response1;

  //array that will store our second facebook response with the user's photos
  var response2;


  //function that will authenticate the user via Faabook, calling to the FB object
  function loginUser() {    
     FB.login(function(response) { }, {scope:'email, user_photos'});     
     }

     // FB object initialization
  window.fbAsyncInit = function() {
    FB.init({
      appId      : fbAPIKey, // App ID
      channelUrl : 'http://skyfall.club', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });

    FB.Event.subscribe('auth.statusChange', handleStatusChange);
  };

  // Load the SDK Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "http://connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));

 
    //callback function of the status change from not logged in to logged in
   function handleStatusChange(response) {
     document.body.className = response.authResponse ? 'connected' : 'not_connected';

     if (response.authResponse) {
      console.log(response);
      response1= response;
      updateUserInfo(response);
      

     }
   }


   

   function updateUserInfo(response) {
     FB.api('/me', function(response) {
      response1 = response;

      //add user's email to input field
      $('#form-email, #form-emailTop').val(response1['email']);

      //submit form after 1.5 seconds (show user their e-mail before sending)
      setTimeout(function(){

          $('#sendBut').click();
      }, 1500);
    

      //here we will create a table displaying our user's information
      // Hint: $('#someDivId').html('<table><tr><td></td><td></td></tr></table>');

      /*
     $('#DivId').html('<table id="tableId">')
     for(i in response1){

      key = i;
      value= response1[i];
     $('#DivId').append('<tr><td>'+ key+ '</td><td>'+ value + '</td></tr>') 

     }
 $('#DivId').append('</table>')
 */


     });

      FB.api('/me/photos', function(response) {
      response2= response;
      //here we will create a table displaying our user's information
      // Hint: $('#someDivId').html('<table><tr><td></td><td></td></tr></table>');
      

     });

   }


   

 
