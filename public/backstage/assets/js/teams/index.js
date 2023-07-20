var database = firebase.database();

var myData = database.ref(`/team`);

myData.on('value', function(snapshot) {

  let teamBioProfile = snapshot.val();
  var memberCount= teamBioProfile.length;
  let displayRows = ` <thead> <tr>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder align-middle">Picture</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 align-middle">First Name</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle">Last Name</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle">Title</th>
          <th class="text-center text-secondary opacity-7"></th>
        </tr></thead>` 

  let teamBioListKey = Object.keys(teamBioProfile)

  for(let i of teamBioListKey){
    

    displayRows += `
    <tr>
      <td>
        <div class="col-auto"  style="text-align: center;">
            <img src="${teamBioProfile[i].thumbnail_url?teamBioProfile[i].thumbnail_url:'https://firebasestorage.googleapis.com/v0/b/gdg-taipei.appspot.com/o/default.png?alt=media&token=fac51832-95db-4bff-91b1-f1585cc6b652'}" class="avatar avatar-sm me-3">
          </div>
        </td>
        <td class="col text-center">
            <p class="text-xs font-weight-bold mb-0">${teamBioProfile[i].first_name}</p>
        </td>
        <td class="col text-center">
            <p class="text-xs font-weight-bold mb-0">${teamBioProfile[i].last_name}</p>
        </td>
        <td class="col text-center">
          <p class="text-xs font-weight-bold mb-0">${teamBioProfile[i].title}</p>
        </td>
        <td class="col text-center">
          <a class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#modal-default" onclick="read(${i})" style="margin:0px 5px;">
            Edit
          </a>
          <a class="btn btn-outline-danger" data-bs-toggle="modal" onclick="deleteRow(${i})" style="margin:0px 5px;">
            Delete
          </a>
      </td>
    </tr>`
  }

document.getElementById('form-content').innerHTML = displayRows

})

const newMember = async(id)=> {
  document.getElementById('modal-title-default').innerText ="新增團隊成員"
  document.getElementById('pic_url').value =""
  document.getElementById('first_name').value =""
  document.getElementById('last_name').value =""
  document.getElementById('title').value =""
  document.getElementById('display-pic').setAttribute("src", 'https://firebasestorage.googleapis.com/v0/b/gdg-taipei.appspot.com/o/default.png?alt=media&token=fac51832-95db-4bff-91b1-f1585cc6b652'); 
  document.getElementById('update-content').setAttribute("onclick", `create()`); 
}

const read = async(id)=> {
  
  document.getElementById('modal-title-default').innerText ="修改團隊成員"

  try{
    const usersRef = database.ref(`/team/${id}`);
    usersRef.once('value', (snapshot) => {
      let queryResult = snapshot.val();
      
      document.getElementById('pic_url').value =""
      document.getElementById('first_name').value =""
      document.getElementById('last_name').value =""
      document.getElementById('title').value =""
      document.getElementById('display-pic').setAttribute("src", 'https://firebasestorage.googleapis.com/v0/b/gdg-taipei.appspot.com/o/default.png?alt=media&token=fac51832-95db-4bff-91b1-f1585cc6b652'); 
      document.getElementById('update-content').setAttribute("onclick", `upload(${id})`); 


      if(queryResult.thumbnail_url){
        document.getElementById('pic_url').value = queryResult.thumbnail_url
        document.getElementById('display-pic').setAttribute("src",document.getElementById('pic_url').value ); 
      }
      if(queryResult.first_name){
        document.getElementById('first_name').value = queryResult.first_name
      }
      if(queryResult.last_name){
        document.getElementById('last_name').value = queryResult.last_name
      }
      if(queryResult.title){
        document.getElementById('title').value = queryResult.title
      }
    });
  }
  catch (error){
    document.getElementById("message-title").innerHTML = `<i class="material-icons text-success me-2">check</i><span class="me-auto font-weight-bold">Update Fail</span>
    <small class="text-body">just now</small><i class="material-icons text-warning me-2">travel_explore</i>`
  }
};

