class VizScreen{

    static givenData
    static givenTimes

    constructor(summaryData, selectedTimes, timePeriod){
        this.summaryData = summaryData
        this.selectedTimes = selectedTimes
        this.timePeriod = timePeriod

        VizScreen.givenData = summaryData
        VizScreen.givenTimes = selectedTimes
    }

    initializeProgram(){
        //console.log(this.summaryData)
        //console.log(this.selectedTimes)
        this.removePathsAndRects()
        this.removePreviousSVGs()
        this.removePreviousDatestoTPs()
        this.removeBaseandSortOptions()
        this.removeCountryOptions()
        this.removeTableTHelements()
        this.removeTextElementsFromLineCharts()
        this.removeBarGraphParallelCoordinateDonutChart()
        this.fillInDateGapsForData()
        this.optionsForBaseAndSortBySelections()
        this.optionForCountriesSelections()
        this.changeDatestoTPs()
        this.findMinMaxSliderValues()
        this.makeTableTHstructure()
        this.removeRedSpotFromTable()
        this.makeTableAndLineCharts()
    }

    removePathsAndRects(){
        if (document.getElementById("bgrect")){
            d3.selectAll('#bgrect').remove()
        }
        if (document.getElementById("blackStar")){
            d3.selectAll("#blackStar").remove()
        }
        if (document.getElementById("brownStar")){
            d3.selectAll("#brownStar").remove()
        }
        if (document.getElementById("yellowStar")){
            d3.selectAll("#yellowStar").remove()
        }
    }

    removePreviousSVGs(){
        // console.log('here')
        if (document.getElementById("svg1")){
            document.getElementById("svg1").remove()
        }
        if (document.getElementById("svg2")){
            document.getElementById("svg2").remove()
        }
        if (document.getElementById("svg3")){
            document.getElementById("svg3").remove()
        }
        if (document.getElementById("svg4")){
            document.getElementById("svg4").remove()
        }
    }

    removePreviousDatestoTPs(){
        if (document.getElementById("textsForTP"))
            document.getElementById("textsForTP").innerHTML = ""
    }

    changeDatestoTPs(){
        const svg = d3.select("#textsForTP")
        svg.append('text').attr("x", 10).attr("y", 30).text("TP = Time Period").style("font-size", "25px")//[Please consult this for all charts]
        let k = 60
        for (let i = 0;  i < this.selectedTimes.length; i++){
            // let j
            // if (i % 3 === 0){
            //     j = 50
            // }
            // else if (i % 3 === 1){
            //     j = 330
            // }
            // else if (i % 3 === 2){
            //     j = 600
            // }

            let optionalString = ''
            if (this.timePeriod === 'weeks'){
                let stringForMoment = this.selectedTimes[i].substring(0,4) + 'W' + this.selectedTimes[i].substring(5,7)
                let momentValue = moment(stringForMoment).add(1, 'days').toDate() + ''
                optionalString = '-' + momentValue.substring(4,7) + '-' + momentValue.substring(8,10)
            }
            // console.log(moment("2013W20").toDate())
            // console.log(this.selectedTimes[i])
            let text = this.selectedTimes[i] + optionalString + ' --> TP' + (i+1)
            svg.append('text').attr("x", 10).attr("y", k).text(text)
                .style("font-size", "25px")
            // if (i % 3 === 2){
            //     k = k + 30
            // }
            k = k + 30
        }
    }

    removeRedSpotFromTable(){
        let tableBody = document.getElementById('predictionTableBody');
        for (let i = 0, row; row = tableBody.rows[i]; i++) {
            for (let j = 0, col; col = row.cells[j]; j++) {
                col.style.color = 'black'
                if (col.className === 'continent'){
                    col.style.font = "25px times"
                }
                else{
                    col.style.font = "20px times"
                }
            }  
        }
    }


