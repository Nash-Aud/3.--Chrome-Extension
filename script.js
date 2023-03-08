const colorPickerBtn = document.querySelector("#color-picker");
const pickedColors = [];

const activateEyeDropper = async () => {
    try {
        const eyeDropper = new EyeDropper();
        const {sRGBHex} = await eyeDropper.open();
        navigator.clipboard.writeText(sRGBHex);

        pickedColors.push(sRGBHex);
        localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
    } catch (error) {
        console.log(error);
    }
}

colorPickerBtn.addEventListener("click", activateEyeDropper);