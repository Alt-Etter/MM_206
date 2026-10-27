// main.mjs - loads data from the server, updates the views and handles navigation

import "./views.mjs";

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

  // The server sends [{kategori: "Hudplager"}, ...]
  // We only need the names, so we make a simple list of strings
  const names = [];
  for (let i = 0; i < data.length; i++) {
    names.push(data[i].kategori);
  }
  return names;
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
  // The list from the server does not have fertilizer and temperature,
  // so these texts are only filled in for the detail view
  const fertilizer = p.nitrogen + " % nitrogen, " + p.kalium + " % kalium og " + p.fosfor + " % fosfor.";
  const advice = "Bør ikke plantes hvis temperaturen om dagen er under " + p.min_temp_dag +
    " grader, eller temperaturen om natten er under " + p.min_temp_natt + " grader.";

  return {
    id: p.id,
    name: p.navn,
    description: p.beskrivelse,
    price: p.pris,
    category: p.kategori,
    height: p.hoyde,
    zone: p.vekstsone,
    fertilizer: fertilizer,
    advice: advice,
    smallImage: smallImagePath + p.bildefil,
    largeImage: largeImagePath + toLargeName(p.bildefil)
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
