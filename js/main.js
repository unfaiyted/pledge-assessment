/*
* This is the main js file for index.html
* */
"use strict";
const leaderboard = [112, 98, 119, 126, 129, 44, 118, 125, 101, 27];

window.onload = function () {
        console.log("Hello, USAA!");

    const MAX_VALUE = document.getElementById("pledge-count").getAttribute('data-count');
    // COUNTER FUNCTIONALITY
    let countInterval;

    function countUp() {
        let countUp = document.getElementById("pledge-count").innerText;
        countUp++;
        document.getElementById("pledge-count").innerText = countUp;

        if(parseInt(countUp) >= MAX_VALUE) {
            document.getElementById("pledge-count").innerText = MAX_VALUE;
            window.clearInterval(countInterval);
        }
    }

    countInterval = window.setInterval(countUp, 2);


    /*
    *  LEADERBOARD FILL
    * */
    const max = Math.max.apply(null, leaderboard);
    let appendHTML = ``;

    function createDistrict(i, width, pledges) {
        return `
          <div class="district">
            <div class="title">District ${i+1}</div>
            <div class="bar" id="bar_${i}" style="width: 0%"></div>
            <div class="count">${pledges} Pledges</div>
          </div>  
        `;
    };

    let storeMaxes = [];

    for(let i = 0; i < leaderboard.length; i++) {
        let width = (leaderboard[i]/ max) *50;
        storeMaxes.push(width);
        appendHTML += createDistrict(i, width, leaderboard[i]);
    }

    document.getElementById("leaderboard").innerHTML = appendHTML;

    // style="width: ${width}%"
    // change widths

    let leaderboardInterval;

    // Adds 1% width on each check
    function recalculateWidths() {
        let modified = false;

        for(let i = 0; i < storeMaxes.length; i++) {
            let currWidth = document.getElementById('bar_' + i ).style.width;
            let currWidthAsInt = parseInt(currWidth.replace(/%/,""));
            currWidthAsInt++;

            if(currWidthAsInt < storeMaxes[i]) {
                document.getElementById('bar_' + i ).style.width = currWidthAsInt + "%";
                modified = true;
            }
        }

        if (modified === false) {
            window.clearInterval(leaderboardInterval);
        }

    }

    leaderboardInterval = window.setInterval(recalculateWidths, 35);







// END
};