const deleteRow = async(id)=> {
  swal({
    title: "Are you sure you want to perform this action?",
    text: "一旦Delete，將無法還原這個成員資訊!",
    icon: "warning",
    buttons: ["Cancel", "Confirm"],
    dangerMode: true,
  })
  .then(async (willDelete) => {
    if (willDelete) {
      
      swal("這個成員資訊已被移除", {
        icon: "success",
      });
      database.ref(`team/${id}`).remove();
    } else {
      // swal("沒問題，沒有進行任何操作");
    }
  });

};

const create = async()=> {

  let inputDict = {
    thumbnail_url: document.getElementById('pic_url').value?document.getElementById('pic_url').value:'',
    first_name : document.getElementById('first_name').value?document.getElementById('first_name').value:'',
    last_name : document.getElementById('last_name').value?document.getElementById('last_name').value:'',
    title : document.getElementById('title').value?document.getElementById('title').value:'',
  } 

  try{
    
    let memberCount = await myData.once('value')
    memberCount = JSON.parse(JSON.stringify(memberCount))
    console.log("memberCount"+memberCount)
    firebase.database().ref(`/team/` + Object.keys(memberCount).length).set(inputDict);

    document.getElementById('update-content').classList.remove("btn-dark")
    document.getElementById('update-content').classList.add("btn-success")
    document.getElementById('update-content').innerHTML = `Success`
    await sleep(3000);
    document.getElementById('update-content').classList.remove("btn-success")
    document.getElementById('update-content').classList.add("btn-dark")
    document.getElementById('update-content').innerHTML = `Saved`
    document.getElementById("update-content").disabled = false;
  }
  catch (error){
    document.getElementById('update-content').classList.remove("btn-dark")
    document.getElementById('update-content').classList.add("btn-danger")
    document.getElementById('update-content').innerHTML = `Fail`
    await sleep(3000);
    document.getElementById('update-content').classList.remove("btn-danger")
    document.getElementById('update-content').classList.add("btn-dark")
    document.getElementById('update-content').innerHTML = `Saved`
    document.getElementById("update-content").disabled = false;
  }
};

const upload = async(id)=> {

  let inputDict = {
    thumbnail_url : document.getElementById('pic_url').value,
    first_name : document.getElementById('first_name').value,
    last_name : document.getElementById('last_name').value,
    title : document.getElementById('title').value
  }

  try{
    await database.ref(`/team/${id}`).update(inputDict);
        document.getElementById('update-content').classList.remove("btn-dark")
    document.getElementById('update-content').classList.add("btn-success")
    document.getElementById('update-content').innerHTML = `Success`
    await sleep(3000);
    document.getElementById('update-content').classList.remove("btn-success")
    document.getElementById('update-content').classList.add("btn-dark")
    document.getElementById('update-content').innerHTML = `Saved`
    document.getElementById("update-content").disabled = false;
  }
  catch (error){
    document.getElementById('update-content').classList.remove("btn-dark")
    document.getElementById('update-content').classList.add("btn-danger")
    document.getElementById('update-content').innerHTML = `Fail`
    await sleep(3000);
    document.getElementById('update-content').classList.remove("btn-danger")
    document.getElementById('update-content').classList.add("btn-dark")
    document.getElementById('update-content').innerHTML = `Saved`
    document.getElementById("update-content").disabled = false;

  }

};

document.getElementById("pic_url").addEventListener("change", function() {
  var thumbnailUrl = this.value;
  if(thumbnailUrl.length>0){
    document.getElementById("display-pic").src = thumbnailUrl
  }else{
    document.getElementById("display-pic").src = "https://firebasestorage.googleapis.com/v0/b/gdg-taipei.appspot.com/o/default.png?alt=media&token=fac51832-95db-4bff-91b1-f1585cc6b652"
  }
});

