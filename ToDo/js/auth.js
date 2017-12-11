window.addEventListener('load', function() { 
var timeBtn = document.getElementById('btn-time'); 
var timeSpan = document.getElementById('time-show'); 

timeBtn.addEventListener('click', function() { 
timeSpan.innerHTML = ''; 

getJSON('https://wt-49cfcc8687b2ed2922375dbd5af800ed-0.run.webtask.io/showTime',
function(err, data) { 
if (err !== null) { 
alert('Something went wrong: ' + err); 
} else { 
timeSpan.innerHTML = data.Time; 
} 
} 
); 
}); 

function getJSON (url, callback) { 
var httpRequest = new XMLHttpRequest(); 

httpRequest.open('GET', url, true); 
httpRequest.responseType = 'json'; 
httpRequest.onload = function() { 
var status = httpRequest.status; 
if (status === 200) { 
callback(null, httpRequest.response); 
} else { 
callback(status, httpRequest.response); 
} 
}; 

httpRequest.send(); 
}; 

});



$('.form').find('input, textarea').on('keyup blur focus', function (e) {

  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight');
			} else {
		    label.removeClass('highlight');
			}
    } else if (e.type === 'focus') {

      if( $this.val() === '' ) {
    		label.removeClass('highlight');
			}
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});

$('.tab a').on('click', function (e) {

  e.preventDefault();

  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');

  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();

  $(target).fadeIn(600);

});


document.querySelector('#log-in').addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();
  var email = document.querySelector('#email-log-in').value;
  var password = document.querySelector('#password-log-in').value
  var credential = firebase.auth.EmailAuthProvider.credential(email, password);
  var auth = firebase.auth();
  var currentUser = auth.currentUser;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert(error.message)
  });

});

document.querySelector('#sign-up').addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();
  var email = document.querySelector('#email-sign-up').value;
  var password = document.querySelector('#password-sign-up').value

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
});

firebase.auth().onAuthStateChanged(function(user) {
  window.user = user;
  if(window.user){
    location.href = 'index.html';
  }
});
