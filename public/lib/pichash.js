import Grid from "./grid";

document.addEventListener("DOMContentLoaded", () => {
    let grid;

    const handleSubmit = (e) => {
        const sentence = document.getElementById("text-input").value;
        if (e.target.type !== "radio") e.preventDefault();
        // Assigning checkedRadioVal can be condensed into one line, but it's done this way for IE8 support
        // One-line solution: checkedRadioVal = document.querySelector('input[type="radio"]:checked').value;
        let checkedRadioVal = 1; 
        let radioVals = [];
        const radioDiv = document.getElementById("radio-div");
        Array.from(radioDiv.childNodes).forEach( el => {
            if (el.checked) checkedRadioVal = el.value;
            if (el.value !== "random" && el.value) radioVals.push(el.value);
        });
        checkedRadioVal === "random" ? checkedRadioVal = radioVals.slice(0) : checkedRadioVal = [checkedRadioVal]
        grid = new Grid(sentence, checkedRadioVal);
        const gridEl = document.getElementsByClassName("grid-container")[0];
        gridEl.innerHTML = "";
        
        const colWidths = getComputedStyle(document.getElementsByClassName("grid-container")[0])['gridTemplateColumns'];
        const colWidth = colWidths.split('px ')[0];
        for (let word in grid.imgURLs){
            let imgURL = grid.imgURLs[word];
            const img = new Image();
            img.src = imgURL;
            img.className = "loading";
            img.width = colWidth;
            gridEl.appendChild(img);
            img.onerror = () => {
                // image did not load
                window.alert(
                  `Could not load an image for "${word}" \n\nMake sure this word consists only of alphanumerics and the following characters: -._~:/?#[]@!$&'()*+,;=`
                );
            }
            img.onload = () => {
                img.className = "";
            }
            // img.onload = () => {
            //     img.width = colWidth;
            //     gridEl.appendChild(img);
            // }
        }
    }

    let form = document.getElementById("text-input-form");
    if (form.addEventListener) { 
        form.addEventListener("submit", handleSubmit);
    } else {
        form.attachEvent("submit", handleSubmit); // IE8 support
    }

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

    const reseizeImages = (e) => {
        const val = e.target.value;
        const sentenceLength = grid.sentence.split(" ").length;
        if (val <= sentenceLength && sentenceLength > 2) {
          let gridStyle = "auto ".repeat(val);
          gridStyle = gridStyle.slice(0, gridStyle.length - 1);
          const grid = document.getElementsByClassName(
            "grid-container"
          )[0];
          const colWidths = getComputedStyle(grid)[
            "gridTemplateColumns"
          ].split("px ");
          const colWidth = colWidths[0];
          const newWidth = (colWidth * colWidths.length) / val;
          Array.from(grid.childNodes).forEach(img => {
            img.width = newWidth;
          });
          grid.style.gridTemplateColumns = gridStyle;
        }
    }

    const wordsPerLineSlider = document.getElementById("ImgPerLineSlider");
    if (wordsPerLineSlider.addEventListener) {
        wordsPerLineSlider.addEventListener("input", reseizeImages);
    } else {
        wordsPerLineSlider.attachEvent("change", reseizeImages); // IE support
    }
})