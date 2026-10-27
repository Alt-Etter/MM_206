const cars = ["Volvo", "Peugeot", "Citroen", "Porche", "Skoda"];

const container = document.getElementById("container");

function showCars() {
  container.innerHTML = "";

  cars.forEach((car, index) => {
    const row = document.createElement("div");
    row.className = "car";

    const name = document.createElement("span");
    name.textContent = car;

    const buttons = document.createElement("span");

    //Edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      const newName = prompt("Enter new car name:", cars[index]);

      if (newName !== null) {
        cars[index] = newName;
        showCars();
      }
    });
    //Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";

    deleteButton.addEventListener("click", function () {
      cars.splice(index, 1);
      showCars();
    });

    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);

    row.appendChild(name);
    row.appendChild(buttons);
    container.appendChild(row);
  });
}

showCars();