    removeBarGraphParallelCoordinateDonutChart(){
        if (document.getElementById("comparisonGroupedBarGraph"))
            document.getElementById("comparisonGroupedBarGraph").innerHTML = ""
        if (document.getElementById("parallelCoordinatesGraph"))
            document.getElementById("parallelCoordinatesGraph").innerHTML = ""
        if (document.getElementById("donutGraph"))
            document.getElementById("donutGraph").innerHTML = ""
    }

    removeTextElementsFromLineCharts(){
        if (document.getElementById("t1"))
            document.getElementById("t1").outerHTML = ""
        if (document.getElementById("t2"))
            document.getElementById("t2").outerHTML = ""
        if (document.getElementById("t3"))
            document.getElementById("t3").outerHTML = ""
        if (document.getElementById("t4"))
            document.getElementById("t4").outerHTML = ""
        if (document.getElementById("t5"))
            document.getElementById("t5").outerHTML = ""
        if (document.getElementById("t6"))
            document.getElementById("t6").outerHTML = ""
    }


    removeBaseandSortOptions(){
        $('#dataset-select').find('option').remove()
        $('#dataset-select-2').find('option').remove()
    }

    removeCountryOptions(){
        $('#countries').find('option').remove()
    }

    removeTableTHelements(){
        $("#predictionTable>thead>tr").find("th:gt(0)").remove()
    }

    fillInDateGapsForData(){
        for (let continent of this.summaryData){
            for (let country of continent.meta){
                for (let time of this.selectedTimes){
                    if (time in country){
                        continue
                    }
                    else{
                        country[time] = {attacks: 0, attackers: 0}
                    }
                }
            }
        }
    }

    optionsForBaseAndSortBySelections(){
        let baseSelect = document.getElementById("dataset-select")
        //console.log(this.selectedTimes)
        let x = 1
        for (let time of this.selectedTimes){
            //console.log(time)
            let option = document.createElement("option")
            option.value = time
            option.text = 'Base -- ' + 'TP' + x
            baseSelect.add(option)
            x += 1
        }

        let sortSelect = document.getElementById("dataset-select-2")
        //console.log(this.selectedTimes)
        let y = 1
        for (let time of this.selectedTimes){
            //console.log(time)
            let option = document.createElement("option")
            option.value = time
            option.text = 'Sort By -- ' + 'TP' + y
            sortSelect.add(option)
            y += 1
        }
    }

    optionForCountriesSelections(){
        let countrySelect = document.getElementById("countries")
        // console.log(this.summaryData)
        for (let forecast of this.summaryData){
            //console.log(forecast)
            let option2 = document.createElement("option")
            option2.value = forecast.region
            option2.text = forecast.region
            countrySelect.appendChild(option2)
            for (let country of forecast.meta){
                let option = document.createElement("option")
                option.value = country.country
                option.text = country.country
                countrySelect.appendChild(option)
            }
        }
    }

