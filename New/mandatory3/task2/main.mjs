// main.mjs - loads data from the server, updates the views and handles navigation

import "./views.mjs";

// ------------------------------------------------------------------
// CHECK THESE AGAINST THE REAL JSON (open the 3 URLs in the browser).
// If a field has another name in the JSON, change it here - nowhere else.
// ------------------------------------------------------------------
const FIELDS = {
  id: "id",
  name: "name",
  description: "description",
  price: "price",
  image: "image",            // file name, e.g. "P1000903.png"
  category: "category",
  height: "height",
  zone: "growthzone",
  fertilizer: "fertilizer",
  advice: "plantingadvice"
};

const categoriesUrl = "https://sukkergris.no/plantcategories/";
const plantsUrl = "https://sukkergris.no/plants/?category=";
const plantUrl = "https://sukkergris.no/plant/?id=";
const smallImagePath = "http://sukkergris.no/plantimages/small/";
const largeImagePath = "http://sukkergris.no/plantimages/large/";

const categoryView = document.getElementById("categories");
const plantListView = document.getElementById("plantlist");
const plantDetailView = document.getElementById("plantdetail");

let categories = []; // we only need to load these once

// ---------- Loading data ----------

async function loadCategories() {
  const response = await fetch(categoriesUrl);
  const data = await response.json();
  return data;
}

async function loadPlants(category) {
  const response = await fetch(plantsUrl + category);
  const data = await response.json();
  return data;
}

async function loadPlant(id) {
  const response = await fetch(plantUrl + id);
  const data = await response.json();
  return data;
}

// The large images are .jpg, while the file name from the server is .png
function toLargeName(fileName) {
  return fileName.replace(".png", ".jpg");
}

// Turn a plant from the server into the object the views expect
function makePlant(p) {
  return {
    id: p[FIELDS.id],
    name: p[FIELDS.name],
    description: p[FIELDS.description],
    price: p[FIELDS.price],
    category: p[FIELDS.category],
    height: p[FIELDS.height],
    zone: p[FIELDS.zone],
    fertilizer: p[FIELDS.fertilizer],
    advice: p[FIELDS.advice],
    smallImage: smallImagePath + p[FIELDS.image],
    largeImage: largeImagePath + toLargeName(p[FIELDS.image])
  };
}

// ---------- Showing views ----------

function showOnly(view) {
  categoryView.hidden = categoryView !== view;
  plantListView.hidden = plantListView !== view;
  plantDetailView.hidden = plantDetailView !== view;
}

// state is an object like { view: "list", category: "hudplager" }
async function render(state) {
  if (state.view === "categories") {
    categoryView.show(categories);
    showOnly(categoryView);
  } else if (state.view === "list") {
    const data = await loadPlants(state.category);
    const plants = data.map(makePlant);
    plantListView.show(state.category, plants);
    showOnly(plantListView);
  } else if (state.view === "detail") {
    const data = await loadPlant(state.id);
    // the server may send one object or an array with one object
    const plant = Array.isArray(data) ? data[0] : data;
    plantDetailView.show(makePlant(plant));
    showOnly(plantDetailView);
  }
}

// Go to a new view and add it to the browser history
function goTo(state) {
  history.pushState(state, "");
  render(state);
}

// ---------- Listening to events from the views ----------

categoryView.addEventListener("categoryclick", (event) => {
  goTo({ view: "list", category: event.detail.category });
});

plantListView.addEventListener("plantclick", (event) => {
  goTo({ view: "detail", id: event.detail.id });
});

// The app's own back button uses the same history as the browser's back button
plantListView.addEventListener("backclick", () => history.back());
plantDetailView.addEventListener("backclick", () => history.back());

// The browser's back/forward buttons
window.addEventListener("popstate", (event) => {
  const state = event.state || { view: "categories" };
  render(state);
});

// ---------- Start ----------

async function start() {
  categories = await loadCategories();
  const startState = { view: "categories" };
  history.replaceState(startState, "");
  render(startState);
}

start();
