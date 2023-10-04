class LineChartAttacks{

    static countries 

    constructor(neededData, selectedTimes, booleanForSoloLineChart){
        this.neededData = neededData
        //console.log(this.neededData)
        this.selectedTimes = selectedTimes
        this.booleanForSoloLineChart = booleanForSoloLineChart
    }

    findValues(threshold, currentBaseTime, countriesOnly){
        let finalFilter = []
        for (let i = 0; i < countriesOnly.length; i++){
            let area = countriesOnly[i]
            let values = []
            for (let time of this.selectedTimes){
                if (time !== currentBaseTime){
                    let value = ((area[time].attacks - area[currentBaseTime].attacks)/area[currentBaseTime].attacks) * 100
                    let actualValue = isFinite(value) ? value : 0
                    values.push(actualValue)
                }
            }
            if (values.some(el => el >= threshold)){
                finalFilter.push(area.country)
            }
        }
        return finalFilter
    }

    findValues2(threshold2, currentBaseTime, countriesOnly){
        let finalFilter = []
        for (let i = 0; i < countriesOnly.length; i++){
            let area = countriesOnly[i]
            let values = []
            for (let time of this.selectedTimes){
                if (time !== currentBaseTime){
                    let value = area[time].attacks - area[currentBaseTime].attacks
                    values.push(value)
                }
            }
            if (values.some(el => el >= threshold2)){
                finalFilter.push(area.country)
            }
        }
        return finalFilter
    }

    filterCountries(countriesOnly){
        let currentBaseTime = document.getElementById("dataset-select").value
        let slider = document.getElementById("myRange");
        let threshold = Number(slider.value)
        let finalFilter = this.findValues(threshold, currentBaseTime, countriesOnly)
        countriesOnly = countriesOnly.filter(function(el) { 
            if (finalFilter.includes(el.country)){
                return el
            }
        });

        let slider2 = document.getElementById("myRange2");
        let threshold2 = Number(slider2.value)
        let finalFilter2 = this.findValues2(threshold2, currentBaseTime, countriesOnly)
        countriesOnly = countriesOnly.filter(function(el) { 
            if (finalFilter2.includes(el.country)){
                return el
            }
        });
        return countriesOnly
    }

    drawLinechart(){
        // console.log(this.neededData)
        // console.log(this.neededData.length)

        // let filteredCountriesOnly
        // if (this.neededData.length === 6){
        //     let countriesOnly = this.separateCountries()
        //     //console.log(countriesOnly)
        //     filteredCountriesOnly = this.filterCountries(countriesOnly)
        //     //console.log(filteredCountriesOnly)
        // }
        // else{
        //     filteredCountriesOnly = this.neededData
        // }

        
        let dimensionOfLineChartWidth = 540
        let dimensionOfLineChartHeight = 500
        if (this.selectedTimes.length > 10){
            dimensionOfLineChartWidth = 540 + 30 * (this.selectedTimes.length - 10)
        }

        

        let linechartElement = document.getElementById("line-chart-attacks")
        linechartElement.style.height = dimensionOfLineChartHeight+"px"
        linechartElement.style.width = dimensionOfLineChartWidth +"px"
        

        let filteredCountriesOnly
        if (this.booleanForSoloLineChart === "One"){
            filteredCountriesOnly = this.neededData
        }
        else{
            filteredCountriesOnly = this.filterCountries(this.neededData)
        }
        // console.log('Y:', filteredCountriesOnly.length)
        //LineChartAttacks.countries = filteredCountriesOnly


        let pad_left = 100
        let pad_right = 10
        let pad_bottom = 100
        let attacksByPlaceMappedByLocation = new Map([])
        let csvTypeData = []

        for (let country of filteredCountriesOnly){
            // console.log(country)
            let number = 1
            let val = []
            for (let time of this.selectedTimes){
                let instance = {cases: country[time].attacks, country: country.country, time: number}
                val.push(instance)
                csvTypeData.push(instance)
                number = number + 1
            }
            attacksByPlaceMappedByLocation.set(country.country, val)
        }

        //console.log(attacksByPlaceMappedByLocation)

        let cases = []
        for (let [key, value] of attacksByPlaceMappedByLocation) {
          value.forEach(function(element){
            element.cases = parseFloat(element.cases)
            cases.push(element.cases)
          })
        }

        let lineChart = d3.select('#line-chart-attacks')

        // let xaxisvalues = []
        // for (let i = 0;  i < this.selectedTimes.length; i++){
        //     let val = 'TP' + (i+1)
        //     xaxisvalues.push(val)
        // }

        
        let upperlimit = 0.1 + this.selectedTimes.length
        //console.log(limit)
        let xScale = d3.scaleLinear().domain([1, upperlimit]).range([pad_left, dimensionOfLineChartWidth - pad_right]);
        let xAxis = d3.axisBottom(xScale).ticks(this.selectedTimes.length)
        .tickFormat(x => {
            if (x % 1 === 0){
                return 'TP' + x
            }
            else{
                return ''
            }
        })
        lineChart.select("#x-axis-attacks").style("font-size", "25px")
        .attr("transform", "translate(0," + (dimensionOfLineChartHeight - pad_bottom) + ")").call(xAxis)
        .selectAll("text").style("text-anchor", "end")
        .style("font-size", "20px")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-90)")

        let yScale = d3.scaleLinear().domain([0, d3.max(cases)]).range([dimensionOfLineChartHeight - pad_bottom, 40]);
        let yAxis = d3.axisLeft().scale(yScale).ticks(8)//
        lineChart.select("#y-axis-attacks").style("font-size", "20px").attr("transform", "translate(" + pad_left + ",0)").call(yAxis)
        .selectAll("text")
        .text(d => {
            if (d >= 100000){
                return (d/1000000) + 'M'
            }
            else if (d >= 1000){
                return (d/1000).toFixed(1) + 'K'
            }
            else{
                return d
            }
        })

        lineChart.append('text').text('Time Periods').attr('x', (dimensionOfLineChartWidth/2) - 30).attr('y', 470).style("font-size", "25px").attr("id", "t1")
        lineChart.append('text').text('Attacks').attr('x', -250).attr('y', 30).attr('transform', 'rotate(-90)').style("font-size", "25px").attr("id", "t2")
        lineChart.append('text').text('Attacks Over The Time Periods').attr('x', (dimensionOfLineChartWidth/2) - 90).attr('y', 20).style("font-size", "25px").attr("id", "t3")

        let lineColorScale 
        if (filteredCountriesOnly.length <= 20){
            lineColorScale = d3.scaleOrdinal(d3.schemeTableau10).domain(attacksByPlaceMappedByLocation.keys())
        }
        else{
            lineColorScale = d3.scaleOrdinal(['grey']).domain(attacksByPlaceMappedByLocation.keys())
        }

        lineChart.select('#lines-attacks').selectAll('path').data(attacksByPlaceMappedByLocation).join('path')
                 .attr('fill', 'none').attr('stroke', ([group, values]) => lineColorScale(group)).attr('stroke-width', 1)
                 .attr('d', ([group, values]) => d3.line()
                                         .x((d) => xScale(d.time))
                                         .y((d) => yScale(d.cases))
                                         (values)) 

        lineChart.on('mousemove', (event) => {
          if (event.offsetX > pad_left && event.offsetX < dimensionOfLineChartWidth - pad_right) {
            // Set the line position
            lineChart.select('#overlay-attacks').select('line').attr('stroke', 'black').attr('x1', event.offsetX).attr('x2', event.offsetX).attr('y1', dimensionOfLineChartHeight - pad_bottom).attr('y2', 20);
            const yearHovered = Math.floor(xScale.invert(event.offsetX))
            //console.log('X:', yearHovered)
    
            let filteredData = csvTypeData
              .filter((row) => {
                return Number(row['time']) === yearHovered
              })
              .sort((rowA, rowB) => rowB.cases - rowA.cases)
            
            //console.log('Y:', filteredData)
    
            lineChart.select('#overlay-attacks')
              .selectAll('text')
              .data(filteredData)
              .join('text')
              .text(d=>`${d.country}, ${this.convert(d.cases)}`)
              .attr('x', function(){
                if (filteredCountriesOnly.length > 20){
                    return event.offsetX < (dimensionOfLineChartWidth/2) + pad_right ? event.offsetX : event.offsetX - 300
                }
                else{
                    return event.offsetX < (dimensionOfLineChartWidth/2) + pad_right ? event.offsetX : event.offsetX - 400
                }
              }) 
              .attr('y', (d, i) => {
                if (filteredCountriesOnly.length > 20){
                    return 20*i + 30
                }
                else{
                    return 25*i + 30
                }
               })
              .attr('alignment-baseline', 'hanging')
              .attr('fill', (d) => lineColorScale(d.country))
              .style("font-size", filteredCountriesOnly.length <= 20 ? "25px" : "18px")
          }
        });
    }

    convert(value){
        if (value >= 100000){
            return (value/1000000).toFixed(1) + 'M'
        }
        else if (value >= 1000){
            return (value/1000).toFixed(1) + 'K'
        }
        else{
            return value
        }
    }

    removeText(){
        document.getElementById("t1").outerHTML = ""
        document.getElementById("t2").outerHTML = ""
        document.getElementById("t3").outerHTML = ""
    }


}