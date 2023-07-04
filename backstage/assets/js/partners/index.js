var database = firebase.database();

var myData = database.ref(`/partners`);

myData.on('value', function(snapshot) {

  let activityProfile = snapshot.val();
  var memberCount= activityProfile.length;
  let displayRows = ` <thead> <tr>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder align-middle">圖片</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 align-middle">標籤</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 align-middle">標題</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 align-middle">內文</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle">外部連結網址</th>
          <th class="text-center text-secondary opacity-7"></th>
        </tr></thead>` 

  let activityListKey = Object.keys(activityProfile)

  for(let i of activityListKey){
    

    displayRows += `
    <tr>
      <td>
        <div class="col-auto"  style="text-align: center;">
            <img src="${activityProfile[i].pic_url}" class="img-fluid shadow" style="max-height: 150px; width:150px">
          </div>
        </td>
        <td  style="text-align: center;">
          <span class='badge badge-pill badge-warning' style='background-color: ${activityProfile[i]['badge_color']}'>${activityProfile[i]['badge_title']}</span>
        </td>
        <td class="col text-center">
            <p class="h6 font-weight-bold mb-0">${activityProfile[i].title}</p>
        </td>
        <td style="width: 400px; white-space: pre-wrap;" class="ps-2">
        <p class=" font-weight-bold mb-0 h6">${activityProfile[i].description}</p>
        </td>
        <td class="col text-center">
          <a href="${activityProfile[i].link}" class="btn btn-outline-info " role="button" aria-pressed="true" target="_blank">外部連結</a>
        </td>
        <td class="col text-center" style="background-color:#f0f0f0">
            <a class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#modal-default" onclick="read(${i})" style="margin:0px 5px;">
              編輯
            </a>
            <a class="btn btn-outline-danger" data-bs-toggle="modal" onclick="deleteRow(${i})" style="margin:0px 5px;">
              刪除
            </a>
      </td>
    </tr>`
  }

document.getElementById('form-content').innerHTML = displayRows

})

const newMember = async(id)=> {
  document.getElementById('modal-title-default').innerText ="新增Partners"
  document.getElementById('badge_color').value ="#000000"
  document.getElementById('badge_title').value =""
  document.getElementById('pic_url').value =""
  document.getElementById('title').value =""
  document.getElementById('description').value =""
  document.getElementById('title').value =""
  document.getElementById('link').value =""
  document.getElementById('display-pic').setAttribute("src", '../../../assets/img/default.png'); 
  document.getElementById('update-content').setAttribute("onclick", `create()`); 
}

const read = async(id)=> {
  
  document.getElementById('modal-title-default').innerText ="修改Partners"

  try{
    const usersRef = database.ref(`/partners/${id}`);
    usersRef.once('value', (snapshot) => {
      let queryResult = snapshot.val();

      document.getElementById('badge_color').value ="#000000"
      document.getElementById('badge_title').value =""
      document.getElementById('pic_url').value =""
      document.getElementById('title').value =""
      document.getElementById('description').value =""
      document.getElementById('title').value =""
      document.getElementById('link').value =""
      document.getElementById('display-pic').setAttribute("src", '../../../assets/img/default.png'); 
      document.getElementById('update-content').setAttribute("onclick", `upload(${id})`); 

      if(queryResult.badge_color){
        document.getElementById('badge_color').value = queryResult.badge_color
      }
      if(queryResult.badge_title){
        document.getElementById('badge_title').value = queryResult.badge_title
      }
      if(queryResult.pic_url){
        document.getElementById('pic_url').value = queryResult.pic_url
        document.getElementById("display-pic").src =queryResult.pic_url
      }
      if(queryResult.title){
        document.getElementById('title').value = queryResult.title
      }
      if(queryResult.description){
        document.getElementById('description').value = queryResult.description
      }
      if(queryResult.link){
        document.getElementById('link').value = queryResult.link
      }
    });
  }
  catch (error){
    document.getElementById("message-title").innerHTML = `<i class="material-icons text-success me-2">check</i><span class="me-auto font-weight-bold">更新錯誤</span>
    <small class="text-body">剛剛</small><i class="material-icons text-warning me-2">travel_explore</i>`
  }
};

