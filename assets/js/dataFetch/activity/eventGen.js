
const eventTypeMap = {
    "Conference": "會議",
    "Info session": "資訊會議",
    "Watch Party": "觀影派對",
    "Conference with Bevy Virtual Conference": "Bevy虛擬會議",
    "External Ticketing": "外部售票",
    "Hackathon": "黑客松",
    "Workshop / Study Group": "工作坊 / 學習小組",
    "Speaker Session / Tech Talk": "演講會 / 科技講座",
    "Test Event - use to test creating an event page": "測試活動 - 用於測試創建活動頁面",
    "Women's Online Safety Program": "女性網絡安全計劃",
    "Google Hosted Summit": "Google主辦峰會"
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
        <h1 class="display-2 mb-0">目前沒有即將發生的活動</h1>
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