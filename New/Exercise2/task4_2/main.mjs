
const apiURL = "https://sukkergris.no/choco/jsonlist/";

const container = document.getElementById("container");
const categories = document.getElementById("categories");
const headerImage = document.getElementById("headerImage");
const dialog = document.getElementById("chocolateDialog");

const largeImage = document.getElementById("largeImage");
const dialogName = document.getElementById("dialogName");
const dialogHeading = document.getElementById("dialogHeading");
const dialogPrice = document.getElementById("dialogPrice");
const closeButton = document.getElementById("closeButton");

// Get the chocolate data from the server
async function loadChocolates(category) {
  let url = apiURL;

  // Ask the server for a specific category
  if (category !== "") {
    url = apiURL + "?category=" + category;
  }

  const response = await fetch(url);
  const data = await response.json();

  // Show the header image
  headerImage.src = data.info.headImg;

  // Make the category buttons
  categories.innerHTML = "";

  const allButton = document.createElement("button");
  allButton.textContent = "All";
  allButton.addEventListener("click", function () {
    loadChocolates("");
  });
  categories.appendChild(allButton);

  data.categories.forEach(function (categoryName) {
    const button = document.createElement("button");
    button.textContent = categoryName;

    button.addEventListener("click", function () {
      loadChocolates(categoryName);
    });

    categories.appendChild(button);
  });

  // Display the chocolates
  showChocolates(data.chocodata, data.info.imgURL);
}

function showChocolates(chocolates, imageURL) {
  container.innerHTML = "";

  chocolates.forEach(function (chocolate) {
    const row = document.createElement("div");
    row.className = "car";

    // Change the large PNG filename to the small JPG filename
    const smallImage = chocolate.image
      .replace("large", "small")
      .replace(".png", ".jpg");

    const img = document.createElement("img");
    img.src = imageURL + smallImage;
    img.alt = chocolate.name;

    const details = document.createElement("div");

    const name = document.createElement("h3");
    name.textContent = chocolate.name;

    const heading = document.createElement("p");
    heading.textContent = chocolate.heading;

    const price = document.createElement("p");
    price.textContent = chocolate.price + " kr";

    // Edit button is only for show
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    // Prevent Edit from opening the chocolate dialog
    editButton.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    details.appendChild(name);
    details.appendChild(heading);
    details.appendChild(price);
    details.appendChild(editButton);

    row.appendChild(img);
    row.appendChild(details);
    container.appendChild(row);

    // Open the dialog when a chocolate is clicked
    row.addEventListener("click", function () {
      largeImage.src = imageURL + chocolate.image;
      dialogName.textContent = chocolate.name;
      dialogHeading.textContent = chocolate.heading;
      dialogPrice.textContent = chocolate.price + " kr";

      dialog.showModal();
    });
  });
}

// Close the dialog
closeButton.addEventListener("click", function () {
  dialog.close();
});

// Load all chocolates when the page starts
loadChocolates("");
