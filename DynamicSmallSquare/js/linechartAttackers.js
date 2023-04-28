class LineChartAttackers{

    constructor(neededData){
        this.neededData = neededData
    }

    drawLinechart(){
        let filteredCountriesOnly = LineChartAttacks.countries
        //console.log('xex:', filteredCountriesOnly)


        // //console.log('eee:', countriesOnly)
        let pad_left = 80
        let pad_right = 50
        let pad_bottom = 40
        let covidByPlaceMappedByLocation = new Map([])
        let csvTypeData = []

        for (let country of filteredCountriesOnly){
            let a = {cases: country.count_W1_attackers, country: country.country, week: "1"}
            csvTypeData.push(a)
            let b = {cases: country.count_W2_attackers, country: country.country, week: "2"}
            csvTypeData.push(b)
            let c = {cases: country.count_W3_attackers, country: country.country, week: "3"}
            csvTypeData.push(c)
            let d = {cases: country.count_W4_attackers, country: country.country, week: "4"}
            csvTypeData.push(d)
            let e = {cases: country.count_W5_attackers, country: country.country, week: "5"}
            csvTypeData.push(e)
            let f = {cases: country.count_W6_attackers, country: country.country, week: "6"}
            csvTypeData.push(f)
            let g = {cases: country.count_W7_attackers, country: country.country, week: "7"}
            csvTypeData.push(g)
            let h = {cases: country.count_W8_attackers, country: country.country, week: "8"}
            csvTypeData.push(h)
            let i = {cases: country.count_W9_attackers, country: country.country, week: "9"}
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
        let lineChart = d3.select('#line-chart-attackers')
    
        let xScale = d3.scaleLinear().domain([1, 9.9]).range([pad_left, 600 - pad_right]);
        let xAxis = d3.axisBottom(xScale);
        lineChart.select("#x-axis-attackers").attr("class", "axisxattackers")
        .attr("transform", "translate(0," + (600 - pad_bottom) + ")").call(xAxis)
    
        let yScale = d3.scaleLinear().domain([0, d3.max(cases)]).range([600 - pad_bottom, 40]);
        let yAxis = d3.axisLeft().scale(yScale).ticks(8)//
        lineChart.select("#y-axis-attackers").attr("class", "axisyattackers").attr("transform", "translate(" + pad_left + ",0)").call(yAxis)
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
    
        lineChart.append('text').join('g').text('Weeks').attr('x', 250).attr('y', 610).attr("class", "axisxattacks").attr("id", "t4")
        lineChart.append('text').join('g').text('Attacks').attr('x', -350).attr('y', 20).attr('transform', 'rotate(-90)').attr("class", "axisxattacks").attr("id", "t5")
        lineChart.append('text').text('Attackers Over The Weeks').attr('x', 160).attr('y', 20).attr("class", "axisxattacks").attr("id", "t6")

        let lineColorScale 
        if (filteredCountriesOnly.length <= 20){
            lineColorScale = d3.scaleOrdinal(d3.schemeTableau10).domain(covidByPlaceMappedByLocation.keys())
        }
        else{
            lineColorScale = d3.scaleOrdinal(['grey']).domain(covidByPlaceMappedByLocation.keys())
        }
    
        lineChart.select('#lines-attackers').selectAll('path').data(covidByPlaceMappedByLocation).join('path')
                 .attr('fill', 'none').attr('stroke', ([group, values]) => lineColorScale(group)).attr('stroke-width', 1)
                 .attr('d', ([group, values]) => d3.line()
                                         .x((d) => xScale(d.week))
                                         .y((d) => yScale(d.cases))
                                         (values)) 
    
        lineChart.on('mousemove', (event) => {
          if (event.offsetX > pad_left && event.offsetX < 600 - pad_right) {
            // Set the line position
            lineChart.select('#overlay-attackers').select('line').attr('stroke', 'black').attr('x1', event.offsetX).attr('x2', event.offsetX).attr('y1', 600 - pad_bottom).attr('y2', 20);
            const yearHovered = Math.floor(xScale.invert(event.offsetX))
            //console.log('X:', yearHovered)
    
            let filteredData = csvTypeData
              .filter((row) => {
                return Number(row['week']) === yearHovered
              })
              .sort((rowA, rowB) => rowB.cases - rowA.cases)
            
            //console.log('Y:', filteredData)
    
            lineChart.select('#overlay-attackers')
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
              .attr("class", filteredCountriesOnly.length <= 20 ? "textattackersbig" : "textattackerssmall")
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
        document.getElementById("t4").outerHTML = ""
        document.getElementById("t5").outerHTML = ""
        document.getElementById("t6").outerHTML = ""
    }
}