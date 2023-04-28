async function loadData(){
    let preGrouped = []
    preGrouped.push(await d3.json('./data/utah_at_least_1_failed.json'))
    return preGrouped
}

const globalApplicationState = {
    givenData: null
}

loadData().then((loadedData) => {
    globalApplicationState.givenData = loadedData[0]
    let table = new Table(globalApplicationState.givenData, "0")
    table.drawTable()
    let linechartAttacks = new LineChartAttacks(globalApplicationState.givenData, "0")
    linechartAttacks.drawLinechart()
    let linechartAttackers = new LineChartAttackers(globalApplicationState.givenData)
    linechartAttackers.drawLinechart()

    
    //let slider = document.getElementById("myRange");
    // let output = document.getElementById("demo");
    // output.innerHTML = slider.value; 
    // slider.oninput = function() {
    //     output.innerHTML = this.value;
    // }

    //change this to -3.6M and fix slider also
    //let slider2 = document.getElementById("myRange2");
    // let output2 = document.getElementById("demo2");
    // output2.innerHTML = slider2.value;
    // slider2.oninput = function() {
    //     output2.innerHTML = this.value;
    // }
})



function threshold(){ 
    let textBox1 = document.getElementById("PER")
    let slider1 = document.getElementById("myRange")
    textBox1.value = slider1.value 

    let range = document.getElementById("myRange2")
    range.value = '-3600000';
    // let newVal = document.getElementById("demo2");
    // newVal.innerHTML = range.value; 
    // range.oninput = function() {
    //     newVal.innerHTML = this.value;
    // }
    let textBox2 = document.getElementById("ABS")
    textBox2.value = '-3600000'

    
    d3.selectAll('rect').remove()
    let value = globalApplicationState.givenData.filter(d => d.isForecast)
    let currentBaseWeek = document.getElementById("dataset-select").value
    let table = new Table(value, currentBaseWeek)
    table.drawTable()
    let linechartAttacks = new LineChartAttacks(value, currentBaseWeek)
    linechartAttacks.removeText()
    linechartAttacks.drawLinechart()
    let linechartAttackers = new LineChartAttackers(globalApplicationState.givenData)
    linechartAttackers.removeText()
    linechartAttackers.drawLinechart()
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
}

function textBox1(typedNumber){
    //console.log('rere:', typedNumber)

    let slider = document.getElementById("myRange");
    slider.value = typedNumber
    // let output = document.getElementById("demo");
    // output.innerHTML = typedNumber; 

    let textBox2 = document.getElementById("ABS")
    textBox2.value = '-3600000'
    let slider2 = document.getElementById("myRange2");
    slider2.value = '-3600000'
    // let output2 = document.getElementById("demo2");
    // output2.innerHTML = '-3600000'; 

    d3.selectAll('rect').remove()
    let value = globalApplicationState.givenData.filter(d => d.isForecast)
    let currentBaseWeek = document.getElementById("dataset-select").value
    let table = new Table(value, currentBaseWeek)
    table.drawTable()
    let linechartAttacks = new LineChartAttacks(value, currentBaseWeek)
    linechartAttacks.removeText()
    linechartAttacks.drawLinechart()
    let linechartAttackers = new LineChartAttackers(globalApplicationState.givenData)
    linechartAttackers.removeText()
    linechartAttackers.drawLinechart()
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
}

function threshold2(){
    let range = document.getElementById("myRange")
    range.value = '-100';
    // let newVal = document.getElementById("demo");
    // newVal.innerHTML = range.value; 
    // range.oninput = function() {
    //     newVal.innerHTML = this.value;
    // }
    let textBox1 = document.getElementById("PER")
    textBox1.value = '-100'

    let textBox2 = document.getElementById("ABS")
    let slider2 = document.getElementById("myRange2")
    textBox2.value = slider2.value 

    d3.selectAll('rect').remove()
    let value = globalApplicationState.givenData.filter(d => d.isForecast)
    let currentBaseWeek = document.getElementById("dataset-select").value
    let table = new Table(value, currentBaseWeek)
    table.drawTable()
    let linechartAttacks = new LineChartAttacks(value, currentBaseWeek)
    linechartAttacks.removeText()
    linechartAttacks.drawLinechart()
    let linechartAttackers = new LineChartAttackers(globalApplicationState.givenData)
    linechartAttackers.removeText()
    linechartAttackers.drawLinechart()
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
}


