const grid = document.getElementById("grid-container");
const slider = document.getElementById("size-slider");
const sizeText = document.getElementById("size-text");
const colorButtons = document.querySelectorAll(".color-btn");



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
       
        fragment.appendChild(div);
    }
    grid.appendChild(fragment);
}

createGrid(16);