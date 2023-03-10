const colorPickerBtn = document.querySelector("#color-picker");
const colorList = document.querySelector(".all-colors");
const clearAll = document.querySelector(".clear-all");
const pickedColors = JSON.parse(localStorage.getItem("picked-Colors") || "[]");

const copyColor = elem => {
    navigator.clipboard.writeText(elem.dataset.color); //copying the color
    elem.innerText = "Copied!";
    setTimeout(() => elem.innerText = elem.dataset.color, 800);
}

const showColors = () => {
    if(!pickedColors.length){
        return; // no colors
    }
    colorList.innerHTML = pickedColors.map(color => `
        <li class="color">
            <span class="rect" style="background: ${color}; border: 1px solid ${color == "#ffffff" ? "#ccc" : color}"></span>
            <span class="value" data-color="${color}">${color}</span>
        </li>    
    `).join(""); //Generating li for the picked color and adding it to the colorList
    
    // Hidding picked colors title
    document.querySelector(".picked-colors").classList.remove("hide");
    
    //Add a click event listener to each color element to copy the color code
    document.querySelectorAll(".color").forEach(li => {
        li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));
    });
}
showColors();



const activateEyeDropper = async () => {
    document.body.style.display = "none"; //hidding the popup
    try {
        const eyeDropper = new EyeDropper();
        const {sRGBHex} = await eyeDropper.open();
        navigator.clipboard.writeText(sRGBHex);

        //Adding the color to the list if it doesnt already exist
        if(!pickedColors.includes(sRGBHex)) {
        pickedColors.push(sRGBHex);
        localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
        showColors();    
        }
       
    } catch (error) {
        console.log("Failed to copy the color code!");
    }
    document.body.style.display = "block";
}

// Clearing all picked colors and updating localStorage
const clearAllColors = () => {
    pickedColors.length = 0;
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
    document.querySelector(".picked-colors").classList.add("hide");
} 

colorPickerBtn.addEventListener("click", activateEyeDropper);
clearAll.addEventListener("click", clearAllColors);