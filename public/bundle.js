/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/lib/pichash.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/lib/grid.js":
/*!****************************!*\
  !*** ./public/lib/grid.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Grid {
    constructor(sentence, sets=[]) {
        // Replace repeated spaces with single spaces
        this.sentence = sentence.replace(/\s{2,}/g, " ").trim();
        this.sets = sets;
        this.URLtoWord = {};
        this.imgURLs = [];
        this.sentence.split(' ').forEach(word => {
            const setNo = sets[Math.floor(Math.random() * sets.length)];
            const url = `https://robohash.org/${word}?set=set${setNo}`;
            this.URLtoWord[url] = word;
            this.imgURLs.push(`https://robohash.org/${word}?set=set${setNo}`)
        });
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Grid);


/***/ }),

/***/ "./public/lib/pichash.js":
/*!*******************************!*\
  !*** ./public/lib/pichash.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./grid */ "./public/lib/grid.js");


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
        grid = new _grid__WEBPACK_IMPORTED_MODULE_0__["default"](sentence, checkedRadioVal);
        const gridEl = document.getElementsByClassName("grid-container")[0];
        gridEl.innerHTML = "";
        
        const colWidths = getComputedStyle(document.getElementsByClassName("grid-container")[0])['gridTemplateColumns'];
        const colWidth = colWidths.split('px ')[0];
        grid.imgURLs.forEach(imgURL => {
            const img = new Image();
            img.src = imgURL;
            img.width = colWidth;
            img.className = "loading";
            gridEl.appendChild(img);
            img.onerror = () => {
                // image did not load
                window.alert(
                    `Could not load an image for "${imgURL}" \n\nMake sure this word consists only of alphanumerics and the following characters: -._~:/?#[]@!$&'()*+,;=`
                );
            }
            img.onload = () => {
                img.className = "";
            }
        }); 

        const slider = document.getElementById("ImgPerLineSlider");
        if (grid.sentence.split(" ").length < slider.value) {
            slider.value = grid.sentence.split(" ").length;
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
        if (val <= sentenceLength && sentenceLength > 3) {
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

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map