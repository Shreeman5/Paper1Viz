class LineChartAttacks{

    static countries 

    constructor(neededData, baseNumber){
        this.neededData = neededData
    }

    separateCountries(){
        let countries = []
        for (let forecast of this.neededData){
            for (let country of forecast.meta){
                countries.push(country)
            }
        }
        return countries
    }

    findValues(threshold, currentBaseWeek, countriesOnly){
        let finalFilter = []
        for (let i = 0; i < countriesOnly.length; i++){
            let area = countriesOnly[i]
            let a1 = 0, a2 = 0, a3 = 0, a4 = 0, a5 = 0, a6 = 0, a7 = 0, a8 = 0
            if (currentBaseWeek === '0'){
                a1 = ((area.count_W2 - area.count_W1)/ area.count_W1) * 100
                a2 = ((area.count_W3 - area.count_W1)/ area.count_W1) * 100
                a3 = ((area.count_W4 - area.count_W1)/ area.count_W1) * 100
                a4 = ((area.count_W5 - area.count_W1)/ area.count_W1) * 100
                a5 = ((area.count_W6 - area.count_W1)/ area.count_W1) * 100
                a6 = ((area.count_W7 - area.count_W1)/ area.count_W1) * 100
                a7 = ((area.count_W8 - area.count_W1)/ area.count_W1) * 100
                a8 = ((area.count_W9 - area.count_W1)/ area.count_W1) * 100
            }
            else if (currentBaseWeek === '1'){
                a1 = ((area.count_W1 - area.count_W2)/ area.count_W2) * 100
                a2 = ((area.count_W3 - area.count_W2)/ area.count_W2) * 100
                a3 = ((area.count_W4 - area.count_W2)/ area.count_W2) * 100
                a4 = ((area.count_W5 - area.count_W2)/ area.count_W2) * 100
                a5 = ((area.count_W6 - area.count_W2)/ area.count_W2) * 100
                a6 = ((area.count_W7 - area.count_W2)/ area.count_W2) * 100
                a7 = ((area.count_W8 - area.count_W2)/ area.count_W2) * 100
                a8 = ((area.count_W9 - area.count_W2)/ area.count_W2) * 100
            }
            else if (currentBaseWeek === '2'){
                a1 = ((area.count_W1 - area.count_W3)/ area.count_W3) * 100
                a2 = ((area.count_W2 - area.count_W3)/ area.count_W3) * 100
                a3 = ((area.count_W4 - area.count_W3)/ area.count_W3) * 100
                a4 = ((area.count_W5 - area.count_W3)/ area.count_W3) * 100
                a5 = ((area.count_W6 - area.count_W3)/ area.count_W3) * 100
                a6 = ((area.count_W7 - area.count_W3)/ area.count_W3) * 100
                a7 = ((area.count_W8 - area.count_W3)/ area.count_W3) * 100
                a8 = ((area.count_W9 - area.count_W3)/ area.count_W3) * 100
            }
            else if (currentBaseWeek === '3'){
                a1 = ((area.count_W1 - area.count_W4)/ area.count_W4) * 100
                a2 = ((area.count_W2 - area.count_W4)/ area.count_W4) * 100
                a3 = ((area.count_W3 - area.count_W4)/ area.count_W4) * 100
                a4 = ((area.count_W5 - area.count_W4)/ area.count_W4) * 100
                a5 = ((area.count_W6 - area.count_W4)/ area.count_W4) * 100
                a6 = ((area.count_W7 - area.count_W4)/ area.count_W4) * 100
                a7 = ((area.count_W8 - area.count_W4)/ area.count_W4) * 100
                a8 = ((area.count_W9 - area.count_W4)/ area.count_W4) * 100
            }
            else if (currentBaseWeek === '4'){
                a1 = ((area.count_W1 - area.count_W5)/ area.count_W5) * 100
                a2 = ((area.count_W2 - area.count_W5)/ area.count_W5) * 100
                a3 = ((area.count_W3 - area.count_W5)/ area.count_W5) * 100
                a4 = ((area.count_W4 - area.count_W5)/ area.count_W5) * 100
                a5 = ((area.count_W6 - area.count_W5)/ area.count_W5) * 100
                a6 = ((area.count_W7 - area.count_W5)/ area.count_W5) * 100
                a7 = ((area.count_W8 - area.count_W5)/ area.count_W5) * 100
                a8 = ((area.count_W9 - area.count_W5)/ area.count_W5) * 100
            }
            else if (currentBaseWeek === '5'){
                a1 = ((area.count_W1 - area.count_W6)/ area.count_W6) * 100
                a2 = ((area.count_W2 - area.count_W6)/ area.count_W6) * 100
                a3 = ((area.count_W3 - area.count_W6)/ area.count_W6) * 100
                a4 = ((area.count_W4 - area.count_W6)/ area.count_W6) * 100
                a5 = ((area.count_W5 - area.count_W6)/ area.count_W6) * 100
                a6 = ((area.count_W7 - area.count_W6)/ area.count_W6) * 100
                a7 = ((area.count_W8 - area.count_W6)/ area.count_W6) * 100
                a8 = ((area.count_W9 - area.count_W6)/ area.count_W6) * 100
            }
            else if (currentBaseWeek === '6'){
                a1 = ((area.count_W1 - area.count_W7)/ area.count_W7) * 100
                a2 = ((area.count_W2 - area.count_W7)/ area.count_W7) * 100
                a3 = ((area.count_W3 - area.count_W7)/ area.count_W7) * 100
                a4 = ((area.count_W4 - area.count_W7)/ area.count_W7) * 100
                a5 = ((area.count_W5 - area.count_W7)/ area.count_W7) * 100
                a6 = ((area.count_W6 - area.count_W7)/ area.count_W7) * 100
                a7 = ((area.count_W8 - area.count_W7)/ area.count_W7) * 100
                a8 = ((area.count_W9 - area.count_W7)/ area.count_W7) * 100
            }
            else if (currentBaseWeek === '7'){
                a1 = ((area.count_W1 - area.count_W8)/ area.count_W8) * 100
                a2 = ((area.count_W2 - area.count_W8)/ area.count_W8) * 100
                a3 = ((area.count_W3 - area.count_W8)/ area.count_W8) * 100
                a4 = ((area.count_W4 - area.count_W8)/ area.count_W8) * 100
                a5 = ((area.count_W5 - area.count_W8)/ area.count_W8) * 100
                a6 = ((area.count_W6 - area.count_W8)/ area.count_W8) * 100
                a7 = ((area.count_W7 - area.count_W8)/ area.count_W8) * 100
                a8 = ((area.count_W9 - area.count_W8)/ area.count_W8) * 100
            }
            else if (currentBaseWeek === '8'){
                a1 = ((area.count_W1 - area.count_W9)/ area.count_W9) * 100
                a2 = ((area.count_W2 - area.count_W9)/ area.count_W9) * 100
                a3 = ((area.count_W3 - area.count_W9)/ area.count_W9) * 100
                a4 = ((area.count_W4 - area.count_W9)/ area.count_W9) * 100
                a5 = ((area.count_W5 - area.count_W9)/ area.count_W9) * 100
                a6 = ((area.count_W6 - area.count_W9)/ area.count_W9) * 100
                a7 = ((area.count_W7 - area.count_W9)/ area.count_W9) * 100
                a8 = ((area.count_W8 - area.count_W9)/ area.count_W9) * 100
            }
            let aset = [isFinite(a1) ? a1 : 0, 
                isFinite(a2) ? a2 : 0, 
                isFinite(a3) ? a3 : 0, 
                isFinite(a4) ? a4 : 0, 
                isFinite(a5) ? a5 : 0, 
                isFinite(a6) ? a6 : 0, 
                isFinite(a7) ? a7 : 0, 
                isFinite(a8) ? a8 : 0]
            if (aset.some(el => el >= threshold)){
                finalFilter.push(area.country)
            }
        }

        return finalFilter
    }

    findValues2(threshold2, currentBaseWeek, countriesOnly){
        let finalFilter = []
        for (let i = 0; i < countriesOnly.length; i++){
            let area = countriesOnly[i]
            let a1 = 0, a2 = 0, a3 = 0, a4 = 0, a5 = 0, a6 = 0, a7 = 0, a8 = 0
            if (currentBaseWeek === '0'){
                a1 = area.count_W2 - area.count_W1
                a2 = area.count_W3 - area.count_W1
                a3 = area.count_W4 - area.count_W1
                a4 = area.count_W5 - area.count_W1
                a5 = area.count_W6 - area.count_W1
                a6 = area.count_W7 - area.count_W1
                a7 = area.count_W8 - area.count_W1
                a8 = area.count_W9 - area.count_W1
            }
            else if (currentBaseWeek === '1'){
                a1 = area.count_W1 - area.count_W2
                a2 = area.count_W3 - area.count_W2
                a3 = area.count_W4 - area.count_W2
                a4 = area.count_W5 - area.count_W2
                a5 = area.count_W6 - area.count_W2
                a6 = area.count_W7 - area.count_W2
                a7 = area.count_W8 - area.count_W2
                a8 = area.count_W9 - area.count_W2
            }
            else if (currentBaseWeek === '2'){
                a1 = area.count_W1 - area.count_W3
                a2 = area.count_W2 - area.count_W3
                a3 = area.count_W4 - area.count_W3
                a4 = area.count_W5 - area.count_W3
                a5 = area.count_W6 - area.count_W3
                a6 = area.count_W7 - area.count_W3
                a7 = area.count_W8 - area.count_W3
                a8 = area.count_W9 - area.count_W3
            }
            else if (currentBaseWeek === '3'){
                a1 = area.count_W1 - area.count_W4
                a2 = area.count_W2 - area.count_W4
                a3 = area.count_W3 - area.count_W4
                a4 = area.count_W5 - area.count_W4
                a5 = area.count_W6 - area.count_W4
                a6 = area.count_W7 - area.count_W4
                a7 = area.count_W8 - area.count_W4
                a8 = area.count_W9 - area.count_W4
            }
            else if (currentBaseWeek === '4'){
                a1 = area.count_W1 - area.count_W5
                a2 = area.count_W2 - area.count_W5
                a3 = area.count_W3 - area.count_W5
                a4 = area.count_W4 - area.count_W5
                a5 = area.count_W6 - area.count_W5
                a6 = area.count_W7 - area.count_W5
                a7 = area.count_W8 - area.count_W5
                a8 = area.count_W9 - area.count_W5
            }
            else if (currentBaseWeek === '5'){
                a1 = area.count_W1 - area.count_W6
                a2 = area.count_W2 - area.count_W6
                a3 = area.count_W3 - area.count_W6
                a4 = area.count_W4 - area.count_W6
                a5 = area.count_W5 - area.count_W6
                a6 = area.count_W7 - area.count_W6
                a7 = area.count_W8 - area.count_W6
                a8 = area.count_W9 - area.count_W6
            }
            else if (currentBaseWeek === '6'){
                a1 = area.count_W1 - area.count_W7
                a2 = area.count_W2 - area.count_W7
                a3 = area.count_W3 - area.count_W7
                a4 = area.count_W4 - area.count_W7
                a5 = area.count_W5 - area.count_W7
                a6 = area.count_W6 - area.count_W7
                a7 = area.count_W8 - area.count_W7
                a8 = area.count_W9 - area.count_W7
            }
            else if (currentBaseWeek === '7'){
                a1 = area.count_W1 - area.count_W8
                a2 = area.count_W2 - area.count_W8
                a3 = area.count_W3 - area.count_W8
                a4 = area.count_W4 - area.count_W8
                a5 = area.count_W5 - area.count_W8
                a6 = area.count_W6 - area.count_W8
                a7 = area.count_W7 - area.count_W8
                a8 = area.count_W9 - area.count_W8
            }
            else if (currentBaseWeek === '8'){
                a1 = area.count_W1 - area.count_W9
                a2 = area.count_W2 - area.count_W9
                a3 = area.count_W3 - area.count_W9
                a4 = area.count_W4 - area.count_W9
                a5 = area.count_W5 - area.count_W9
                a6 = area.count_W6 - area.count_W9
                a7 = area.count_W7 - area.count_W9
                a8 = area.count_W8 - area.count_W9
            }
            let aset = [a1, a2,  a3, a4, a5, a6, a7, a8]
            if (aset.some(el => el >= threshold2)){
                finalFilter.push(area.country)
            }
        }
        return finalFilter
    }

    filterCountries(countriesOnly){
        
        let currentBaseWeek = document.getElementById("dataset-select").value

        let slider = document.getElementById("myRange");
        let threshold = Number(slider.value)
        let finalFilter = this.findValues(threshold, currentBaseWeek, countriesOnly)
        countriesOnly = countriesOnly.filter(function(el) { 
            if (finalFilter.includes(el.country)){
                return el
            }
        });
        //console.log('A:', countriesOnly)

        let slider2 = document.getElementById("myRange2");
        let threshold2 = Number(slider2.value)
        let finalFilter2 = this.findValues2(threshold2, currentBaseWeek, countriesOnly)
        countriesOnly = countriesOnly.filter(function(el) { 
            if (finalFilter2.includes(el.country)){
                return el
            }
        });
        //console.log('B:', countriesOnly)
        return countriesOnly
    }


    drawLinechart(){
        let countriesOnly = this.separateCountries()
        let filteredCountriesOnly = this.filterCountries(countriesOnly)
        LineChartAttacks.countries = filteredCountriesOnly
        //console.log(filteredCountriesOnly.length)


        //console.log('eee:', countriesOnly)
        let pad_left = 80
        let pad_right = 50
        let pad_bottom = 40
        let covidByPlaceMappedByLocation = new Map([])
        let csvTypeData = []

        for (let country of filteredCountriesOnly){
            let a = {cases: country.count_W1, country: country.country, week: "1"}
            csvTypeData.push(a)
            let b = {cases: country.count_W2, country: country.country, week: "2"}
            csvTypeData.push(b)
            let c = {cases: country.count_W3, country: country.country, week: "3"}
            csvTypeData.push(c)
            let d = {cases: country.count_W4, country: country.country, week: "4"}
            csvTypeData.push(d)
            let e = {cases: country.count_W5, country: country.country, week: "5"}
            csvTypeData.push(e)
            let f = {cases: country.count_W6, country: country.country, week: "6"}
            csvTypeData.push(f)
            let g = {cases: country.count_W7, country: country.country, week: "7"}
            csvTypeData.push(g)
            let h = {cases: country.count_W8, country: country.country, week: "8"}
            csvTypeData.push(h)
            let i = {cases: country.count_W9, country: country.country, week: "9"}
            csvTypeData.push(i)
            let val = [a, b, c, d, e, f, g, h, i]
            covidByPlaceMappedByLocation.set(country.country, val)
         }
        

        let cases = []
        for (let [key, value] of covidByPlaceMappedByLocation) {
          value.forEach(function(element){
            //element.date = new Date(element.date)
            element.cases = parseFloat(element.cases)
            //dates.push(element.date)
            cases.push(element.cases)
          })
        }
        //console.log('A:', covidByPlaceMappedByLocation)
    
        
        //console.log(d3.max(cases))
        let lineChart = d3.select('#line-chart-attacks')
    
        let xScale = d3.scaleLinear().domain([1, 9.9]).range([pad_left, 600 - pad_right]);
        let xAxis = d3.axisBottom(xScale);
        lineChart.select("#x-axis-attacks").attr("class", "axisxattacks")
        .attr("transform", "translate(0," + (600 - pad_bottom) + ")").call(xAxis)
    
        let yScale = d3.scaleLinear().domain([0, d3.max(cases)]).range([600 - pad_bottom, 40]);
        let yAxis = d3.axisLeft().scale(yScale).ticks(8)//
        lineChart.select("#y-axis-attacks").attr("class", "axisyattacks").attr("transform", "translate(" + pad_left + ",0)").call(yAxis)
        .selectAll("text")
        .text(d => {
            if (d >= 100000){
                return (d/1000000).toFixed(1) + 'M'
            }
            else if (d >= 1000){
                return (d/1000).toFixed(1) + 'K'
            }
            else{
                return d
            }
        })
    
        lineChart.append('text').text('Weeks').attr('x', 250).attr('y', 610).attr("class", "axisxattacks").attr("id", "t1")
        lineChart.append('text').text('Attacks').attr('x', -350).attr('y', 20).attr('transform', 'rotate(-90)').attr("class", "axisxattacks").attr("id", "t2")
        lineChart.append('text').text('Attacks Over The Weeks').attr('x', 180).attr('y', 20).attr("class", "axisxattacks").attr("id", "t3")

        

        let lineColorScale 
        if (filteredCountriesOnly.length <= 20){
            lineColorScale = d3.scaleOrdinal(d3.schemeTableau10).domain(covidByPlaceMappedByLocation.keys())
        }
        else{
            lineColorScale = d3.scaleOrdinal(['grey']).domain(covidByPlaceMappedByLocation.keys())
        }
    
        lineChart.select('#lines-attacks').selectAll('path').data(covidByPlaceMappedByLocation).join('path')
                 .attr('fill', 'none').attr('stroke', ([group, values]) => lineColorScale(group)).attr('stroke-width', 1)
                 .attr('d', ([group, values]) => d3.line()
                                         .x((d) => xScale(d.week))
                                         .y((d) => yScale(d.cases))
                                         (values)) 
    
        lineChart.on('mousemove', (event) => {
          if (event.offsetX > pad_left && event.offsetX < 600 - pad_right) {
            // Set the line position
            lineChart.select('#overlay-attacks').select('line').attr('stroke', 'black').attr('x1', event.offsetX).attr('x2', event.offsetX).attr('y1', 600 - pad_bottom).attr('y2', 20);
            const yearHovered = Math.floor(xScale.invert(event.offsetX))
            //console.log('X:', yearHovered)
    
            let filteredData = csvTypeData
              .filter((row) => {
                return Number(row['week']) === yearHovered
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
                    return event.offsetX < 400 ? event.offsetX : event.offsetX - 200
                }
                else{
                    return event.offsetX < 300 ? event.offsetX : event.offsetX - 300
                }
              }) 
              .attr('y', (d, i) => 20*i + 30)
              .attr('alignment-baseline', 'hanging')
              .attr('fill', (d) => lineColorScale(d.country))
              .attr("class", filteredCountriesOnly.length <= 20 ? "textattacksbig" : "textattackssmall")
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