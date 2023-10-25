class CrossReferenceIPLineChart{
    static allTheIPs

    constructor(timeRangeList){
        this.timeRangeList = timeRangeList
        CrossReferenceIPLineChart.allTheIPs = []
    }

    crossReferenceIPChart(){
        console.log(CrossReferenceIPLineChart.allTheIPs)
    }

    fetchData(){
        let clusterValue = document.getElementById("data").value
        let periodValue = document.getElementById("timePeriod").value
        
        

        let myOpts = document.getElementById('ipsClicked').options
        let selectedIPslength = myOpts.length - 1
        console.log(selectedIPslength)

        let divisionBy10s = Math.ceil(selectedIPslength/10)
        for (let i = 0; i < divisionBy10s; i++){
            let requiredIPs = []
            let requiredCountries = []
            for (let j = (10*i)+1; j <= (10*i)+10 && j <= selectedIPslength; j++){
                requiredIPs.push(myOpts[j].value)
                let givenText = myOpts[j].text
                if (!requiredCountries.includes(givenText.slice(-2))){
                    requiredCountries.push(givenText.slice(-2))
                }
            }
            getData6(clusterValue, requiredCountries, this.timeRangeList, periodValue, requiredIPs).then(function(loadedData){
                CrossReferenceIPLineChart.allTheIPs.push(loadedData)
            })
        }

        let that = this
        setTimeout( function() { that.crossReferenceIPChart(); }, 2000)
    }

}

async function getData6(clusterValue, requiredCountries, timeRangeList, periodValue, requiredIPs){
    let api_address = 'http://128.110.217.95/attacker_activity?cluster='+clusterValue+'&cc='+requiredCountries.join(',')+'&range='+timeRangeList.join(',')+'&period='+periodValue+'&ips='+requiredIPs
    const data = await fetch(api_address)
    const jsonData = await data.json()
    return jsonData
}