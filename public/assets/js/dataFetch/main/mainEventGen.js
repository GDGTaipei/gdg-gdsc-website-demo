let eachDateContent = ''
const eventTagMap = {
  "Google I/O Extended": "Google I/O Extended",
  "Accessibility": "Accessibility",
  "AI": "AI",
  "Android": "Android",
  "Android Study Jam": "Android Study Jam",
  "Career Development": "Career Development",
  "Certification Prep": "Certification Prep",
  "Ads/Traffic Analytics": "Ads/Traffic Analytics",
  "AR/VR": "AR/VR",
  "Certification Study Group": "Certification Study Group",
  "Cloud": "Cloud",
  "Cloud Hero": "Cloud Hero",
  "Enterprise/Business Solutions": "Enterprise/Business Solutions",
  "Cloud Study Jam": "Cloud Study Jam",
  "Coding Challenge": "Coding Challenge",
  "Community Building": "Community Building",
  "Compose Camp": "Compose Camp",
  "Data": "Data",
  "Design": "Design",
  "DevFest": "DevFest",
  "DevOps": "DevOps",
  "Firebase": "Firebase",
  "Flutter": "Flutter",
  "Google Assistant": "Google Assistant",
  "Google Cloud Next": "Google Cloud Next",
  "Google Maps Platform": "Google Maps Platform",
  "Hash Code": "Hash Code",
  "International Women's Day": "International Women's Day",
  "IoT": "IoT",
  "Inclusion": "Inclusion",
  "JAX": "JAX",
  "Kaggle": "Kaggle",
  "Machine Learning": "Machine Learning",
  "Mobile": "Mobile",
  "Networking": "Networking",
  "Road to Google Developers Certification": "Road to Google Developers Certification",
  "TensorFlow": "TensorFlow",
  "TensorFlow Extended": "TensorFlow Extended",
  "TensorFlow js": "TensorFlow js",
  "Tensor Processing Unit": "Tensor Processing Unit",
  "Web": "Web",
  "Women Techmakers": "Women Techmakers",
  "Career Fair": "Career Fair",
  "Angular": "Angular",
  "Next": "Next"
};


const eventTypeMap = {
  "Conference": "Conference",
  "Info Session": "Info Session",
  "Watch Party": "Watch Party",
  "Conference with Bevy Virtual Conference": "Conference with Bevy Virtual Conference",
  "External Ticketing": "External Ticketing",
  "Hackathon": "Hackathon",
  "Workshop / Study Group": "Workshop / Study Group",
  "Speaker Session / Tech Talk": "Speaker Session / Tech Talk",
  "Test Event - use to test creating an event page": "Test Event - use to test creating an event page",
  "Women's Online Safety Program": "Women's Online Safety Program",
  "Google Hosted Summit": "Google Hosted Summit"
}

const bevyIdMapping = {
  "taoyuan":"195",
  "tainan":"240",
  "hualien":"246",
  "taichung":"251",
  "cloud_taipei":"357",
  "kaohsiung":"739",
  "taipei":"748",
  "changhua":"1278",
}

let dateTrans = (dateString) => {

  const dateObject = new Date(dateString);

  const month = dateObject.getMonth() + 1; // add 1 to get 1-12 range instead of 0-11
  const date = dateObject.getDate();

  return `${month}/${date}`;

};

