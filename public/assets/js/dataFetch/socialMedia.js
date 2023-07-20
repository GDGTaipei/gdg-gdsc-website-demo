var database = firebase.database();

var myData = database.ref(`/social_networks`);

let displayRows = ''
let MediaSortList = [
  "mail",
  "youtube",
  "facebook",
  "instagram",
  "twitter",
  "plurk",
  "LINE",
  "Telegram",
  "discord",
  "linkedIn"
]


myData.on('value', function(snapshot) {

  var socialMediaList = snapshot.val();

  

  for(let item of MediaSortList){

    let value = socialMediaList[item]

      if(!value.href.length>0){
        continue
      }
      displayRows += ` <a target="_blank" href="${item==="mail"?'mailto:'+value.href:value.href}">
      <button target="_blank" rel="nofollow" class="btn btn-icon-only rounded-circle btn-twitter"
          data-toggle="tooltip" data-original-title="${value.originalTitle}"
          style="background-color: ${value.backgroundColor}; border-color: ${value.borderColor};">
          ${value.icon}
      </button>
    </a>`
  }
  document.getElementById("social_media_list").innerHTML = displayRows
})