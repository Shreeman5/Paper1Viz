
document.getElementById("datePick").style.display = "none"
document.getElementById("weekPick").style.display = "none"
document.getElementById("monthPick").style.display = "none"




function specifyTimePeriod(){
    let givenValue = document.getElementById("data").value
    let givenValue2 = document.getElementById("timePeriod").value

    
    if (givenValue !== '--Please Select --' && givenValue2 !== '--Please Select --'){
        findMinMaxDate(givenValue).then(function (minMaxDateData){
            if (givenValue2 === 'day'){
                findMinandMaxDay(minMaxDateData)
                document.getElementById("datePick").style.display = "block"
                document.getElementById("weekPick").style.display = "none"
                removeWeekOptions()
                document.getElementById("monthPick").style.display = "none"
                removeMonthOptions()
            }
            else if (givenValue2 === 'week'){
                findMinandMaxWeek(minMaxDateData)
                document.getElementById("datePick").style.display = "none"
                document.getElementById("weekPick").style.display = "block"
                document.getElementById("monthPick").style.display = "none"
                removeMonthOptions()
            }
            else if (givenValue2 === 'month'){
                findMinandMaxMonth(minMaxDateData)
                document.getElementById("datePick").style.display = "none"
                document.getElementById("weekPick").style.display = "none"
                removeWeekOptions()
                document.getElementById("monthPick").style.display = "block"
            }
        })  
    }
}

async function findMinMaxDate(givenValue){
    let minMaxDatesAPI = 'http://128.110.217.95/timeframe/range?cluster='+givenValue
    const minMaxDate = await fetch(minMaxDatesAPI)
    const jsonMinMaxDate = await minMaxDate.json()
    return jsonMinMaxDate
}


function findMinandMaxDay(minMaxDateData){
    // console.log(minMaxDateData)
    let minDate = minMaxDateData['min']['date']
    let minDateString = minDate.substring(5,7)+'/'+minDate.substring(8,10)+'/'+minDate.substring(0,4)
    let maxDate = minMaxDateData['max']['date']
    let maxDateString = maxDate.substring(5,7)+'/'+maxDate.substring(8,10)+'/'+maxDate.substring(0,4)
    $(document).ready(function () {
        $('#datePick').multiDatesPicker({
            minDate : minDateString,
            maxDate: maxDateString,
            showButtonPanel: true,
            changeMonth: true,
            changeYear: true,
            onSelect: function(dateText, inst) { inst.settings.defaultDate = dateText; }
        });
    });
}

function findMinandMaxWeek(minMaxDateData){
    let selectFunction = document.getElementById("weekPick")

    let minDate = minMaxDateData['min']['date']
    let startingYear = minDate.substring(0,4)
    let startingMonth = minDate.substring(5,7)
    let startingDay = minDate.substring(8,10)
    let startingDate = startingYear+'-'+startingMonth+'-'+startingDay+'T00:00'

    let maxDate = minMaxDateData['max']['date']
    let endingYear = maxDate.substring(0,4)
    let endingMonth = maxDate.substring(5,7)
    let endingDay = maxDate.substring(8,10)
    let endingDate = endingYear+'-'+endingMonth+'-'+endingDay+'T00:00'

    let d1 = new Date(startingDate);
    let d2 = new Date(endingDate);

    function weeksBetween(d1, d2) {
        return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
    }

    let numberOfWeeks = weeksBetween(d1, d2)

    for(i = 0 ; i < numberOfWeeks; i++){
        let yearWeek = moment(d1).format("YYYY-WW");
        let option = document.createElement("option")
        let text = d1+ ''
        let givenMonth = text.substring(4,7)
        let givenDay = text.substring(8,10)
        option.text = yearWeek + '-' + givenMonth + '-' + givenDay
        selectFunction.add(option)
        
        d1.setDate(d1.getDate() + 7);
    }
}


