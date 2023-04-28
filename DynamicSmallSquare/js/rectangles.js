class Rectangle{

    constructor(){
        // this.slider1Value = document.getElementById("myRange3").value
        // this.colorScaleForContinentsAbsoluteAttacks = d3.scaleSequential()
        // .interpolator(d3.interpolateBlues)
        // .domain([0,this.slider1Value])

        this.slider2Value = document.getElementById("myRange4").value
        this.colorScaleForAbsoluteAttacks = d3.scaleSequential()
        .interpolator(d3.interpolateBlues)
        .domain([0,this.slider2Value])

        // this.colorScaleForContinentsAbsoluteAttackers = d3.scaleSequential()
        // .interpolator(d3.interpolateOranges)
        // .domain([0,9512])

        // this.colorScaleForCountriesAbsoluteAttackers = d3.scaleSequential()
        // .interpolator(d3.interpolateReds)
        // .domain([0,5464])

        this.slider3Value = document.getElementById("myRange5").value
        this.colorScaleForPercentAttacks= d3.scaleSequential()
        .interpolator(d3.interpolateGreens)
        .domain([-100,this.slider3Value])

        // this.colorScaleForPercentAttackers= d3.scaleSequential()
        // .interpolator(d3.interpolateOrRd)
        // .domain([0,3300])
    }

    
    addRectangles(containerSelect) {
        this.rectangles = containerSelect.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 20)
            .attr('height', 20)     
            .attr('stroke', 'black')
            .attr('stroke-width', 2)
            .attr('fill', d => {
                if (d.value >= this.slider2Value){
                    return 'purple'
                }
                else{
                    return this.colorScaleForAbsoluteAttacks(d.value)
                }
            })
            .classed('margin-bar', true);

        let that = this
        let tip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10)
        this.rectangles.on("mouseover", function(e, d) {
            //console.log(d)
            let tiptext
            if (d.isForecast === true){
                tiptext = "This continent has a country which had "+that.better(d.value)+ " attacks (max value among all countries) this week."
            }
            else{
                tiptext = "This country had a total of "+that.better(d.value)+ " attacks this week."
            }
            tip.style("opacity", 5)
                .html(tiptext)
                .style("left", (e.pageX) + "px")
                .style("top", (e.pageY) + "px")
        })
        .on("mouseout", function(d) {
            tip.style("opacity", 0)
        })
    }

    addRectangles2(containerSelect) {
        this.rectangles2 = containerSelect.append('rect')
            .attr('x', 0)
            .attr('y', 30)
            .attr('width', 30)
            .attr('height', 30)
            .attr('fill', d => {
                if (d.isForecast === true){
                    return this.colorScaleForContinentsAbsoluteAttackers(d.value2)
                }
                else{
                    return this.colorScaleForCountriesAbsoluteAttackers(d.value2)
                }
            })
            .classed('margin-bar', true);
        
        let that = this
        let tip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10)
        this.rectangles2.on("mouseover", function(e, d) {
            //console.log(d)
            let tiptext
            if (d.isForecast === true){
                tiptext = "This continent had a total of "+that.better(d.value2)+ " attackers this week."
            }
            else{
                tiptext = "This country had a total of "+that.better(d.value2)+ " attackers this week."
            }
            tip.style("opacity", 5)
                .html(tiptext)
                .style("left", (e.pageX) + "px")
                .style("top", (e.pageY) + "px")
        })
        .on("mouseout", function(d) {
            tip.style("opacity", 0)
        })
    }


    addRectangles3(containerSelect) {
        this.rectangles3 = containerSelect.append('rect')
            .attr('x', 0)
            .attr('y', 25)
            .attr('width', 20)
            .attr('height', 20)
            .attr('stroke', 'black')
            .attr('stroke-width', 2)
            .attr('fill', d => {
                if (d.value3 >= this.slider3Value){
                    return 'purple'
                }
                else{
                    return this.colorScaleForPercentAttacks(d.value3)
                }
            })
            .classed('margin-bar', true);

        let that = this
        let tip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10)
        this.rectangles3.on("mouseover", function(e, d) {
            //console.log(d)
            let text 
            if (d.value3 < 0){
                text = 'decrease'
            }
            else{
                text = 'increase'
            }
            let tiptext
            if (d.isForecast === true){
                tiptext = "This continent has a country which had attacks "+ text +" by "+that.better(d.value3)+ "%(max value among all countries) this week compared to base week."
            }
            else{
                tiptext = "This country had attacks "+ text +" by "+that.better(d.value3)+ "% this week compared to base week. Absolute change was "+that.better(d.value5)+"."
            }
            tip.style("opacity", 5)
                .html(tiptext)
                .style("left", (e.pageX) + "px")
                .style("top", (e.pageY) + "px")
        })
        .on("mouseout", function(d) {
            tip.style("opacity", 0)
        })
    }


    addRectangles4(containerSelect) {
        this.rectangles4 = containerSelect.append('rect')
            .attr('x', 0)
            .attr('y', 90)
            .attr('width', 30)
            .attr('height', 30)
            .attr('fill', d => {
                return this.colorScaleForPercentAttackers(d.value4)
            })
            .classed('margin-bar', true);

        let that = this
        let tip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10)
        this.rectangles4.on("mouseover", function(e, d) {
            //console.log(d)
            let text 
            if (d.value4 < 0){
                text = 'decrease'
            }
            else{
                text = 'increase'
            }
            let tiptext
            if (d.isForecast === true){
                tiptext = "This continent has a country which had attackers "+ text +" by "+that.better(d.value4)+ "%(max value among all countries) this week compared to base week."
            }
            else{
                tiptext = "This country had attackers "+ text +" by "+that.better(d.value4)+ "% this week compared to base week."
            }
            tip.style("opacity", 5)
                .html(tiptext)
                .style("left", (e.pageX) + "px")
                .style("top", (e.pageY) + "px")
        })
        .on("mouseout", function(d) {
            tip.style("opacity", 0)
        })
    }

    
    better(number){  
        if (Math.abs(number) >= 1000000){
            return (number/1000000).toFixed(2) + 'M'
        } 
        else if (Math.abs(number) >= 1000){
            return (number/1000).toFixed(2) + 'K'
        }
        else if (Math.abs(number) < 1000){
            if (number % 1 != 0){
                return number.toFixed(2)
            }
            else{
                return number
            }
        }
    }

    
}