class ShapesInCell{

    constructor(){
        this.slider3Value = document.getElementById("myRange3").value
        this.slider3ValueMin = document.getElementById("myRange3").min
        this.colorScaleForPercentAttacks= d3.scaleSequential()
        .interpolator(d3.interpolateGreens)
        .domain([this.slider3ValueMin,this.slider3Value])

        this.slider4Value = document.getElementById("myRange4").value
        this.slider4ValueMin = document.getElementById("myRange4").min
        this.colorScaleForAbsoluteAttacks = d3.scaleSequential()
        .interpolator(d3.interpolateBlues)
        .domain([this.slider4ValueMin,this.slider4Value])
    }

    addBlueStars(containerSelect){
        for (let j = 0; j < 10; j++){
            containerSelect
            .append("path")
            .attr("id", "yellowStar")
            .attr("d",  d3.symbol().type(d3.symbolStar)
            .size(d => {
                let givenArray = d.value8
                if (givenArray[0] === 0 && givenArray[1] === 0 && givenArray[2] === 0
                    && givenArray[3] === 0 && givenArray[4] === 0 && givenArray[5] === 0
                    && givenArray[6] === 0 && givenArray[7] === 0 && givenArray[8] === 0
                    && givenArray[9] === 0){
                    return 0
                }
                else{
                    return 200
                }
            })
            )
            .style("stroke", "black")
            .attr("fill", d => {
                // console.log(d.value5)
                let a = d.value8
                // if (a == undefined){
                //     //console.log('here')
                //     // return "white"
                // }
                // else{
                let b = a[j]
                // console.log(b)
                if (b === 1){
                    return "blue"
                }
                else{
                    return "white"
                }
                // }
            })
            .attr("transform", "translate("+(20 +(j*30))+", 160)")
        }
    }

    addGreenStars(containerSelect){
        for (let j = 0; j < 5; j++){
            containerSelect
            .append("path")
            .attr("id", "brownStar")
            .attr("d",  d3.symbol().type(d3.symbolStar)
            .size(d => {
                let givenArray = d.value7
                if (givenArray[0] === 0 && givenArray[1] === 0 && givenArray[2] === 0
                    && givenArray[3] === 0 && givenArray[4] === 0){
                    return 0
                }
                else{
                    return 200
                }
            })
            )
            .style("stroke", "black")
            .attr("fill", d => {
                // console.log(d.value5)
                let a = d.value7
                // if (a == undefined){
                //     //console.log('here')
                //     // return "white"
                // }
                // else{
                let b = a[j]
                // console.log(b)
                if (b === 1){
                    return "green"
                }
                else{
                    return "white"
                }
                // }
            })
            .attr("transform", "translate("+(20 +(j*30))+", 130)")
        }
    }

    addYellowStars(containerSelect){
        for (let j = 0; j < 10; j++){
            containerSelect
            .append("path")
            .attr("id", "yellowStar")
            .attr("d",  d3.symbol().type(d3.symbolStar)
            .size(d => {
                let givenArray = d.value6
                if (givenArray[0] === 0 && givenArray[1] === 0 && givenArray[2] === 0
                    && givenArray[3] === 0 && givenArray[4] === 0 && givenArray[5] === 0
                    && givenArray[6] === 0 && givenArray[7] === 0 && givenArray[8] === 0
                    && givenArray[9] === 0){
                    return 0
                }
                else{
                    return 200
                }
            })
            )
            .style("stroke", "black")
            .attr("fill", d => {
                // console.log(d.value5)
                let a = d.value6
                // if (a == undefined){
                //     //console.log('here')
                //     // return "white"
                // }
                // else{
                let b = a[j]
                // console.log(b)
                if (b === 1){
                    return "yellow"
                }
                else{
                    return "white"
                }
                // }
            })
            .attr("transform", "translate("+(20 +(j*30))+", 130)")
        }
    }


    addBrownStars(containerSelect){
        for (let j = 0; j < 5; j++){
            containerSelect
            .append("path")
            .attr("id", "brownStar")
            .attr("d",  d3.symbol().type(d3.symbolStar)
            .size(d => {
                let givenArray = d.value5
                if (givenArray[0] === 0 && givenArray[1] === 0 && givenArray[2] === 0
                    && givenArray[3] === 0 && givenArray[4] === 0){
                    return 0
                }
                else{
                    return 200
                }
            })
            )
            .style("stroke", "black")
            .attr("fill", d => {
                // console.log(d.value5)
                let a = d.value5
                // if (a == undefined){
                //     //console.log('here')
                //     // return "white"
                // }
                // else{
                let b = a[j]
                // console.log(b)
                if (b === 1){
                    return "brown"
                }
                else{
                    return "white"
                }
                // }
            })
            .attr("transform", "translate("+(20 +(j*30))+", 70)")
        }
    }

