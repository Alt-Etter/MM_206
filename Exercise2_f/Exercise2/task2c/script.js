// Task 2c - Drag n drop it to the garbage bin

let cars = ["Volvo", "Peugeot", "Citroen", "Porche", "Skoda"];

const container = document.getElementById("container");
const bin = document.getElementById("bin");

function showCars() {
  container.innerHTML = "";

  for (let i = 0; i < cars.length; i++) {
    const div = document.createElement("div");
    div.className = "car";
    div.draggable = true; // makes the div draggable

    const name = document.createElement("span");
    name.textContent = cars[i];

    //Only for show, again
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    //drag starts and store which index is dragging
    div.addEventListener("dragstart", function (event) {
      event.dataTransfer.setData("text/plain", i);
    });

    div.appendChild(name);
    div.appendChild(editButton);
    container.appendChild(div);
  }
}

//the event that enebels and recognices that something is draged over
bin.addEventListener("dragover", function (event) {
  event.preventDefault();
  bin.classList.add("over");
});

bin.addEventListener("dragleave", function () {
  bin.classList.remove("over");
});

// After drop; read the index, remove the car, show the list again
bin.addEventListener("drop", function (event) {
  event.preventDefault();
  bin.classList.remove("over");

  const index = Number(event.dataTransfer.getData("text/plain"));
  cars.splice(index, 1);
  showCars();
});

showCars();
