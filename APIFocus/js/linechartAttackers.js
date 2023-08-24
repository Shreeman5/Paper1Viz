class LineChartAttackers{

    constructor(neededData, selectedTimes){
        this.neededData = neededData
        this.selectedTimes = selectedTimes
    }

    drawLinechart(){
        let filteredCountriesOnly = LineChartAttacks.countries

        let pad_left = 80
        let pad_right = 50
        let pad_bottom = 40
        let attacksByPlaceMappedByLocation = new Map([])
        let csvTypeData = []

        for (let country of filteredCountriesOnly){
            let number = 1
            let val = []
            for (let time of this.selectedTimes){
                let instance = {cases: country[time].attackers, country: country.country, time: number}
                val.push(instance)
                csvTypeData.push(instance)
                number = number + 1
            }
            attacksByPlaceMappedByLocation.set(country.country, val)
        }

        let cases = []
        for (let [key, value] of attacksByPlaceMappedByLocation) {
          value.forEach(function(element){
            element.cases = parseFloat(element.cases)
            cases.push(element.cases)
          })
        }

        let lineChart = d3.select('#line-chart-attackers')

        let upperlimit = 0.1 + this.selectedTimes.length
        let xScale = d3.scaleLinear().domain([1, upperlimit]).range([pad_left, 600 - pad_right]);
        let xAxis = d3.axisBottom(xScale).ticks(this.selectedTimes.length)
        .tickFormat(x => {
            if (x % 1 === 0){
                return 'TP' + x
            }
            else{
                return ''
            }
        })
        lineChart.select("#x-axis-attackers").attr("class", "axisxattackers")
        .attr("transform", "translate(0," + (600 - pad_bottom) + ")").call(xAxis)

        let yScale = d3.scaleLinear().domain([0, d3.max(cases)]).range([600 - pad_bottom, 40]);
        let yAxis = d3.axisLeft().scale(yScale).ticks(8)
        lineChart.select("#y-axis-attackers").attr("class", "axisyattackers").attr("transform", "translate(" + pad_left + ",0)").call(yAxis)
        .selectAll("text")
        .text(d => {
            if (d >= 1000000){
                return (d/1000000).toFixed(1) + 'M'
            }
            else if (d >= 1000){
                return (d/1000).toFixed(1) + 'K'
            }
            else{
                return d
            }
        })

        lineChart.append('text').join('g').text('Time Periods').attr('x', 250).attr('y', 610).attr("class", "axisxattacks").attr("id", "t4")
        lineChart.append('text').join('g').text('Attacks').attr('x', -350).attr('y', 20).attr('transform', 'rotate(-90)').attr("class", "axisxattacks").attr("id", "t5")
        lineChart.append('text').text('Attackers Over The Time Periods').attr('x', 160).attr('y', 20).attr("class", "axisxattacks").attr("id", "t6")

        let lineColorScale 
        if (filteredCountriesOnly.length <= 20){
            lineColorScale = d3.scaleOrdinal(d3.schemeTableau10).domain(attacksByPlaceMappedByLocation.keys())
        }
        else{
            lineColorScale = d3.scaleOrdinal(['grey']).domain(attacksByPlaceMappedByLocation.keys())
        }

        lineChart.select('#lines-attackers').selectAll('path').data(attacksByPlaceMappedByLocation).join('path')
                 .attr('fill', 'none').attr('stroke', ([group, values]) => lineColorScale(group)).attr('stroke-width', 1)
                 .attr('d', ([group, values]) => d3.line()
                                         .x((d) => xScale(d.time))
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
                return Number(row['time']) === yearHovered
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