const deleteRow = async(id)=> {
  swal({
    title: "你確定要執行這項操作嗎?",
    text: "一旦刪除，將無法還原這位夥伴資訊!",
    icon: "warning",
    buttons: ["取消", "確定刪除"],
    dangerMode: true,
  })
  .then(async (willDelete) => {
    if (willDelete) {
      
      swal("這位夥伴資訊已被移除", {
        icon: "success",
      });
      database.ref(`/partners/${id}`).remove();
    } else {
      // swal("沒問題，沒有進行任何操作");
    }
  });

};

const create = async()=> {

  let inputDict = {
    badge_color:document.getElementById('badge_color').value,
    badge_title:document.getElementById('badge_title').value,
    pic_url : document.getElementById('pic_url').value?document.getElementById('pic_url').value:'',
    title : document.getElementById('title').value?document.getElementById('title').value:'',
    description : document.getElementById('description').value?document.getElementById('description').value:'',
    link : document.getElementById('link').value?document.getElementById('link').value:'',
  } 

  try{
    
    let memberCount = await myData.once('value')
    memberCount = JSON.parse(JSON.stringify(memberCount))
    console.log("memberCount"+memberCount)
    firebase.database().ref('/partners/' + Object.keys(memberCount).length).set(inputDict);

    document.getElementById('update-content').classList.remove("btn-dark")
    document.getElementById('update-content').classList.add("btn-success")
    document.getElementById('update-content').innerHTML = `修改成功`
    await sleep(3000);
    document.getElementById('update-content').classList.remove("btn-success")
    document.getElementById('update-content').classList.add("btn-dark")
    document.getElementById('update-content').innerHTML = `儲存更改`
    document.getElementById("update-content").disabled = false;
  }
  catch (error){
    document.getElementById('update-content').classList.remove("btn-dark")
    document.getElementById('update-content').classList.add("btn-danger")
    document.getElementById('update-content').innerHTML = `修改失敗`
    await sleep(3000);
    document.getElementById('update-content').classList.remove("btn-danger")
    document.getElementById('update-content').classList.add("btn-dark")
    document.getElementById('update-content').innerHTML = `儲存更改`
    document.getElementById("update-content").disabled = false;
  }
};

const upload = async(id)=> {

  let inputDict = {
    badge_color:document.getElementById('badge_color').value,
    badge_title:document.getElementById('badge_title').value,
    pic_url : document.getElementById('pic_url').value,
    title : document.getElementById('title').value,
    description : document.getElementById('description').value,
    link : document.getElementById('link').value
  }

  try{
    await database.ref(`/taipei/partners/${id}`).update(inputDict);
    document.getElementById('update-content').classList.remove("btn-dark")
    document.getElementById('update-content').classList.add("btn-success")
    document.getElementById('update-content').innerHTML = `修改成功`
    await sleep(3000);
    document.getElementById('update-content').classList.remove("btn-success")
    document.getElementById('update-content').classList.add("btn-dark")
    document.getElementById('update-content').innerHTML = `儲存更改`
    document.getElementById("update-content").disabled = false;
  }
  catch (error){
    document.getElementById('update-content').classList.remove("btn-dark")
    document.getElementById('update-content').classList.add("btn-danger")
    document.getElementById('update-content').innerHTML = `修改失敗`
    await sleep(3000);
    document.getElementById('update-content').classList.remove("btn-danger")
    document.getElementById('update-content').classList.add("btn-dark")
    document.getElementById('update-content').innerHTML = `儲存更改`
    document.getElementById("update-content").disabled = false;
  }

};

document.getElementById("pic_url").addEventListener("change", function() {
  var thumbnailUrl = this.value;
  if(thumbnailUrl.length>0){
    document.getElementById("display-pic").src = thumbnailUrl
  }else{
    document.getElementById("display-pic").src = "../../assets/img/default.png"
  }});