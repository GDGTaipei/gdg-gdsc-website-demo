
const eventTypeMap = {
    "Conference": "Conference",
    "Info session": "Info session",
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

const getDict = (data) => {
    const dict = {};
    data.forEach((item) => {
        dict[item.id] = item.url;
    })
    return dict
}


let bevyIdMapping = {
    "taoyuan":"195",
    "tainan":"240",
    "hualien":"246",
    "taichung":"251",
    "cloud_taipei":"357",
    "kaohsiung":"739",
    "taipei":"748",
    "changhua":"1278",
}

let autoInit = async()=>{

    var ActivityList= await EventTypeFilter();


    if(ActivityList['results'].length===0){
        document.getElementById('tabs-icons-text').innerHTML = `<div class="col-md-8 mx-auto text-center" style="padding: 32px 0px;">
        <h1 class="display-2 mb-0">Currently, there are no upcoming events.</h1>
    </div>`

        document.getElementById("myTabContent").innerHTML = "";
        return
    }

    subject_array = Array.from(new Set(ActivityList['results'].map(item=>item.event_type_title)))
    
    // console.log( subject_array)
    
    var subject_options = ''
    let content = ''

    for(let i=0;i< subject_array.length;i++){

        var filterList = ActivityList['results'].filter(item=>item.event_type_title===subject_array[i])
        
        // console.log(filterList)

        subject_options+=`<li class='nav-item'>
            <a class='nav-link mb-sm-3 mb-md-0 ${(i === 0) ? " active" : ""}' data-toggle='tab' href='#${subject_array[i].replace(/[ \/]/g, '-')}' role='tab' aria-controls='"' aria-selected="true" style='margin:10px;'>${eventTypeMap[subject_array[i]]} </a>
            </li>`
    
        content +=`<div class='tab-pane fade show${(i === 0) ? " active" : ""}' id='${subject_array[i].replace(/[ \/]/g, '-')}' role='tabpanel' aria-labelledby='${subject_array[i]}'-tab'>`
        
        content+= await mainEventGen(filterList)
        content +='</div>'

    }

    let eventMappingList= getDict(ActivityList['results'])
    QRCodeGenerator(eventMappingList)


    document.getElementById('tabs-icons-text').innerHTML = subject_options
    document.getElementById("myTabContent").innerHTML = content
}

autoInit()