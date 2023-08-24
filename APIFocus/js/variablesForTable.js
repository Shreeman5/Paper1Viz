class VariablesForTable{

    constructor(neededData, baseTime, selectedTimes){
        this.neededData = neededData
        this.baseTime = baseTime
        this.selectedTimes = selectedTimes
    }

    continentMaxAbsoluteAttacks(){
        let collectedKeys = []
        for (let continent of this.neededData){
            for (let country of continent.meta){
                for (const [key, numbers] of Object.entries(country)) {
                    if (key !== 'country' && key !== 'cc' && !collectedKeys.includes(key)){
                        collectedKeys.push(key)
                    }
                }
            }
        }
        //console.log(collectedKeys)

        let i = 1

        for (let givenKey of collectedKeys){
            for (let continent of this.neededData){    
                continent.isForecast = true
                continent.isExpanded = false
                continent.number = this.baseTime
                let maxNum = 0
                for (let country of continent.meta){
                    //country.number = this.baseTime
                    for (const [key, numbers] of Object.entries(country)) {
                        if (key === givenKey){
                            for (const [key2, value] of Object.entries(numbers)) {
                                if (key2 === 'attacks'){
                                    maxNum = Math.max(maxNum, value)
                                }
                            }
                        }
                    }
                    country.selectedTimes = this.selectedTimes
                }
                continent['continent_max_attacks_' + i] = maxNum
                continent.selectedTimes = this.selectedTimes
            }
            i++
        }

        //console.log(this.neededData)
    }

    continentMaxPercentageAttacks(){
        let collectedKeys = []
        for (let continent of this.neededData){
            for (let country of continent.meta){
                for (const [key, numbers] of Object.entries(country)) {
                    if (key !== 'country' && key !== 'cc' && !collectedKeys.includes(key) && key !== this.baseTime){
                        collectedKeys.push(key)
                    }
                }
            }
        }
        //console.log(collectedKeys)

        let i = 1

        for (let givenKey of collectedKeys){

            for (let continent of this.neededData){ 
                let maxNum = -101
                for (let country of continent.meta){
                    let timePeriodAttacks = country[this.baseTime]
                    let attackVal = timePeriodAttacks.attacks
                    country.number = this.baseTime
                    for (const [key, numbers] of Object.entries(country)) {
                        if (key === givenKey){
                            for (const [key2, value] of Object.entries(numbers)) {
                                if (key2 === 'attacks'){
                                    let change = ((value - attackVal)/attackVal) * 100
                                    if (change > maxNum){
                                        if (isFinite(change)){
                                            maxNum = change
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                continent['continent_max_increase_attacks_' + i] = maxNum
            }
            i++
        }

        //console.log(this.neededData)

    }




}