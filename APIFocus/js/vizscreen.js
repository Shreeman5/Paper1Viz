class VizScreen{

    static givenData
    static givenTimes

    constructor(summaryData, selectedTimes){
        this.summaryData = summaryData
        this.selectedTimes = selectedTimes

        VizScreen.givenData = summaryData
        VizScreen.givenTimes = selectedTimes
    }

    initializeProgram(){
        //console.log(this.summaryData)
        //console.log(this.selectedTimes)
        this.removePreviousDatestoTPs()
        this.removeBaseandSortOptions()
        this.removeTableTHelements()
        this.removeTextElementsFromLineCharts()
        this.removeBarGraphParallelCoordinateDonutChart()
        this.fillInDateGapsForData()
        this.optionsForBaseAndSortBySelections()
        this.findMinMaxSliderValues()
        this.makeTableTHstructure()
        this.removeRedSpotFromTable()
        this.makeTableAndLineCharts()
        this.changeDatestoTPs()
    }

    removePreviousDatestoTPs(){
        if (document.getElementById("textsForTP"))
            document.getElementById("textsForTP").innerHTML = ""
    }

    changeDatestoTPs(){
        const svg = d3.select("#textsForTP")
        svg.append('text').attr("x", 50).attr("y", 30).text("TP = Time Period[Please consult this for all charts]").style("font-size", "25px")
        let k = 60
        for (let i = 0;  i < this.selectedTimes.length; i++){
            let j
            if (i % 3 === 0){
                j = 50
            }
            else if (i % 3 === 1){
                j = 300
            }
            else if (i % 3 === 2){
                j = 550
            }
            let text = this.selectedTimes[i] + ' --> TP' + (i+1)
            svg.append('text').attr("x", j).attr("y", k).text(text)
                .style("font-size", "25px")
            if (i % 3 === 2){
                k = k + 30
            }
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
        perOutput.placeholder = this.fixNumbers(percentSliderMin) + " <= x <= " + this.fixNumbers(percentSliderMax)   

        let [absoluteSliderMin, absoluteSliderMax] = dynamicSlider.absoluteChangeSliderValues()
        //console.log(absoluteSliderMin, absoluteSliderMax)
        let absSlider = document.getElementById("myRange2")
        absSlider.min = absoluteSliderMin
        absSlider.max = absoluteSliderMax
        absSlider.value = absoluteSliderMin
        let absOutput = document.getElementById("ABS")
        absOutput.value = ''
        absOutput.placeholder = this.fixNumbers(absoluteSliderMin) + " <= x <= " + this.fixNumbers(absoluteSliderMax) 

        let [percentSliderAnomalyMin, percentSliderAnomaly95, percentSliderAnomalyMax] = dynamicSlider.percentAnomalySliderValues()
        //console.log(percentSliderAnomalyMin, percentSliderAnomaly95, percentSliderAnomalyMax)
        let perAnomSlider = document.getElementById("myRange3")
        perAnomSlider.min = percentSliderAnomalyMin
        perAnomSlider.max = percentSliderAnomalyMax
        perAnomSlider.value = percentSliderAnomaly95
        let perAnomOutput = document.getElementById("COUPER")
        perAnomOutput.value = ''
        perAnomOutput.placeholder = this.fixNumbers(percentSliderAnomalyMin) + " <= x <= " + this.fixNumbers(percentSliderAnomalyMax)
        
        let [absoluteSliderAnomalyMin, absoluteSliderAnomaly95, absoluteSliderAnomalyMax] = dynamicSlider.absoluteAnomalySliderValues()
        //console.log(absoluteSliderAnomalyMin, absoluteSliderAnomaly95, absoluteSliderAnomalyMax)
        let absAnomSlider = document.getElementById("myRange4")
        absAnomSlider.min = absoluteSliderAnomalyMin
        absAnomSlider.max = absoluteSliderAnomalyMax
        absAnomSlider.value = absoluteSliderAnomaly95
        let absAnomOutput = document.getElementById("COUABS")
        absAnomOutput.value = ''
        absAnomOutput.placeholder = this.fixNumbers(absoluteSliderAnomalyMin) + " <= x <= " + this.fixNumbers(absoluteSliderAnomalyMax) 
    }

    fixNumbers(value){
        if (Math.abs(value) >= 100000){
            return (value/1000000).toFixed(1) + 'M'
        }
        else if (Math.abs(value) >= 1000){
            return (value/1000).toFixed(1) + 'K'
        }
        else{
            return value + ''
        }
    }

    makeTableTHstructure(){
        //console.log(this.selectedTimes) 
        let i = 1
        for (let time of this.selectedTimes){
            $("#predictionTable>thead>tr").append("<th class=sortable id=c"+i+">TP"+i+"<input type=checkbox id=TP"+i+" value="+time+" onchange=dataSelect3();></th>")
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
    let slider1 = document.getElementById("myRange")
    let textBox1 = document.getElementById("PER")
    textBox1.value = slider1.value 

    let range = document.getElementById("myRange2")
    let textBox2 = document.getElementById("ABS")
    range.value = range.min
    textBox2.value = range.min

    d3.selectAll('rect').remove()
    // console.log(VizScreen.givenData)
    // console.log(VizScreen.givenTimes)
    
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

function textBox1(typedNumber){
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

function threshold2(){
    let slider2 = document.getElementById("myRange2")
    let textBox2 = document.getElementById("ABS")
    textBox2.value = slider2.value 

    let range = document.getElementById("myRange")    
    let textBox1 = document.getElementById("PER")
    range.value = range.min
    textBox1.value = range.min


    d3.selectAll('rect').remove()
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
    let cgbg = document.getElementById("comparisonGroupedBarGraph")
    cgbg.innerHTML = ''
    let barGraph = new BarGraph()
    barGraph.fetchData()

    let pcg = document.getElementById("parallelCoordinatesGraph")
    pcg.innerHTML = ''
    let parallelCoordinate = new ParallelCoordinate()
    parallelCoordinate.fetchData2()

    let dc = document.getElementById("donutGraph")
    dc.innerHTML = ''
    let donutGraph = new Donut()
    donutGraph.fetchData3()
}

function fixNumbers2(value){
    if (Math.abs(value) >= 100000){
        return (value/1000000).toFixed(1) + 'M'
    }
    else if (Math.abs(value) >= 1000){
        return (value/1000).toFixed(1) + 'K'
    }
    else{
        return value + ''
    }
}




