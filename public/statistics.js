// [hole number, par, strokes, putts, gir, fairway] //

function numberOfRoundsPlayed(scorecardObject){

    return scorecardObject.length
}

function overallAverageComparedToPar(scorecardObject){
    let holesPlayed = 0;
    let netScore = 0;
    for(let scorecards in scorecardObject){
        for(let holes in scorecardObject[scorecards].scores){
            netScore += scorecardObject[scorecards].scores[holes][2]-scorecardObject[scorecards].scores[holes][1]
            holesPlayed ++;
        }
    }
    let overallAverage = Math.round((netScore / holesPlayed) * 1800) / 100;
    console.log("Average Over Par: " + overallAverage)
    return overallAverage
}

function parThreeScoringAverage(scorecardObject){
    let totalStrokes = 0;
    let counter = 0;
    for (let scorecards in scorecardObject) {
        for (let holes in scorecardObject[scorecards].scores) {
            if (scorecardObject[scorecards].scores[holes][1]==3) {
                counter++;
                totalStrokes += scorecardObject[scorecards].scores[holes][2]
            }
        }
    }
    let average = totalStrokes / counter
    console.log('par 3 average ' + Math.round(average * 100) / 100)
    
    return Math.round(average * 100) / 100
}

function parFourScoringAverage(scorecardObject){
    let totalStrokes = 0;
    let counter = 0;
    for (let scorecards in scorecardObject) {
        for (let holes in scorecardObject[scorecards].scores) {
            if (scorecardObject[scorecards].scores[holes][1]==4) {
                counter++;
                totalStrokes += scorecardObject[scorecards].scores[holes][2]
            }
        }
    }
    let average = totalStrokes / counter
    console.log('par 4 average ' + Math.round(average * 100) / 100)
    return Math.round(average * 100) / 100
}

function parFiveScoringAverage(scorecardObject){
    let totalStrokes = 0;
    let counter = 0;
    for (let scorecards in scorecardObject) {
        for (let holes in scorecardObject[scorecards].scores) {
            if (scorecardObject[scorecards].scores[holes][1]==5) {
                counter++;
                totalStrokes += scorecardObject[scorecards].scores[holes][2]
            }
        }
    }
    let average = totalStrokes / counter
    console.log('par 5 average ' + Math.round(average * 100) / 100)
    return Math.round(average * 100) / 100
}

function averageNumberOfPutts(scorecardObject){
    let counter = 0;
    let totalNumberOfPutts = 0;
    for (let scorecards in scorecardObject) {
        for (let holes in scorecardObject[scorecards].scores){
            counter++
            totalNumberOfPutts += scorecardObject[scorecards].scores[holes][3]
        }
    }
    let averagePutts = Math.round((totalNumberOfPutts / counter) *100)/100;
    console.log('Average Putts : ' + averagePutts)
    return averagePutts
}

function overallGIR(scorecardObject){
    let counter = 0;
    let totalGreensHit = 0;
    for (let scorecards in scorecardObject) {
        for (let holes in scorecardObject[scorecards].scores) {
            counter++
            if (scorecardObject[scorecards].scores[holes][4] === true) {
                totalGreensHit++
            }
        }
    }
    let gir = totalGreensHit / counter
    console.log('GIR: ' + Math.round(gir * 100) + "%")
    return Math.round(gir * 100)
}

function parThreeGIR(scorecardObject){
    let counter = 0;
    let totalGreensHit = 0;
    for (let scorecards in scorecardObject) {
        for (let holes in scorecardObject[scorecards].scores) {
            if(scorecardObject[scorecards].scores[holes][1]===3){
                if (scorecardObject[scorecards].scores[holes][4] === true) {
                    totalGreensHit++
                }
                counter++;
            }
        }
    }
    let gir = totalGreensHit / counter
    console.log('Par 3 GIR: ' + Math.round(gir * 100) + "%")
    return Math.round(gir * 100)
}

function parFourGIR(scorecardObject){
    let counter = 0;
    let totalGreensHit = 0;
    for (let scorecards in scorecardObject) {
        for (let holes in scorecardObject[scorecards].scores) {
            if(scorecardObject[scorecards].scores[holes][1]===4){
                if (scorecardObject[scorecards].scores[holes][4] === true) {
                    totalGreensHit++
                }
                counter++;
            }
        }
    }
    let gir = totalGreensHit / counter
    console.log('Par 4 GIR: ' + Math.round(gir * 100) + "%")
    return Math.round(gir * 100)

}

