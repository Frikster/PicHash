import Grid from "./grid";

document.addEventListener("DOMContentLoaded", () => {
    window.handleSubmit = (e) => {
        if (e.preventDefault) e.preventDefault();
        const grid = new Grid(e.target.sentence.value);
        const gridEl = document.getElementsByClassName("grid-container")[0];
        gridEl.innerHTML = "";
        
        grid.imgURLs.forEach(imgURL => {
            const img = document.createElement('img');
            img.src = imgURL;
            gridEl.appendChild(img);
        });
    }

    let form = document.getElementById("text-input");
    if (form.addEventListener) { 
        form.addEventListener("submit", window.handleSubmit);
    } else {
        form.attachEvent("submit", window.handleSubmit); // IE8 support
    }
})