let liveEventReader = async () => {

  var ActivityList = await bevyCurrentEvent();
  let eventList = {}
  let eventMappingList={}
  let modelScannerContent = ''

  ActivityList.forEach((event) => {
    if (!eventList[dateTrans(event.start_date)]) {
      eventList[dateTrans(event.start_date)] = [];
    }
    eventList[dateTrans(event.start_date)].push(event);
  });


  if(ActivityList.length===0){
    document.getElementById("recentContentList").innerHTML = `<div class="col-md-8 mx-auto text-center" style="padding: 32px 0px;">
            <h4 class="heading-title text-warning mb-0">Currently, there are no upcoming events.</h4x>
        </div>`;
    return
  }

  let eventDates = Object.keys(eventList)

  for (let j = 0; j < eventDates.length; j++) {

    let cardBodyContent = ''

    for(let event of eventList[eventDates[j]]){

      let audience_type = ''
      let tagButton = ''

      switch (event['audience_type']){
        case 'VIRTUAL':{
          audience_type =`<span class="badge badge-pill badge-warning">VIRTUAL</span>`
          break;
        }
        case 'IN_PERSON':{
          audience_type =`<span class="badge badge-pill badge-default">IN_PERSON</span>`
          break;
        }
        case 'HYBRID':{
          audience_type =`<span class="badge badge-pill badge-success">HYBRID</span>`
          break;
        }
      }
      
      let eventPic = 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,h_200,q_auto:good,w_200/v1/gcs/platform-data-goog/event_banners/gdev-eccosystems-bevy-chapters-thumbnail_x4z1EBy.png'

      if(event['picture']['url']){
        eventPic = event['picture']['url']
      }
      
      for(let tag of event['tags']){
        tagButton += `<span class="badge badge-pill badge-lg badge-secondary" style="margin:5px 5px;">${eventTagMap[tag]}</span>`
      }

      cardBodyContent += `
      <div class="card-body">
          <div class="row">
            <div class="col-md-3" style = "display: flex;
            justify-content: center;
            align-items: center;padding:15px 15px;">
            <button type="button" class="btn rounded-circle" data-toggle="modal" data-target="#model_${event['id']}" style="padding:0px">  
              <img src="${eventPic}" alt="Circle image" class="img-fluid rounded-circle shadow" style="width: 150px; ">
            </button>            
            </div>
            <div class="col-md-9 text-left" style="vertical-align: center;">
            ${audience_type}
              <h3>${event['title']}</h3>
              <h6 style="color:#4285F4">${eventTypeMap[event['event_type_title']]}</h6>
              ${tagButton}
              <p style="margin-top:10px">${event['description_short']}</p>
              <a href="${event['url']}" class="btn btn-outline-primary btn-round" target="_blank" style="margin: 5px 5px;">JOIN NOW</a>
              </div>
            </div>
        </div>`;

        modelScannerContent += `
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
              justify-content: center;">Scan and apply!</div>
            </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-warning btn-block" data-dismiss="modal">Close the model</button>
              </div>
            </div>
          </div>
        </div>`

        eventMappingList[event['id']] = event['url']
    }

    eachDateContent += `
      <div class="row col-md-12" style = "margin-top: 0rem !important; margin-bottom: 0rem !important;padding-right: 0px;">
          <div class="col-lg-2 mr-auto text-left mt-4" style = "margin-top: 0rem !important;">
              <p class="h1 card-title mb-3" style="word-break:break-all; color: #4285F4; margin-bottom: 0rem !important;">${eventDates[j]===dateTrans(new Date())? `Today`: eventDates[j]}</p>
          </div>
          <div class="col-lg-12 col-md-12 col-12 text-right" style = "margin-top: 0rem !important; margin-bottom: 1.5rem !important;padding-right: 0px;">
                ${cardBodyContent}
          </div>
      </div>`;
  }



  document.getElementById("recentContentList").innerHTML = `<div class="row col-md-12" style="margin-top: 1.5em; margin-right: 0em; padding-right: 0px;">${eachDateContent}</div>`;
  document.getElementById("modelScanner").innerHTML = modelScannerContent;

  QRCodeGenerator(eventMappingList)

}

let passEventReader = async () =>{

  var ActivityList = await bevyPassEvent();

    if(ActivityList.length===0){
      document.getElementById("passContentList").innerHTML = `<div class="col-md-8 mx-auto text-center" style="padding: 32px 0px;">
              <h4 class="heading-title text-warning mb-0">THERE ARE NO PASS EVENTS.</h4x>
          </div>`;
      return
    }

  let content = '<div><div class="text-center mt-2" style="margin-top: 14px !important">'

    for (var j = 0; j < ActivityList.length; j++) {

        if (j % 4 === 0) {
            content += '<div class="row">'
        }

        content += '<div class="col-md-3" style="padding:15px 15px;">' +
            `<a type="button" class="btn rounded-circle" target="_blank" href="${ActivityList[j]['url']}" style="padding:0px">  
              <img src="${ActivityList[j]['picture']['url'] ? ActivityList[j]['picture']['url'] : 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,h_200,q_auto:good,w_200/v1/gcs/platform-data-goog/event_banners/gdev-eccosystems-bevy-chapters-thumbnail_x4z1EBy.png'}" alt="Circle image" class="img-fluid rounded-circle shadow" style="width: 150px;">
            </a>
            <h5 style="padding-top:15px;">${dateTrans(ActivityList[j].start_date)}</h5>
            <h5>${ActivityList[j]['event_type_title'] ? `<small style="color:#4285F4;">${eventTypeMap[ActivityList[j]['event_type_title']]}</small>` : "無活動名稱"}<br>
            ${ActivityList[j]['title']}<br>
            </h5>
            </div>`

        if (j % 4 === 3) {
            content += '</div>'
        }
    }

    content = content + '</div></div></div>'

    document.getElementById("passContentList").innerHTML = content
}

liveEventReader()
passEventReader()