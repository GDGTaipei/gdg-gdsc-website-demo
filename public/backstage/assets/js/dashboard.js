
const eventColorMapping= {
    "Conference":"#0449b8",
    "Info session":"#0ac9c6",
    "Watch Party":"#900ac9",
    "Conference with Bevy Virtual Conference":"#4f4f4f",
    "External Ticketing":"#008c85",
    "Hackathon":"#218c00",
    "Workshop / Study Group":"#a9b500",
    "Speaker Session / Tech Talk":"#b55100",
    "Test Event - use to test creating an event page":"#c7c7c7",
    "Women's Online Safety Program":"#01b6a2",
    "Google Hosted Summit":"#4285F4",
}

let GDGEventFetch = async()=>{
  try {
    let eventList = []
    const response = await fetch(`${websideIndexUrl}/api/chapter/${chapterId}/event?order_by=start_date&fields=title,start_date,end_date,url,event_type_title,tags`);
    const data = await response.json();
    
    //console.log("status_counter"+data['status_counter'])

    let eventRows = data['results']
    let eventStatistic = data['status_counter']

    for(let event of eventRows){

      eventList.push(
        {
          title: event.title,
          start: new Date(event.start_date).toISOString(),
          end: new Date(event.end_date).toISOString(),
          backgroundColor: event.tags.includes('Women Techmakers')? "#01b6a2":eventColorMapping[event.event_type_title],
          url:event.url,
          editable:false,
          allDay:getInterval(event.start_date,event.end_date)
        }
      )
    }

    document.getElementById("Published").innerHTML = eventStatistic['Published']
    document.getElementById("Completed").innerHTML = eventStatistic['Completed']
    document.getElementById("Live").innerHTML = eventStatistic['Live']

    return eventList
  } catch (error) {
    console.error(error);
  }
}

function getInterval(start, end) {
  // Convert the start and end dates to a Unix timestamp.
  const startTimestamp = new Date(start).getTime();
  const endTimestamp = new Date(end).getTime();

  // Subtract the start timestamp from the end timestamp.
  const interval = endTimestamp - startTimestamp;

  // Divide the result by the number of seconds in a day.
  const intervalDays = interval / 1000;
  
  return intervalDays>86400;
}

var todayDate = ()=>{
  let today = new Date()
  let date = new Date(today.getTime() + ( 8* 60 * 60 * 1000 ))
  return `${date.getFullYear()}-${date.getMonth() + 1 }-${date.getDate()}`
}

let calenderMapping = async() =>{

  let inputEvents = await GDGEventFetch()

  var calendar = new FullCalendar.Calendar(document.getElementById("calendar"), {
    initialView: "dayGridMonth",
    headerToolbar: {
      start: 'dayGridMonth,timeGridWeek,listWeek,timeGridDay',
      center: 'title',
      end: 'today prev,next'
    },
    contentHeight: 600,
    selectable: true,
    editable: false, 
    timeZone: 'local',
    locale: 'en',
    initialDate: new Date(),
    events: inputEvents,
    nowIndicator:true,
    views: {
      month: {
        titleFormat: {
          month: "long",
          year: "numeric"
        }
      },
      agendaWeek: {
        titleFormat: {
          month: "long",
          year: "numeric",
          day: "numeric"
        }
      },
      agendaDay: {
        titleFormat: {
          month: "short",
          year: "numeric",
          day: "numeric"
        }
      }
    },
    eventClick: function(info) {
      info.jsEvent.preventDefault(); // don't let the browser navigate
  
      if (info.event.url) {
        window.open(info.event.url);
      }
    },
    buttonText:{
      today:    'Today',
      month:    'Month',
      week:     'Week',
      day:      'Date',
      list:     'TimeTable',
    },
    allDayText:"All Day"
  });
  
  calendar.render();

}

calenderMapping()