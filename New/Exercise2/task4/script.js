// Task 4 - Chocolate shop

const baseUrl = "https://sukkergris.no/choco/jsonlist/";

const headerImg = document.getElementById("header");
const categoriesDiv = document.getElementById("categories");
const listDiv = document.getElementById("list");

const dialog = document.getElementById("dialog");
const dialogImage = document.getElementById("dialogImage");
const dialogName = document.getElementById("dialogName");
const dialogHeading = document.getElementById("dialogHeading");
const dialogPrice = document.getElementById("dialogPrice");
const closeButton = document.getElementById("closeButton");

// The JSON gives us the image folder and the header image
let imgURL = "";

// Fetches the chocolates from the server.
// 4c: if we have a category, we add it as a URL variable (?category=...)
async function getChocolates(category) {
  let url = baseUrl;
  if (category) {
    url = url + "?category=" + category;
  }

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// 4a: show the list
function showChocolates(chocolates) {
  listDiv.innerHTML = "";

  for (let i = 0; i < chocolates.length; i++) {
    const choco = chocolates[i];

    // The JSON only has the large image name, e.g. choco_large_00288_.png
    // The small one has "small" instead of "large" and is a .jpg file
    const smallName = choco.image.replace("large", "small").replace(".png", ".jpg");

    const div = document.createElement("div");
    div.className = "choco";

    div.innerHTML =
      '<img src="' + imgURL + smallName + '" alt="' + choco.name + '">' +
      '<div class="text">' +
        '<div class="name">' + choco.name + '</div>' +
        '<div class="heading">' + choco.heading + '</div>' +
      '</div>' +
      '<div class="price">' + choco.price + ' kr</div>';

    // 4b: open the dialog when we click a chocolate
    div.addEventListener("click", function () {
      openDialog(choco);
    });

    listDiv.appendChild(div);
  }
}

// 4b: fill the dialog with the large image and show it
function openDialog(choco) {
  dialogImage.src = imgURL + choco.image;
  dialogName.textContent = choco.name;
  dialogHeading.textContent = choco.heading;
  dialogPrice.textContent = choco.price + " kr";
  dialog.showModal();
}

closeButton.addEventListener("click", function () {
  dialog.close();
});

// 4c: make one button for "All" and one for each category
function showCategoryButtons(categories) {
  categoriesDiv.innerHTML = "";

  const allButton = document.createElement("button");
  allButton.textContent = "All";
  allButton.addEventListener("click", function () {
    loadChocolates("");
  });
  categoriesDiv.appendChild(allButton);

  for (let i = 0; i < categories.length; i++) {
    const button = document.createElement("button");
    button.textContent = categories[i];
    button.addEventListener("click", function () {
      loadChocolates(categories[i]);
    });
    categoriesDiv.appendChild(button);
  }
}

// Fetches and shows the chocolates for one category (or all)
async function loadChocolates(category) {
  const data = await getChocolates(category);
  showChocolates(data.chocodata);
}

// Runs when the page loads
async function start() {
  const data = await getChocolates("");

  imgURL = data.info.imgURL;
  headerImg.src = data.info.headImg;

  showCategoryButtons(data.categories);
  showChocolates(data.chocodata);
}

start();
