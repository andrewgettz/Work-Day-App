var events = JSON.parse(localStorage.getItem('events')) || {}
var checkStorage - localStorage.getItem('events')
var startTime = 9
var currentTime = parseInt(moment().format('H'))


//Display current date in jumbotron 
$('#currentDay').text(moment().format('llll'))

//Generate time blocks for 9 am to 5 pm 
for(let index = 0; index < 9; index++) {

    //create row 
    var divRow = $('<div class="row">')
    divRow.attr('data-id', index)
    $('.container').append(divRow)

    if (checkStorage ===null){

        //Create objects in events array with index as id for local storage 
        events.push ({eventsId: index})
        console.log(events)
        localStorage.setItem('events, JSON.stringify
        (events)) 
    }

    //Populate first column with time 
    var tableTime = $('<div class="hour" col-1>')
    var hour = moment(startTime, 'h').format('LT') 
    tableTime.text(hour)
    divRow.append(tableTime)

    //Create description div and text areas for events. 
    let eventDesc = $('<div class = "description col-10">')
    eventDesc.attr('data-time', startTime)
    
    setDescClass()

    let eventTextArea = $('<textarea cols="65" rows="3"></textarea>')
    eventDesc.html(eventTextArea)
    eventTextArea.attr('data-id', index)
    divRow.append(eventDesc)

    //Get event description out of local storage to display in text event 
    let eventText = events[index].description
    eventTextArea.val(eventText)

    //Create save buttons 
    const saveDiv = $('<div class = "saveBtn col-1">' )
    divRow.append(saveDiv)
    const saveBtn = $('<i class = far fa-save fa-md"></i> ')
    saveDiv.html(saveBtn)
    saveBtn.attr('data-id', index)

    startTime++

}

//Set class for past, present, and future time block 
function setDescClass(){

    //Set class for Description div 
    if(moment(startTime).isBefore(currentTime)) {
        eventDesc.addClass('past')
        console.log('past')
    }

    if(moment(startTime).isSame(currentTime)) {
        eventDesc.addClass('present')
        console.log('present')
    }

    if (moment(startTime).isAfter(currentTime)) {
        eventDesc.addClass('future')
        console.log('future')
    }
}

//Add event listener to save button 
$('.far').on('click', function(){

    //Get data-id of save click which is set to index in array 
    const dataId =$(this).attr('data-id')
    console.log("The data-id of clicked item is: " + dataId)

    //Take text area value with that currentId 
    const eventText = $(`textarea[data-id|='${dataId}']`).val()
    console.log("Event text is " + eventText)

    //Set to description property 
    events[dataId].description = eventText
    console.log(events)

    localStorage.setItem('events', JSON.stringify(events))

    console.log("Description save for id: " + dataId)
})