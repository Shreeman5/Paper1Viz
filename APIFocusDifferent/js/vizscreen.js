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
        this.absoluteAnomVal
        this.percentAnomVal
        this.percentMaxVal

        // console.log(this.summaryData)
        // console.log(this.selectedTimes)
        // console.log(this.timePeriod)

        VizScreen.givenData = this.countries
        VizScreen.givenTimes = selectedTimes


        // console.log(this.getFlagEmoji('US'))
    }


    initializeProgram(){
         //Fill Gaps in Date in Data, 1st and very crucial step
        this.fillInDateGapsForData()

        //show reset and country and base and dependent and independent and sort div
        this.showRCBDISDivs() 

        //add and remove countries
        this.removeCountries()
        this.addCountries()

        //add and remove base time period options
        this.removeBaseOptions()
        this.optionsForBaseSelections() 

        //add and remove stuff in dependent div
        this.removeStuffInDependentDiv()
        this.addStuffForElementsinDependentDiv()


        //add and remove stuff in independent div
        this.removeStuffinIndependentDiv()
        this.addStuffForElementsinIndependentDiv()


        //add and remove sort time period options()
        this.removeSortStuff()
        this.optionsForSortSelections()


        //removing and adding things for linechart
        this.removeTextsFromLinechart()
        this.makeDoubleSidedLineChart()

        //adding and removing things for table and tableLegend
        this.removeTableTHelements()
        this.removeTableLegend()
        this.makeTableTHstructure()
        this.makeTable()





        // this.hideIPLineChartButtons()
        // this.removeUserNameFilterOptions2()
        // this.removeIPsAndHideSelects()

        
        // this.removePathsAndStarsAndRects()
        // this.removelineChartParallelCoordinateDonutChart()


        
        // this.removeRedSpotFromTable()
        // 
        
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

    showRCBDISDivs(){
        document.getElementById("resetButton").style.visibility = "visible"
        document.getElementById("countryOptions").style.visibility = "visible"
        document.getElementById("baseTPDiv").style.visibility = "visible"
        document.getElementById("dependentDiv").style.visibility = "visible"
        document.getElementById("independentDiv").style.visibility = "visible"
        document.getElementById("sortTPDiv").style.visibility = "visible"
    }

    removeCountries(){
        $('#countries').find('option').remove()
    }

    addCountries(){
        let countrySelect = document.getElementById("countries")
        for (let country of this.summaryData){
            let option = document.createElement("option")
            option.value = country.country
            option.text = country.country
            countrySelect.appendChild(option)
        }
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
            option.text = 'Base -- ' + time//'TP' + x
            baseSelect.add(option)
            x += 1
        }
    }

    removeStuffInDependentDiv(){
        //percentage change 
        if (document.getElementById("svg1")){
            document.getElementById("svg1").innerHTML = ""
        }
        $('#PERCHANGECHOOSE').find('option').not(':first').remove()
        let perOutput = document.getElementById("PERCHANGEWRITE")
        perOutput.value = ''

        //absolute change
        if (document.getElementById("svg2")){
            document.getElementById("svg2").innerHTML = ""
        }
        $('#ABSCHANGECHOOSE').find('option').not(':first').remove()
        let absOutput = document.getElementById("ABSCHANGEWRITE")
        absOutput.value = ''
    }


    addStuffForElementsinDependentDiv(){
        let baseSelect = document.getElementById("baseTP")
        let dynamicSlider = new DynamicSlider(this.summaryData, baseSelect.value)

        let [percentChangeSliderMin, percentSliderChangeMax, allNumbers] = dynamicSlider.percentChangeSliderValues()
        let perSlider = document.getElementById("myRange")
        perSlider.min = percentChangeSliderMin
        perSlider.max = percentSliderChangeMax
        perSlider.value = percentChangeSliderMin
        let svg = d3.select("#svg1")
        addPercentageChangeHistogram(svg, percentChangeSliderMin, percentSliderChangeMax, allNumbers)
        addOptionsForPercentageChangeSlider()

        let [absoluteChangeSliderMin, absoluteChangeSliderMax, allNumbers2] = dynamicSlider.absoluteChangeSliderValues()
        let absSlider = document.getElementById("myRange2")
        absSlider.min = absoluteChangeSliderMin
        absSlider.max = absoluteChangeSliderMax
        absSlider.value = absoluteChangeSliderMin
        let svg2 = d3.select("#svg2")
        addAbsoluteChangeHistogram(svg2, absoluteChangeSliderMin, absoluteChangeSliderMax, allNumbers2)
        addOptionsForAbsoluteChangeSlider()
    }

    removeStuffinIndependentDiv(){
        //absolute
        if (document.getElementById("svg3")){
            document.getElementById("svg3").innerHTML = ""
        }
        $('#ABSCHOOSE').find('option').not(':first').remove()
        let absAnomOutput = document.getElementById("ABSWRITE")
        absAnomOutput.value = ''
    }

    addStuffForElementsinIndependentDiv(){
        let baseSelect = document.getElementById("baseTP")
        let dynamicSlider = new DynamicSlider(this.summaryData, baseSelect.value)

        let [absoluteMin, absoluteAnomaly, absoluteMax, allNumbers3] = dynamicSlider.absoluteSliderValues()
        let absoluteSlider = document.getElementById("myRange3")
        absoluteSlider.min = absoluteMin
        absoluteSlider.max = absoluteMax
        absoluteSlider.value = absoluteMin
        let svg3 = d3.select("#svg3")
        addAbsoluteHistogram(svg3, absoluteMin, absoluteMax, allNumbers3)
        addOptionsForAbsoluteSlider(allNumbers3)
        this.absoluteAnomVal = absoluteAnomaly

        let [percentAnomaly, percentMax] = dynamicSlider.percentAnomalyValue()
        this.percentAnomVal = percentAnomaly
        this.percentMaxVal = percentMax
    }

    removeSortStuff(){
        $('#sortTP').find('option').remove()
    }

    optionsForSortSelections(){
        let sortSelect = document.getElementById("sortTP")
        let y = 1
        for (let time of this.selectedTimes){
            let option = document.createElement("option")
            option.value = time
            option.text = 'Sort By -- ' + time
            sortSelect.add(option)
            y += 1
        }
    }


    removeTextsFromLinechart(){
        if (document.getElementById("caaText"))
            document.getElementById("caaText").remove()
        if (document.getElementById("freq1"))
            document.getElementById("freq1").remove()
        if (document.getElementById("freq2"))
            document.getElementById("freq2").remove()
        if (document.getElementById("attacks"))
            document.getElementById("attacks").remove()
        if (document.getElementById("attackers"))
            document.getElementById("attackers").remove()
        if (document.getElementById("overall"))
            document.getElementById("overall").remove()
    }

    makeDoubleSidedLineChart(){
        let lineChart = new LineChartAttacks(this.summaryData, this.selectedTimes, this.timePeriod)
        lineChart.drawLinechart()
    }


    removeTableTHelements(){
        $("#predictionTable>thead>tr").find("th").remove()
    }

    removeTableLegend(){
        document.getElementById("legend").innerHTML = ""
    }


    makeTableTHstructure(){
        $("#predictionTable>thead>tr").append("<th class=sortable id=c0 width=380px>Country</th>")
        let i = 1
        for (let time of this.selectedTimes){
            console.log(time)
            $("#predictionTable>thead>tr").append("<th class=sortable id=c"+i+">"+time+"<input type=checkbox id=TP"+i+" value="+time+" onchange=timeSelection();></th>")
            let requiredBox = 'c'+i
            document.getElementById(requiredBox).style.maxWidth = "60px"
            i++
        }

    }

    makeTable(){
        let baseSelect = document.getElementById("baseTP")
        let table = new Table(this.summaryData, baseSelect.value, this.selectedTimes, this.absoluteAnomVal, this.percentAnomVal, this.percentMaxVal)
        setTimeout( function() { table.drawTable(); }, 2000)
    }











    
































    removeIPsAndHideSelects(){
        $('#ipsClicked option:not(:first)').remove()
        $('#startMonthPick option:not(:first)').remove()
        $('#endMonthPick option:not(:first)').remove()
        document.getElementById("startMonthPick").style.visibility = "hidden"
        document.getElementById("endMonthPick").style.visibility = "hidden"
        $('#startWeekPick option:not(:first)').remove()
        $('#endWeekPick option:not(:first)').remove()
        document.getElementById("startWeekPick").style.visibility = "hidden"
        document.getElementById("endWeekPick").style.visibility = "hidden"
        document.getElementById("startDatePick").value = ""
        document.getElementById("endDatePick").value = ""
        document.getElementById("startDatePick").style.visibility = "hidden"
        document.getElementById("endDatePick").style.visibility = "hidden"
        document.getElementById("crButton").style.visibility = "hidden"
        document.getElementById("crossReferenceIPGraphs").innerHTML = ""
        document.getElementById("crossReferenceIPGraphs").style.outline = "none"
        document.getElementById("legendForIPGraph").innerHTML = ""
        document.getElementById("legendForIPGraph").style.outline = "none"
        document.getElementById("exportIPButton").style.visibility = "hidden"
        $(".node").remove()
        document.getElementById("legendForTreeMap").innerHTML = ""
    }

    

    hideIPLineChartButtons(){
        document.getElementById("exportButton").style.visibility = "hidden"
        document.getElementById("goBackButton").style.visibility = "hidden"
    }

    removeUserNameFilterOptions2(){
        document.getElementById("usernameFilter").style.width = "0px"
        document.getElementById("usernameFilter").style.height = "0px"
        $('#usernameFilter').find('option').remove()
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

    removelineChartParallelCoordinateDonutChart(){
        if (document.getElementById("attacksAndAttackers"))
            document.getElementById("attacksAndAttackers").innerHTML = ""
            document.getElementById("attacksAndAttackers").style.outline = "none"
        if (document.getElementById("parallelCoordinatesGraph"))
            document.getElementById("parallelCoordinatesGraph").innerHTML = ""
            document.getElementById("parallelCoordinatesGraph").style.outline = "none"
        if (document.getElementById("donutGraph"))
            document.getElementById("donutGraph").innerHTML = ""
            document.getElementById("donutGraph").style.outline = "none"
    }
    


    removeStuffinFilterAndNonFilterDiv(){
        // $('#countries').find('option').remove()
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
}



















function baseTPFunc(selectedTime){
    // bookkeeping
    removePreviousSVGs2()
    removePathsAndStarsAndRects2()

    // Updating sliders with base
    let dynamicSlider = new DynamicSlider(VizScreen.givenData, selectedTime)

    let [percentSliderMin, percentSliderMax, allNumbers] = dynamicSlider.percentChangeSliderValues()
    let perSlider = document.getElementById("myRange")
    perSlider.min = percentSliderMin
    perSlider.max = percentSliderMax
    perSlider.value = percentSliderMin
    let perOutput = document.getElementById("PERCHANGEWRITE")
    perOutput.value = ''
    this.addOptionsForPercentageSlider2()
    document.getElementById("PERCHANGECHOOSE").selectedIndex = 0
    let svg = d3.select("#svg1")
    this.addPercentageChangeHistogram2(svg, percentSliderMin, percentSliderMax, allNumbers)

    let [absoluteSliderMin, absoluteSliderMax, allNumbers2] = dynamicSlider.absoluteChangeSliderValues()
    // console.log(absoluteSliderMax)
    let absSlider = document.getElementById("myRange2")
    absSlider.min = absoluteSliderMin
    absSlider.max = absoluteSliderMax
    absSlider.value = absoluteSliderMin
    let absOutput = document.getElementById("ABSCHANGEWRITE")
    absOutput.value = ''
    this.addOptionsForAbsoluteSlider2()
    document.getElementById("ABSCHANGECHOOSE").selectedIndex = 0
    let svg2 = d3.select("#svg2")
    this.addAbsoluteChangeHistogram2(svg2, absoluteSliderMin, absoluteSliderMax, allNumbers2)
        
    // reshaping viz
    let table = new Table(VizScreen.givenData, selectedTime, VizScreen.givenTimes)
    setTimeout( function() { table.drawTable(); }, 2000)
    this.removeRedSpotInTable()
    let things = document.getElementById("attacksAndAttackers")
    things.innerHTML = ''
    this.removeUserNameFilterOptions()
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
    document.getElementById("attacksAndAttackers").style.outline = "none"
    document.getElementById("parallelCoordinatesGraph").style.outline = "none"
    document.getElementById("donutGraph").style.outline = "none"
}




function addPercentageChangeHistogram(svg, percentSliderMin, percentSliderMax, allNumbers){
    let margin = ({top: 10, right: 0, bottom: 10, left: 80})
    let height = 110
    let width = 390

    percentSliderMin = Number(percentSliderMin)
    percentSliderMax = Number(percentSliderMax)
    let midNum = (percentSliderMin+percentSliderMax)/2
    let IQ1 = (percentSliderMin+midNum)/2
    let IQ3 = (midNum+percentSliderMax)/2
    let fiveNumbers = [percentSliderMin, IQ1, midNum, IQ3, percentSliderMax]
    
    // console.log(fiveNumbers)
    let xAxis = d3.scaleLinear().domain([percentSliderMin, percentSliderMax]).range([margin.left, width - margin.right])
    
    let that = this
    svg.append("g")
        .style("font", "20px times")
        .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        .call(d3.axisBottom(xAxis).tickValues(fiveNumbers).tickFormat(function(d){
            return that.fixNumbers2(d)
        }))
        

    let histogram = d3.histogram()
                    // .value(function(d) { 
                    //     return d
                    // })   
                    .domain(xAxis.domain()) 
                    .thresholds(d3.range(percentSliderMin, percentSliderMax, (percentSliderMax - percentSliderMin)/50)); 

    let bins = histogram(allNumbers)

    // console.log(bins)
    
    // let minY = 0
    let maxY = d3.max(bins, function(d) { return d.length; })
    // let avgY = (minY+maxY)/2

    let yAxis = d3.scaleLog().domain([.1, maxY]).nice().range([height - margin.bottom, margin.top]);
    yAxis.clamp(true)
    // //yAxis;   // d3.hist has to be called before the Y axis obviously
    
    svg.append("g")
    .style("font", "20px times")
    .attr("transform", "translate("+margin.left+"," + 0 + ")")
    .call(d3.axisLeft(yAxis).tickValues([1, 10, maxY]).tickFormat(function(d){
        // console.log(d)
        return that.fixNumbers2(d)
    }))

    this.rect = svg.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
      .attr("x", d =>  xAxis(d.x0) + 1)
    //   .attr("transform", function(d) { return "translate(" + (xAxis(d.x0)+20) + "," + yAxis(d.length) + ")"; })
      .attr("width", function(d) { return xAxis(d.x1) - xAxis(d.x0) - 1 ; })
      .attr("y", d => yAxis(d.length))
      .attr("height", function(d) { 
        // console.log(d)
        // console.log(yAxis(d.length))
        return yAxis.range()[0] - yAxis(d.length); 
    })
    .style("fill", "#69b3a2")


    this.rect.on("mouseover", function(e, d) {
        d3.select(this).attr('stroke-width', 3).attr("stroke", "black")
            .append("title")
            .text(d => "Bin size: "+d.length+ "\u000d"+"Bin LowerLimit : " + fixNumbers2(d.x0) + "\u000d" +"Bin UpperLimit : "+ fixNumbers2(d.x1));
    })
    .on("mouseout", function(e, d) {
        d3.select(this).attr('stroke-width', 0)
    })
}




function addOptionsForPercentageChangeSlider(){
    // $('#PERCHANGECHOOSE').find('option').remove()
    let baseSelect = document.getElementById("PERCHANGECHOOSE")
    let givenOptions = ["Show all countries from data in Table and the number distribution in Histogram",
                        "Show all countries with Relative Percent decrease(from base TP) in Table and the number distribution in Histogram",
                        "Show all countries with Relative Percent increase(from base TP) in Table and the number distribution in Histogram",
                        "Show countries with Relative Percent increase by at least 100%(from base TP) in Table and the number distribution in Histogram",
                        "Show countries with Relative Percent increase by at least 1K%(from base TP) in Table and the number distribution in Histogram",
                        "Show countries with Relative Percent increase by at least 10K%(from base TP) in Table and the number distribution in Histogram",
                        "Show countries with Relative Percent increase by at least 0.1M%(from base TP) in Table and the number distribution in Histogram",
                        "Show countries with Relative Percent increase by at least 1M%(from base TP) in Table and the number distribution in Histogram"]
    for (let i = 0; i < givenOptions.length; i++){
        let maximumVal = document.getElementById("myRange").max
        if (maximumVal < 100 && i >= 3){
            break
        }
        if (maximumVal < 1000 && i >= 4){
            break
        }
        if (maximumVal < 10000 && i >= 5){
            break
        }
        if (maximumVal < 100000 && i >= 6){
            break
        }
        if (maximumVal < 1000000 && i >= 7){
            break
        }

        let option = document.createElement("option")
        option.value = i + 'A'
        option.text = givenOptions[i]
        baseSelect.add(option)
    }
}

function addAbsoluteChangeHistogram(svg2, absoluteSliderMin, absoluteSliderMax, allNumbers2){
    let margin = ({top: 10, right: 0, bottom: 10, left: 70})
    let height = 110
    let width = 390

    let midNum = (absoluteSliderMin+absoluteSliderMax)/2
    let IQ1 = (absoluteSliderMin+midNum)/2
    let IQ3 = (midNum+absoluteSliderMax)/2
    let fiveNumbers = [absoluteSliderMin, IQ1, midNum, IQ3, absoluteSliderMax]
    let xAxis = d3.scaleLinear().domain([absoluteSliderMin, absoluteSliderMax]).range([margin.left, width - margin.right])
    let that = this
    svg2.append("g")
        .style("font", "20px times")
        .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        .call(d3.axisBottom(xAxis).tickValues(fiveNumbers).tickFormat(function(d){
            return that.fixNumbers2(d)
        }))
        

    let histogram = d3.histogram()
                    // .value(function(d) { 
                    //     return d
                    // })   
                    .domain(xAxis.domain()) 
                    .thresholds(d3.range(absoluteSliderMin, absoluteSliderMax, (absoluteSliderMax - absoluteSliderMin)/50)); 

    let bins = histogram(allNumbers2)
    
    // let minY = 0
    let maxY = d3.max(bins, function(d) { return d.length; })
    // let avgY = (minY+maxY)/2

    let yAxis = d3.scaleLog().domain([.1, maxY]).nice().range([height - margin.bottom, margin.top]);
    yAxis.clamp(true) // d3.hist has to be called before the Y axis obviously
    
    svg2.append("g")
    .style("font", "20px times")
    .attr("transform", "translate("+margin.left+"," + 0 + ")")
    .call(d3.axisLeft(yAxis).tickValues([1, 10, maxY]).tickFormat(function(d){
        return that.fixNumbers2(d)
    }))

    this.rect = svg2.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
      .attr("x", d =>  xAxis(d.x0) + 1)
      //.attr("transform", function(d) { return "translate(" + (xAxis(d.x0)+20) + "," + yAxis(d.length) + ")"; })
      .attr("width", function(d) { return xAxis(d.x1) - xAxis(d.x0) - 1 ; })
      .attr("y", d => yAxis(d.length))
      .attr("height", function(d) { return yAxis.range()[0] - yAxis(d.length);  })
      .style("fill", "#69b3a2")

    this.rect.on("mouseover", function(e, d) {
        d3.select(this).attr('stroke-width', 3).attr("stroke", "black")
            .append("title")
            .text(d => "Bin size: "+d.length+ "\u000d"+"Bin LowerLimit : " + fixNumbers2(d.x0) + "\u000d" +"Bin UpperLimit : "+ fixNumbers2(d.x1));
    })
    .on("mouseout", function(e, d) {
        d3.select(this).attr('stroke-width', 0)
    })
}



function addOptionsForAbsoluteChangeSlider(){
    // $('#ABSCHANGECHOOSE').find('option').remove()
    let baseSelect = document.getElementById("ABSCHANGECHOOSE")
    let givenOptions = ["Show all countries from data in Table and the number distribution in Histogram",
                        "Show all countries with Absolute decrease(from base TP) in Table and the number distribution in Histogram",
                        "Show all countries with Absolute increase(from base TP) in Table and the number distribution in Histogram",
                        "Show all countries with Absolute increase by at least 1K(from base TP) in Table and the number distribution in Histogram",
                        "Show all countries with Absolute increase by at least 10K(from base TP) in Table and the number distribution in Histogram",
                        "Show all countries with Absolute increase by at least 0.1M(from base TP) in Table and the number distribution in Histogram",
                        "Show all countries with Absolute increase by at least 1M(from base TP) in Table and the number distribution in Histogram"]
    for (let i = 0; i < givenOptions.length; i++){
        let maximumVal = document.getElementById("myRange2").max
        if (maximumVal < 1000 && i >= 3){
            break
        }
        if (maximumVal < 10000 && i >= 4){
            break
        }
        if (maximumVal < 100000 && i >= 5){
            break
        }
        if (maximumVal < 1000000 && i >= 6){
            break
        }

        let option = document.createElement("option")
        option.value = i + 'B'
        option.text = givenOptions[i]
        baseSelect.add(option)
    }
}


function addAbsoluteHistogram(svg3, absoluteSliderMin, absoluteSliderMax, allNumbers3){
    let margin = ({top: 10, right: 0, bottom: 10, left: 70})
    let height = 110
    let width = 390

    let midNum = (absoluteSliderMin+absoluteSliderMax)/2
    let IQ1 = (absoluteSliderMin+midNum)/2
    let IQ3 = (midNum+absoluteSliderMax)/2
    let fiveNumbers = [absoluteSliderMin, IQ1, midNum, IQ3, absoluteSliderMax]
    let xAxis = d3.scaleLinear().domain([absoluteSliderMin, absoluteSliderMax]).range([margin.left, width - margin.right])
    let that = this
    svg3.append("g")
        .style("font", "20px times")
        .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        .call(d3.axisBottom(xAxis).tickValues(fiveNumbers).tickFormat(function(d){
            return that.fixNumbers2(d)
        })).selectAll("text")  

    let histogram = d3.histogram()
    // .value(function(d) { 
    //     return d
    // })   
    .domain(xAxis.domain()) 
    .thresholds(d3.range(absoluteSliderMin, absoluteSliderMax, (absoluteSliderMax - absoluteSliderMin)/50)); 

    let bins = histogram(allNumbers3)

   // let minY = 0
    let maxY = d3.max(bins, function(d) { return d.length; })
    //let avgY = (minY+maxY)/2

    let yAxis = d3.scaleLog().domain([.1, maxY]).nice().range([height - margin.bottom, margin.top]);
    yAxis.clamp(true)  // d3.hist has to be called before the Y axis obviously

    svg3.append("g")
    .style("font", "20px times")
    .attr("transform", "translate("+margin.left+",0)")//rotate(270)
    .call(d3.axisLeft(yAxis).tickValues([1, 10, maxY]).tickFormat(function(d){
        return that.fixNumbers2(d)
    }))
    

    this.rect = svg3.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
    .attr("x", d =>  xAxis(d.x0) + 1)
    //   .attr("transform", function(d) { return "translate(" + (xAxis(d.x0)+20) + "," + (yAxis(d.length)) + ")"; })
      .attr("width", function(d) { return xAxis(d.x1) - xAxis(d.x0) - 1 ; })
      .attr("y", d => yAxis(d.length))
      .attr("height", function(d) { return yAxis.range()[0] - yAxis(d.length); })
      .style("fill", "#69b3a2")

    this.rect.on("mouseover", function(e, d) {
        d3.select(this).attr('stroke-width', 3).attr("stroke", "black")
            .append("title")
            .text(d => "Bin size: "+d.length+ "\u000d"+"Bin LowerLimit : " + fixNumbers2(d.x0) + "\u000d" +"Bin UpperLimit : "+ fixNumbers2(d.x1));
    })
    .on("mouseout", function(e, d) {
        d3.select(this).attr('stroke-width', 0)
    })

}


function addOptionsForAbsoluteSlider(){
    let baseSelect = document.getElementById("ABSCHOOSE")
    let givenOptions = ["Show all countries from data in Table and the number distribution in Histogram",
                        "Show all countries with at least 100 attacks in any time period",
                        "Show all countries with at least 1K attacks in any time period",
                        "Show all countries with at least 10K attacks in any time period",
                        "Show all countries with at least 100K attacks in any time period",
                        "Show all countries with at least 1M attacks in any time period",
                        "Show all countries with at least 10M attacks in any time period"]
    for (let i = 0; i < givenOptions.length; i++){
        let maximumVal = document.getElementById("myRange3").max
        if (maximumVal < 1000 && i >= 2){
            break
        }
        if (maximumVal < 10000 && i >= 3){
            break
        }
        if (maximumVal < 100000 && i >= 4){
            break
        }
        if (maximumVal < 1000000 && i >= 5){
            break
        }
        if (maximumVal < 10000000 && i >= 6){
            break
        }

        let option = document.createElement("option")
        option.value = i + 'B'
        option.text = givenOptions[i]
        baseSelect.add(option)
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








function helperForFilterSlidersAndSortButton(){
    let currentBaseTime = document.getElementById("baseTP").value
    let table = new Table(VizScreen.givenData, currentBaseTime, VizScreen.givenTimes)
    setTimeout( function() { table.drawTable(); }, 2000)
    this.removeRedSpotInTable()
    let things = document.getElementById("attacksAndAttackers")
    things.innerHTML = ''
    this.removeUserNameFilterOptions()
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
    document.getElementById("attacksAndAttackers").style.outline = "none"
    document.getElementById("parallelCoordinatesGraph").style.outline = "none"
    document.getElementById("donutGraph").style.outline = "none"
}


function threshold1(){
    // bookkeeping
    removePathsAndStarsAndRects2()

    //keeping slider and textbox aligned
    let slider1 = document.getElementById("myRange")
    let textBox1 = document.getElementById("PERCHANGEWRITE")
    textBox1.value = slider1.value 

    let range = document.getElementById("myRange2")
    let textBox2 = document.getElementById("ABSCHANGEWRITE")
    range.value = range.min
    textBox2.value = range.min

    // reshaping viz
    helperForFilterSlidersAndSortButton()
    document.getElementById("svg1").innerHTML = ""
    let selectedTime = document.getElementById("baseTP").value
    let dynamicSlider = new DynamicSlider(VizScreen.givenData, selectedTime)

    let [percentSliderMin, percentSliderMax, allNumbers] = dynamicSlider.percentChangeSliderValues()
    let svg = d3.select("#svg1")
    allNumbers = allNumbers.filter(item => item >= slider1.value && item <= slider1.max)
    let sliderValue 
    if (slider1.value >= slider1.max - 4 && slider1.value <= slider1.max){
        sliderValue = slider1.value - 4
    }
    else{
        sliderValue = slider1.value
    }
    this.addPercentageChangeHistogram2(svg, sliderValue, slider1.max, allNumbers)

    document.getElementById("svg2").innerHTML = ""
    let [absoluteSliderMin, absoluteSliderMax, allNumbers2] = dynamicSlider.absoluteChangeSliderValues()
    let svg2 = d3.select("#svg2")
    this.addAbsoluteChangeHistogram2(svg2, absoluteSliderMin, absoluteSliderMax, allNumbers2)
}

function chooseBox1(selectedOption){
    // console.log('here')
    removePathsAndStarsAndRects2()
    let textBox1 = document.getElementById("PERCHANGEWRITE")
    textBox1.value = '' 
    let slider1 = document.getElementById("myRange")
    slider1.value = slider1.min

    let range = document.getElementById("myRange2")
    let textBox2 = document.getElementById("ABSCHANGEWRITE")
    range.value = range.min
    textBox2.value = range.min

    helperForFilterSlidersAndSortButton()
    document.getElementById("svg1").innerHTML = ""
    let selectedTime = document.getElementById("baseTP").value
    let dynamicSlider = new DynamicSlider(VizScreen.givenData, selectedTime)
    let [percentSliderMin, percentSliderMax, allNumbers] = dynamicSlider.percentChangeSliderValues()
    // console.log(percentSliderMax)
    let svg = d3.select("#svg1")
    if (selectedOption === '0A'){
        allNumbers = allNumbers.filter(item => item >= percentSliderMin && item <= percentSliderMax)
        this.addPercentageChangeHistogram2(svg, percentSliderMin, percentSliderMax, allNumbers)
    }
    else if (selectedOption === '1A'){
        allNumbers = allNumbers.filter(item => item >= percentSliderMin && item < 0)
        // console.log(allNumbers)
        this.addPercentageChangeHistogram2(svg, percentSliderMin, 0, allNumbers)
    }
    else if (selectedOption === '2A'){
        allNumbers = allNumbers.filter(item => item >= 0 && item <= percentSliderMax)
        this.addPercentageChangeHistogram2(svg, 0, percentSliderMax, allNumbers)
    }
    else if (selectedOption === '3A'){
        allNumbers = allNumbers.filter(item => item >= 100 && item <= percentSliderMax)
        this.addPercentageChangeHistogram2(svg, 100, percentSliderMax, allNumbers)
    }
    else if (selectedOption === '4A'){
        allNumbers = allNumbers.filter(item => item >= 1000 && item <= percentSliderMax)
        this.addPercentageChangeHistogram2(svg, 1000, percentSliderMax, allNumbers)
    }
    else if (selectedOption === '5A'){
        allNumbers = allNumbers.filter(item => item >= 10000 && item <= percentSliderMax)
        this.addPercentageChangeHistogram2(svg, 10000, percentSliderMax, allNumbers)
    }
    else if (selectedOption === '6A'){
        allNumbers = allNumbers.filter(item => item >= 100000 && item <= percentSliderMax)
        this.addPercentageChangeHistogram2(svg, 100000, percentSliderMax, allNumbers)
    }
    else if (selectedOption === '7A'){
        allNumbers = allNumbers.filter(item => item >= 1000000 && item <= percentSliderMax)
        this.addPercentageChangeHistogram2(svg, 1000000, percentSliderMax, allNumbers)
    }
    
    document.getElementById("svg2").innerHTML = ""
    let [absoluteSliderMin, absoluteSliderMax, allNumbers2] = dynamicSlider.absoluteChangeSliderValues()
    let svg2 = d3.select("#svg2")
    this.addAbsoluteChangeHistogram2(svg2, absoluteSliderMin, absoluteSliderMax, allNumbers2)
}

function textBox1(typedNumber){
    if(typedNumber.replace(/\s/g,"") == "" || isNaN(typedNumber)){
        alert("PLEASE ENTER A NUMBER!!!")
    }
    else{
        if (Number(typedNumber) < document.getElementById("myRange").min){
            alert("PLEASE ENTER A NUMBER BIGGER THAN THE MINIMUM!!!")
        }
        else if (Number(typedNumber) > document.getElementById("myRange").max){
            alert("PLEASE ENTER A NUMBER SMALLER THAN THE MAXIMUM!!!")
        }
        else{
            removePathsAndStarsAndRects2()

            //keeping slider and textbox aligned
            let slider = document.getElementById("myRange")
            slider.value = typedNumber
        
            let slider2 = document.getElementById("myRange2");
            let textBox2 = document.getElementById("ABSCHANGEWRITE")
            slider2.value = slider2.min
            textBox2.value = slider2.min
        
            
            // reshaping viz
            helperForFilterSlidersAndSortButton()
            document.getElementById("svg1").innerHTML = ""
            let selectedTime = document.getElementById("baseTP").value
            let dynamicSlider = new DynamicSlider(VizScreen.givenData, selectedTime)
            let [percentSliderMin, percentSliderMax, allNumbers] = dynamicSlider.percentChangeSliderValues()
            let svg = d3.select("#svg1")
            allNumbers = allNumbers.filter(item => item >= typedNumber && item <= percentSliderMax)
            let boxValue 
            if (typedNumber >= percentSliderMax - 4){
                boxValue = percentSliderMax - 4
            }
            else{
                boxValue = typedNumber
            }
            this.addPercentageChangeHistogram2(svg, boxValue, percentSliderMax, allNumbers)

            document.getElementById("svg2").innerHTML = ""
            let [absoluteSliderMin, absoluteSliderMax, allNumbers2] = dynamicSlider.absoluteChangeSliderValues()
            let svg2 = d3.select("#svg2")
            this.addAbsoluteChangeHistogram2(svg2, absoluteSliderMin, absoluteSliderMax, allNumbers2)
        }
    }

}

function threshold2(){
    // bookkeeping
    removePathsAndStarsAndRects2()

    //keeping slider and textbox aligned
    let slider2 = document.getElementById("myRange2")
    let textBox2 = document.getElementById("ABSCHANGEWRITE")
    textBox2.value = slider2.value 

    let range = document.getElementById("myRange")    
    let textBox1 = document.getElementById("PERCHANGEWRITE")
    range.value = range.min
    textBox1.value = range.min


    // reshaping viz
    helperForFilterSlidersAndSortButton()
    document.getElementById("svg2").innerHTML = ""
    let selectedTime = document.getElementById("baseTP").value
    let dynamicSlider = new DynamicSlider(VizScreen.givenData, selectedTime)
    let [absoluteSliderMin, absoluteSliderMax, allNumbers2] = dynamicSlider.absoluteChangeSliderValues()
    let svg2 = d3.select("#svg2")
    allNumbers2 = allNumbers2.filter(item => item >= slider2.value && item <= slider2.max)
    let sliderValue 
    if (slider2.value >= slider2.max - 4 && slider2.value <= slider2.max){
        sliderValue = slider2.value - 4
    }
    else{
        sliderValue = slider2.value
    }
    this.addAbsoluteChangeHistogram2(svg2, Number(sliderValue), Number(slider2.max), allNumbers2)
    document.getElementById("svg1").innerHTML = ""
    let [percentSliderMin, percentSliderMax, allNumbers] = dynamicSlider.percentChangeSliderValues()
    let svg = d3.select("#svg1")
    this.addPercentageChangeHistogram2(svg, percentSliderMin, percentSliderMax, allNumbers)
}

function chooseBox2(selectedOption){
    // console.log('here')
    removePathsAndStarsAndRects2()
    let textBox1 = document.getElementById("ABSCHANGEWRITE")
    textBox1.value = '' 
    let slider1 = document.getElementById("myRange2")
    slider1.value = slider1.min

    let range = document.getElementById("myRange")
    let textBox2 = document.getElementById("PERCHANGEWRITE")
    range.value = range.min
    textBox2.value = range.min

    helperForFilterSlidersAndSortButton()
    document.getElementById("svg2").innerHTML = ""
    let selectedTime = document.getElementById("baseTP").value
    let dynamicSlider = new DynamicSlider(VizScreen.givenData, selectedTime)
    let [absoluteSliderMin, absoluteSliderMax, allNumbers2] = dynamicSlider.absoluteChangeSliderValues()
    let svg2 = d3.select("#svg2")
    if (selectedOption === '0B'){
        allNumbers2 = allNumbers2.filter(item => item >= absoluteSliderMin && item <= absoluteSliderMax)
        this.addAbsoluteChangeHistogram2(svg2, absoluteSliderMin, absoluteSliderMax, allNumbers2)
    }
    else if (selectedOption === '1B'){
        allNumbers2 = allNumbers2.filter(item => item >= absoluteSliderMin && item < 0)
        this.addAbsoluteChangeHistogram2(svg2, absoluteSliderMin, 0, allNumbers2)
    }
    else if (selectedOption === '2B'){
        allNumbers2 = allNumbers2.filter(item => item >= 0 && item <= absoluteSliderMax)
        this.addAbsoluteChangeHistogram2(svg2, 0, absoluteSliderMax, allNumbers2)
    }
    else if (selectedOption === '3B'){
        allNumbers2 = allNumbers2.filter(item => item >= 1000 && item <= absoluteSliderMax)
        this.addAbsoluteChangeHistogram2(svg2, 1000, absoluteSliderMax, allNumbers2)
    }
    else if (selectedOption === '4B'){
        allNumbers2 = allNumbers2.filter(item => item >= 10000 && item <= absoluteSliderMax)
        this.addAbsoluteChangeHistogram2(svg2, 10000, absoluteSliderMax, allNumbers2)
    }
    else if (selectedOption === '5B'){
        allNumbers2 = allNumbers2.filter(item => item >= 100000 && item <= absoluteSliderMax)
        this.addAbsoluteChangeHistogram2(svg2, 100000, absoluteSliderMax, allNumbers2)
    }
    else if (selectedOption === '6B'){
        allNumbers2 = allNumbers2.filter(item => item >= 1000000 && item <= absoluteSliderMax)
        this.addAbsoluteChangeHistogram2(svg2, 1000000, absoluteSliderMax, allNumbers2)
    }
    document.getElementById("svg1").innerHTML = ""
    let [percentSliderMin, percentSliderMax, allNumbers] = dynamicSlider.percentChangeSliderValues()
    let svg = d3.select("#svg1")
    this.addPercentageChangeHistogram2(svg, percentSliderMin, percentSliderMax, allNumbers)
}

function textBox2(typedNumber){
    // bookkeeping
    if(typedNumber.replace(/\s/g,"") == "" || isNaN(typedNumber)){
        alert("PLEASE ENTER A NUMBER!!!")
    }
    else{
        if (Number(typedNumber) < document.getElementById("myRange2").min){
            alert("PLEASE ENTER A NUMBER BIGGER THAN THE MINIMUM!!!")
        }
        else if (Number(typedNumber) > document.getElementById("myRange2").max){
            alert("PLEASE ENTER A NUMBER SMALLER THAN THE MAXIMUM!!!")
        }
        else{
            removePathsAndStarsAndRects2()
            //keeping slider and textbox aligned
            let slider = document.getElementById("myRange2")
            slider.value = typedNumber
        
            let slider2 = document.getElementById("myRange");
            let textBox1 = document.getElementById("PERCHANGEWRITE")
            slider2.value = slider2.min
            textBox1.value = slider2.min
        
            // reshaping viz
            helperForFilterSlidersAndSortButton()
            document.getElementById("svg2").innerHTML = ""
            let selectedTime = document.getElementById("baseTP").value
            let dynamicSlider = new DynamicSlider(VizScreen.givenData, selectedTime)
            let [absoluteSliderMin, absoluteSliderMax, allNumbers2] = dynamicSlider.absoluteChangeSliderValues()
            let svg2 = d3.select("#svg2")
            allNumbers2 = allNumbers2.filter(item => item >= Number(typedNumber) && item <= absoluteSliderMax)
            let boxValue 
            if (typedNumber >= absoluteSliderMax - 4){
                boxValue = absoluteSliderMax - 4
            }
            else{
                boxValue = typedNumber
            }
            this.addAbsoluteChangeHistogram2(svg2, Number(boxValue), absoluteSliderMax, allNumbers2)
            document.getElementById("svg1").innerHTML = ""
            let [percentSliderMin, percentSliderMax, allNumbers] = dynamicSlider.percentChangeSliderValues()
            let svg = d3.select("#svg1")
            this.addPercentageChangeHistogram2(svg, percentSliderMin, percentSliderMax, allNumbers)
        }
    }

}

function threshold3(){ 
    // bookkeeping
    removePathsAndStarsAndRects2()

    //keeping slider and textbox aligned
    let slider1 = document.getElementById("myRange3")
    let textBox1 = document.getElementById("ANOMPERWRITE")
    textBox1.value = slider1.value 

    // reshaping viz(all together, the below code is the helperfunction that other functions use)
    let currentBaseTime = document.getElementById("baseTP").value
    let table = new Table(VizScreen.givenData, currentBaseTime, VizScreen.givenTimes)
    setTimeout( function() { table.drawTable(); }, 2000)
    this.removeRedSpotInTable()
    // jury is out on whether the below should be done or not
    let things = document.getElementById("attacksAndAttackers")
    things.innerHTML = ''
    this.removeUserNameFilterOptions()
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
    document.getElementById("attacksAndAttackers").style.outline = "none"
    document.getElementById("parallelCoordinatesGraph").style.outline = "none"
    document.getElementById("donutGraph").style.outline = "none"

    //redraw histogram
    document.getElementById("svg3").innerHTML = ""
    let selectedTime = document.getElementById("baseTP").value
    let dynamicSlider = new DynamicSlider(VizScreen.givenData, selectedTime)
    let [percentSliderAnomalyMin, percentSliderAnomaly95, percentSliderAnomalyMax, allNumbers3] = dynamicSlider.percentAnomalySliderValues()
    let svg3 = d3.select("#svg3")
    allNumbers3 = allNumbers3.filter(item => item >= slider1.value && item <= slider1.max)
    let sliderValue 
    if (slider1.value >= slider1.max - 4 && slider1.value <= slider1.max){
        sliderValue = slider1.value - 4
    }
    else{
        sliderValue = slider1.value
    }
    this.addAnomalyPercentChangeHistogram2(svg3, Number(sliderValue), Number(slider1.max), allNumbers3)
}

function chooseBox3(selectedOption){
    removePathsAndStarsAndRects2()

    let textBox1 = document.getElementById("ANOMPERWRITE")
    textBox1.value = (Number(selectedOption)).toFixed(2)
    let slider1 = document.getElementById("myRange3")
    slider1.value = (Number(selectedOption)).toFixed(2)

    // reshaping viz(all together, the below code is the helperfunction that other functions use)
    let currentBaseTime = document.getElementById("baseTP").value
    let table = new Table(VizScreen.givenData, currentBaseTime, VizScreen.givenTimes)
    setTimeout( function() { table.drawTable(); }, 2000)
    this.removeRedSpotInTable()
    // jury is out on whether the below should be done or not
    let things = document.getElementById("attacksAndAttackers")
    things.innerHTML = ''
    this.removeUserNameFilterOptions()
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
    document.getElementById("attacksAndAttackers").style.outline = "none"
    document.getElementById("parallelCoordinatesGraph").style.outline = "none"
    document.getElementById("donutGraph").style.outline = "none"
    //redraw histogram
    document.getElementById("svg3").innerHTML = ""
    let selectedTime = document.getElementById("baseTP").value
    let dynamicSlider = new DynamicSlider(VizScreen.givenData, selectedTime)
    let [percentSliderAnomalyMin, percentSliderAnomaly95, percentSliderAnomalyMax, allNumbers3] = dynamicSlider.percentAnomalySliderValues()
    let svg3 = d3.select("#svg3")
    allNumbers3 = allNumbers3.filter(item => item >= slider1.value && item <= slider1.max)
    let sliderValue 
    if (slider1.value >= slider1.max - 4 && slider1.value <= slider1.max){
        sliderValue = slider1.value - 4
    }
    else{
        sliderValue = slider1.value
    }
    this.addAnomalyPercentChangeHistogram2(svg3, Number(sliderValue), Number(slider1.max), allNumbers3)
}


function textBox3(typedNumber){
    if(typedNumber.replace(/\s/g,"") == "" || isNaN(typedNumber)){
        alert("PLEASE ENTER A NUMBER!!!")
    }
    else{
        if (Number(typedNumber) < document.getElementById("myRange3").min){
            alert("PLEASE ENTER A NUMBER BIGGER THAN THE MINIMUM!!!")
        }
        else if (Number(typedNumber) > document.getElementById("myRange3").max){
            alert("PLEASE ENTER A NUMBER SMALLER THAN THE MAXIMUM!!!")
        }
        else{
            // bookkeeping
            removePathsAndStarsAndRects2()
            //keeping slider and textbox aligned
            let slider = document.getElementById("myRange3");
            slider.value = typedNumber

            // reshaping viz
            let currentBaseTime = document.getElementById("baseTP").value
            let table = new Table(VizScreen.givenData, currentBaseTime, VizScreen.givenTimes)
            setTimeout( function() { table.drawTable(); }, 2000)
            this.removeRedSpotInTable()
            // jury is out on whether the below should be done or not
            let things = document.getElementById("attacksAndAttackers")
            things.innerHTML = ''
            this.removeUserNameFilterOptions()
            let things2 = document.getElementById("parallelCoordinatesGraph")
            things2.innerHTML = ''
            let things3 = document.getElementById("donutGraph")
            things3.innerHTML = ''
            document.getElementById("attacksAndAttackers").style.outline = "none"
            document.getElementById("parallelCoordinatesGraph").style.outline = "none"
            document.getElementById("donutGraph").style.outline = "none"

            //redraw histogram
            document.getElementById("svg3").innerHTML = ""
            let selectedTime = document.getElementById("baseTP").value
            let dynamicSlider = new DynamicSlider(VizScreen.givenData, selectedTime)
            let [percentSliderAnomalyMin, percentSliderAnomaly95, percentSliderAnomalyMax, allNumbers3] = dynamicSlider.percentAnomalySliderValues()
            let svg3 = d3.select("#svg3")
            allNumbers3 = allNumbers3.filter(item => item >= slider.value && item <= slider.max)
            let sliderValue 
            if (slider.value >= slider.max - 4 && slider.value <= slider.max){
                sliderValue = slider.value - 4
            }
            else{
                sliderValue = slider.value
            }
            console.log('A:', sliderValue)
            console.log('B:', slider.max)
            this.addAnomalyPercentChangeHistogram2(svg3, Number(sliderValue), Number(slider.max), allNumbers3)
        }
    }    
}

function threshold4(){ 
    // bookkeeping
    removePathsAndStarsAndRects2()

    //keeping slider and textbox aligned
    let slider1 = document.getElementById("myRange4")
    let textBox1 = document.getElementById("ABSWRITE")
    textBox1.value = slider1.value 

    // reshaping viz
    let currentBaseTime = document.getElementById("baseTP").value
    let table = new Table(VizScreen.givenData, currentBaseTime, VizScreen.givenTimes)
    setTimeout( function() { table.drawTable(); }, 2000)
    this.removeRedSpotInTable()
    // jury is out on whether the below should be done or not
    let things = document.getElementById("attacksAndAttackers")
    things.innerHTML = ''
    this.removeUserNameFilterOptions()
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
    document.getElementById("attacksAndAttackers").style.outline = "none"
    document.getElementById("parallelCoordinatesGraph").style.outline = "none"
    document.getElementById("donutGraph").style.outline = "none"

    //redraw histogram
    document.getElementById("svg4").innerHTML = ""
    let selectedTime = document.getElementById("baseTP").value
    let dynamicSlider = new DynamicSlider(VizScreen.givenData, selectedTime)
    let [absoluteSliderAnomalyMin, absoluteSliderAnomaly95, absoluteSliderAnomalyMax, allNumbers4] = dynamicSlider.absoluteAnomalySliderValues()
    let svg4 = d3.select("#svg4")
    allNumbers4 = allNumbers4.filter(item => item >= slider1.value && item <= slider1.max)
    let sliderValue 
    if (slider1.value >= slider1.max - 4 && slider1.value <= slider1.max){
        sliderValue = slider1.value - 4
    }
    else{
        sliderValue = slider1.value
    }
    this.addAnomalyAbsoluteHistogram2(svg4, Number(sliderValue), Number(slider1.max), allNumbers4)
}

function chooseBox4(selectedOption){
    removePathsAndStarsAndRects2()

    let textBox1 = document.getElementById("ABSWRITE")
    textBox1.value = (Number(selectedOption)).toFixed(2)
    let slider1 = document.getElementById("myRange4")
    slider1.value = (Number(selectedOption)).toFixed(2)

    // reshaping viz
    let currentBaseTime = document.getElementById("baseTP").value
    let table = new Table(VizScreen.givenData, currentBaseTime, VizScreen.givenTimes)
    setTimeout( function() { table.drawTable(); }, 2000)
    this.removeRedSpotInTable()
    // jury is out on whether the below should be done or not
    let things = document.getElementById("attacksAndAttackers")
    things.innerHTML = ''
    this.removeUserNameFilterOptions()
    let things2 = document.getElementById("parallelCoordinatesGraph")
    things2.innerHTML = ''
    let things3 = document.getElementById("donutGraph")
    things3.innerHTML = ''
    document.getElementById("attacksAndAttackers").style.outline = "none"
    document.getElementById("parallelCoordinatesGraph").style.outline = "none"
    document.getElementById("donutGraph").style.outline = "none"

    //redraw histogram
    document.getElementById("svg4").innerHTML = ""
    let selectedTime = document.getElementById("baseTP").value
    let dynamicSlider = new DynamicSlider(VizScreen.givenData, selectedTime)
    let [absoluteSliderAnomalyMin, absoluteSliderAnomaly95, absoluteSliderAnomalyMax, allNumbers4] = dynamicSlider.absoluteAnomalySliderValues()
    let svg4 = d3.select("#svg4")
    allNumbers4 = allNumbers4.filter(item => item >= slider1.value && item <= slider1.max)
    let sliderValue 
    if (slider1.value >= slider1.max - 4 && slider1.value <= slider1.max){
        sliderValue = slider1.value - 4
    }
    else{
        sliderValue = slider1.value
    }
    this.addAnomalyAbsoluteHistogram2(svg4, Number(sliderValue), Number(slider1.max), allNumbers4)
}


function textBox4(typedNumber){
    if(typedNumber.replace(/\s/g,"") == "" || isNaN(typedNumber)){
        alert("PLEASE ENTER A NUMBER!!!")
    }
    else{
        if (Number(typedNumber) < document.getElementById("myRange4").min){
            alert("PLEASE ENTER A NUMBER BIGGER THAN THE MINIMUM!!!")
        }
        else if (Number(typedNumber) > document.getElementById("myRange4").max){
            alert("PLEASE ENTER A NUMBER SMALLER THAN THE MAXIMUM!!!")
        }
        else{
            // bookkeeping
            removePathsAndStarsAndRects2()
            //keeping slider and textbox aligned
            let slider = document.getElementById("myRange4")
            slider.value = typedNumber

            // reshaping viz
            let currentBaseTime = document.getElementById("baseTP").value
            let table = new Table(VizScreen.givenData, currentBaseTime, VizScreen.givenTimes)
            setTimeout( function() { table.drawTable(); }, 2000)
            this.removeRedSpotInTable()
            // jury is out on whether the below should be done or not
            let things = document.getElementById("attacksAndAttackers")
            things.innerHTML = ''
            this.removeUserNameFilterOptions()
            let things2 = document.getElementById("parallelCoordinatesGraph")
            things2.innerHTML = ''
            let things3 = document.getElementById("donutGraph")
            things3.innerHTML = ''
            document.getElementById("attacksAndAttackers").style.outline = "none"
            document.getElementById("parallelCoordinatesGraph").style.outline = "none"
            document.getElementById("donutGraph").style.outline = "none"

            //redraw histogram
            document.getElementById("svg4").innerHTML = ""
            let selectedTime = document.getElementById("baseTP").value
            let dynamicSlider = new DynamicSlider(VizScreen.givenData, selectedTime)
            let [absoluteSliderAnomalyMin, absoluteSliderAnomaly95, absoluteSliderAnomalyMax, allNumbers4] = dynamicSlider.absoluteAnomalySliderValues()
            let svg4 = d3.select("#svg4")
            allNumbers4 = allNumbers4.filter(item => item >= slider.value && item <= slider.max)
            let sliderValue 
            if (slider.value >= slider.max - 4 && slider.value <= slider.max){
                sliderValue = slider.value - 4
            }
            else{
                sliderValue = slider.value
            }
            console.log('A:', sliderValue)
            console.log('B:', slider.max)
            this.addAnomalyAbsoluteHistogram2(svg4, Number(sliderValue), Number(slider.max), allNumbers4)
        }
    }
}

function sortTPFunc(){
    // bookkeeping
    //removePreviousSVGs2()
    removePathsAndStarsAndRects2()

    // reshaping viz
    helperForFilterSlidersAndSortButton()
}

function timeSelection(){
    let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
    let selectedTPsLength = checkedBoxes.length

    if (Table.countriesChosenUsedInAnotherFunction.length > 1 && (selectedTPsLength > 1 || selectedTPsLength === 0)){
        alert("Press ok. Then, EITHER have multiple countries and one time period OR have multiple time periods and one country.")
        
        document.getElementById("exportButton").style.visibility = "hidden"
        document.getElementById("goBackButton").style.visibility = "hidden"
        let cgbg = document.getElementById("attacksAndAttackers")
        cgbg.innerHTML = ''
        
        this.removeUserNameFilterOptions()
        let pcg = document.getElementById("parallelCoordinatesGraph")
        pcg.innerHTML = ''
        let dc = document.getElementById("donutGraph")
        dc.innerHTML = ''
        document.getElementById("attacksAndAttackers").style.outline = "none"
        document.getElementById("parallelCoordinatesGraph").style.outline = "none"
        document.getElementById("donutGraph").style.outline = "none"
    }
    else{
        document.getElementById("exportButton").style.visibility = "hidden"
        document.getElementById("goBackButton").style.visibility = "hidden"
        let cgbg = document.getElementById("attacksAndAttackers")
        cgbg.innerHTML = ''
        document.getElementById("attacksAndAttackers").style.outline = "none"
        let aAndALineChart = new AttacksAndAttackers(Table.countriesChosenUsedInAnotherFunction)
        aAndALineChart.fetchData()
    
        
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
    if (Math.abs(value) >= 1000000){
        return (value/1000000).toFixed(1) + 'M'
    }
    else if (Math.abs(value) >= 100000){
        return (value/1000000).toFixed(2) + 'M'
    }
    else if (Math.abs(value) >= 10000){
        return (value/1000).toFixed(1) + 'K'
    }
    else if (Math.abs(value) >= 1000){
        return (value/1000).toFixed(2) + 'K'
    }
    else{
        return value.toFixed(0) + ''
    }
}

function filterUsername(){
    let pcg = document.getElementById("parallelCoordinatesGraph")
    pcg.innerHTML = ''
    document.getElementById("parallelCoordinatesGraph").style.outline = "none"
    let parallelCoordinate = new ParallelCoordinate(Table.countriesChosenUsedInAnotherFunction, "yes")
    parallelCoordinate.dataForThirdViz(ParallelCoordinate.dataUsedInVizScreen)
    // parallelCoordinate.fetchData2()
}

function removeUserNameFilterOptions(){
    document.getElementById("usernameFilter").style.width = "0px"
    document.getElementById("usernameFilter").style.height = "0px"
    $('#usernameFilter').find('option').remove()
}

function finalCRChecker(){
    let dateValue = document.getElementById("timePeriod").value
        
    if (dateValue === "month"){
        let value1 = $("select[name='startMonthPick'] option:selected").index()
        let value2 = $("select[name='endMonthPick'] option:selected").index()

        if (value2 > value1){
            if (value2 - value1 + 1 <= 30){
                let timeRangeList = []
                let monthList = document.getElementById("startMonthPick")
                for (let x = value1; x <= value2; x++){
                    timeRangeList.push(monthList.options[x].text)
                }
                document.getElementById("exportIPButton").style.visibility = "visible"
                document.getElementById("legendForIPGraph").innerHTML = ""
                document.getElementById("crossReferenceIPGraphs").innerHTML = ""
                document.getElementById("legendForTreeMap").innerHTML = ""
                $(".node").remove()
                let crossReferenceIPObject = new CrossReferenceIPLineChart(timeRangeList)
                crossReferenceIPObject.fetchData()
            }
            else{
                alert("Choose at most 30 months.")
            }
        }
        else{
            alert("End Month has to be greater than Start Month.")
        }
    }
    if (dateValue === "week"){
        let value1 = $("select[name='startWeekPick'] option:selected").index()
        let value2 = $("select[name='endWeekPick'] option:selected").index()

        if (value2 > value1){
            if (value2 - value1 + 1 <= 30){
                let timeRangeList = []
                let weekList = document.getElementById("startWeekPick")
                for (let x = value1; x <= value2; x++){
                    let totalText = weekList.options[x].text
                    let neededText = totalText.substring(0,7)
                    timeRangeList.push(neededText)
                }
                document.getElementById("legendForIPGraph").innerHTML = ""
                document.getElementById("crossReferenceIPGraphs").innerHTML = ""
                document.getElementById("exportIPButton").style.visibility = "visible"
                document.getElementById("legendForTreeMap").innerHTML = ""
                $(".node").remove()
                let crossReferenceIPObject = new CrossReferenceIPLineChart(timeRangeList)
                crossReferenceIPObject.fetchData()
            }
            else{
                alert("Choose at most 30 weeks.")
            }
        }
        else{
            alert("End Week has to be greater than Start Week.")
        }
    }
    if (dateValue === "day"){
        let startDate = new Date($('#startDatePick').val() + "GMT-0700")
        let endDate = new Date($('#endDatePick').val() + "GMT-0700")
        let diffTime = Math.abs(endDate - startDate)
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        // console.log(diffDays)
        if (endDate > startDate){
            if (diffDays + 1 <= 30){
                let timeRangeList = []
                function getDates (startDate, endDate) {
                    const dates = []
                    let currentDate = startDate
                    const addDays = function (days) {
                      const date = new Date(this.valueOf())
                      date.setDate(date.getDate() + days)
                      return date
                    }
                    while (currentDate <= endDate) {
                      dates.push(currentDate)
                      currentDate = addDays.call(currentDate, 1)
                    }
                    return dates
                }
                const dates = getDates(startDate, endDate)
                
                function formatDate(date) {
                    var d = new Date(date),
                        month = '' + (d.getMonth() + 1),
                        day = '' + d.getDate(),
                        year = d.getFullYear();
                
                    if (month.length < 2) 
                        month = '0' + month;
                    if (day.length < 2) 
                        day = '0' + day;
                
                    return [year, month, day].join('-');
                }

                dates.forEach(function (date) {
                    timeRangeList.push(formatDate(date))
                })
                document.getElementById("exportIPButton").style.visibility = "visible"
                document.getElementById("legendForIPGraph").innerHTML = ""
                document.getElementById("crossReferenceIPGraphs").innerHTML = ""
                document.getElementById("legendForTreeMap").innerHTML = ""
                $(".node").remove()
                let crossReferenceIPObject = new CrossReferenceIPLineChart(timeRangeList)
                crossReferenceIPObject.fetchData()
            }
            else{
                alert("Choose at most 30 days.")
            }
        }
        else{
            alert("End Day has to be greater than Start Day.")
        }
    }

}


function removeIP(){
    const select = document.getElementById('ipsClicked');
    const opt  = select.options[select.selectedIndex];
    if (opt.disabled === false){
        opt.remove()
    }

    if ($('#ipsClicked').children('option').length < 2){
        document.getElementById("exportIPButton").style.visibility = "hidden"
        document.getElementById("startMonthPick").style.visibility = "hidden"
        document.getElementById("endMonthPick").style.visibility = "hidden"
        document.getElementById("startWeekPick").style.visibility = "hidden"
        document.getElementById("endWeekPick").style.visibility = "hidden"
        document.getElementById("startDatePick").style.visibility = "hidden"
        document.getElementById("endDatePick").style.visibility = "hidden"
        document.getElementById("crButton").style.visibility = "hidden"
        document.getElementById("crossReferenceIPGraphs").style.outline = "none"
        document.getElementById("crossReferenceIPGraphs").innerHTML = ""
        document.getElementById("legendForIPGraph").style.outline = "none"
        document.getElementById("legendForIPGraph").innerHTML = ""
        $(".node").remove()
        document.getElementById("legendForTreeMap").innerHTML = ""
    }
}



