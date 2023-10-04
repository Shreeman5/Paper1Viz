class VizScreen{

    static givenData
    static givenTimes

    constructor(summaryData, selectedTimes, timePeriod){
        this.countries = []
        for (let continent of summaryData){
            for (let country of continent.meta){
                this.countries.push(country)
            }
        }


        this.summaryData = this.countries
        this.selectedTimes = selectedTimes
        this.timePeriod = timePeriod

        VizScreen.givenData = this.countries
        VizScreen.givenTimes = selectedTimes
    }


    initializeProgram(){
        this.removeUserNameFilterOptions2()

        this.fillInDateGapsForData() //Fill Gaps in Date in Data
        this.removePathsAndStarsAndRects()
        this.removeBarGraphParallelCoordinateDonutChart()

        this.removePreviousDatestoTPs() 
        this.changeDatestoTPs()

        this.removeBaseOptions()
        this.optionsForBaseSelections() 

        this.removeStuffinFilterAndNonFilterDiv()
        this.addStuffForElementsinFilterAndNonFilterDiv()
 
        
        
        this.removeRedSpotFromTable()
        this.removeTableTHelements()
        this.makeTableTHstructure()
        this.makeTable()

       
    }

    removeUserNameFilterOptions2(){
        document.getElementById("usernameFilter").style.width = "0px"
        document.getElementById("usernameFilter").style.height = "0px"
        $('#usernameFilter').find('option').remove()
    }



    fillInDateGapsForData(){
        for (let country of this.summaryData){
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

    removePathsAndStarsAndRects(){
        if (document.getElementById("rect1")){
            d3.selectAll("#rect1").remove()
        }
        if (document.getElementById("changeTriangles")){
            d3.selectAll("#changeTriangles").remove()
        }
        if (document.getElementById("rect2")){
            d3.selectAll("#rect2").remove()
        }
        if (document.getElementById("bgrect")){
            d3.selectAll('#bgrect').remove()
        }
        if (document.getElementById("bgrect2")){
            d3.selectAll("#bgrect2").remove()
        }
        if (document.getElementById("bgrect3")){
            d3.selectAll("#bgrect3").remove()
        }
        if (document.getElementById("bgrect4")){
            d3.selectAll("#bgrect4").remove()
        }
    }

    removeBarGraphParallelCoordinateDonutChart(){
        if (document.getElementById("comparisonGroupedBarGraph"))
            document.getElementById("comparisonGroupedBarGraph").innerHTML = ""
            document.getElementById("comparisonGroupedBarGraph").style.outline = "none"
        if (document.getElementById("parallelCoordinatesGraph"))
            document.getElementById("parallelCoordinatesGraph").innerHTML = ""
            document.getElementById("parallelCoordinatesGraph").style.outline = "none"
        if (document.getElementById("donutGraph"))
            document.getElementById("donutGraph").innerHTML = ""
            document.getElementById("donutGraph").style.outline = "none"
    }
    

    
    removePreviousDatestoTPs(){
        if (document.getElementById("textsForTP"))
            document.getElementById("textsForTP").innerHTML = ""
    }

    changeDatestoTPs(){
        const svg = d3.select("#textsForTP")
        svg.append('text').attr("x", 10).attr("y", 30).text("TP = Time Period").style("font-size", "25px")//[Please consult this for all charts][Insert tooltip here]
        let k = 60
        for (let i = 0;  i < this.selectedTimes.length; i++){
            let optionalString = ''
            if (this.timePeriod === 'weeks'){
                let stringForMoment = this.selectedTimes[i].substring(0,4) + 'W' + this.selectedTimes[i].substring(5,7)
                let momentValue = moment(stringForMoment).add(1, 'days').toDate() + ''
                optionalString = '-' + momentValue.substring(4,7) + '-' + momentValue.substring(8,10)
            }
            let text = this.selectedTimes[i] + optionalString + ' --> TP' + (i+1)
            svg.append('text').attr("x", 10).attr("y", k).text(text)
                .style("font-size", "25px")
            k = k + 30
        }
        
        document.getElementById("textsForTP").style.height = (k-20) + "px"
        document.getElementById("textsForTP").style.outline = "5px dashed black"
    }

    removeBaseOptions(){
        $('#baseTP').find('option').remove()
    }


    optionsForBaseSelections(){
        document.getElementById("baseTP").style.width = "200px"
        document.getElementById("baseTP").style.height = "50px"
        let baseSelect = document.getElementById("baseTP")
        let x = 1
        for (let time of this.selectedTimes){
            let option = document.createElement("option")
            option.value = time
            option.text = 'Base -- ' + 'TP' + x
            baseSelect.add(option)
            x += 1
        }
    }

    removeStuffinFilterAndNonFilterDiv(){
        if (document.getElementById("svg1")){
            document.getElementById("svg1").innerHTML = ""
        }
        if (document.getElementById("svg2")){
            document.getElementById("svg2").innerHTML = ""
        }
        // $('#countries').find('option').remove()
        $('#sortTP').find('option').remove()

        if (document.getElementById("svg3")){
            document.getElementById("svg3").innerHTML = ""
        }
        if (document.getElementById("svg4")){
            document.getElementById("svg4").innerHTML = ""
        }
    }

    addStuffForElementsinFilterAndNonFilterDiv(){
        let baseSelect = document.getElementById("baseTP")
        let dynamicSlider = new DynamicSlider(this.summaryData, baseSelect.value)

        let [percentSliderMin, percentSliderMax] = dynamicSlider.percentChangeSliderValues()
        let perSlider = document.getElementById("myRange")
        perSlider.min = percentSliderMin
        perSlider.max = percentSliderMax
        perSlider.value = percentSliderMin
        let perOutput = document.getElementById("PER")
        perOutput.value = ''
        let svg = d3.select("#svg1")
        svg.append('text').attr("x", 0).attr("y", 20).text(this.fixNumbers(percentSliderMin)).style("font-size", "25px") 
        svg.append('text').attr("x", 180).attr("y", 20).text(this.fixNumbers(percentSliderMax)).style("font-size", "25px") 

        let [absoluteSliderMin, absoluteSliderMax] = dynamicSlider.absoluteChangeSliderValues()
        //console.log(absoluteSliderMax)
        let absSlider = document.getElementById("myRange2")
        absSlider.min = absoluteSliderMin
        absSlider.max = absoluteSliderMax
        absSlider.value = absoluteSliderMin
        let absOutput = document.getElementById("ABS")
        absOutput.value = ''
        let svg2 = d3.select("#svg2")
        svg2.append('text').attr("x", 0).attr("y", 20).text(this.fixNumbers(absoluteSliderMin)).style("font-size", "25px") 
        svg2.append('text').attr("x", 180).attr("y", 20).text(this.fixNumbers(absoluteSliderMax)).style("font-size", "25px") 

        // let countrySelect = document.getElementById("countries")
        // for (let country of this.summaryData){
        //     let option = document.createElement("option")
        //     option.value = country.country
        //     option.text = country.country
        //     countrySelect.appendChild(option)
        // }

        let sortSelect = document.getElementById("sortTP")
        let y = 1
        for (let time of this.selectedTimes){
            let option = document.createElement("option")
            option.value = time
            option.text = 'Sort By -- ' + 'TP' + y
            sortSelect.add(option)
            y += 1
        }

        let [percentSliderAnomalyMin, percentSliderAnomaly95, percentSliderAnomalyMax] = dynamicSlider.percentAnomalySliderValues()
        let perAnomSlider = document.getElementById("myRange3")
        perAnomSlider.min = percentSliderAnomalyMin
        perAnomSlider.max = percentSliderAnomalyMax
        perAnomSlider.value = percentSliderAnomaly95
        let perAnomOutput = document.getElementById("COUPER")
        perAnomOutput.value = ''
        let svg3 = d3.select("#svg3")
        svg3.append('text').attr("x", 5).attr("y", 20).text(this.fixNumbers(percentSliderAnomalyMax)).style("font-size", "25px") 
        svg3.append('text').attr("x", 5).attr("y", 200).text(this.fixNumbers(percentSliderAnomalyMin)).style("font-size", "25px") 
        
        let [absoluteSliderAnomalyMin, absoluteSliderAnomaly95, absoluteSliderAnomalyMax] = dynamicSlider.absoluteAnomalySliderValues()
        let absAnomSlider = document.getElementById("myRange4")
        absAnomSlider.min = absoluteSliderAnomalyMin
        absAnomSlider.max = absoluteSliderAnomalyMax
        absAnomSlider.value = absoluteSliderAnomaly95
        let absAnomOutput = document.getElementById("COUABS")
        absAnomOutput.value = ''
        let svg4 = d3.select("#svg4")
        svg4.append('text').attr("x", 5).attr("y", 20).text(this.fixNumbers(absoluteSliderAnomalyMax)).style("font-size", "25px") 
        svg4.append('text').attr("x", 5).attr("y", 200).text(this.fixNumbers(absoluteSliderAnomalyMin)).style("font-size", "25px") 
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

    removeTableTHelements(){
        $("#predictionTable>thead>tr").find("th").remove()
    }

    makeTableTHstructure(){
        $("#predictionTable>thead>tr").append("<th class=sortable id=c0 width=270px>Country</th>")
        let i = 1
        for (let time of this.selectedTimes){
            $("#predictionTable>thead>tr").append("<th class=sortable id=c"+i+">TP"+i +"<input type=checkbox id=TP"+i+" value="+time+" onchange=timeSelection();></th>")
            let requiredBox = 'TP'+i
            document.getElementById(requiredBox).style.maxWidth = "30px"
            i++
        }

    }

    makeTable(){
        let baseSelect = document.getElementById("baseTP")
        let table = new Table(this.summaryData, baseSelect.value, this.selectedTimes)
        

        setTimeout( function() { table.drawTable(); }, 2000)
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


function removePreviousSVGs2(){
    // console.log('here')
    if (document.getElementById("svg1")){
        document.getElementById("svg1").innerHTML = ""
    }
    if (document.getElementById("svg2")){
        document.getElementById("svg2").innerHTML = ""
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

function removePathsAndStarsAndRects2(){
    if (document.getElementById("rect1")){
        d3.selectAll("#rect1").remove()
    }
    if (document.getElementById("changeTriangles")){
        d3.selectAll("#changeTriangles").remove()
    }
    if (document.getElementById("rect2")){
        d3.selectAll("#rect2").remove()
    }
    if (document.getElementById("bgrect")){
        d3.selectAll('#bgrect').remove()
    }
    if (document.getElementById("bgrect2")){
        d3.selectAll("#bgrect2").remove()
    }
    if (document.getElementById("bgrect3")){
        d3.selectAll("#bgrect3").remove()
    }
    if (document.getElementById("bgrect4")){
        d3.selectAll("#bgrect4").remove()
    }
}


function baseTPFunc(selectedTime){
    // bookkeeping
    removePreviousSVGs2()
    removePathsAndStarsAndRects2()

    // Updating sliders with base
    let dynamicSlider = new DynamicSlider(VizScreen.givenData, selectedTime)

    let [percentSliderMin, percentSliderMax] = dynamicSlider.percentChangeSliderValues()
    let perSlider = document.getElementById("myRange")
    perSlider.min = percentSliderMin
    perSlider.max = percentSliderMax
    perSlider.value = percentSliderMin
    let perOutput = document.getElementById("PER")
    perOutput.value = ''
    let svg = d3.select("#svg1")
    svg.append('text').attr("x", 0).attr("y", 20).text(fixNumbers2(percentSliderMin)).style("font-size", "25px") 
    svg.append('text').attr("x", 180).attr("y", 20).text(fixNumbers2(percentSliderMax)).style("font-size", "25px") 


    let [absoluteSliderMin, absoluteSliderMax] = dynamicSlider.absoluteChangeSliderValues()
    console.log(absoluteSliderMax)
    let absSlider = document.getElementById("myRange2")
    absSlider.min = absoluteSliderMin
    absSlider.max = absoluteSliderMax
    absSlider.value = absoluteSliderMin
    let absOutput = document.getElementById("ABS")
    absOutput.value = ''
    let svg2 = d3.select("#svg2")
    svg2.append('text').attr("x", 0).attr("y", 20).text(fixNumbers2(absoluteSliderMin)).style("font-size", "25px") 
    svg2.append('text').attr("x", 180).attr("y", 20).text(fixNumbers2(absoluteSliderMax)).style("font-size", "25px") 
        
    // reshaping viz
    let table = new Table(VizScreen.givenData, selectedTime, VizScreen.givenTimes)
    setTimeout( function() { table.drawTable(); }, 2000)
    this.removeRedSpotInTable()
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
    this.removeUserNameFilterOptions()
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
    document.getElementById("comparisonGroupedBarGraph").style.outline = "none"
    document.getElementById("parallelCoordinatesGraph").style.outline = "none"
    document.getElementById("donutGraph").style.outline = "none"
}


function threshold(){
    // bookkeeping
    removePathsAndStarsAndRects2()

    //keeping slider and textbox aligned
    let slider1 = document.getElementById("myRange")
    let textBox1 = document.getElementById("PER")
    textBox1.value = slider1.value 

    let range = document.getElementById("myRange2")
    let textBox2 = document.getElementById("ABS")
    range.value = range.min
    textBox2.value = range.min

    // reshaping viz
    let currentBaseTime = document.getElementById("baseTP").value
    let table = new Table(VizScreen.givenData, currentBaseTime, VizScreen.givenTimes)
    setTimeout( function() { table.drawTable(); }, 2000)
    this.removeRedSpotInTable()
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
    this.removeUserNameFilterOptions()
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
    document.getElementById("comparisonGroupedBarGraph").style.outline = "none"
    document.getElementById("parallelCoordinatesGraph").style.outline = "none"
    document.getElementById("donutGraph").style.outline = "none"
}

function textBox1(typedNumber){
    // bookkeeping
    removePathsAndStarsAndRects2()


    //keeping slider and textbox aligned
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

    
    // reshaping viz
    let currentBaseTime = document.getElementById("baseTP").value
    let table = new Table(VizScreen.givenData, currentBaseTime, VizScreen.givenTimes)
    setTimeout( function() { table.drawTable(); }, 2000)
    this.removeRedSpotInTable()
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
    this.removeUserNameFilterOptions()
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
    document.getElementById("comparisonGroupedBarGraph").style.outline = "none"
    document.getElementById("parallelCoordinatesGraph").style.outline = "none"
    document.getElementById("donutGraph").style.outline = "none"
}

function threshold2(){
    // bookkeeping
    removePathsAndStarsAndRects2()

    //keeping slider and textbox aligned
    let slider2 = document.getElementById("myRange2")
    let textBox2 = document.getElementById("ABS")
    textBox2.value = slider2.value 

    let range = document.getElementById("myRange")    
    let textBox1 = document.getElementById("PER")
    range.value = range.min
    textBox1.value = range.min


    // reshaping viz
    let currentBaseTime = document.getElementById("baseTP").value
    let table = new Table(VizScreen.givenData, currentBaseTime, VizScreen.givenTimes)
    setTimeout( function() { table.drawTable(); }, 2000)
    this.removeRedSpotInTable()
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
    this.removeUserNameFilterOptions()
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
    document.getElementById("comparisonGroupedBarGraph").style.outline = "none"
    document.getElementById("parallelCoordinatesGraph").style.outline = "none"
    document.getElementById("donutGraph").style.outline = "none"
}

function textBox2(typedNumber){
    // bookkeeping
    removePathsAndStarsAndRects2()


    //keeping slider and textbox aligned
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

    // reshaping viz
    let currentBaseTime = document.getElementById("baseTP").value
    let table = new Table(VizScreen.givenData, currentBaseTime, VizScreen.givenTimes)
    setTimeout( function() { table.drawTable(); }, 2000)
    this.removeRedSpotInTable()
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
    this.removeUserNameFilterOptions()
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
    document.getElementById("comparisonGroupedBarGraph").style.outline = "none"
    document.getElementById("parallelCoordinatesGraph").style.outline = "none"
    document.getElementById("donutGraph").style.outline = "none"
}

function threshold3(){ 
    // bookkeeping
    removePathsAndStarsAndRects2()


    //keeping slider and textbox aligned
    let slider1 = document.getElementById("myRange3")
    let textBox1 = document.getElementById("COUPER")
    textBox1.value = slider1.value 

    // reshaping viz
    let currentBaseTime = document.getElementById("baseTP").value
    let table = new Table(VizScreen.givenData, currentBaseTime, VizScreen.givenTimes)
    setTimeout( function() { table.drawTable(); }, 2000)
    this.removeRedSpotInTable()
    // jury is out on whether the below should be done or not
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
    this.removeUserNameFilterOptions()
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
    document.getElementById("comparisonGroupedBarGraph").style.outline = "none"
    document.getElementById("parallelCoordinatesGraph").style.outline = "none"
    document.getElementById("donutGraph").style.outline = "none"
}


function textBox3(typedNumber){
    // bookkeeping
    removePathsAndStarsAndRects2()


    //keeping slider and textbox aligned
    let slider = document.getElementById("myRange3");
    if (isNaN(typedNumber) | typedNumber === ''){
        slider.value = slider.min
    }
    else{
        slider.value = typedNumber
    }

    // reshaping viz
    let currentBaseTime = document.getElementById("baseTP").value
    let table = new Table(VizScreen.givenData, currentBaseTime, VizScreen.givenTimes)
    setTimeout( function() { table.drawTable(); }, 2000)
    this.removeRedSpotInTable()
    // jury is out on whether the below should be done or not
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
    this.removeUserNameFilterOptions()
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
    document.getElementById("comparisonGroupedBarGraph").style.outline = "none"
    document.getElementById("parallelCoordinatesGraph").style.outline = "none"
    document.getElementById("donutGraph").style.outline = "none"
}

function threshold4(){ 
    // bookkeeping
    removePathsAndStarsAndRects2()

    //keeping slider and textbox aligned
    let slider1 = document.getElementById("myRange4")
    let textBox1 = document.getElementById("COUABS")
    textBox1.value = slider1.value 

    // reshaping viz
    let currentBaseTime = document.getElementById("baseTP").value
    let table = new Table(VizScreen.givenData, currentBaseTime, VizScreen.givenTimes)
    setTimeout( function() { table.drawTable(); }, 2000)
    this.removeRedSpotInTable()
    // jury is out on whether the below should be done or not
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
    this.removeUserNameFilterOptions()
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
    document.getElementById("comparisonGroupedBarGraph").style.outline = "none"
    document.getElementById("parallelCoordinatesGraph").style.outline = "none"
    document.getElementById("donutGraph").style.outline = "none"
}


function textBox4(typedNumber){
    // bookkeeping
    removePathsAndStarsAndRects2()
    //keeping slider and textbox aligned
    let slider = document.getElementById("myRange4");
    if (isNaN(typedNumber) | typedNumber === ''){
        slider.value = slider.min
    }
    else{
        slider.value = typedNumber
    }

    // reshaping viz
    let currentBaseTime = document.getElementById("baseTP").value
    let table = new Table(VizScreen.givenData, currentBaseTime, VizScreen.givenTimes)
    setTimeout( function() { table.drawTable(); }, 2000)
    this.removeRedSpotInTable()
    // jury is out on whether the below should be done or not
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
    this.removeUserNameFilterOptions()
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
    document.getElementById("comparisonGroupedBarGraph").style.outline = "none"
    document.getElementById("parallelCoordinatesGraph").style.outline = "none"
    document.getElementById("donutGraph").style.outline = "none"
}

function sortTPFunc(){
    // bookkeeping
    //removePreviousSVGs2()
    removePathsAndStarsAndRects2()

    // reshaping viz
    let currentBaseTime = document.getElementById("baseTP").value
    let table = new Table(VizScreen.givenData, currentBaseTime, VizScreen.givenTimes)
    setTimeout( function() { table.drawTable(); }, 2000)
    this.removeRedSpotInTable()
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
    this.removeUserNameFilterOptions()
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
    document.getElementById("comparisonGroupedBarGraph").style.outline = "none"
    document.getElementById("parallelCoordinatesGraph").style.outline = "none"
    document.getElementById("donutGraph").style.outline = "none"
}

function timeSelection(){
    let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
    let selectedTPsLength = checkedBoxes.length

    if (Table.countriesChosenUsedInAnotherFunction.length > 1 && (selectedTPsLength > 1 || selectedTPsLength === 0)){
        alert("Press ok. Then, EITHER have multiple countries and one time period OR have multiple time periods and one country.")

        let cgbg = document.getElementById("comparisonGroupedBarGraph")
        cgbg.innerHTML = ''
        this.removeUserNameFilterOptions()
        let pcg = document.getElementById("parallelCoordinatesGraph")
        pcg.innerHTML = ''
        let dc = document.getElementById("donutGraph")
        dc.innerHTML = ''
        document.getElementById("comparisonGroupedBarGraph").style.outline = "none"
        document.getElementById("parallelCoordinatesGraph").style.outline = "none"
        document.getElementById("donutGraph").style.outline = "none"
    }
    else{
        let cgbg = document.getElementById("comparisonGroupedBarGraph")
        cgbg.innerHTML = ''
        document.getElementById("comparisonGroupedBarGraph").style.outline = "none"
        let barGraph = new BarGraph(Table.countriesChosenUsedInAnotherFunction)
        barGraph.fetchData()
    
        
        this.removeUserNameFilterOptions()
        let pcg = document.getElementById("parallelCoordinatesGraph")
        pcg.innerHTML = ''
        document.getElementById("parallelCoordinatesGraph").style.outline = "none"
        let parallelCoordinate = new ParallelCoordinate(Table.countriesChosenUsedInAnotherFunction, "no")
        parallelCoordinate.fetchData2()
    
        let dc = document.getElementById("donutGraph")
        dc.innerHTML = ''
        document.getElementById("donutGraph").style.outline = "none"
        let donutGraph = new Donut(Table.countriesChosenUsedInAnotherFunction)
        donutGraph.fetchData3()
    }
}

function countrySelect(value){
    removePathsAndStarsAndRects2()
    
    let countries = []
    for (let country of VizScreen.givenData){
        if (value === country.country){
            countries.push(country)
        }
    }

    let currentBaseTime = document.getElementById("baseTP").value
    if (value === ''){
        let table = new Table(VizScreen.givenData, currentBaseTime, VizScreen.givenTimes)
        setTimeout( function() { table.drawTable(); }, 2000)
        this.removeRedSpotInTable()
    }
    else{
        let table = new Table(countries, currentBaseTime, VizScreen.givenTimes)
        setTimeout( function() { table.drawTable(); }, 2000)
        this.removeRedSpotInTable()
    }
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

function filterUsername(){
    let pcg = document.getElementById("parallelCoordinatesGraph")
    pcg.innerHTML = ''
    document.getElementById("parallelCoordinatesGraph").style.outline = "none"
    let parallelCoordinate = new ParallelCoordinate(Table.countriesChosenUsedInAnotherFunction, "yes")
    parallelCoordinate.fetchData2()
}

function removeUserNameFilterOptions(){
    document.getElementById("usernameFilter").style.width = "0px"
    document.getElementById("usernameFilter").style.height = "0px"
    $('#usernameFilter').find('option').remove()
}



