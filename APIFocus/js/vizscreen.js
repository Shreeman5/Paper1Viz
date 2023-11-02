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
        this.hideIPLineChartButtons()
        this.removeFilterSlidersAndTextBoxOptions()
        this.removeNonFilterSlidersAndTextBoxOptions()
        this.removeUserNameFilterOptions2()
        this.removeIPsAndHideSelects()

        this.fillInDateGapsForData() //Fill Gaps in Date in Data
        this.removePathsAndStarsAndRects()
        this.removelineChartParallelCoordinateDonutChart()

        this.removePreviousDatestoTPs() 
        this.changeDatestoTPs()

        this.removeBaseOptions()
        this.optionsForBaseSelections() 

        this.removeStuffinFilterAndNonFilterDiv()
        this.addStuffForElementsinFilterAndNonFilterDiv()
        this.initializeIPDatePicker()
        
        this.removeRedSpotFromTable()
        this.removeTableTHelements()
        this.makeTableTHstructure()
        this.makeTable()
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
    }

    initializeIPDatePicker(){
        let dateValue = document.getElementById("timePeriod").value
        
        if (dateValue === "month"){
            $("#monthPick option").each(function()
            {
                let myVal = $(this).val()
                if (myVal !== 'Please Select Multiple Months'){
                    let startMonthSelect = document.getElementById("startMonthPick")
                    let option = document.createElement("option")
                    option.value = myVal
                    option.text = myVal
                    startMonthSelect.add(option)

                    let endMonthSelect = document.getElementById("endMonthPick")
                    let option2 = document.createElement("option")
                    option2.value = myVal
                    option2.text = myVal
                    endMonthSelect.add(option2)
                }
            })
        }
        else if (dateValue === "week"){
            $("#weekPick option").each(function()
            {
                let myVal = $(this).val()
                if (myVal !== 'Please Select Multiple Weeks'){
                    let startWeekSelect = document.getElementById("startWeekPick")
                    let option = document.createElement("option")
                    option.value = myVal
                    option.text = myVal
                    startWeekSelect.add(option)

                    let endWeekSelect = document.getElementById("endWeekPick")
                    let option2 = document.createElement("option")
                    option2.value = myVal
                    option2.text = myVal
                    endWeekSelect.add(option2)
                }
            })
        }
        else if (dateValue === "day"){
            let myMinDate = $('#datePick').datepicker("option", "minDate")
            let myMaxDate = $('#datePick').datepicker("option", "maxDate")
    
            $(document).ready(function () {
                $( "#startDatePick" ).datepicker({
                    minDate: myMinDate,
                    maxDate: myMaxDate
                })
                $( "#endDatePick" ).datepicker({
                    minDate: myMinDate,
                    maxDate: myMaxDate
                })
            });
        }
    }

    hideIPLineChartButtons(){
        document.getElementById("exportButton").style.visibility = "hidden"
        document.getElementById("goBackButton").style.visibility = "hidden"
    }

    removeNonFilterSlidersAndTextBoxOptions(){
        $('#ANOMPERCHOOSE').find('option').not(':first').remove()
        $('#ANOMABSCHOOSE').find('option').not(':first').remove()
        let perAnomOutput = document.getElementById("ANOMPERWRITE")
        perAnomOutput.value = ''
        let absAnomOutput = document.getElementById("ANOMABSWRITE")
        absAnomOutput.value = ''
    }

    removeFilterSlidersAndTextBoxOptions(){
        $('#PERCHOOSE').find('option').not(':first').remove()
        $('#ABSCHOOSE').find('option').not(':first').remove()
        let perOutput = document.getElementById("PERWRITE")
        perOutput.value = ''
        let absOutput = document.getElementById("ABSWRITE")
        absOutput.value = ''
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

    addPercentageChangeHistogram(svg, percentSliderMin, percentSliderMax, allNumbers){
        let midNum = (percentSliderMin+percentSliderMax)/2
        let IQ1 = (percentSliderMin+midNum)/2
        let IQ3 = (midNum+percentSliderMax)/2
        let fiveNumbers = [percentSliderMin, IQ1, midNum, IQ3, percentSliderMax]
        let xAxis = d3.scaleLinear().domain([percentSliderMin, percentSliderMax]).range([50, 450])
        let that = this
        svg.append("g")
            .style("font", "20px times")
            .attr("transform", "translate(20," + 110 + ")")
            .call(d3.axisBottom(xAxis).tickValues(fiveNumbers).tickFormat(function(d){
                return that.fixNumbers(d)
            }))
            

        let histogram = d3.histogram()
                        .value(function(d) { 
                            return d
                        })   
                        .domain(xAxis.domain()) 
                        .thresholds(d3.range(percentSliderMin, percentSliderMax, (percentSliderMax - percentSliderMin)/50)); 

        let bins = histogram(allNumbers)
        
        let minY = 0
        let maxY = d3.max(bins, function(d) { return d.length; })
        let avgY = (minY+maxY)/2

        let yAxis = d3.scaleLinear().range([110, 10]);
        yAxis.domain([0, maxY]);   // d3.hist has to be called before the Y axis obviously
        
        svg.append("g")
        .style("font", "20px times")
        .attr("transform", "translate(70," + 0 + ")")
        .call(d3.axisLeft(yAxis).tickValues([minY, avgY, maxY]).tickFormat(function(d){
            return that.fixNumbers(d)
        }));

        svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
          .attr("x", 1)
          .attr("transform", function(d) { return "translate(" + (xAxis(d.x0)+20) + "," + yAxis(d.length) + ")"; })
          .attr("width", function(d) { return xAxis(d.x1) - xAxis(d.x0) - 1 ; })
          .attr("height", function(d) { return 110 - yAxis(d.length); })
          .style("fill", "#69b3a2")
    }

    addOptionsForPercentageSlider(){
        let baseSelect = document.getElementById("PERCHOOSE")
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

    addAbsoluteChangeHistogram(svg2, absoluteSliderMin, absoluteSliderMax, allNumbers2){
        let midNum = (absoluteSliderMin+absoluteSliderMax)/2
        let IQ1 = (absoluteSliderMin+midNum)/2
        let IQ3 = (midNum+absoluteSliderMax)/2
        let fiveNumbers = [absoluteSliderMin, IQ1, midNum, IQ3, absoluteSliderMax]
        let xAxis = d3.scaleLinear().domain([absoluteSliderMin, absoluteSliderMax]).range([50, 450])
        let that = this
        svg2.append("g")
            .style("font", "20px times")
            .attr("transform", "translate(20," + 110 + ")")
            .call(d3.axisBottom(xAxis).tickValues(fiveNumbers).tickFormat(function(d){
                return that.fixNumbers(d)
            }))
            

        let histogram = d3.histogram()
                        .value(function(d) { 
                            return d
                        })   
                        .domain(xAxis.domain()) 
                        .thresholds(d3.range(absoluteSliderMin, absoluteSliderMax, (absoluteSliderMax - absoluteSliderMin)/50)); 

        let bins = histogram(allNumbers2)
        
        let minY = 0
        let maxY = d3.max(bins, function(d) { return d.length; })
        let avgY = (minY+maxY)/2

        let yAxis = d3.scaleLinear().range([110, 10]);
        yAxis.domain([0, maxY]);   // d3.hist has to be called before the Y axis obviously
        
        svg2.append("g")
        .style("font", "20px times")
        .attr("transform", "translate(70," + 0 + ")")
        .call(d3.axisLeft(yAxis).tickValues([minY, avgY, maxY]).tickFormat(function(d){
            return that.fixNumbers(d)
        }));

        svg2.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
          .attr("x", 1)
          .attr("transform", function(d) { return "translate(" + (xAxis(d.x0)+20) + "," + yAxis(d.length) + ")"; })
          .attr("width", function(d) { return xAxis(d.x1) - xAxis(d.x0) - 1 ; })
          .attr("height", function(d) { return 110 - yAxis(d.length); })
          .style("fill", "#69b3a2")
    }

    addOptionsForAbsoluteSlider(){
        let baseSelect = document.getElementById("ABSCHOOSE")
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


    addAnomalyPercentChangeHistogram(svg3, percentSliderAnomalyMin, percentSliderAnomalyMax, allNumbers3){
        let midNum = (percentSliderAnomalyMin+percentSliderAnomalyMax)/2
        let IQ1 = (percentSliderAnomalyMin+midNum)/2
        let IQ3 = (midNum+percentSliderAnomalyMax)/2
        let fiveNumbers = [percentSliderAnomalyMin, IQ1, midNum, IQ3, percentSliderAnomalyMax]
        let xAxis = d3.scaleLinear().domain([percentSliderAnomalyMin, percentSliderAnomalyMax]).range([20, 340])
        let that = this
        svg3.append("g")
            .style("font", "20px times")
            .attr("transform", "translate(35,215)")//rotate(270)
            .call(d3.axisBottom(xAxis).tickValues(fiveNumbers).tickFormat(function(d){
                return that.fixNumbers(d)
            })).selectAll("text")  
            .style("text-anchor", "start")
            .attr("dx", "0.2em")
            .attr("dy", "-0.5em")
            .attr("transform", "rotate(90)")

        let histogram = d3.histogram()
        .value(function(d) { 
            return d
        })   
        .domain(xAxis.domain()) 
        .thresholds(d3.range(percentSliderAnomalyMin, percentSliderAnomalyMax, (percentSliderAnomalyMax - percentSliderAnomalyMin)/50)); 

        let bins = histogram(allNumbers3)

        let minY = 0
        let maxY = d3.max(bins, function(d) { return d.length; })
        let avgY = (minY+maxY)/2

        let yAxis = d3.scaleLinear().range([215, 10]);
        yAxis.domain([0, maxY]);   // d3.hist has to be called before the Y axis obviously

        svg3.append("g")
        .style("font", "20px times")
        .attr("transform", "translate(55,0)")//rotate(270)
        .call(d3.axisLeft(yAxis).tickValues([minY, avgY, maxY]).tickFormat(function(d){
            return that.fixNumbers(d)
        }))
        .selectAll("text")  
            .style("text-anchor", "start")
            .attr("dx", "0em")
            .attr("dy", "1em")
            .attr("transform", "rotate(90)")

        svg3.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
          .attr("transform", function(d) { return "translate(" + (xAxis(d.x0)+35) + "," + (yAxis(d.length)) + ")"; })
          .attr("width", function(d) { return xAxis(d.x1) - xAxis(d.x0) - 1 ; })
          .attr("height", function(d) { return 215 - yAxis(d.length); })
          .style("fill", "#69b3a2")
    }

    addOptionsForAnomalyPercentageSlider(allNumbers3){
        let tenValues = [allNumbers3[Math.floor(allNumbers3.length * 0.1)],
                        allNumbers3[Math.floor(allNumbers3.length * 0.3)],
                        allNumbers3[Math.floor(allNumbers3.length * 0.5)],
                        allNumbers3[Math.floor(allNumbers3.length * 0.7)],
                        allNumbers3[Math.floor(allNumbers3.length * 0.9)],
                        allNumbers3[Math.floor(allNumbers3.length * 0.95)],
                        allNumbers3[Math.floor(allNumbers3.length * 0.96)],
                        allNumbers3[Math.floor(allNumbers3.length * 0.97)],
                        allNumbers3[Math.floor(allNumbers3.length * 0.98)],
                        allNumbers3[Math.floor(allNumbers3.length * 0.99)]]
        let totalAnomValues = [allNumbers3.length - Math.floor(allNumbers3.length * 0.1),
                               allNumbers3.length - Math.floor(allNumbers3.length * 0.3),
                               allNumbers3.length - Math.floor(allNumbers3.length * 0.5),
                               allNumbers3.length - Math.floor(allNumbers3.length * 0.7),
                               allNumbers3.length - Math.floor(allNumbers3.length * 0.9),
                               allNumbers3.length - Math.floor(allNumbers3.length * 0.95),
                               allNumbers3.length - Math.floor(allNumbers3.length * 0.96),
                               allNumbers3.length - Math.floor(allNumbers3.length * 0.97),
                               allNumbers3.length - Math.floor(allNumbers3.length * 0.98),
                               allNumbers3.length - Math.floor(allNumbers3.length * 0.99)]
        let baseSelect = document.getElementById("ANOMPERCHOOSE")
        let givenOptions = ["Percent Anomaly Threshold = 10%, Threshold Number = "+ this.fixNumbers(tenValues[0]) + ", Total Anomalous Values = "+ totalAnomValues[0],
                            "Percent Anomaly Threshold = 30%, Threshold Number = "+ this.fixNumbers(tenValues[1]) + ", Total Anomalous Values = "+ totalAnomValues[1],
                            "Percent Anomaly Threshold = 50%, Threshold Number = "+ this.fixNumbers(tenValues[2]) + ", Total Anomalous Values = "+ totalAnomValues[2],
                            "Percent Anomaly Threshold = 70%, Threshold Number = "+ this.fixNumbers(tenValues[3]) + ", Total Anomalous Values = "+ totalAnomValues[3],
                            "Percent Anomaly Threshold = 90%, Threshold Number = "+ this.fixNumbers(tenValues[4]) + ", Total Anomalous Values = "+ totalAnomValues[4],
                            "Percent Anomaly Threshold = 95%(Default), Threshold Number = "+ this.fixNumbers(tenValues[5]) + ", Total Anomalous Values = "+ totalAnomValues[5],
                            "Percent Anomaly Threshold = 96%, Threshold Number = "+ this.fixNumbers(tenValues[6]) + ", Total Anomalous Values = "+ totalAnomValues[6],
                            "Percent Anomaly Threshold = 97%, Threshold Number = "+ this.fixNumbers(tenValues[7]) + ", Total Anomalous Values = "+ totalAnomValues[7],
                            "Percent Anomaly Threshold = 98%, Threshold Number = "+ this.fixNumbers(tenValues[8]) + ", Total Anomalous Values = "+ totalAnomValues[8],
                            "Percent Anomaly Threshold = 99%, Threshold Number = "+ this.fixNumbers(tenValues[9]) + ", Total Anomalous Values = "+ totalAnomValues[9]]


        for (let i = 0; i < givenOptions.length; i++){
            let option = document.createElement("option")
            option.value = tenValues[i]
            option.text = givenOptions[i]
            baseSelect.add(option)
        }
    }

    addAnomalyAbsoluteHistogram(svg4, absoluteSliderAnomalyMin, absoluteSliderAnomalyMax, allNumbers4){
        let midNum = (absoluteSliderAnomalyMin+absoluteSliderAnomalyMax)/2
        let IQ1 = (absoluteSliderAnomalyMin+midNum)/2
        let IQ3 = (midNum+absoluteSliderAnomalyMax)/2
        let fiveNumbers = [absoluteSliderAnomalyMin, IQ1, midNum, IQ3, absoluteSliderAnomalyMax]
        let xAxis = d3.scaleLinear().domain([absoluteSliderAnomalyMin, absoluteSliderAnomalyMax]).range([20, 340])
        let that = this
        svg4.append("g")
            .style("font", "20px times")
            .attr("transform", "translate(35,215)")//rotate(270)
            .call(d3.axisBottom(xAxis).tickValues(fiveNumbers).tickFormat(function(d){
                return that.fixNumbers(d)
            })).selectAll("text")  
            .style("text-anchor", "start")
            .attr("dx", "0.2em")
            .attr("dy", "-0.5em")
            .attr("transform", "rotate(90)")

        let histogram = d3.histogram()
        .value(function(d) { 
            return d
        })   
        .domain(xAxis.domain()) 
        .thresholds(d3.range(absoluteSliderAnomalyMin, absoluteSliderAnomalyMax, (absoluteSliderAnomalyMax - absoluteSliderAnomalyMin)/50)); 

        let bins = histogram(allNumbers4)

        let minY = 0
        let maxY = d3.max(bins, function(d) { return d.length; })
        let avgY = (minY+maxY)/2

        let yAxis = d3.scaleLinear().range([215, 10]);
        yAxis.domain([0, maxY]);   // d3.hist has to be called before the Y axis obviously

        svg4.append("g")
        .style("font", "20px times")
        .attr("transform", "translate(55,0)")//rotate(270)
        .call(d3.axisLeft(yAxis).tickValues([minY, avgY, maxY]).tickFormat(function(d){
            return that.fixNumbers(d)
        }))
        .selectAll("text")  
            .style("text-anchor", "start")
            .attr("dx", "0em")
            .attr("dy", "1em")
            .attr("transform", "rotate(90)")

        svg4.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
          .attr("transform", function(d) { return "translate(" + (xAxis(d.x0)+35) + "," + (yAxis(d.length)) + ")"; })
          .attr("width", function(d) { return xAxis(d.x1) - xAxis(d.x0) - 1 ; })
          .attr("height", function(d) { return 215 - yAxis(d.length); })
          .style("fill", "#69b3a2")
    }

    addOptionsForAnomalyAbsoluteSlider(allNumbers4){
        let tenValues = [allNumbers4[Math.floor(allNumbers4.length * 0.1)],
                        allNumbers4[Math.floor(allNumbers4.length * 0.3)],
                        allNumbers4[Math.floor(allNumbers4.length * 0.5)],
                        allNumbers4[Math.floor(allNumbers4.length * 0.7)],
                        allNumbers4[Math.floor(allNumbers4.length * 0.9)],
                        allNumbers4[Math.floor(allNumbers4.length * 0.95)],
                        allNumbers4[Math.floor(allNumbers4.length * 0.96)],
                        allNumbers4[Math.floor(allNumbers4.length * 0.97)],
                        allNumbers4[Math.floor(allNumbers4.length * 0.98)],
                        allNumbers4[Math.floor(allNumbers4.length * 0.99)]]
        let totalAnomValues = [allNumbers4.length - Math.floor(allNumbers4.length * 0.1),
            allNumbers4.length - Math.floor(allNumbers4.length * 0.3),
            allNumbers4.length - Math.floor(allNumbers4.length * 0.5),
            allNumbers4.length - Math.floor(allNumbers4.length * 0.7),
            allNumbers4.length - Math.floor(allNumbers4.length * 0.9),
            allNumbers4.length - Math.floor(allNumbers4.length * 0.95),
            allNumbers4.length - Math.floor(allNumbers4.length * 0.96),
            allNumbers4.length - Math.floor(allNumbers4.length * 0.97),
            allNumbers4.length - Math.floor(allNumbers4.length * 0.98),
            allNumbers4.length - Math.floor(allNumbers4.length * 0.99)]
        let baseSelect = document.getElementById("ANOMABSCHOOSE")
        let givenOptions = ["Absolute Anomaly Threshold = 10%, Number = "+ this.fixNumbers(tenValues[0]) + ", Total Anomalous Values = "+ totalAnomValues[0],
                            "Absolute Anomaly Threshold = 30%, Number = "+ this.fixNumbers(tenValues[1]) + ", Total Anomalous Values = "+ totalAnomValues[1],
                            "Absolute Anomaly Threshold = 50%, Number = "+ this.fixNumbers(tenValues[2]) + ", Total Anomalous Values = "+ totalAnomValues[2],
                            "Absolute Anomaly Threshold = 70%, Number = "+ this.fixNumbers(tenValues[3]) + ", Total Anomalous Values = "+ totalAnomValues[3],
                            "Absolute Anomaly Threshold = 90%, Number = "+ this.fixNumbers(tenValues[4]) + ", Total Anomalous Values = "+ totalAnomValues[4],
                            "Absolute Anomaly Threshold = 95%(Default), Number = "+ this.fixNumbers(tenValues[5]) + ", Total Anomalous Values = "+ totalAnomValues[5],
                            "Absolute Anomaly Threshold = 96%, Number = "+ this.fixNumbers(tenValues[6]) + ", Total Anomalous Values = "+ totalAnomValues[6],
                            "Absolute Anomaly Threshold = 97%, Number = "+ this.fixNumbers(tenValues[7]) + ", Total Anomalous Values = "+ totalAnomValues[7],
                            "Absolute Anomaly Threshold = 98%, Number = "+ this.fixNumbers(tenValues[8]) + ", Total Anomalous Values = "+ totalAnomValues[8],
                            "Absolute Anomaly Threshold = 99%, Number = "+ this.fixNumbers(tenValues[9]) + ", Total Anomalous Values = "+ totalAnomValues[9]]


        for (let i = 0; i < givenOptions.length; i++){
            let option = document.createElement("option")
            option.value = tenValues[i]
            option.text = givenOptions[i]
            baseSelect.add(option)
        }
    }

    addStuffForElementsinFilterAndNonFilterDiv(){
        let baseSelect = document.getElementById("baseTP")
        let dynamicSlider = new DynamicSlider(this.summaryData, baseSelect.value)

        let [percentSliderMin, percentSliderMax, allNumbers] = dynamicSlider.percentChangeSliderValues()
        let perSlider = document.getElementById("myRange")
        perSlider.min = percentSliderMin
        perSlider.max = percentSliderMax
        perSlider.value = percentSliderMin
        let svg = d3.select("#svg1")
        this.addPercentageChangeHistogram(svg, percentSliderMin, percentSliderMax, allNumbers)
        this.addOptionsForPercentageSlider()

        let [absoluteSliderMin, absoluteSliderMax, allNumbers2] = dynamicSlider.absoluteChangeSliderValues()
        let absSlider = document.getElementById("myRange2")
        absSlider.min = absoluteSliderMin
        absSlider.max = absoluteSliderMax
        absSlider.value = absoluteSliderMin
        let svg2 = d3.select("#svg2")
        this.addAbsoluteChangeHistogram(svg2, absoluteSliderMin, absoluteSliderMax, allNumbers2)
        this.addOptionsForAbsoluteSlider()

        let sortSelect = document.getElementById("sortTP")
        let y = 1
        for (let time of this.selectedTimes){
            let option = document.createElement("option")
            option.value = time
            option.text = 'Sort By -- ' + 'TP' + y
            sortSelect.add(option)
            y += 1
        }

        let [percentSliderAnomalyMin, percentSliderAnomaly95, percentSliderAnomalyMax, allNumbers3] = dynamicSlider.percentAnomalySliderValues()
        let perAnomSlider = document.getElementById("myRange3")
        perAnomSlider.min = percentSliderAnomalyMin
        perAnomSlider.max = percentSliderAnomalyMax
        perAnomSlider.value = percentSliderAnomaly95
        let svg3 = d3.select("#svg3")
        this.addAnomalyPercentChangeHistogram(svg3, percentSliderAnomalyMin, percentSliderAnomalyMax, allNumbers3)
        this.addOptionsForAnomalyPercentageSlider(allNumbers3)
        
        let [absoluteSliderAnomalyMin, absoluteSliderAnomaly95, absoluteSliderAnomalyMax, allNumbers4] = dynamicSlider.absoluteAnomalySliderValues()
        //console.log(allNumbers4)
        let absAnomSlider = document.getElementById("myRange4")
        absAnomSlider.min = absoluteSliderAnomalyMin
        absAnomSlider.max = absoluteSliderAnomalyMax
        absAnomSlider.value = absoluteSliderAnomaly95
        let svg4 = d3.select("#svg4")
        this.addAnomalyAbsoluteHistogram(svg4, absoluteSliderAnomalyMin, absoluteSliderAnomalyMax, allNumbers4)
        this.addOptionsForAnomalyAbsoluteSlider(allNumbers4)
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
            return value.toFixed(1) + ''
        }
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


function addOptionsForPercentageSlider2(){
    $('#PERCHOOSE').find('option').remove()
    let baseSelect = document.getElementById("PERCHOOSE")
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


function addPercentageChangeHistogram2(svg, percentSliderMin, percentSliderMax, allNumbers){
    percentSliderMin = Number(percentSliderMin)
    percentSliderMax = Number(percentSliderMax)
    let midNum = (percentSliderMin+percentSliderMax)/2
    let IQ1 = (percentSliderMin+midNum)/2
    let IQ3 = (midNum+percentSliderMax)/2
    let fiveNumbers = [percentSliderMin, IQ1, midNum, IQ3, percentSliderMax]
    
    // console.log(fiveNumbers)
    let xAxis = d3.scaleLinear().domain([percentSliderMin, percentSliderMax]).range([50, 450])
    let that = this
    svg.append("g")
        .style("font", "20px times")
        .attr("transform", "translate(20," + 110 + ")")
        .call(d3.axisBottom(xAxis).tickValues(fiveNumbers).tickFormat(function(d){
            return that.fixNumbers2(d)
        }))
        

    let histogram = d3.histogram()
                    .value(function(d) { 
                        return d
                    })   
                    .domain(xAxis.domain()) 
                    .thresholds(d3.range(percentSliderMin, percentSliderMax, (percentSliderMax - percentSliderMin)/50)); 

    let bins = histogram(allNumbers)
    
    let minY = 0
    let maxY = d3.max(bins, function(d) { return d.length; })
    let avgY = (minY+maxY)/2

    let yAxis = d3.scaleLinear().range([110, 10]);
    yAxis.domain([0, maxY]);   // d3.hist has to be called before the Y axis obviously
    
    svg.append("g")
    .style("font", "20px times")
    .attr("transform", "translate(70," + 0 + ")")
    .call(d3.axisLeft(yAxis).tickValues([minY, avgY, maxY]).tickFormat(function(d){
        return that.fixNumbers2(d)
    }))

    svg.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
      .attr("x", 1)
      .attr("transform", function(d) { return "translate(" + (xAxis(d.x0)+20) + "," + yAxis(d.length) + ")"; })
      .attr("width", function(d) { return xAxis(d.x1) - xAxis(d.x0) - 1 ; })
      .attr("height", function(d) { return 110 - yAxis(d.length); })
      .style("fill", "#69b3a2")
}

function addOptionsForAbsoluteSlider2(){
    $('#ABSCHOOSE').find('option').remove()
    let baseSelect = document.getElementById("ABSCHOOSE")
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

function addAbsoluteChangeHistogram2(svg2, absoluteSliderMin, absoluteSliderMax, allNumbers2){
    let midNum = (absoluteSliderMin+absoluteSliderMax)/2
    let IQ1 = (absoluteSliderMin+midNum)/2
    let IQ3 = (midNum+absoluteSliderMax)/2
    let fiveNumbers = [absoluteSliderMin, IQ1, midNum, IQ3, absoluteSliderMax]
    let xAxis = d3.scaleLinear().domain([absoluteSliderMin, absoluteSliderMax]).range([50, 450])
    let that = this
    svg2.append("g")
        .style("font", "20px times")
        .attr("transform", "translate(20," + 110 + ")")
        .call(d3.axisBottom(xAxis).tickValues(fiveNumbers).tickFormat(function(d){
            return that.fixNumbers2(d)
        }))
        

    let histogram = d3.histogram()
                    .value(function(d) { 
                        return d
                    })   
                    .domain(xAxis.domain()) 
                    .thresholds(d3.range(absoluteSliderMin, absoluteSliderMax, (absoluteSliderMax - absoluteSliderMin)/50)); 

    let bins = histogram(allNumbers2)
    
    let minY = 0
    let maxY = d3.max(bins, function(d) { return d.length; })
    let avgY = (minY+maxY)/2

    let yAxis = d3.scaleLinear().range([110, 10]);
    yAxis.domain([0, maxY]);   // d3.hist has to be called before the Y axis obviously
    
    svg2.append("g")
    .style("font", "20px times")
    .attr("transform", "translate(70," + 0 + ")")
    .call(d3.axisLeft(yAxis).tickValues([minY, avgY, maxY]).tickFormat(function(d){
        return that.fixNumbers2(d)
    }))

    svg2.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
      .attr("x", 1)
      .attr("transform", function(d) { return "translate(" + (xAxis(d.x0)+20) + "," + yAxis(d.length) + ")"; })
      .attr("width", function(d) { return xAxis(d.x1) - xAxis(d.x0) - 1 ; })
      .attr("height", function(d) { return 110 - yAxis(d.length); })
      .style("fill", "#69b3a2")
}

function addAnomalyPercentChangeHistogram2(svg3, percentSliderAnomalyMin, percentSliderAnomalyMax, allNumbers3){
    // console.log(allNumbers3)
    let midNum = (percentSliderAnomalyMin+percentSliderAnomalyMax)/2
    let IQ1 = (percentSliderAnomalyMin+midNum)/2
    let IQ3 = (midNum+percentSliderAnomalyMax)/2
    let fiveNumbers = [percentSliderAnomalyMin, IQ1, midNum, IQ3, percentSliderAnomalyMax]
    let xAxis = d3.scaleLinear().domain([percentSliderAnomalyMin, percentSliderAnomalyMax]).range([20, 340])
    let that = this
    svg3.append("g")
        .style("font", "20px times")
        .attr("transform", "translate(35,215)")//rotate(270)
        .call(d3.axisBottom(xAxis).tickValues(fiveNumbers).tickFormat(function(d){
            return that.fixNumbers2(d)
        })).selectAll("text")  
        .style("text-anchor", "start")
        .attr("dx", "0.2em")
        .attr("dy", "-0.5em")
        .attr("transform", "rotate(90)")

    let histogram = d3.histogram()
    .value(function(d) { 
        return d
    })   
    .domain(xAxis.domain()) 
    .thresholds(d3.range(percentSliderAnomalyMin, percentSliderAnomalyMax, (percentSliderAnomalyMax - percentSliderAnomalyMin)/50)); 

    let bins = histogram(allNumbers3)

    let minY = 0
    let maxY = d3.max(bins, function(d) { return d.length; })
    let avgY = (minY+maxY)/2

    let yAxis = d3.scaleLinear().range([215, 10]);
    yAxis.domain([0, maxY]);   // d3.hist has to be called before the Y axis obviously

    svg3.append("g")
    .style("font", "20px times")
    .attr("transform", "translate(55,0)")//rotate(270)
    .call(d3.axisLeft(yAxis).tickValues([minY, avgY, maxY]).tickFormat(function(d){
        return that.fixNumbers2(d)
    }))
    .selectAll("text")  
        .style("text-anchor", "start")
        .attr("dx", "0em")
        .attr("dy", "1em")
        .attr("transform", "rotate(90)")

    svg3.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
      .attr("transform", function(d) { return "translate(" + (xAxis(d.x0)+35) + "," + (yAxis(d.length)) + ")"; })
      .attr("width", function(d) { return xAxis(d.x1) - xAxis(d.x0) - 1 ; })
      .attr("height", function(d) { return 215 - yAxis(d.length); })
      .style("fill", "#69b3a2")
}


function addAnomalyAbsoluteHistogram2(svg4, absoluteSliderAnomalyMin, absoluteSliderAnomalyMax, allNumbers4){
    let midNum = (absoluteSliderAnomalyMin+absoluteSliderAnomalyMax)/2
    let IQ1 = (absoluteSliderAnomalyMin+midNum)/2
    let IQ3 = (midNum+absoluteSliderAnomalyMax)/2
    let fiveNumbers = [absoluteSliderAnomalyMin, IQ1, midNum, IQ3, absoluteSliderAnomalyMax]
    let xAxis = d3.scaleLinear().domain([absoluteSliderAnomalyMin, absoluteSliderAnomalyMax]).range([20, 340])
    let that = this
    svg4.append("g")
        .style("font", "20px times")
        .attr("transform", "translate(35,215)")//rotate(270)
        .call(d3.axisBottom(xAxis).tickValues(fiveNumbers).tickFormat(function(d){
            return that.fixNumbers2(d)
        })).selectAll("text")  
        .style("text-anchor", "start")
        .attr("dx", "0.2em")
        .attr("dy", "-0.5em")
        .attr("transform", "rotate(90)")

    let histogram = d3.histogram()
    .value(function(d) { 
        return d
    })   
    .domain(xAxis.domain()) 
    .thresholds(d3.range(absoluteSliderAnomalyMin, absoluteSliderAnomalyMax, (absoluteSliderAnomalyMax - absoluteSliderAnomalyMin)/50)); 

    let bins = histogram(allNumbers4)

    let minY = 0
    let maxY = d3.max(bins, function(d) { return d.length; })
    let avgY = (minY+maxY)/2

    let yAxis = d3.scaleLinear().range([215, 10]);
    yAxis.domain([0, maxY]);   // d3.hist has to be called before the Y axis obviously

    svg4.append("g")
    .style("font", "20px times")
    .attr("transform", "translate(55,0)")//rotate(270)
    .call(d3.axisLeft(yAxis).tickValues([minY, avgY, maxY]).tickFormat(function(d){
        return that.fixNumbers2(d)
    }))
    .selectAll("text")  
        .style("text-anchor", "start")
        .attr("dx", "0em")
        .attr("dy", "1em")
        .attr("transform", "rotate(90)")

    svg4.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
      .attr("transform", function(d) { return "translate(" + (xAxis(d.x0)+35) + "," + (yAxis(d.length)) + ")"; })
      .attr("width", function(d) { return xAxis(d.x1) - xAxis(d.x0) - 1 ; })
      .attr("height", function(d) { return 215 - yAxis(d.length); })
      .style("fill", "#69b3a2")
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
    let perOutput = document.getElementById("PERWRITE")
    perOutput.value = ''
    this.addOptionsForPercentageSlider2()
    document.getElementById("PERCHOOSE").selectedIndex = 0
    let svg = d3.select("#svg1")
    this.addPercentageChangeHistogram2(svg, percentSliderMin, percentSliderMax, allNumbers)

    let [absoluteSliderMin, absoluteSliderMax, allNumbers2] = dynamicSlider.absoluteChangeSliderValues()
    // console.log(absoluteSliderMax)
    let absSlider = document.getElementById("myRange2")
    absSlider.min = absoluteSliderMin
    absSlider.max = absoluteSliderMax
    absSlider.value = absoluteSliderMin
    let absOutput = document.getElementById("ABSWRITE")
    absOutput.value = ''
    this.addOptionsForAbsoluteSlider2()
    document.getElementById("ABSCHOOSE").selectedIndex = 0
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
    let textBox1 = document.getElementById("PERWRITE")
    textBox1.value = slider1.value 

    let range = document.getElementById("myRange2")
    let textBox2 = document.getElementById("ABSWRITE")
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
    let textBox1 = document.getElementById("PERWRITE")
    textBox1.value = '' 
    let slider1 = document.getElementById("myRange")
    slider1.value = slider1.min

    let range = document.getElementById("myRange2")
    let textBox2 = document.getElementById("ABSWRITE")
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
            let textBox2 = document.getElementById("ABSWRITE")
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
    let textBox2 = document.getElementById("ABSWRITE")
    textBox2.value = slider2.value 

    let range = document.getElementById("myRange")    
    let textBox1 = document.getElementById("PERWRITE")
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
    let textBox1 = document.getElementById("ABSWRITE")
    textBox1.value = '' 
    let slider1 = document.getElementById("myRange2")
    slider1.value = slider1.min

    let range = document.getElementById("myRange")
    let textBox2 = document.getElementById("PERWRITE")
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
            let textBox1 = document.getElementById("PERWRITE")
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
    let textBox1 = document.getElementById("ANOMABSWRITE")
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

    let textBox1 = document.getElementById("ANOMABSWRITE")
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
        return value.toFixed(1) + ''
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
    }
}



