var database = firebase.database();
var myData = firebase.database().ref(`/partners`);


myData.on('value', function(snapshot) {
  var partnerList = snapshot.val();
  let eachDateContent = "";

  console.log(Object.values(partnerList))


  for (let i of Object.keys(partnerList)){

    var cardBodyContent = `
      <div class="card-body">
          <div class="row">
            <div class="col-md-3" style = "display: flex;
            justify-content: center;
            align-items: center; margin-bottom:1rem;">
              <img src="${partnerList[i]['pic_url']}" alt="${partnerList[i]["title"]} image" class="img-fluid shadow" style="width: 300px;">
            </div>
            <div class="col-md-9 text-left" style="vertical-align: center;">
            <h5>
            <span class='badge badge-pill badge-warning' style='background-color: ${partnerList[i]['badge_color']}'>${partnerList[i]['badge_title']}</span>
            </h5>
            <h3>${partnerList[i]["title"]}</h3>
              <p style="margin-top:10px">${partnerList[i]["description"]}</p>
              <a href="${partnerList[i]['link']}" class="btn btn-outline-default btn-round" target="_blank" style="margin: 5px 5px;">了解更多</a>
            </div>
          </div>
        </div>
      `;

    eachDateContent += `<div class="col-lg-12 col-md-12 col-12 text-right" style = "margin-top: 0rem !important; margin-bottom: 1.5rem !important;padding-right: 0px;">
      ${cardBodyContent}
      </div>`;
  }
  
    
  

  let final_content = `<div class="row col-md-12" style="margin-top: 1.5em; margin-right: 0em; padding-right: 0px;">${eachDateContent}</div>`;

  document.getElementById("partner_List").innerHTML = final_content

});

// mainEventGen()