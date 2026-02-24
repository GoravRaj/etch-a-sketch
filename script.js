const grid = document.getElementById("grid-container");
const slider = document.getElementById("size-slider");
const sizeText = document.getElementById("size-text");
const colorButtons = document.querySelectorAll(".color-btn");

let isDrawing = false;
let colorMode = "white";

// Manage drawing state globally
window.onmousedown = () => (isDrawing = true);
window.onmouseup = () => (isDrawing = false);

// Grid creation
function createGrid(size) {
    grid.innerHTML = "";
    const fragment = document.createDocumentFragment(); // a temporary container
    const squareSize = 100 / size; // Using % instead of px makes it perfectly responsive
    
    for(let i = 0; i < size * size; i++) {
        const div = document.createElement("div");
        div.classList.add("square");
        div.style.flex = `0 0 ${squareSize}%`;
        div.style.height = `${squareSize}%`;
        div.style.backgroundColor = "#ffffff"; // Force base color for consistent darkening
        div.style.opacity = "0"; // Used for the 10% darkening effect
        fragment.appendChild(div);
    }
    grid.appendChild(fragment);
}


function paint(square) {
    let currentOpacity = parseFloat(square.style.opacity) || 0;

    // If eraser is active, clear the square immediately
    if(colorMode === "eraser") {
        square.style.backgroundColor = "transparent";
        square.style.opacity = "0";
        return;
    }

     // DRAWING LOGIC: 10% Darkening and Color Application
     // update the color if it's different from the current one
     if (colorMode === "white") square.style.backgroundColor = "#ffffff";
     if (colorMode === "red") square.style.backgroundColor = "#ff4d4d";
     if (colorMode === "cyan") square.style.backgroundColor = "#00f2ff";
     if (colorMode === "rainbow") {
         square.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
     }

     // Increase opacity until it reaches 1 (solid)
     if (currentOpacity < 1) {
        square.style.opacity = (currentOpacity + 0.1).toFixed(1);
    }
}

grid.addEventListener("mouseover", (e) => {
    if(isDrawing && e.target.classList.contains("square")) {
        paint(e.target); 
    }
});

grid.addEventListener("mousedown", (e) => {
    if(e.target.classList.contains("square")) {
        paint(e.target);
    }
});

colorButtons.forEach(btn => {
    btn.onclick = () => {
        const activeBtn = document.querySelector(".color-btn.active");
        if (activeBtn) activeBtn.classList.remove("active");
        btn.classList.add("active");
        colorMode = btn.dataset.color;
    };
});

slider.oninput = () => {
    sizeText.innerText = slider.value;
};

slider.onchange = () => {
    createGrid(slider.value);
};

document.getElementById("reset-btn").onclick = () => createGrid(slider.value);


// Start with 16x16
createGrid(16);