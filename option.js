const activeCellElement = document.querySelector(".selected-cell");
const form = document.getElementById("options-form");
const expressionInput = document.getElementById("expression");


let selectedCell = null;
const state = {};

const defaultState = {
    innerText: "",
    isBold: false,
    align: "left",
    isUnderlined: false,
    isItalic: false,
    fontSize: "16",
    fontFamily: "Sans Serif",
    textColor: "#000000",
    backgroundColor: "#ffffff"
}

function applyCellInfoToForm() {
    if (selectedCell && state[selectedCell.id]) {
        const data = state[selectedCell.id];
        for (let key in data) {
            if (form[key]) {
                if (form[key].type === "checkbox") {
                    form[key].checked = data[key];
                } else {
                    form[key].value = data[key];
                }
            }
        }
    } else {
        form.reset();
    }
}

function onChangeInnerText() {
    if (selectedCell) {
        if (!state[selectedCell.id]) {
            state[selectedCell.id] = { ...defaultState };
        }
        state[selectedCell.id].innerText = selectedCell.innerText;
    }
}



function onFocusCell(e) {
    if (selectedCell) {
        selectedCell.classList.remove("active-cell");
    }
    selectedCell = e.target;
    activeCellElement.innerText = selectedCell.id;
    selectedCell.classList.add("active-cell");
    applyCellInfoToForm();
}

function applyStylesToSelectedCell(styles) {
    
    selectedCell.style.fontSize = styles.fontSize + "px";
    selectedCell.style.fontFamily = styles.fontFamily;
    selectedCell.style.fontWeight = styles.isBold ? "bold" : "400";
    selectedCell.style.fontStyle = styles.isItalic ? "italic" : "normal";
    selectedCell.style.textDecoration = styles.isUnderlined ? "underline" : "none";
    selectedCell.style.textAlign = styles.align; 
    selectedCell.style.color = styles.textColor;
    selectedCell.style.backgroundColor = styles.backgroundColor;
}

form.addEventListener("change", function () {
    if (!selectedCell) {
        alert("Please select a cell before making any change to the options");
        form.reset();
        return;
    }

    
    const formData = {
        fontFamily: form["fontFamily"].value,
        fontSize: form["fontSize"].value, // "18"
        isBold: form["isBold"].checked,
        isItalic: form["isItalic"].checked,
        isUnderlined: form["isUnderlined"].checked,
        align: form["align"].value,
        textColor: form["textColor"].value,
        backgroundColor: form["backgroundColor"].value
    }

    state[selectedCell.id] = {...defaultState,innerText:selectedCell.innerText}

    applyStylesToSelectedCell(formData);
});

expressionInput.addEventListener("keyup", (e) => {
    if (!selectedCell) {
        alert("Please select a cell to apply the result");
        return;
    }

    if (e.code === "Enter") {
        try {
            let expression = expressionInput.value;
            let result = eval(expression);
            selectedCell.innerText = result;
        } catch (error) {
            alert("Please enter a valid expression");    
        }
    }
});




// function getSelectedRadioValue(name) {
//     const radioButtons = form[name];
//     for (const radioButton of radioButtons) {
//         if (radioButton.checked) {
//             return radioButton.value;
//         }
//     }
//     return null;
// }