function findMinandMaxMonth(minMaxDateData){
    let selectFunction = document.getElementById("monthPick")

    let minDate = minMaxDateData['min']['date']
    let startingYear = parseInt(minDate.substring(0,4))
    let startingMonth = parseInt(minDate.substring(5,7))
    let startingDay = parseInt(minDate.substring(8,10))

    let maxDate = minMaxDateData['max']['date']
    let endingYear = parseInt(maxDate.substring(0,4))
    let endingMonth = parseInt(maxDate.substring(5,7))
    let endingDay = parseInt(maxDate.substring(8,10))


    let d1 = new Date(startingYear, startingMonth, startingDay);
    let d2 = new Date(endingYear, endingMonth, endingDay);

    let ydiff = d2.getYear() - d1.getYear();
    let mdiff = d2.getMonth() - d1.getMonth();

    let diff = (ydiff*12 + mdiff);
    for(i = 0 ; i<=diff;i++){
        if(i==0){
            d1.setMonth(d1.getMonth() -1);
        }
        else{
            d1.setMonth(d1.getMonth() + 1);
        }

        let yearMonth = moment(d1).format("YYYY-MM");
        let option = document.createElement("option")
        option.text = yearMonth
        selectFunction.add(option)
    }
}

function removeWeekOptions(){
    $('#weekPick').find('option').not(':first').remove()
}


function removeMonthOptions(){
    $('#monthPick').find('option').not(':first').remove()
}

function finalCheck(){
    let givenValue = document.getElementById("data").value
    let givenValue2 = document.getElementById("timePeriod").value

    if (givenValue !== '--Please Select --' && givenValue2 !== '--Please Select --'){
        if (givenValue2 === 'day'){
            let selectedDaysString = $('#datePick').val()
            let selectedDays = []
            if (selectedDaysString){
                selectedDays = selectedDaysString.split(',')
            }
            if (selectedDays.length >= 2){
                for (let i = 0; i < selectedDays.length; i++){
                    let thisDate = selectedDays[i]
                    let newDate 
                    if (i === 0){
                        newDate = thisDate.substring(6,10)+"-"+thisDate.substring(0,2)+"-"+thisDate.substring(3,5)
                    }
                    else{
                        newDate = thisDate.substring(7,11)+"-"+thisDate.substring(1,3)+"-"+thisDate.substring(4,6)
                    }
                    selectedDays[i] = newDate
                }
                fetchSummaryData(givenValue, givenValue2, selectedDays).then(function (summaryData){
                    let vizScreen = new VizScreen(summaryData, selectedDays, "days")
                    vizScreen.initializeProgram()
                })
            }
            else{
                if (selectedDays.length === 0){
                    alert('Please select at least 2 days.')
                }
                else if (selectedDays.length === 1){
                    alert('Please select at least one more day.')
                }
            }
        }
        else if (givenValue2 === 'week'){
            let selectedWeeks = $('#weekPick').val()
            if (selectedWeeks.length >= 2){
                fetchSummaryData(givenValue, givenValue2, selectedWeeks).then(function (summaryData){
                    let vizScreen = new VizScreen(summaryData, selectedWeeks, "weeks")
                    vizScreen.initializeProgram()
                })
            }
            else{
                if (selectedWeeks.length === 0){
                    alert('Please select at least 2 weeks.')
                }
                else if (selectedWeeks.length === 1){
                    alert('Please select at least one more week.')
                }
            }
        }
        else if (givenValue2 === 'month'){
            let selectedMonths = $('#monthPick').val()
            if (selectedMonths.length >= 2){
                fetchSummaryData(givenValue, givenValue2, selectedMonths).then(function (summaryData){
                    let vizScreen = new VizScreen(summaryData, selectedMonths, "months")
                    vizScreen.initializeProgram()
                })
            }
            else{
                if (selectedMonths.length === 0){
                    alert('Please select at least 2 months.')
                }
                else if (selectedMonths.length === 1){
                    alert('Please select at least one more month.')
                }
            }
        }
    }
    else{
        if (givenValue === '--Please Select --' && givenValue2 === '--Please Select --'){
            alert('Please select a cluster and a time period.')
        }
        else if (givenValue === '--Please Select --'){
            alert('Please select a cluster.')
        }
        else if (givenValue2 === '--Please Select --'){
            alert('Please select a time period.')
        }
    }
}

async function fetchSummaryData(cluster, period, range){
    if (period === 'week'){
        for (let i = 0; i < range.length; i++){
            range[i] = range[i].substring(0,7)
        }
    }
    
    let summaryAPI = 'http://128.110.217.95/summary/bycountry?cluster='+cluster+'&period='+period+'&range='+range.join(",")
    const summaryData = await fetch(summaryAPI)
    const jsonSummaryData = await summaryData.json()
    return jsonSummaryData

}




