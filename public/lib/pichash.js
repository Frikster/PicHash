import Grid from "./grid";

document.addEventListener("DOMContentLoaded", () => {
    const handleSubmit = (e) => {
        if (e.target.type !== "radio") e.preventDefault();
        // Assigning radioVal can be condensed into one line, but it's done this way for IE8 support
        // One-line solution: radioVal = document.querySelector('input[type="radio"]:checked').value;
        let checkedRadioVal = 1; 
        let radioVals = [];
        const radioDiv = document.getElementById("radio-div");
        radioDiv.forEach( el => {
            if (el.checked) checkedRadioVal = el.value;
            if (el.value !== "random") radioVals.push(el.value);
        });

        // for (var i = 0; i < Array.from(radioDiv).length; i++) {
        //   if (e.target[i].type === "radio") {
        //       if(e.target[i].checked) radioVal = e.target[i].value;
        //       if (e.target[i].value !== "random") radioVals.push(e.target[i].value);
        //   }
        // }
        checkedRadioVal === "random" ? checkedRadioVal = radioVals.slice(0) : checkedRadioVal = [checkedRadioVal]
        let grid;
        console.log(e)
        if(e.target.checked) {
            // Clicking a radio button
            // let sets = e.target.value;
            // if(sets === "random") {
            //     sets = radioVals.filter(val => val !== "random");
            // }
            // console.log(sets)
            grid = new Grid(document.getElementById("text-input").value, sets);
        } else {
            // Clicking the submit button
            grid = new Grid(e.target.sentence.value, [checkedRadioVal]);
        }
        
        const gridEl = document.getElementsByClassName("grid-container")[0];
        gridEl.innerHTML = "";

        grid.imgURLs.forEach(imgURL => {
            const img = document.createElement('img');
            img.src = imgURL;
            gridEl.appendChild(img);
        });
    }

    let form = document.getElementById("text-input-form");
    if (form.addEventListener) { 
        form.addEventListener("submit", handleSubmit);
    } else {
        form.attachEvent("submit", handleSubmit); // IE8 support
    }

    // const handRadioClick = (e) => {
    //     const wrapper = function() {
    //         this.sentence = document.getElementById("text-input");
    //         this.radioName = e.target.name;
    //     }
    //     handleSubmit(wrapper);
    // }

    let radioDiv = document.getElementById("radio-div");
    Array.from(radioDiv.childNodes).forEach(child => {
        if (child.type === "radio"){
            if (child.addEventListener) {
                child.addEventListener("click", handleSubmit);
            } else {
                child.attachEvent("click", handleSubmit); // IE8 support
            }
        }
    });


})