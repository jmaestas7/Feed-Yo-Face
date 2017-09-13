  $(document).ready(function() {
    //populate random joke in footer
    //getJoke();
    //  ***Materialize functions***
    $('select').material_select();
    // Initialize collapsible 
    $('.collapsible').collapsible();
    //Select dropdown
    $('select').material_select();
    $(".dropdown-menu option").click(function() {
      unit = $(this).text();
      console.log(unit);
      $("#form-unit").text($(this).text());
      /*$("#dropdownMenu2").val($(this).text());*/
    });
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDcSoFHFVxxSGxGB6X9-5IDLh5J8wFPE4I",
      authDomain: "feed-yo-face.firebaseapp.com",
      databaseURL: "https://feed-yo-face.firebaseio.com",
      projectId: "feed-yo-face",
      storageBucket: "feed-yo-face.appspot.com",
      messagingSenderId: "914699222318"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    //user info
    database.ref().push({
      users: {
        user: {
        ingredient: "milk",
        quantity: 1,
        unit: "Gallon"
        }
      }
    })

    //Firebase Authentication
    // CHECK CURRENT PATH
    var currentPath = $(location)[0].pathname;
    // CHECK IF USER IS SIGNED IN
    firebase.auth().onAuthStateChanged(function(user) {
      if (user && (currentPath === '/signInPage.html' || currentPath === '/')) {
        // REDIRECT IF AUTHENTICATED
        $(location).attr('href', 'index.html');
      } else if (!user && currentPath === '/index.html') {
        // REDIRECT IF NOT AUTHENTICATED
        $(location).attr('href', 'signInPage.html');
      }
    });
    // SIGN IN THE USER
    $('#logIn').on('click', function() {
      console.log("clicked log in");
      $("#error").empty();
      var email = $('#email').val().trim();
      var password = $('#password').val().trim();
      if (email && password) {
        // ADD USER TO DATABASE
        firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
          $(location).attr('href', 'index.html');
        }).catch(function(error) {
          $("#error").html("ERROR: " + error.message);
        });
      }
    });
    // SIGN UP THE USER
    $('#signUp').on('click', function() {
      console.log("clicked Sign Up");
      $("#error").empty();
      var email = $('#email').val();
      var password = $('#password').val();
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
        var userID = firebase.auth().currentUser.uid;
        database.ref().push({
          userID: "blah"
        })
        $(location).attr('href', 'index.html');
      }).catch(function(error) {
        $("#error").html("ERROR: " + error.message);
      });
    });
  });