    addBlackStars(containerSelect){
        for (let j = 0; j < 3; j++){
            containerSelect
            .append("path")
            .attr("id", "blackStar")
            .attr("d",  d3.symbol().type(d3.symbolStar)
            .size(d => {
                //console.log(d.value5)
                let givenArray = d.value5
                if (givenArray[0] === 0 && givenArray[1] === 0 && givenArray[2] === 0){
                    return 0
                }
                else{
                    return 200
                }
            })
            )
            .style("stroke", "black")
            .attr("fill", d => {
                // console.log(d.value5)
                let a = d.value5
                // if (a == undefined){
                //     console.log('here')
                //     //console.log('here')
                //     // return "white"
                // }
                // else{
                let b = a[j]
                // console.log(b)
                if (b === 1){
                    return "black"
                }
                else{
                    return "white"
                }
                // }
            })
            .attr("transform", "translate("+(20 +(j*30))+", 70)")
        }
    }

    setSecondBackgroundOfCell(containerSelect){
        containerSelect
            .append('rect')
            .attr("id", "bgrect")
            .attr('x', 0)
            .attr('y', 60)
            .attr('width', 310)
            //.attr('id', 'bgrects')
            .attr('height', d => {
                if (d.value9 === undefined || d.value9 === 'no'){
                    return 0
                }
                else{
                    return 10
                }
            })     
            // .attr('stroke', 'black')
            // .attr('stroke-width', 0)
            .attr('fill', d => {
                if (d.value9 === 'yes'){
                    return 'black'
                }
            })
    }

    setBackgroundOfCell(containerSelect){
        // let stuff = containerSelect['_parents']
        // for (let i = 0; i < stuff.length; i++){
        //     // console.log()
        //     let nextStuff = stuff[i] 
        //     console.log(nextStuff)
        //     nextStuff.fill = "red"
        //     //nextStuff['preserveAspectRatio'] = "none"
        // }

        containerSelect
            .append('rect')
            .attr("id", "bgrect")
            .attr('x', 0)
            .attr('y', 50)
            .attr('width', 310)
            //.attr('id', 'bgrects')
            .attr('height', d => {
                if (d.value4 === undefined || d.value4 === 'yes'){
                    return 0
                }
                else{
                    return 10
                }
            })     
            // .attr('stroke', 'black')
            // .attr('stroke-width', 0)
            .attr('fill', d => {
                if (d.value4 === 'no'){
                    return 'red'
                }
            })
    }

    addRectangles(containerSelect) {
        // console.log(containerSelect)

        this.rectangles = containerSelect.append('rect')
            .attr('x', 145)
            .attr('y', 0)
            .attr('width', 20)
            .attr('height', 20)     
            .attr('stroke', 'black')
            .attr('stroke-width', 2)
            .attr('fill', d => {
                if (d.value >= this.slider4Value){
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
                tiptext = "This continent has a country which had "+that.better(d.value)+ " attacks (max value among all countries) for this time period."
            }
            else{
                tiptext = "This country had a total of "+that.better(d.value)+ " attacks for this time period."
            }
            tip.style("opacity", 5)
                .html(tiptext)
                .style("left", (e.pageX) + "px")
                .style("top", (e.pageY) + "px")
        })
        .on("mouseout", function(d) {
            tip.style("opacity", 0)
        })

        //console.log(containerSelect)
    }


    addRectangles2(containerSelect) {
        this.rectangles3 = containerSelect.append('rect')
            .attr('x', 145)
            .attr('y', 25)
            .attr('width', 20)
            .attr('height', 20)
            .attr('stroke', 'black')
            .attr('stroke-width', 2)
            .attr('fill', d => {
                if (d.value2 >= this.slider3Value){
                    return 'purple'
                }
                else{
                    return this.colorScaleForPercentAttacks(d.value2)
                }
            })
            .classed('margin-bar', true);

        let that = this
        let tip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 10)
        this.rectangles3.on("mouseover", function(e, d) {
            //console.log(d)
            let text 
            if (d.value2 < 0){
                text = 'decrease'
            }
            else{
                text = 'increase'
            }
            let tiptext
            if (d.isForecast === true){
                tiptext = "This continent has a country which had attacks "+ text +" by "+that.better(d.value2)+ "%(max value among all countries) for this time period compared to the base time period."
            }
            else{
                tiptext = "This country had attacks "+ text +" by "+that.better(d.value2)+ "% for this time period compared to the base time period. Absolute change was "+that.better(d.value3)+"."
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