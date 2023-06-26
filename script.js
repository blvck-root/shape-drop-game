let message;
let target;
let selected;
let score = 0;
const dropzones = document.querySelectorAll(".drop");
const dragzones = document.querySelectorAll(".drag-section > div");
const startGameBtn = document.querySelector("button");
startGameBtn.style.display = "none";
document.querySelector("#score").innerText = score;
startGameBtn.addEventListener("click", startGame);

function startGame() {
    window.location.reload();
}

function endGame() {
    startGameBtn.style.display = "inline";
    document.querySelector("p").innerText = message;
    document.querySelector(".drag-section").style.border = "none";
}

function handleDrop(e) {
    if (e.target.classList.contains(selected.className)) {
        if (document.querySelector(".drag-section").childElementCount === 1) {
            message = "Congratulations! You placed all shapes correctly."
            endGame();
        }
        e.target.classList.remove("drop");
        e.target.style.border = "none";
        selected.remove();
        // selected.style.display = "none";
        score++;
        document.querySelector("#score").innerText = score;
    } else {
        if (score > 0) {
            score--;
            document.querySelector("#score").innerText = score;
        }
    }
}

dropzones.forEach(function (dropzone) {
    dropzone.addEventListener("drop", handleDrop);
});

function handleDragStart(e) {
    selected = e.target;
    selected.style.opacity = 0.5;
}

document.addEventListener("dragstart", handleDragStart);

function handleDragEnd(e) {
    selected.style.opacity = 1;
}

document.addEventListener("dragend", handleDragEnd);

function allowDrop(e) {
    e.preventDefault();
}

dropzones.forEach(function(dropzone) {
    dropzone.addEventListener("dragover", allowDrop);
});

/** Challenge: 
 * 1. Start over - done
 * 2. Click shape + hole instead of drag and drop - done
 * 3. Display message when game ends as a popover div
 * 4. Shuffle the order of shapes and colors
 * 5. Send feedback to user for each action
*/

function handleDragClick (e) {
    if (selected) {
        selected.style.opacity = 1;
    }
    selected = e.target;
    selected.style.opacity = 0.5;
}

dragzones.forEach(function(dragzone) {
    dragzone.addEventListener("click", handleDragClick);
});

function handleDropClick(e) {
    if (selected) {
        target = e.target;
        if (target.classList.contains(selected.className)) {
            if (document.querySelector(".drag-section").childElementCount === 1) {
                message = "Congratulations! You placed all shapes correctly."
                endGame();
            }
            target.classList.remove("drop");
            target.style.border = "none";
            selected.remove();

            // update score
            score++;
            document.querySelector("#score").innerText = score;
        } else {
            if (score > 0) { 
                score--;
                document.querySelector("#score").innerText = score;
            }
        }
    }
    selected.style.opacity = 1;
    // clean up variables
    selected = undefined;
    target = undefined;
}

dropzones.forEach(function(dropzone) {
    dropzone.addEventListener("click", handleDropClick);
});