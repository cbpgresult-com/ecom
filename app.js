/* =========================================
   SUPABASE CONFIG
   ========================================= */

const SUPABASE_URL =
  "https://bszojvhitsoamhksyjul.supabase.co";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzem9qdmhpdHNvYW1oa3N5anVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1OTY0OTMsImV4cCI6MjEwMjE3MjQ5M30.QW1vat89dYrOYY0U8Bk6BwAcunTIISduPhk7ngz3iBE";

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


/* =========================================
   VARIABLES
   ========================================= */

let allProducts = [];

let selectedCategory = "all";

const productGrid =
  document.getElementById("productGrid");

const loading =
  document.getElementById("loading");

const noProducts =
  document.getElementById("noProducts");

const searchInput =
  document.getElementById("searchInput");

const sortSelect =
  document.getElementById("sortSelect");

const categoryBar =
  document.getElementById("categoryBar");


/* =========================================
   LOAD PRODUCTS
   ========================================= */

async function loadProducts() {

  loading.classList.remove("hidden");
  noProducts.classList.add("hidden");
  productGrid.innerHTML = "";

  const { data, error } =
    await supabaseClient
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", {
        ascending: false
      });

  if (error) {

    console.error(error);

    loading.innerHTML =
      "Unable to load products.";

    return;
  }

  allProducts = data || [];

  loading.classList.add("hidden");

  createCategories();

  displayProducts(allProducts);
}


/* =========================================
   CREATE CATEGORY BUTTONS
   ========================================= */

function createCategories() {

  const categories = [
    ...new Set(
      allProducts
        .map(product => product.category)
        .filter(Boolean)
    )
  ];

  categoryBar.innerHTML = `
    <button
      class="category active"
      data-category="all">
      All
    </button>
  `;

  categories.forEach(category => {

    const button =
      document.createElement("button");

    button.className = "category";

    button.dataset.category = category;

    button.textContent = category;

    categoryBar.appendChild(button);

  });
}


/* =========================================
   DISPLAY PRODUCTS
   ========================================= */

function displayProducts(products) {

  productGrid.innerHTML = "";

  if (!products.length) {

    noProducts.classList.remove("hidden");

    return;
  }

  noProducts.classList.add("hidden");

  products.forEach(product => {

    const card =
      document.createElement("article");

    card.className = "product-card";

    const image =
      product.main_image ||
      "https://placehold.co/600x600/png?text=Product";

    const price =
      Number(product.price || 0)
        .toLocaleString("en-IN");

    const mrp =
      product.mrp
        ? Number(product.mrp)
            .toLocaleString("en-IN")
        : "";

    card.innerHTML = `

      <button
        class="wishlist"
        title="Wishlist">
        ♡
      </button>

      <img
        class="product-image"
        src="${image}"
        alt="${escapeHTML(product.name)}"
        loading="lazy"
      >

      <div class="product-info">

        ${
          product.badge
            ? `<span class="badge">
                ${escapeHTML(product.badge)}
               </span>`
            : ""
        }

        <div class="rating">
          ⭐ ${product.rating || 0}
          ${
            product.review_count
              ? `(${product.review_count})`
              : ""
          }
        </div>

        <div class="product-name">
          ${escapeHTML(product.name)}
        </div>

        <div class="price-row">

          <span class="price">
            ₹${price}
          </span>

          ${
            mrp
              ? `<span class="mrp">
                  ₹${mrp}
                 </span>`
              : ""
          }

          ${
            product.discount_percent
              ? `<span class="discount">
                  ${product.discount_percent}% OFF
                 </span>`
              : ""
          }

        </div>

        <button class="add-cart">
          Add to Cart
        </button>

      </div>
    `;


    /* Product page */

    card.addEventListener("click", function () {

      window.location.href =
        `product.html?id=${product.id}`;

    });


    /* Add Cart */

    const addCartButton =
      card.querySelector(".add-cart");

    addCartButton.addEventListener(
      "click",
      function(event) {

        event.stopPropagation();

        addToCart(product);

      }
    );


    /* Wishlist */

    const wishlistButton =
      card.querySelector(".wishlist");

    wishlistButton.addEventListener(
      "click",
      function(event) {

        event.stopPropagation();

        wishlistButton.textContent = "♥";

      }
    );


    productGrid.appendChild(card);

  });
}


/* =========================================
   SEARCH
   ========================================= */

searchInput.addEventListener(
  "input",
  function() {

    applyFilters();

  }
);


/* =========================================
   CATEGORY
   ========================================= */

categoryBar.addEventListener(
  "click",
  function(event) {

    const button =
      event.target.closest(".category");

    if (!button) return;

    document
      .querySelectorAll(".category")
      .forEach(btn =>
        btn.classList.remove("active")
      );

    button.classList.add("active");

    selectedCategory =
      button.dataset.category;

    applyFilters();

  }
);


/* =========================================
   SORT
   ========================================= */

sortSelect.addEventListener(
  "change",
  function() {

    applyFilters();

  }
);


/* =========================================
   FILTER + SORT
   ========================================= */

function applyFilters() {

  let products =
    [...allProducts];


  /* Category */

  if (selectedCategory !== "all") {

    products =
      products.filter(
        product =>
          product.category ===
          selectedCategory
      );

  }


  /* Search */

  const search =
    searchInput.value
      .trim()
      .toLowerCase();

  if (search) {

    products =
      products.filter(product =>

        `${product.name} ${product.brand || ""} ${product.category || ""}`
          .toLowerCase()
          .includes(search)

      );

  }


  /* Sort */

  const sort =
    sortSelect.value;

  if (sort === "low") {

    products.sort(
      (a, b) =>
        Number(a.price) -
        Number(b.price)
    );

  }

  if (sort === "high") {

    products.sort(
      (a, b) =>
        Number(b.price) -
        Number(a.price)
    );

  }

  if (sort === "popular") {

    products.sort(
      (a, b) =>
        Number(b.rating || 0) -
        Number(a.rating || 0)
    );

  }

  if (sort === "new") {

    products.sort(
      (a, b) =>
        new Date(b.created_at) -
        new Date(a.created_at)
    );

  }


  displayProducts(products);

}


/* =========================================
   CART
   ========================================= */

function addToCart(product) {

  let cart =
    JSON.parse(
      localStorage.getItem("cart") ||
      "[]"
    );

  const existing =
    cart.find(
      item =>
        item.id === product.id
    );

  if (existing) {

    existing.quantity += 1;

  } else {

    cart.push({

      id: product.id,

      name: product.name,

      price: product.price,

      image: product.main_image,

      quantity: 1

    });

  }

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  updateCartCount();

}


/* =========================================
   CART COUNT
   ========================================= */

function updateCartCount() {

  const cart =
    JSON.parse(
      localStorage.getItem("cart") ||
      "[]"
    );

  const count =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  document.getElementById(
    "cartCount"
  ).textContent = count;

}


/* =========================================
   HTML SECURITY
   ========================================= */

function escapeHTML(value) {

  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


/* =========================================
   START
   ========================================= */

updateCartCount();

loadProducts();