    findMinMaxSliderValues(){
        let baseSelect = document.getElementById("dataset-select")
        //console.log(this.summaryData)
        let dynamicSlider = new DynamicSlider(this.summaryData, baseSelect.value)

        let [percentSliderMin, percentSliderMax] = dynamicSlider.percentChangeSliderValues()
        //console.log(percentSliderMin, percentSliderMax)
        let perSlider = document.getElementById("myRange")
        perSlider.min = percentSliderMin
        perSlider.max = percentSliderMax
        perSlider.value = percentSliderMin
        let perOutput = document.getElementById("PER")
        perOutput.value = ''
        // perOutput.placeholder = this.fixNumbers(percentSliderMin) + " <= x <= " + this.fixNumbers(percentSliderMax)  
        let svg = d3.select(".slidecontainer").append("svg").attr("id", "svg1").attr("x", 0).attr("y", 0).attr("width", 300).attr("height", 310)
        svg.append('text').attr("x", 130).attr("y", 30).text(this.fixNumbers(percentSliderMax)).style("font-size", "25px") 
        svg.append('text').attr("x", 130).attr("y", 210).text(this.fixNumbers(percentSliderMin)).style("font-size", "25px") 

        let [absoluteSliderMin, absoluteSliderMax] = dynamicSlider.absoluteChangeSliderValues()
        //console.log(absoluteSliderMin, absoluteSliderMax)
        let absSlider = document.getElementById("myRange2")
        absSlider.min = absoluteSliderMin
        absSlider.max = absoluteSliderMax
        absSlider.value = absoluteSliderMin
        let absOutput = document.getElementById("ABS")
        absOutput.value = ''
        // absOutput.placeholder = this.fixNumbers(absoluteSliderMin) + " <= x <= " + this.fixNumbers(absoluteSliderMax) 
        let svg2 = d3.select(".slidecontainer2").append("svg").attr("id", "svg2").attr("x", 0).attr("y", 0).attr("width", 300).attr("height", 310)
        svg2.append('text').attr("x", 130).attr("y", 30).text(this.fixNumbers(absoluteSliderMax)).style("font-size", "25px") 
        svg2.append('text').attr("x", 130).attr("y", 210).text(this.fixNumbers(absoluteSliderMin)).style("font-size", "25px") 

        let [percentSliderAnomalyMin, percentSliderAnomaly95, percentSliderAnomalyMax] = dynamicSlider.percentAnomalySliderValues()
        //console.log(percentSliderAnomalyMin, percentSliderAnomaly95, percentSliderAnomalyMax)
        let perAnomSlider = document.getElementById("myRange3")
        perAnomSlider.min = percentSliderAnomalyMin
        perAnomSlider.max = percentSliderAnomalyMax
        perAnomSlider.value = percentSliderAnomaly95
        let perAnomOutput = document.getElementById("COUPER")
        perAnomOutput.value = ''
        // perAnomOutput.placeholder = this.fixNumbers(percentSliderAnomalyMin) + " <= x <= " + this.fixNumbers(percentSliderAnomalyMax)
        let svg3 = d3.select(".slidecontainer3").append("svg").attr("id", "svg3").attr("x", 0).attr("y", 0).attr("width", 300).attr("height", 310)
        svg3.append('text').attr("x", 150).attr("y", 40).text(this.fixNumbers(percentSliderAnomalyMax)).style("font-size", "25px") 
        svg3.append('text').attr("x", 10).attr("y", 40).text(this.fixNumbers(percentSliderAnomalyMin)).style("font-size", "25px") 
        
        let [absoluteSliderAnomalyMin, absoluteSliderAnomaly95, absoluteSliderAnomalyMax] = dynamicSlider.absoluteAnomalySliderValues()
        //console.log(absoluteSliderAnomalyMin, absoluteSliderAnomaly95, absoluteSliderAnomalyMax)
        let absAnomSlider = document.getElementById("myRange4")
        absAnomSlider.min = absoluteSliderAnomalyMin
        absAnomSlider.max = absoluteSliderAnomalyMax
        absAnomSlider.value = absoluteSliderAnomaly95
        let absAnomOutput = document.getElementById("COUABS")
        absAnomOutput.value = ''
        // absAnomOutput.placeholder = this.fixNumbers(absoluteSliderAnomalyMin) + " <= x <= " + this.fixNumbers(absoluteSliderAnomalyMax) 
        let svg4 = d3.select(".slidecontainer4").append("svg").attr("id", "svg4").attr("x", 0).attr("y", 0).attr("width", 300).attr("height", 310)
        svg4.append('text').attr("x", 150).attr("y", 40).text(this.fixNumbers(absoluteSliderAnomalyMax)).style("font-size", "25px") 
        svg4.append('text').attr("x", 10).attr("y", 40).text(this.fixNumbers(absoluteSliderAnomalyMin)).style("font-size", "25px") 
    }