function parFiveGIR(scorecardObject){
    let counter = 0;
    let totalGreensHit = 0;
    for (let scorecards in scorecardObject) {
        for (let holes in scorecardObject[scorecards].scores) {
            if(scorecardObject[scorecards].scores[holes][1]===5){
                if (scorecardObject[scorecards].scores[holes][4] === true) {
                    totalGreensHit++
                }
                counter++;
            }
        }
    }
    let gir = totalGreensHit / counter
    console.log('Par 5 GIR: ' + Math.round(gir * 100) + "%")
    return Math.round(gir * 100)   
}

function upAndDown(scorecardObject){
    let counter = 0;
    let parCount = 0;
    for (let scorecards in scorecardObject) {
        for (let holes in scorecardObject[scorecards].scores) {
            if(scorecardObject[scorecards].scores[holes][4]==false){
                counter ++;
                if(scorecardObject[scorecards].scores[holes][2]==scorecardObject[scorecards].scores[holes][1]){
                    parCount ++;
                }
            }
        }
    }
    let upAndDown = Math.round(( parCount / counter)*100)
    console.log('Up and Down : ' + upAndDown + "%")
    return upAndDown
}

function overallFairwaysHit(scorecardObject){
    let counter = 0;
    let fairwayCounter = 0;
    for (let scorecards in scorecardObject) {
        for (let holes in scorecardObject[scorecards].scores) {
            if(scorecardObject[scorecards].scores[holes][1]!=3){
                counter++
                if(scorecardObject[scorecards].scores[holes][5]==true){
                    fairwayCounter ++;
                }
            }
        }
    }
    let fairwayPercentage = Math.round(( fairwayCounter / counter )*100)
    console.log('Fairways Hit : ' + fairwayPercentage + "%")
    return fairwayPercentage;
}

function missedFairwaysParConvert(scorecardObject){
    let counter = 0;
    let missedParConvert = 0;
    for (let scorecards in scorecardObject) {
        for (let holes in scorecardObject[scorecards].scores) {
            if(scorecardObject[scorecards].scores[holes][5]==false){
                counter ++;
                if(scorecardObject[scorecards].scores[holes][2]==scorecardObject[scorecards].scores[holes][1]){
                    missedParConvert ++;
                }
            }
        }
    }
    let mFairwayParConvert = Math.round(( missedParConvert / counter)*100)
    console.log('Missed Fairway Par : ' + mFairwayParConvert + "%")
    return mFairwayParConvert;
}

function hitFairwaysParConvert(scorecardObject){
    let counter = 0;
    let hitParConvert = 0;
    for (let scorecards in scorecardObject) {
        for (let holes in scorecardObject[scorecards].scores) {
            if(scorecardObject[scorecards].scores[holes][5]==false){
                counter ++;
                if(scorecardObject[scorecards].scores[holes][2]==scorecardObject[scorecards].scores[holes][1]){
                    hitParConvert ++;
                }
            }
        }
    }
    let hFairwayParConvert = Math.round(( hitParConvert / counter)*100)
    console.log('Hit Fairway Par : ' + hFairwayParConvert + "%")
    return hFairwayParConvert;

}

module.exports = {
    'overallAverageComparedToPar' : overallAverageComparedToPar,
    'numberOfRoundsPlayed'        : numberOfRoundsPlayed,
    'parThreeScoringAverage'      : parThreeScoringAverage,
    'parFourScoringAverage'       : parFourScoringAverage,
    'parFiveScoringAverage'       : parFiveScoringAverage,
    'averageNumberOfPutts'        : averageNumberOfPutts,
    'overallGIR'                  : overallGIR,
    'parThreeGIR'                 : parThreeGIR,
    'parFourGIR'                  : parFourGIR,
    'parFiveGIR'                  : parFiveGIR,
    'upAndDown'                   : upAndDown,
    'overallFairwaysHit'          : overallFairwaysHit,
    'missedFairwaysParConvert'    : missedFairwaysParConvert,
    'hitFairwaysParConvert'       : hitFairwaysParConvert
}