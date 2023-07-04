const eventTagMap ={
  "Google I/O Extended": "Google I/O Extended",
  "Accessibility": "無障礙設計",
  "AI": "人工智慧",
  "Android": "Android",
  "Android Study Jam": "Android 學習營",
  "Career Development": "職業發展",
  "Certification Prep": "證書準備",
  "Ads/Traffic Analytics": "廣告/流量分析",
  "AR/VR": "擴增實境/虛擬實境",
  "Certification Study Group": "證書學習小組",
  "Cloud": "雲端",
  "Cloud Hero": "Cloud Hero",
  "Enterprise/Business Solutions": "企業/商業解決方案",
  "Cloud Study Jam": "雲端學習營",
  "Coding Challenge": "程式設計挑戰",
  "Community Building": "社群營造",
  "Compose Camp": "Compose Camp",
  "Data": "資料",
  "Design": "設計",
  "DevFest": "DevFest",
  "DevOps": "開發運維",
  "Firebase": "Firebase",
  "Flutter": "Flutter",
  "Google Assistant": "Google 助理",
  "Google Cloud Next": "Google Cloud Next",
  "Google Maps Platform": "Google 地圖平台",
  "Hash Code": "Hash Code",
  "International Women's Day": "國際婦女節",
  "IoT": "物聯網",
  "Inclusion": "多元融合",
  "JAX": "JAX",
  "Kaggle": "Kaggle",
  "Machine Learning": "機器學習",
  "Mobile": "行動裝置",
  "Networking": "網路通訊",
  "Road to Google Developers Certification": "通往 Google 開發者證書之路",
  "TensorFlow": "TensorFlow",
  "TensorFlow Extended": "TensorFlow Extended",
  "TensorFlow js": "TensorFlow.js",
  "Tensor Processing Unit": "Tensor 處理單元",
  "Web": "網頁",
  "Women Techmakers": "Women Techmakers",
  "Career Fair": "職業博覽會",
  "Angular": "Angular",
  "Next": "Next"
}

var EventTypeFilter = async(bevyId)=>{
  try{
    const response = await fetch(`${websideIndexUrl}/api/chapter/${chapterId}/event?order_by=start_date&start_date=${todayDate()}&end_date=9999-12-31&fields=id,title,audience_type,description_short,start_date,end_date,picture,tags,tickets,url,event_type_title,audience_type`);
    const data = await response.json();
    return data

  } catch (error) {
    console.error(error);
  }
}


var todayDate = ()=>{
  let date = new Date()
  return `${date.getFullYear()}-${date.getMonth() + 1 }-${date.getDate()}`
}

var EventTypesFetch = async()=>{
  try{
    const response = await fetch(`https://gdg.community.dev/api/event_type/`);
    const data = await response.json();

    return data

  } catch (error) {
    console.error(error);
  }
}

let dateTrans = (dateString) => {

  const dateObject = new Date(dateString);

  const month = dateObject.getMonth() + 1; // add 1 to get 1-12 range instead of 0-11
  const date = dateObject.getDate();

  return `${month}/${date}`;

};

let sortedDateArray = (data)=>{
  
  return data.sort((a, b) => {
    if (new Date(a.start_date_iso) < new Date(b.start_date_iso)) {
      return -1;
    }
  });
}

let mainEventGen = async (ActivityList) => {

  let eventList = {}
  let eachDateContent = ''

  ActivityList.forEach((event) => {
    if (!eventList[dateTrans(event.start_date)]) {
      eventList[dateTrans(event.start_date)] = [];
    }
    eventList[dateTrans(event.start_date)].push(event);
  });

  let eventDates = Object.keys(eventList)

  for (let j = 0; j < eventDates.length; j++) {

    let cardBodyContent = ''

    for(let event of eventList[eventDates[j]]){

      let audience_type = ''
      let tagButton = ''

      // 標記活動類型
      switch (event['audience_type']){
        case 'VIRTUAL':{
          audience_type =`<span class="badge badge-pill badge-warning">線上活動</span>`
          break;
        }
        case 'IN_PERSON':{
          audience_type =`<span class="badge badge-pill badge-default">實體活動</span>`
          break;
        }
        case 'HYBRID':{
          audience_type =`<span class="badge badge-pill badge-success">虛實整合活動</span>`
          break;
        }
      }
      
      //活動圖片
      let eventPic = 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,h_200,q_auto:good,w_200/v1/gcs/platform-data-goog/event_banners/gdev-eccosystems-bevy-chapters-thumbnail_x4z1EBy.png'

      if(event['picture']['url']){
        eventPic = event['picture']['url']
      }
      
      //活動標籤
      for(let tag of event['tags']){
        tagButton += `<span class="badge badge-pill badge-lg badge-secondary" style="margin:5px 5px;">${eventTagMap[tag]}</span>`
      }


      cardBodyContent += `
      <div class="card-body">
          <div class="row">
            <div class="col-md-3" style = "display: flex;
            justify-content: center;
            align-items: center; padding:15px 15px;">
              <img src="${eventPic}" alt="Circle image" class="img-fluid rounded-circle shadow" style="width: 150px; ">
            </div>
            <div class="col-md-9 text-left" style="vertical-align: center;">
            ${audience_type}
            
              <h3>${event['title']}</h3>
              <!--h6 style="color:#4285F4">${[event['event_type_title']]}</h6-->
              ${tagButton}
              <p style="margin-top:10px">${event['description_short']}</p>
              <a href="${event['url']}" class="btn btn-outline-primary btn-round" target="_blank" style="margin: 5px 5px;">立刻報名</a>
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#model_${event['id']}">
              活動QR碼
            </button>
            </div>
          </div>
        </div>`;

        document.getElementById("modelScanner").innerHTML += `
        <div class="modal fade qr_code_modal" id="model_${event['id']}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title h5">${event['title']}</h5>
                <!--button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button-->
              </div>
              <div class="modal-body">
              <div id="${event['id']}" style = "display: flex;
              justify-content: center;
              align-items: center;padding:15px 15px;"></div>
              <div  style = "display: flex;
              justify-content: center;">掃描QR碼立刻報名!</div>
            </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-warning btn-block" data-dismiss="modal">關閉 QR Code</button>
              </div>
            </div>
          </div>
        </div>`

    }

    // 活動報名連結
    eachDateContent += `
      <div class="row col-md-12" style = "margin-top: 0rem !important; margin-bottom: 0rem !important;padding-right: 0px;">
          <div class="col-lg-2 mr-auto text-left mt-4" style = "margin-top: 0rem !important;">
              <p class="h1 card-title mb-3" style="word-break:break-all; color: #4285F4; margin-bottom: 0rem !important;">${eventDates[j]}</p>
          </div>
          <div class="col-lg-12 col-md-12 col-12 text-right" style = "margin-top: 0rem !important; margin-bottom: 1.5rem !important;padding-right: 0px;">
                ${cardBodyContent}
          </div>
      </div>`;

  }

  return `<div class="row col-md-12" style="margin-top: 1.5em; margin-right: 0em; padding-right: 0px;">${eachDateContent}</div>`;

}
