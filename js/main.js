"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: DITT NAMN
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");

// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */
renderHistory();
form.addEventListener("submit", getInfo); // När formuläret skickas, anropa getInfo

function getInfo(event) {
  event.preventDefault();

  // Hämta värden från formuläret och trimma bort eventuella blanksteg i början och slutet

  const name = fullnameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!validateForm(name, email, phone)) {
    displayErrors();
  } else {
    saveHistory();
  }
  createStudentCard(name, email, phone);
}

function validateForm(name, email, phone) {
  errors = []; // Rensa tidigare felmeddelanden

  let validate = true; // Variabel som används för att avgöra om valideringen lyckas
  /* Kontrollera formulärets obligatoriska fält och lägg till 
     eventuella felmeddelanden i errors-arrayen*/

  if (name === "") {
    errors.push("Du måste ange ett namn.");
    validate = false; // Om namnet är tomt, sätt validate till false
  }
  if (email === "") {
    errors.push("Du måste ange en e-postadress.");
    validate = false; // Sätt validate till false
  }
  if (phone === "") {
    errors.push("Du måste ange ett telefonnummer.");
    validate = false; // Sätt validate till false
  }
  return validate; // Returnera resultatet (true eller false) av valideringen

  displayErrors(); // Anropa displayErrors för att visa eventuella felmeddelanden
}

/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
  errorList.innerHTML = ""; // Rensa tidigare felmeddelanden

  // Skriv ut aktuella felmeddelanden till DOM
  if (errors.length > 0) {
    for (let i = 0; i < errors.length; i++) {
      // Loopa igenom errors-arrayen

      const liElement = document.createElement("li"); // Skapa ett li-element för varje felmeddelande

      liElement.textContent = errors[i]; // Sätt textinnehållet till felmeddelandet

      errorList.appendChild(liElement); // Lägg till li-elementet i errorList
    }
  }
}

/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard(name, email, phone) {
  // Hämta information från formuläret

  const font = fontSelect.value; // Hämta valt typsnitt

  // Uppdatera studentkortet

  previewFullname.textContent = name; // ändra förhandsvisning av namn
  previewEmail.textContent = email; // Ändra förhandsvisning av e-post
  previewPhone.textContent = phone; // Ändra förhandsvisning av telefonnummer

  previewFullname.style.fontFamily = font; // Ändra typsnitt för namn
  previewEmail.style.fontFamily = font; // Ändra typsnitt för e-post
  previewPhone.style.fontFamily = font; // Ändra typsnitt för telefonnummer

  // Skapa ett objekt som representerar studentkortet

  const studentCard = {
    name: name,
    email: email,
    phone: phone,
    font: font,
  };
  // Lägg till studentkortet i historiken
  history.push(studentCard);

  // Spara och uppdatera historiken
  saveHistory();
}

/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
  // Spara history i localStorage
  const studentJSON = JSON.stringify(history);
  localStorage.setItem("studentHistory", studentJSON);
  loadHistory();
}

/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
  // Hämta eventuell sparad historik
  const savedHistory = localStorage.getItem("studentHistory");

  // Ändra JSON-strängen till en array
  const history = JSON.parse(savedHistory);

  // Om det inte finns någon sparad historik, skapa en tom array
  if (history === null) {
    history = [];
  }
  // Om historiken är tom, returnera och visa inget mer
  if (history.length === 0) {
    return;
  }
  renderHistory();
}

/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik
  historySection.innerHTML = "";

  // Loopa igenom historiken och skapa ett p-element för varje studentkort
  for (let i = 0; i < history.length; i++) {
    const pEl = document.createElement("p");

    // Skriv ut studentkortets information i p-elementet
    pEl.innerHTML = `<strong>Namn:</strong> ${history[i].name} <br> 
                    <strong>E-post:</strong> ${history[i].email} <br> 
                     <strong>Telefon:</strong> ${history[i].phone} <br>    
                    <strong>Typsnitt:</strong> ${history[i].font}`;

    historySection.appendChild(pEl); // Lägg till p-elementet i historySection
  }


  
}

/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
  // Återställ formulär och studentkort
  // Rensa eventuella felmeddelanden
}

/**
 * Raderar hela historiken.
 */
function deleteHistory() {
  // Radera sparad historik
  // Uppdatera history och visningen på sidan
}

// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
// - skapa studentkort om valideringen lyckas

// När användaren klickar på "Rensa"

// När användaren klickar på "Radera historik"

// När sidan laddas:
// - läs in och visa eventuell tidigare historik
