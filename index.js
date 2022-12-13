// variable initialization
const schemeDropdown = document.getElementById("dropdown");
const selectedColorShade = document.getElementById("selected-scheme");
const getButton = document.getElementById("get-color-scheme");
const colorInput = document.getElementById("input-color");

document.addEventListener("click", function(e){
    if (e.target.id === "dropdown-arrow"){
        schemeDropdown.classList.toggle("t-display");
    }
    else if (e.target.dataset.shade){
        // re populate the selected color share div
        selectedColorShade.textContent = e.target.dataset.shade;

        // remove style for previously selected list item and apply to newly selected one
        schemeDropdown.querySelectorAll("span").forEach(ele => ele.style.fontWeight = "400");
        schemeDropdown.querySelectorAll("i").forEach(ele => ele.style.color = "lightgray");
        e.target.parentElement.querySelector("span").style.fontWeight = "600";
        e.target.parentElement.querySelector("i").style.color = "#4F46E5";
    }

    else if (e.target.id === "get-color-scheme"){
        handleBtnClick();
        schemeDropdown.classList.remove("t-display");
    }

    else if (e.target.parentElement.dataset.color){
        navigator.clipboard.writeText(e.target.parentElement.dataset.color);
        alert("Copied color " + e.target.parentElement.dataset.color);
        schemeDropdown.classList.remove("t-display");
    }

    else{
        schemeDropdown.classList.remove("t-display");
    }
});

function handleBtnClick(){
    const inputHexColVal = colorInput.value.slice(1);
    const inputColShadeVal = selectedColorShade.textContent.toLowerCase();
    const fetchUrl = `https://www.thecolorapi.com/scheme?hex=${inputHexColVal}&mode=${inputColShadeVal}&count=5`
    fetch(fetchUrl)
    .then(res => res.json())
    .then(data => render(data));
}

function render(data){
    const colorObjKeys = Object.keys(data.colors);
    let containerHtml = ''
    colorObjKeys.forEach(i => {
        let colorValue = data.colors[i].hex.value;
        containerHtml += `<div class="color-palette" data-color="${colorValue}">
                    <div class="color-box" style="background-color: ${colorValue};"></div>
                    <div class="color-value d-flex">${colorValue}</div>
                </div>`;
    });

    document.getElementById("color-container").innerHTML = containerHtml;
}