    fixNumbers(value){
        if (Math.abs(value) >= 100000){
            return (value/1000000).toFixed(1) + 'M'
        }
        else if (Math.abs(value) >= 1000){
            return (value/1000).toFixed(1) + 'K'
        }
        else{
            return value.toFixed(1) + ''
        }
    }

    makeTableTHstructure(){
        //console.log(this.selectedTimes) 
        let i = 1
        for (let time of this.selectedTimes){

            let timePeriodTotal = 0
            for (let continent of this.summaryData){
                let metaValues = continent.meta
                for (let country of metaValues){
                    for (const [key, value] of Object.entries(country)) {
                        if (key === time){
                            for (const [key2, value2] of Object.entries(value)) {
                                if (key2 === 'attacks'){
                                    timePeriodTotal += value2
                                }
                            }
                        }
                    }
                }
            }


            $("#predictionTable>thead>tr").append("<th class=sortable id=c"+i+">TP"+i +"["+this.fixNumbers(timePeriodTotal)+"]<input type=checkbox id=TP"+i+" value="+time+" onchange=dataSelect3();></th>")
            let requiredBox = 'TP'+i
            document.getElementById(requiredBox).style.maxWidth = "70px"
            i++
        }

    }

    makeTableAndLineCharts(){
        let baseSelect = document.getElementById("dataset-select")
        let table = new Table(this.summaryData, baseSelect.value, this.selectedTimes)
        table.drawTable()
        let linechartAttacks = new LineChartAttacks(this.summaryData, this.selectedTimes)
        linechartAttacks.drawLinechart()
        let linechartAttackers = new LineChartAttackers(this.summaryData, this.selectedTimes)
        linechartAttackers.drawLinechart()
    }

}

function removeRedSpotInTable(){
    //console.log('hello')
    let tableBody = document.getElementById('predictionTableBody');
    for (let i = 0, row; row = tableBody.rows[i]; i++) {
        for (let j = 0, col; col = row.cells[j]; j++) {
            col.style.color = 'black'
            if (col.className === 'continent'){
                col.style.font = "25px times"
            }
            else{
                col.style.font = "20px times"
            }
        }  
    }
}

function threshold(){
    //console.log('yoooooo')
    let slider1 = document.getElementById("myRange")
    let textBox1 = document.getElementById("PER")
    textBox1.value = slider1.value 

    let range = document.getElementById("myRange2")
    let textBox2 = document.getElementById("ABS")
    range.value = range.min
    textBox2.value = range.min

    d3.selectAll('rect').remove()
    d3.selectAll("#blackStar").remove()
    d3.selectAll("#brownStar").remove()
    d3.selectAll("#yellowStar").remove()
    d3.selectAll('#bgrect').remove()
    // console.log(VizScreen.givenData)
    // console.log(VizScreen.givenTimes)
    
    let value = VizScreen.givenData.filter(d => d.isForecast)
    let currentBaseTime = document.getElementById("dataset-select").value
    let table = new Table(value, currentBaseTime, VizScreen.givenTimes)
    //table.removeEventListener()
    table.drawTable()
    this.removeRedSpotInTable()
    let linechartAttacks = new LineChartAttacks(value, VizScreen.givenTimes)
    linechartAttacks.removeText()
    linechartAttacks.drawLinechart()
    let linechartAttackers = new LineChartAttackers(VizScreen.givenData, VizScreen.givenTimes)
    linechartAttackers.removeText()
    linechartAttackers.drawLinechart()
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
}

