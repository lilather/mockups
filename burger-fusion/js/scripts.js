// JavaScript code to handle the reset when mouse rolls away from "burger-name"
const burgerName = document.querySelector(".burger-name");

burgerName.addEventListener("mouseout", () => {
  const burgerUp = burgerName.querySelector(".fa-arrow-circle-up");
  const burgerDown = burgerName.querySelector(".fa-arrow-circle-down");
  const burgerInfo = burgerName.querySelector(".burger-info");

  burgerDown.style.display = "none";
  burgerInfo.style.display = "none";
  burgerInfo.style.maxHeight = "0";
});

const giftCardsSection = document.querySelector(".gift-cards");
const giftCardsOverlay = document.querySelector(".gift-cards-overlay");
const h2Text = document.querySelector(".gift-cards-content h2");

giftCardsSection.addEventListener("mouseenter", () => {
  giftCardsOverlay.style.display = "block"; // Show the overlay on hover
  h2Text.textContent = "Order Now"; // Change the text to "Order Now" on hover
  h2Text.style.display = "block"; // Show the "Order Now" text on hover
});

giftCardsSection.addEventListener("mouseleave", () => {
  giftCardsOverlay.style.display = "none"; // Hide the overlay when not hovering
  h2Text.textContent = "Gift Cards"; // Change the text back to "Gift Cards" when not hovering
});

const button = document.getElementById("go-to-top");

button.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Add a scroll event listener to the window
window.addEventListener("scroll", function () {
  // Check if the user has scrolled past the initial viewport height
  if (window.pageYOffset > window.innerHeight) {
    // If scrolled past, display the button
    button.style.display = "block";
  } else {
    // If not scrolled past, hide the button
    button.style.display = "none";
  }
});

function initMap() {
  // Create a map centered on Dallas-Fort Worth (DFW) using Leaflet
  var dfw = [32.7767, -96.797]; // Dallas coordinates
  var map = L.map("map").setView(dfw, 9);

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);

  // Add custom markers for four DFW cities
  var marker1 = L.marker([32.7767, -96.797])
    .addTo(map)
    .bindPopup("<b>Dallas</b><br>Fusion Burger Location");

  var marker2 = L.marker([32.7555, -97.3308])
    .addTo(map)
    .bindPopup("<b>Fort Worth</b><br>Fusion Burger Location");

  var marker3 = L.marker([32.7555, -96.7967])
    .addTo(map)
    .bindPopup("<b>Arlington</b><br>Fusion Burger Location");

  var marker4 = L.marker([33.0469, -96.9942])
    .addTo(map)
    .bindPopup("<b>Plano</b><br>Fusion Burger Location");

  // Fit map to show all markers
  var group = new L.featureGroup([marker1, marker2, marker3, marker4]);
  map.fitBounds(group.getBounds().pad(0.1));
}

// Initialize the map when the page loads
window.addEventListener("load", initMap);

// Order Modal Functionality
document.addEventListener("DOMContentLoaded", function () {
  const orderModal = new bootstrap.Modal(document.getElementById("orderModal"));
  const burgerNameElement = document.getElementById("burgerName");
  const burgerDescriptionElement = document.getElementById("burgerDescription");
  const confirmOrderBtn = document.querySelector(".confirm-order-btn");

  // Add click event listeners to all "order now" buttons
  const orderButtons = document.querySelectorAll(
    ".burgers button, .featured-burger button, .order-text"
  );

  orderButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Check if this is the header order button
      if (this.classList.contains("order-text")) {
        // For header button, show a general order modal
        burgerNameElement.textContent = "Fusion Burger Special";
        burgerDescriptionElement.textContent = "Choose from our amazing selection of fusion burgers. Our chefs create unique flavor combinations that will delight your taste buds!";
      } else {
        // Get burger details from the closest burger container
        const burgerContainer = this.closest(".burgers, .featured-burger");
        const burgerName =
          burgerContainer.querySelector(".burger-name, h3")?.textContent ||
          "Burger";
        const burgerDescription =
          burgerContainer.querySelector(".burger-info p, p")?.textContent ||
          "Delicious burger description";

        // Update modal content
        burgerNameElement.textContent = burgerName;
        burgerDescriptionElement.textContent = burgerDescription;
      }

      // Show the modal
      orderModal.show();
    });
  });

  // Handle order confirmation
  confirmOrderBtn.addEventListener("click", function () {
    const quantity = document.getElementById("quantity").value;
    const specialInstructions = document.getElementById(
      "specialInstructions"
    ).value;
    const burgerName = burgerNameElement.textContent;

    // Create order summary
    const orderSummary = `
      Order Confirmed!
      
      Item: ${burgerName}
      Quantity: ${quantity}
      Special Instructions: ${specialInstructions || "None"}
      
      Thank you for your order! We'll have it ready soon.
    `;

    // Show success message
    alert(orderSummary);

    // Reset form
    document.getElementById("quantity").value = "1";
    document.getElementById("specialInstructions").value = "";

    // Close modal
    orderModal.hide();
  });
});
