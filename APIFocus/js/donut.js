class Donut{

    constructor(givenCountries){
        this.givenCountries = givenCountries
        //console.log(givenCountries)
    }

    dataForFourthViz(neededData){
        //console.log(neededData)
        let idSelector = function() { return this.id; }
        let checkedBoxes = $(":checkbox:checked").map(idSelector).get()

        let widthNumber = 0
        let heightNumber = 0
        let assignedWidth = ''
        let assignedHeight = ''

        if (checkedBoxes.length <= 24){
            widthNumber = 1300
            heightNumber = 1300
            assignedWidth = widthNumber + 'px'
            assignedHeight = heightNumber + 'px'
        }
        else{
            widthNumber = 1300 + (60 * (checkedBoxes.length - 24))
            heightNumber = 1300 + (60 * (checkedBoxes.length - 24))
            assignedWidth = widthNumber + 'px'
            assignedHeight = heightNumber + 'px'
        }

        let margin = {top: 150, right: 30, bottom: 20, left: 50},
        width = widthNumber - margin.left - margin.right,
        height = heightNumber - margin.top - margin.bottom;

        let starterValue = document.getElementById('mySidebar').offsetWidth + 
            document.getElementsByClassName('linechartviewAttacks')[0].offsetWidth +
            document.getElementById('predictionTable').offsetWidth + 50
        let donutStarter = starterValue + "px"
        
        document.getElementById("donutGraph").style.left = donutStarter
        document.getElementById("donutGraph").style.top = "2100px"
        document.getElementById("donutGraph").style.width = assignedWidth
        document.getElementById("donutGraph").style.height = assignedHeight

        let svg = d3.select("#donutGraph")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        

        svg.append('text').attr("x", "350").attr("y", "-110").text(Table.countryCode + '[ASN Type Frequency Over Time Periods]').style("font-size", "35px")

        svg.append("rect").attr("x", "0").attr("y", "-100").attr("width", "20").attr("height", "20").style("fill", "navy")
        svg.append('text').attr("x", "25").attr("y", "-80").text("hosting").style("fill", "navy").style("font-size", "25px")
        
        svg.append("rect").attr("x", "280").attr("y", "-100").attr("width", "20").attr("height", "20").style("fill", "grey")
        svg.append('text').attr("x", "305").attr("y", "-80").text("isp").style("fill", "grey").style("font-size", "25px")

        svg.append("rect").attr("x", "560").attr("y", "-100").attr("width", "20").attr("height", "20").style("fill", "maroon")
        svg.append('text').attr("x", "585").attr("y", "-80").text("education").style("fill", "maroon").style("font-size", "25px")

        svg.append("rect").attr("x", "840").attr("y", "-100").attr("width", "20").attr("height", "20").style("fill", "purple")
        svg.append('text').attr("x", "865").attr("y", "-80").text("business").style("fill", "purple").style("font-size", "25px")

        svg.append("rect").attr("x", "1120").attr("y", "-100").attr("width", "20").attr("height", "20").style("fill", "black")
        svg.append('text').attr("x", "1145").attr("y", "-80").text("NONE").style("fill", "black").style("font-size", "25px")

        svg.append('text').attr("x", "0").attr("y", "-40").text("The innermost donut is the leftmost and the outermost donut is the rightmost checked").style("fill", "black").style("font-size", "35px")
        svg.append('text').attr("x", "0").attr("y", "-5").text("box in the table.").style("fill", "black").style("font-size", "35px")
        //console.log(BarGraph.rectPositions)
        this.makeDonutChart(neededData, svg, widthNumber, heightNumber)
    }

    makeDonutChart(data, svg, widthNumber, heightNumber){
        let innerRadiusValue = 125
        let outerRadiusValue = 140

        //console.log(data)

        for (const key in data){
            // console.log(innerRadiusValue)
            // console.log(outerRadiusValue)
            let desiredData = {}
            let totalCount = 0
            for (const values of data[key]){
                desiredData[values['asn_type']] = values['count']
                totalCount += values['count']
            }

            //console.log(desiredData)
            let centerWidth = (widthNumber/2) - 50
            let centerHeight = (heightNumber/2) - 50
            const g = svg.append("g")
                        .attr("transform", `translate(${centerWidth}, ${centerHeight})`)

            let color = d3.scaleOrdinal(["hosting", "isp", "education", "business", "NONE"], ["navy", "grey", "maroon", "purple", "black"])

            let pie = d3.pie()
                .sort(null) // Do not sort group by size
                .value(function(d) {return d[1] })
            let data_ready = pie(Object.entries(desiredData))


            // The arc generator
            let arc = d3.arc()
                .innerRadius(innerRadiusValue)         // This is the size of the donut hole
                .outerRadius(outerRadiusValue)
            
            g.selectAll('allSlices')
                .data(data_ready)
                .join('path')
                .attr('d', arc)
                .attr('fill', function(d){ 
                    return(color(d.data[0])) 
                })
                .attr("stroke", "white")
                .style("stroke-width", "2px")
                .style("opacity", 0.7)
                .on('mouseover', function(e, d){
                    let totalCountinString = ''
                    if (totalCount >= 1000000){
                        totalCountinString = (totalCount/1000000).toFixed(1) + 'M'
                    }
                    else if (totalCount >= 1000){
                        totalCountinString = (totalCount/1000).toFixed(1) + 'K'
                    }
                    else{
                        totalCountinString = totalCount + ''
                    }

                    
                    let specificCountinString = ''
                    if (d.data[1] >= 1000000){
                        specificCountinString = (d.data[1]/1000000).toFixed(1) + 'M'
                    }
                    else if (d.data[1] >= 1000){
                        specificCountinString = (d.data[1]/1000).toFixed(1) + 'K'
                    }
                    else{
                        specificCountinString = d.data[1] + ''
                    }

                    let percentageString = ((d.data[1]/totalCount) * 100).toFixed(2) + '%'
                    svg.append('text').attr("id", "tempTextSpecificAttack").attr("transform", `translate(${centerWidth - 110}, ${centerHeight - 30})`)
                                .text(d.data[0] + ": " + specificCountinString).style("font-size", "25px").style("fill", color(d.data[0]))
                    svg.append('text').attr("id", "tempTextTotalAttacks").attr("transform", `translate(${centerWidth - 110}, ${centerHeight})`)
                                .text("Total Attacks: " + totalCountinString).style("font-size", "25px")
                    svg.append('text').attr("id", "tempTextPercentage").attr("transform", `translate(${centerWidth - 115}, ${centerHeight + 30})`)
                                .text(d.data[0] + " share = " + percentageString).style("font-size", "25px").style("fill", color(d.data[0]))
                    svg.append('text').attr("id", "tempTextTimePeriod").attr("transform", `translate(${centerWidth - 60}, ${centerHeight + 60})`)
                                .text(key).style("font-size", "25px")

                    d3.select(this).attr("stroke", "lime").style("stroke-width", "7px")
                    
                    
                })
                .on('mouseout', function(e, d){
                    document.getElementById("tempTextTotalAttacks").remove()
                    document.getElementById("tempTextSpecificAttack").remove()
                    document.getElementById("tempTextPercentage").remove()
                    document.getElementById("tempTextTimePeriod").remove()

                    d3.select(this).attr("stroke", "white").style("stroke-width", "2px")
                })


            innerRadiusValue = outerRadiusValue + 5
            outerRadiusValue = innerRadiusValue + 15
        }
    }



    fetchData3(){
        let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
        let selectedWeeksLength = checkedBoxes.length

        let selected = Array.from(checkedBoxes).map(x => x.value)
        // console.log('Weeks:', selected)
        // console.log(this.countryCode)

        let that = this
        if (selectedWeeksLength >= 2 && Table.countryCode != null){
            getData3(selected, this.givenCountries).then(function(loadedData){
                that.dataForFourthViz(loadedData, selected)
            })
        }
        else{
            console.log("not enough checks")
        }
    }

}


async function getData3(selected, countries){
    let givenValue = document.getElementById("data").value
    let givenValue2 = document.getElementById("timePeriod").value

    let api_address = 'http://128.110.217.128/top/asn/type?cluster='+givenValue+'&cc='+Table.countryCode+'&range='+selected.join(',')+'&period='+givenValue2
    //console.log(api_address)
    const data = await fetch(api_address)
    const jsonData = await data.json()
    
    //console.log('op:', jsonData)
    return jsonData

}