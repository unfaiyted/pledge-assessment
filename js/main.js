/*
* This is the main js file for index.html
* */
"use strict";
const leaderboard = [112, 98, 119, 126, 129, 44, 118, 125, 101, 27];


var select = document.getElementById('select-district');

select.onchange = function () {
    select.style.color = '#fff';
};

window.onload = function () {
        console.log("Hello, USAA!");

    const MAX_VALUE = document.getElementById("pledge-count").getAttribute('data-count');
    // COUNTER FUNCTIONALITY
    let countInterval;

    function countUp() {
        let countUp = document.getElementById("pledge-count").innerText;

        if(countUp.includes(",")) { countUp = countUp.replace(/,/g, ''); }

        countUp = parseInt(countUp);

        countUp++;

        document.getElementById("pledge-count").innerText = numberWithCommas(countUp);

        // if(countUp > 999) { countUp = countUp.replace(/,/g, ''); }

        if(parseInt(countUp) >= MAX_VALUE) {
            document.getElementById("pledge-count").innerText = numberWithCommas(MAX_VALUE);
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
            let currWidthAsFloat = parseFloat(currWidth.replace(/%/,""));

            currWidthAsFloat = currWidthAsFloat + 0.15;


            if(currWidthAsFloat < storeMaxes[i]) {
                document.getElementById('bar_' + i ).style.width = currWidthAsFloat + "%";
                modified = true;
            }
        }

        if (modified === false) {
            window.clearInterval(leaderboardInterval);
        }

    }

    leaderboardInterval = window.setInterval(recalculateWidths, 1);



    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }








// END
};