function textBox1(typedNumber){
    //console.log('yoooooohooooooooo')
    let slider = document.getElementById("myRange");
    if (isNaN(typedNumber) | typedNumber === ''){
        slider.value = slider.min
    }
    else{
        slider.value = typedNumber
    }

    let slider2 = document.getElementById("myRange2");
    let textBox2 = document.getElementById("ABS")
    slider2.value = slider2.min
    textBox2.value = slider2.min

    d3.selectAll('rect').remove()
    d3.selectAll("#blackStar").remove()
    d3.selectAll("#brownStar").remove()
    d3.selectAll("#yellowStar").remove()
    d3.selectAll('#bgrect').remove()
    let value = VizScreen.givenData.filter(d => d.isForecast)
    let currentBaseTime = document.getElementById("dataset-select").value
    let table = new Table(value, currentBaseTime, VizScreen.givenTimes)
    //table.removeEventListener()
    table.drawTable()
    this.removeRedSpotInTable()
    let linechartAttacks = new LineChartAttacks(value, VizScreen.givenTimes)
    linechartAttacks.removeText()
    linechartAttacks.drawLinechart()
    let linechartAttackers = new LineChartAttackers(VizScreen.givenData, VizScreen.givenTimes)
    linechartAttackers.removeText()
    linechartAttackers.drawLinechart()
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
}

function threshold2(){
    let slider2 = document.getElementById("myRange2")
    let textBox2 = document.getElementById("ABS")
    textBox2.value = slider2.value 

    let range = document.getElementById("myRange")    
    let textBox1 = document.getElementById("PER")
    range.value = range.min
    textBox1.value = range.min


    d3.selectAll('rect').remove()
    d3.selectAll("#blackStar").remove()
    d3.selectAll("#brownStar").remove()
    d3.selectAll("#yellowStar").remove()
    d3.selectAll('#bgrect').remove()
    let value = VizScreen.givenData.filter(d => d.isForecast)
    let currentBaseTime = document.getElementById("dataset-select").value
    let table = new Table(value, currentBaseTime, VizScreen.givenTimes)
    table.drawTable()
    this.removeRedSpotInTable()
    let linechartAttacks = new LineChartAttacks(value, VizScreen.givenTimes)
    linechartAttacks.removeText()
    linechartAttacks.drawLinechart()
    let linechartAttackers = new LineChartAttackers(VizScreen.givenData, VizScreen.givenTimes)
    linechartAttackers.removeText()
    linechartAttackers.drawLinechart()
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
}

function textBox2(typedNumber){
    let slider = document.getElementById("myRange2");
    if (isNaN(typedNumber) | typedNumber === ''){
        slider.value = slider.min
    }
    else{
        slider.value = typedNumber
    }

    let slider2 = document.getElementById("myRange");
    let textBox1 = document.getElementById("PER")
    slider2.value = slider2.min
    textBox1.value = slider2.min

    d3.selectAll('rect').remove()
    d3.selectAll("#blackStar").remove()
    d3.selectAll("#brownStar").remove()
    d3.selectAll("#yellowStar").remove()
    d3.selectAll('#bgrect').remove()
    let value = VizScreen.givenData.filter(d => d.isForecast)
    let currentBaseTime = document.getElementById("dataset-select").value
    let table = new Table(value, currentBaseTime, VizScreen.givenTimes)
    table.drawTable()
    this.removeRedSpotInTable()
    let linechartAttacks = new LineChartAttacks(value, VizScreen.givenTimes)
    linechartAttacks.removeText()
    linechartAttacks.drawLinechart()
    let linechartAttackers = new LineChartAttackers(VizScreen.givenData, VizScreen.givenTimes)
    linechartAttackers.removeText()
    linechartAttackers.drawLinechart()
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
}

function threshold3(){ 
    let slider1 = document.getElementById("myRange3")
    let textBox1 = document.getElementById("COUPER")
    textBox1.value = slider1.value 



    
    d3.selectAll('rect').remove()
    d3.selectAll("#blackStar").remove()
    d3.selectAll("#brownStar").remove()
    d3.selectAll("#yellowStar").remove()
    d3.selectAll('#bgrect').remove()
    let value = VizScreen.givenData.filter(d => d.isForecast)
    let currentBaseTime = document.getElementById("dataset-select").value
    let table = new Table(value, currentBaseTime, VizScreen.givenTimes)
    table.drawTable()
    this.removeRedSpotInTable()
    // jury is out on whether the below should be done or not
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
}


