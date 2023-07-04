var database = firebase.database();

var myData = database.ref(`/social_networks`);


myData.on('value', function(snapshot) {

  let socialMediaList = snapshot.val();

  let displayRows = ` <thead> <tr>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder align-middle">社群媒體</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 align-middle">網址</th>
          <th class="text-center text-secondary opacity-7"></th>
        </tr></thead>` 

  for(const [key, value] of Object.entries(socialMediaList)){

    

    displayRows += `
    <tr>
      <td>
        <div class="col-auto" style="text-align: center;">
        <p class="text-xs font-weight-bold mb-0 h5" style="text-transform:capitalize;">
          ${key}
        </p>
        </div>
      </td>
      <td class="col text-center">
          <form>
            <div class="input-group input-group-static mb-4">
              <input type="text" class="form-control" id="${key}" value="${value.href}">
            </div>
          </form>
      </td>
      <td class="col text-center">
          <a class="btn btn-outline-secondary" toast-btn" type="button" data-target="EventToast" onclick="upload('${key}')">
            儲存
          </a>
      </td>
    </tr>`
  }

document.getElementById('form-content').innerHTML = displayRows

})


const upload = async(key)=> {
  
  let inputValue = {
    "href":document.getElementById(key.toString()).value
  }

  try{
    
    await database.ref(`/social_networks/${key}`).update(inputValue);
    swal(`「${capitalize(key)}」的網址已成功更新`, {
        icon: "success",
      });
  }
  catch (error){
    swal(`糟糕!「${capitalize(key)}」的更新發生錯誤`, {
        icon: "warning",
      });

  }

};
