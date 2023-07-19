var database = firebase.database();


var myData = database.ref(`/main_page/`);

const formMap = {
  "main_url":"Main Picture",
  "slogan-title":"Content Title",
  "slogan-subtitle":"SubContent Title",
  "gdg-intro":"GDG Intro",
  "speaker-recruit":"recruit content"
}
let Preformat = ''

myData.on('value', function(snapshot) {

  let mainPageContent = snapshot.val();

  document.getElementById("pic_url").value = mainPageContent['main_url']
  document.getElementById("display-pic").style.backgroundImage = `url(${mainPageContent['main_url']})` 

  document.getElementById("slogan-title").value = mainPageContent['slogan-title']
  document.getElementById("displayed_slogan_title").innerHTML =  mainPageContent['slogan-title']

  document.getElementById("slogan-subtitle").value = mainPageContent['slogan-subtitle']
  document.getElementById("displayed_slogan_subtitle").innerHTML =  mainPageContent['slogan-subtitle']

  document.getElementById("gdg-intro").value = mainPageContent['gdg-intro']

})


const uploadMain = async()=> {
  let inputDict = {
    "main_url":document.getElementById("pic_url").value,
    "slogan-title":document.getElementById("slogan-title").value,
    "slogan-subtitle":document.getElementById("slogan-subtitle").value
  }

  try{
    await database.ref(`/main_page/`).update(inputDict);
    document.getElementById("message-title").innerHTML = `<i class="material-icons text-success me-2">check</i><span class="me-auto font-weight-bold">Update Success</span>
    <small class="text-body">just now</small>
    <i class="fas fa-times text-md ms-3 cursor-pointer" data-bs-dismiss="toast" aria-label="Close"></i>`
    document.getElementById("message-body").innerHTML = `'Main Picture' has been updated`
  }
  catch (error){
    document.getElementById("message-title").innerHTML = `<i class="material-icons text-danger me-2">campaign</i>
    <span class="me-auto font-weight-bold">Update Fail</span>
    <small class="text-body">just now</small>
    <i class="fas fa-times text-md ms-3 cursor-pointer" data-bs-dismiss="toast" aria-label="Close"></i>`
    document.getElementById("message-body").innerHTML = `'Main Picture' updated fail with:<br>${error}`

  }

};

const uploadIntroduce = async()=> {
  let inputDict = {
    "gdg-intro":document.getElementById("gdg-intro").value,
  }

  try{
    await database.ref(`/main_page`).update(inputDict);
    document.getElementById("message-title").innerHTML = `<i class="material-icons text-success me-2">check</i><span class="me-auto font-weight-bold">Update Success</span>
    <small class="text-body">just now</small>
    <i class="fas fa-times text-md ms-3 cursor-pointer" data-bs-dismiss="toast" aria-label="Close"></i>`
    document.getElementById("message-body").innerHTML = `'Intro Body Text' has been updated`
  }
  catch (error){
    document.getElementById("message-title").innerHTML = `<i class="material-icons text-danger me-2">campaign</i>
    <span class="me-auto font-weight-bold">Update Fail</span>
    <small class="text-body">just now</small>
    <i class="fas fa-times text-md ms-3 cursor-pointer" data-bs-dismiss="toast" aria-label="Close"></i>`
    document.getElementById("message-body").innerHTML = `'Intro Body Text' updated fail with:<br>${error}`

  }

};

document.getElementById("slogan-title").addEventListener("change", function() {
  document.getElementById("displayed_slogan_title").innerHTML =  this.value
})

document.getElementById("slogan-subtitle").addEventListener("change", function() {
  document.getElementById("displayed_slogan_subtitle").innerHTML =  this.value
})

document.getElementById("pic_url").addEventListener("change", function() {
  var thumbnailUrl = this.value;
  if(thumbnailUrl.length>0){
    document.getElementById("display-pic").style.backgroundImage = `url(${thumbnailUrl})` 
  }else{
    document.getElementById("display-pic").style.backgroundImage = `url(../../../assets/img/default.png)`
  }});