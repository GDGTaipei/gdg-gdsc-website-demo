

var bevyCurrentEvent = async()=>{

  try {
    const response = await fetch(`${websideIndexUrl}/api/chapter/${chapterId}/event?order_by=start_date&start_date=${todayDate()}&end_date=9999-12-31&fields=id,title,audience_type,description_short,start_date,end_date,picture,tags,tickets,url,event_type_title,audience_type,event_type&page_size=4`);
    const data = await response.json();
    const futureEvents = []
    let eventRows = data['results']

    for(let i=0;i < eventRows.length;i++ ){
      
      const targetTime = new Date(eventRows[i]['end_date']);
      const currentTime = new Date();
      // console.log(eventRows[i]['title']+targetTime)
      if (targetTime > currentTime) {
        futureEvents.push(eventRows[i])
      }
    }

    return futureEvents

  } catch (error) {
    console.error(error);
  }
}

var bevyPassEvent = async()=>{

  try {
    const response = await fetch(`${websideIndexUrl}/api/chapter/${chapterId}/event?order_by=start_date&start_date=${passOneYear()}&end_date=${todayDate()}&fields=title,audience_type,description_short,start_date,end_date,picture,tags,tickets,url,event_type_title,audience_type,event_type&page_size=8&order_by=-start_date&page_size=8`);
    const data = await response.json();
    let eventRows = data['results']

    return eventRows

  } catch (error) {
    console.error(error);
  }
}


var todayDate = ()=>{
  let date = new Date()
  return `${date.getFullYear()}-${date.getMonth() + 1 }-${date.getDate()}`
}

var passOneYear = ()=>{
  let today = new Date();
  today.setMonth(today.getMonth() - 12);
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}