function textBox3(typedNumber){
    let slider = document.getElementById("myRange3");
    if (isNaN(typedNumber) | typedNumber === ''){
        slider.value = slider.min
    }
    else{
        slider.value = typedNumber
    }

    d3.selectAll('rect').remove()
    d3.selectAll("#blackStar").remove()
    d3.selectAll("#brownStar").remove()
    d3.selectAll("#yellowStar").remove()
    d3.selectAll('#bgrect').remove()
    let value = VizScreen.givenData.filter(d => d.isForecast)
    let currentBaseTime = document.getElementById("dataset-select").value
    let table = new Table(value, currentBaseTime, VizScreen.givenTimes)
    table.drawTable()
    this.removeRedSpotInTable()
    // jury is out on whether the below should be done or not
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
}

function threshold4(){ 
    let slider1 = document.getElementById("myRange4")
    let textBox1 = document.getElementById("COUABS")
    textBox1.value = slider1.value 

    
    d3.selectAll('rect').remove()
    d3.selectAll("#blackStar").remove()
    d3.selectAll("#brownStar").remove()
    d3.selectAll("#yellowStar").remove()
    d3.selectAll('#bgrect').remove()
    let value = VizScreen.givenData.filter(d => d.isForecast)
    let currentBaseTime = document.getElementById("dataset-select").value
    let table = new Table(value, currentBaseTime, VizScreen.givenTimes)
    table.drawTable()
    this.removeRedSpotInTable()
    // jury is out on whether the below should be done or not
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
}


function textBox4(typedNumber){
    let slider = document.getElementById("myRange4");
    if (isNaN(typedNumber) | typedNumber === ''){
        slider.value = slider.min
    }
    else{
        slider.value = typedNumber
    }

    d3.selectAll('rect').remove()
    d3.selectAll("#blackStar").remove()
    d3.selectAll("#brownStar").remove()
    d3.selectAll("#yellowStar").remove()
    d3.selectAll('#bgrect').remove()
    let value = VizScreen.givenData.filter(d => d.isForecast)
    let currentBaseTime = document.getElementById("dataset-select").value
    let table = new Table(value, currentBaseTime, VizScreen.givenTimes)
    table.drawTable()
    this.removeRedSpotInTable()
    // jury is out on whether the below should be done or not
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
}


function dataSelect(selectedTime){
    d3.selectAll('rect').remove()
    d3.selectAll("#blackStar").remove()
    d3.selectAll("#brownStar").remove()
    d3.selectAll("#yellowStar").remove()
    d3.selectAll('#bgrect').remove()
    let value = VizScreen.givenData.filter(d => d.isForecast)
    console.log(value)
    let dynamicSlider = new DynamicSlider(value, selectedTime)

    let [percentSliderMin, percentSliderMax] = dynamicSlider.percentChangeSliderValues()
    let perSlider = document.getElementById("myRange")
    perSlider.min = percentSliderMin
    perSlider.max = percentSliderMax
    perSlider.value = percentSliderMin
    let perOutput = document.getElementById("PER")
    perOutput.value = ''
    perOutput.placeholder = fixNumbers2(percentSliderMin) + " <= x <= " + fixNumbers2(percentSliderMax) 

    let [absoluteSliderMin, absoluteSliderMax] = dynamicSlider.absoluteChangeSliderValues()
    let absSlider = document.getElementById("myRange2")
    absSlider.min = absoluteSliderMin
    absSlider.max = absoluteSliderMax
    absSlider.value = absoluteSliderMin
    let absOutput = document.getElementById("ABS")
    absOutput.value = ''
    absOutput.placeholder = fixNumbers2(absoluteSliderMin) + " <= x <= " + fixNumbers2(absoluteSliderMax) 

    
    let table = new Table(value, selectedTime, VizScreen.givenTimes)
    table.drawTable()
    this.removeRedSpotInTable()
    let linechartAttacks = new LineChartAttacks(value, VizScreen.givenTimes)
    linechartAttacks.removeText()
    linechartAttacks.drawLinechart()
    let linechartAttackers = new LineChartAttackers(VizScreen.givenData, VizScreen.givenTimes)
    linechartAttackers.removeText()
    linechartAttackers.drawLinechart()

    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
}

