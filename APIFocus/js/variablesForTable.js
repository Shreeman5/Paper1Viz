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

    continentAndCountryTotalAttacks(){
        for (let continent of this.neededData){
            let continentTotal = 0
            let metaValues = continent.meta
            for (let country of metaValues){
                let countryTotal = 0
                for (const [key, value] of Object.entries(country)) {
                    if (key !== 'cc' && key !== 'country' && key !== 'number' && key !== 'selectedTimes'){
                        for (const [key2, value2] of Object.entries(value)) {
                            if (key2 === 'attacks'){
                                continentTotal += value2
                                countryTotal += value2
                            }
                        }
                    }
                }
                //console.log(countryTotal)
                country.totalAttacks = this.convert(countryTotal)
            }
            //console.log(continentTotal)
            continent.totalAttacks = this.convert(continentTotal)
        } 
    }


    dataForTable(givenData, dateselected, index){
        // console.log(givenData)
        // console.log(dateselected)

        for (let continent of this.neededData){
            let metaValues = continent.meta
            for (let country of metaValues){
                let a = givenData[country.cc]
                if (a != null){
                    let b = a[dateselected]
                    let c = b[0]
                    //console.log(c)
                    if (c.username === 'root' || c.username === 'admin'){
                        country['country_root_admin_top_' + index] = 'yes'
                    }
                    else{
                        country['country_root_admin_top_' + index] = 'no'
                    }
                }
                else{
                    country['country_root_admin_top_' + index] = 'yes'
                }
            }
        }
    }

    userNameParsing(){
        let countries = []
        for (let continent of this.neededData){
            let metaValues = continent.meta
            for (let country of metaValues){
                countries.push(country.cc)
            }
        }

        let checkedBoxes = document.querySelectorAll('input[type="checkbox"]')
        let selected = Array.from(checkedBoxes).map(x => x.value)


        let that = this
        for (let i = 0; i < selected.length; i++){
            getData4(selected[i], countries).then(function(loadedData){
                that.dataForTable(loadedData, selected[i], i+1)
            })
        }
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
}

async function getData4(selected, countries){
    let givenValue = document.getElementById("data").value
    let givenValue2 = document.getElementById("timePeriod").value



    let api_address = 'http://128.110.217.128/top/usernames?cluster='+givenValue+'&cc='+countries.join(',')+'&range='+selected+'&period='+givenValue2
    //console.log(api_address)
    const data = await fetch(api_address)
    const jsonData = await data.json()
    
    //console.log('op:', jsonData)
    return jsonData

}