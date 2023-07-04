var database = firebase.database();

var myData = database.ref(`/main_page`);

myData.on('value', function(snapshot) {

  var mainPageContent = snapshot.val();
  
  document.getElementById("slogan-title").innerHTML = mainPageContent['slogan-title']
  document.getElementById("slogan-subtitle").innerHTML = mainPageContent['slogan-subtitle']
  document.getElementById("gdg-intro").innerHTML = mainPageContent['gdg-intro']
  document.getElementById("main-banner").style.backgroundImage = `url(${mainPageContent['main_url']})`;

})