function dataSelect2(){
    d3.selectAll('rect').remove()
    d3.selectAll("#blackStar").remove()
    d3.selectAll("#brownStar").remove()
    d3.selectAll("#yellowStar").remove()
    d3.selectAll('#bgrect').remove()
    let value = VizScreen.givenData.filter(d => d.isForecast)
    let currentBaseTime = document.getElementById("dataset-select").value
    let table = new Table(value, currentBaseTime, VizScreen.givenTimes)
    table.drawTable()
    this.removeRedSpotInTable()
    let linechartAttacks = new LineChartAttacks(value, VizScreen.givenTimes)
    linechartAttacks.removeText()
    linechartAttacks.drawLinechart()
    let linechartAttackers = new LineChartAttackers(VizScreen.givenData, VizScreen.givenTimes)
    linechartAttackers.removeText()
    linechartAttackers.drawLinechart()

    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
}

function dataSelect3(){
    //console.log('XXY:', Table.countriesChosenUsedInAnotherFunction)

    let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
    let selectedTPsLength = checkedBoxes.length

    //console.log('XXR:', selectedTPsLength)

    if (Table.countriesChosenUsedInAnotherFunction.length > 1 && selectedTPsLength > 1){
        alert("Press ok. Then, EITHER have multiple countries and one time period OR have multiple time periods and one country.")

        let cgbg = document.getElementById("comparisonGroupedBarGraph")
        cgbg.innerHTML = ''
        let pcg = document.getElementById("parallelCoordinatesGraph")
        pcg.innerHTML = ''
        let dc = document.getElementById("donutGraph")
        dc.innerHTML = ''
    }
    else{
        let cgbg = document.getElementById("comparisonGroupedBarGraph")
        cgbg.innerHTML = ''
        let barGraph = new BarGraph(Table.countriesChosenUsedInAnotherFunction)
        barGraph.fetchData()
    
        let pcg = document.getElementById("parallelCoordinatesGraph")
        pcg.innerHTML = ''
        let parallelCoordinate = new ParallelCoordinate(Table.countriesChosenUsedInAnotherFunction)
        parallelCoordinate.fetchData2()
    
        let dc = document.getElementById("donutGraph")
        dc.innerHTML = ''
        let donutGraph = new Donut(Table.countriesChosenUsedInAnotherFunction)
        donutGraph.fetchData3()
    }
}

function dataSelect4(value){
    console.log(VizScreen.givenData)

    let countries = []
    for (let forecast of VizScreen.givenData){
        if ('meta' in forecast){
            for (let country of forecast.meta){
                if (value === country.country){
                    countries.push(country)
                }
            }
        }
        if (forecast.region === value){
            for (let country of forecast.meta){
                countries.push(country)
            }
        }
    }
    console.log(countries)

    let linechartAttacks = new LineChartAttacks(countries, VizScreen.givenTimes)
    linechartAttacks.removeText()
    linechartAttacks.drawLinechart()
    let linechartAttackers = new LineChartAttackers(countries, VizScreen.givenTimes)
    linechartAttackers.removeText()
    linechartAttackers.drawLinechart()
}

function fixNumbers2(value){
    if (Math.abs(value) >= 100000){
        return (value/1000000).toFixed(1) + 'M'
    }
    else if (Math.abs(value) >= 1000){
        return (value/1000).toFixed(1) + 'K'
    }
    else{
        return value.toFixed(1) + ''
    }
}




