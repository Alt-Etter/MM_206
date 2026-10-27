// views.mjs - the 3 views, made as custom elements (web components).
// The views only show data and dispatch custom events.
// Loading data and navigation is done in main.mjs.

// Every view has its own shadow DOM, so we load views.css inside each one
const cssLink = '<link rel="stylesheet" href="views.css">';

// Helper: dispatch a custom event that can travel out of the shadow DOM
function sendEvent(element, name, detail) {
  element.dispatchEvent(
    new CustomEvent(name, { detail: detail, bubbles: true, composed: true })
  );
}

// ---------- Category view ----------
class CategoryView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // categories is an array of category names (strings)
  show(categories) {
    this.shadowRoot.innerHTML =
      cssLink +
      '<div class="app">' +
        '<div class="topbar">Helseflora</div>' +
        '<h1>Kategorier</h1>' +
        '<div id="list"></div>' +
      '</div>';

    const list = this.shadowRoot.getElementById("list");

    for (let i = 0; i < categories.length; i++) {
      const div = document.createElement("div");
      div.className = "category";
      div.textContent = categories[i];

      // Tell main.mjs that the user clicked a category
      div.addEventListener("click", () => {
        sendEvent(this, "categoryclick", { category: categories[i] });
      });

      list.appendChild(div);
    }
  }
}

// ---------- Plant list view ----------
class PlantListView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // plants is an array of objects: { id, name, description, price, smallImage }
  show(categoryName, plants) {
    this.shadowRoot.innerHTML =
      cssLink +
      '<div class="app">' +
        '<div class="topbar">' +
          '<button class="back" id="back">&larr;</button>' +
          '<span>Helseflora</span>' +
        '</div>' +
        '<h1 id="title"></h1>' +
        '<div id="list"></div>' +
      '</div>';

    this.shadowRoot.getElementById("title").textContent = categoryName;

    this.shadowRoot.getElementById("back").addEventListener("click", () => {
      sendEvent(this, "backclick", {});
    });

    const list = this.shadowRoot.getElementById("list");

    for (let i = 0; i < plants.length; i++) {
      const plant = plants[i];

      const div = document.createElement("div");
      div.className = "plant";
      div.innerHTML =
        '<img alt="">' +
        '<div>' +
          '<div class="name"></div>' +
          '<div class="description"></div>' +
          '<div class="price"></div>' +
        '</div>';

      // textContent is safe (innerHTML with server data could allow XSS)
      div.querySelector("img").src = plant.smallImage;
      div.querySelector(".name").textContent = plant.name;
      div.querySelector(".description").textContent = plant.description;
      div.querySelector(".price").textContent = "kr " + plant.price + ",-";

      div.addEventListener("click", () => {
        sendEvent(this, "plantclick", { id: plant.id });
      });

      list.appendChild(div);
    }
  }
}

// ---------- Plant detail view ----------
class PlantDetailView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // plant is an object with all the details
  show(plant) {
    this.shadowRoot.innerHTML =
      cssLink +
      '<div class="app">' +
        '<div class="topbar">' +
          '<button class="back" id="back">&larr;</button>' +
          '<span>Helseflora</span>' +
        '</div>' +
        '<div class="detail">' +
          '<img id="image" alt="">' +
          '<h1 id="name"></h1>' +
          '<p id="category"></p>' +
          '<p id="description"></p>' +
          '<p id="height"></p>' +
          '<p id="zone"></p>' +
          '<p id="fertilizer"></p>' +
          '<p id="advice"></p>' +
          '<p id="price"></p>' +
        '</div>' +
      '</div>';

    const root = this.shadowRoot;
    root.getElementById("image").src = plant.largeImage;
    root.getElementById("name").textContent = plant.name;
    root.getElementById("category").textContent = "Kategori: " + plant.category;
    root.getElementById("description").textContent = plant.description;
    root.getElementById("height").textContent = "Normal høyde: " + plant.height + " cm";
    root.getElementById("zone").textContent = "Vekstsone: " + plant.zone;
    root.getElementById("fertilizer").textContent = "Anbefalt gjødselmix: " + plant.fertilizer;
    root.getElementById("advice").textContent = plant.advice;
    root.getElementById("price").textContent = "kr " + plant.price + ",- per stk.";

    root.getElementById("back").addEventListener("click", () => {
      sendEvent(this, "backclick", {});
    });
  }
}

// Connect each class to its own HTML tag name (must contain a dash)
customElements.define("category-view", CategoryView);
customElements.define("plant-list-view", PlantListView);
customElements.define("plant-detail-view", PlantDetailView);