function textBox2(typedNumber){
    let slider = document.getElementById("myRange2");
    slider.value = typedNumber
    // let output = document.getElementById("demo2");
    // output.innerHTML = typedNumber; // Display the default slider value

    let textBox1 = document.getElementById("PER")
    textBox1.value = '-100'
    let slider2 = document.getElementById("myRange");
    slider2.value = '-100'
    // let output2 = document.getElementById("demo");
    // output2.innerHTML = '-100'; // Display the default slider value

    d3.selectAll('rect').remove()
    let value = globalApplicationState.givenData.filter(d => d.isForecast)
    let currentBaseWeek = document.getElementById("dataset-select").value
    let table = new Table(value, currentBaseWeek)
    table.drawTable()
    let linechartAttacks = new LineChartAttacks(value, currentBaseWeek)
    linechartAttacks.removeText()
    linechartAttacks.drawLinechart()
    let linechartAttackers = new LineChartAttackers(globalApplicationState.givenData)
    linechartAttackers.removeText()
    linechartAttackers.drawLinechart()
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
}

function threshold3(){ 
    let textBox1 = document.getElementById("CABS")
    let slider1 = document.getElementById("myRange3")
    textBox1.value = slider1.value 

    
    d3.selectAll('rect').remove()
    let value = globalApplicationState.givenData.filter(d => d.isForecast)
    let currentBaseWeek = document.getElementById("dataset-select").value
    let table = new Table(value, currentBaseWeek)
    table.drawTable()
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
}


function textBox3(typedNumber){
    let slider = document.getElementById("myRange3");
    slider.value = typedNumber

    d3.selectAll('rect').remove()
    let value = globalApplicationState.givenData.filter(d => d.isForecast)
    let currentBaseWeek = document.getElementById("dataset-select").value
    let table = new Table(value, currentBaseWeek)
    table.drawTable()
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
}


function threshold4(){ 
    let textBox1 = document.getElementById("COUABS")
    let slider1 = document.getElementById("myRange4")
    textBox1.value = slider1.value 

    
    d3.selectAll('rect').remove()
    let value = globalApplicationState.givenData.filter(d => d.isForecast)
    let currentBaseWeek = document.getElementById("dataset-select").value
    let table = new Table(value, currentBaseWeek)
    table.drawTable()
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
}


function textBox4(typedNumber){
    let slider = document.getElementById("myRange4");
    slider.value = typedNumber
    //console.log(slider.value)

    d3.selectAll('rect').remove()
    let value = globalApplicationState.givenData.filter(d => d.isForecast)
    let currentBaseWeek = document.getElementById("dataset-select").value
    let table = new Table(value, currentBaseWeek)
    table.drawTable()
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
}

function threshold5(){ 
    let textBox1 = document.getElementById("COUPER")
    let slider1 = document.getElementById("myRange5")
    textBox1.value = slider1.value 

    
    d3.selectAll('rect').remove()
    let value = globalApplicationState.givenData.filter(d => d.isForecast)
    let currentBaseWeek = document.getElementById("dataset-select").value
    let table = new Table(value, currentBaseWeek)
    table.drawTable()
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
}


function textBox5(typedNumber){
    let slider = document.getElementById("myRange5");
    slider.value = typedNumber
    //console.log(slider.value)

    d3.selectAll('rect').remove()
    let value = globalApplicationState.givenData.filter(d => d.isForecast)
    let currentBaseWeek = document.getElementById("dataset-select").value
    let table = new Table(value, currentBaseWeek)
    table.drawTable()
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
}

function dataSelect(selectedNumber){
    d3.selectAll('rect').remove()
    let value = globalApplicationState.givenData.filter(d => d.isForecast)
    let table = new Table(value, selectedNumber)
    table.drawTable()
    let linechartAttacks = new LineChartAttacks(value, selectedNumber)
    linechartAttacks.removeText()
    linechartAttacks.drawLinechart()
    let linechartAttackers = new LineChartAttackers(globalApplicationState.givenData)
    linechartAttackers.removeText()
    linechartAttackers.drawLinechart()
}

function dataSelect2(selectedNumber){
    d3.selectAll('rect').remove()
    let value = globalApplicationState.givenData.filter(d => d.isForecast)
    let currentBaseWeek = document.getElementById("dataset-select").value
    let table = new Table(value, currentBaseWeek)
    table.drawTable()
    let linechartAttacks = new LineChartAttacks(value, currentBaseWeek)
    linechartAttacks.removeText()
    linechartAttacks.drawLinechart()
    let linechartAttackers = new LineChartAttackers(globalApplicationState.givenData)
    linechartAttackers.removeText()
    linechartAttackers.drawLinechart()
}

function dataSelect3(){
    let things = document.getElementById("comparisonGroupedBarGraph")
    things.innerHTML = ''
    let barGraph = new BarGraph(Table.country)
    barGraph.fetchData()
}


function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
}
  
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}




