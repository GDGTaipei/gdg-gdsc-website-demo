var database = firebase.database();


var myData = database.ref(`/main_page/`);

const formMap = {
  "main_url":"主頁視覺圖片",
  "slogan-title":"標題",
  "slogan-subtitle":"副標題",
  "gdg-intro":"GDG 介紹文案",
  "speaker-recruit":"招募文宣"
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
    document.getElementById("message-title").innerHTML = `<i class="material-icons text-success me-2">check</i><span class="me-auto font-weight-bold">更新成功</span>
    <small class="text-body">剛剛</small>
    <i class="fas fa-times text-md ms-3 cursor-pointer" data-bs-dismiss="toast" aria-label="Close"></i>`
    document.getElementById("message-body").innerHTML = `「主視覺」的內容已更新`
  }
  catch (error){
    document.getElementById("message-title").innerHTML = `<i class="material-icons text-danger me-2">campaign</i>
    <span class="me-auto font-weight-bold">更新錯誤</span>
    <small class="text-body">剛剛</small>
    <i class="fas fa-times text-md ms-3 cursor-pointer" data-bs-dismiss="toast" aria-label="Close"></i>`
    document.getElementById("message-body").innerHTML = `「主視覺」內容失敗:<br>${error}`

  }

};

const uploadIntroduce = async()=> {
  let inputDict = {
    "gdg-intro":document.getElementById("gdg-intro").value,
  }

  try{
    await database.ref(`/main_page`).update(inputDict);
    document.getElementById("message-title").innerHTML = `<i class="material-icons text-success me-2">check</i><span class="me-auto font-weight-bold">更新成功</span>
    <small class="text-body">剛剛</small>
    <i class="fas fa-times text-md ms-3 cursor-pointer" data-bs-dismiss="toast" aria-label="Close"></i>`
    document.getElementById("message-body").innerHTML = `「介紹內文」的內容已更新`
  }
  catch (error){
    document.getElementById("message-title").innerHTML = `<i class="material-icons text-danger me-2">campaign</i>
    <span class="me-auto font-weight-bold">更新錯誤</span>
    <small class="text-body">剛剛</small>
    <i class="fas fa-times text-md ms-3 cursor-pointer" data-bs-dismiss="toast" aria-label="Close"></i>`
    document.getElementById("message-body").innerHTML = `「介紹內文」內容失敗:<br>${error}`

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