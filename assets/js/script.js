//Non sono riuscito ad aggiungere la proprietà opzionale al prodotto e far funzionare il codice di modifica PUT

// Funzione per aggiungere il nome del prodotto nella pagina dettagli
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("dettagli.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get("productName");

    // Chiama la funzione aggiungiDettagli con il nome dell'oggetto
    aggiungiDettagli(productName);
  }
});

function aggiungiDettagli(productName) {
  const dettagliParagraph = document.querySelector("#dettagliParagraph");

  // Verifica se l'elemento esiste prima di aggiungere il testo
  if (dettagliParagraph) {
    dettagliParagraph.textContent = `Pagina dettagli del prodotto ${productName}`;
  }
}

// Funzione per creare una card per un prodotto
function createProductCard(product) {
  if (product && product.name) {
    const card = document.createElement("div");
    card.classList.add("card", "col-3", "mx-3", "my-3");
    card.dataset.productId = product._id;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.innerHTML = `
      <div class="d-flex my-3 justify-content-center">
      <a href="dettagli.html?productName=${product.name}" class="btn clrblu scopriDiPiu" onclick="aggiungiDettagli('${product.name}')">Scopri di più</a>
        <button class="btn clrblu startEditButton mx-2">Voglio Modificare</button>
        <button type="button" class="btn clrblu mx-2 editProductButton" data-bs-toggle="modal" data-bs-target="#exampleModal" style="display: none;">
        Modifica Prodotto
        </button>
        <button class="btn btn-danger deleteProductButton" style="display: none;">Cancella Prodotto</button>
      </div> `;

    const productName = document.createElement("h5");
    productName.classList.add("card-title");
    productName.textContent = product.name;

    const productDescription = document.createElement("p");
    productDescription.classList.add("card-text");
    productDescription.textContent = product.description;

    const productBrand = document.createElement("p");
    productBrand.classList.add("card-text");
    productBrand.textContent = `Brand: ${product.brand}`;

    const productImage = document.createElement("img");
    productImage.classList.add("card-img-top");
    productImage.src = product.imageUrl;
    productImage.alt = product.name;

    const productPrice = document.createElement("h6");
    productPrice.classList.add("card-subtitle", "mb-2", "text-muted");
    productPrice.textContent = `Price: $${product.price}`;

    const optionalParams = document.createElement("p");
    optionalParams.classList.add("card-text");
    optionalParams.textContent = `Opzionali: ${product.optionalParams || ""}`;

    cardBody.appendChild(productName);
    cardBody.appendChild(productDescription);
    cardBody.appendChild(productBrand);
    cardBody.appendChild(productPrice);
    cardBody.appendChild(optionalParams);

    card.appendChild(productImage);
    card.appendChild(cardBody);

    return card;
  }
}

function mostraTastiModifica(button) {
  console.log("mostraTastiModifica called");
  const card = button.closest(".card");
  const editProductButton = card.querySelector(".editProductButton");
  const deleteProductButton = card.querySelector(".deleteProductButton");
  const startEdit = card.querySelector(".startEditButton");

  if (editProductButton && deleteProductButton) {
    editProductButton.style.display = "inline-block";
    deleteProductButton.style.display = "inline-block";
    startEdit.style.display = "none";
  }
}

// tasto reset form
function resetForm() {
  document.querySelector("#productName").value = "";
  document.querySelector("#productDescription").value = "";
  document.querySelector("#productBrand").value = "";
  document.querySelector("#productImageUrl").value = "";
  document.querySelector("#productPrice").value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  // Verifica se la pagina corrente è index.html prima di attivare il codice
  if (window.location.pathname.includes("index.html")) {
    const productContainer = document.querySelector("#productContainer");

    // Aggiungi un gestore di eventi per il click sui bottoni "Cancella Prodotto"
    productContainer.addEventListener("click", (event) => {
      const targetButton = event.target;

      if (targetButton.classList.contains("deleteProductButton")) {
        eliminaProdotto(targetButton);
      }
    });

    productContainer.addEventListener("click", (event) => {
      const targetButton = event.target;

      if (targetButton.classList.contains("startEditButton")) {
        mostraTastiModifica(targetButton);
      }
    });

    // Funzione per visualizzare i prodotti come card nell'HTML
    function displayProducts(products) {
      const productContainer = document.querySelector("#productContainer");

      products.forEach((product) => {
        const card = createProductCard(product);
        productContainer.appendChild(card);
      });
    }

    fetch("https://striveschool-api.herokuapp.com/api/product/", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NjIzNTI2NzYxNDAwMTgzYzJlZWYiLCJpYXQiOjE3MDIzODgyNzcsImV4cCI6MTcwMzU5Nzg3N30.IvxUsVeZgNcFsT1Oqjh0X4EYgwBfKWQxqBwtrQ4znKg",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Gestisci i dati ottenuti
        const productContainer = document.querySelector("#productContainer");
        displayProducts(data);
      })
      .catch((error) => {
        console.error("Errore durante il recupero dei dati:", error);
      });
  }

  function eliminaProdotto(button) {
    const card = button.closest(".card");
    const productName = card.querySelector(".card-title").textContent;

    fetch("https://striveschool-api.herokuapp.com/api/product/", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NjIzNTI2NzYxNDAwMTgzYzJlZWYiLCJpYXQiOjE3MDIzODgyNzcsImV4cCI6MTcwMzU5Nzg3N30.IvxUsVeZgNcFsT1Oqjh0X4EYgwBfKWQxqBwtrQ4znKg",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const matchingProduct = data.find(
          (product) => product.name === productName
        );
        if (matchingProduct) {
          const productId = matchingProduct._id;
          inviaRichiestaEliminazione(productId, card);
        } else {
          console.error("Prodotto non trovato nella risposta dell'API");
        }
      })
      .catch((error) => {
        console.error("Errore durante il recupero dei dati:", error);
      });
  }

  function inviaRichiestaEliminazione(productId, card) {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NjIzNTI2NzYxNDAwMTgzYzJlZWYiLCJpYXQiOjE3MDIzODgyNzcsImV4cCI6MTcwMzU5Nzg3N30.IvxUsVeZgNcFsT1Oqjh0X4EYgwBfKWQxqBwtrQ4znKg",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante l'eliminazione del prodotto");
        }
        return response.json();
      })
      .then(() => {
        // Rimuovi la card dall'HTML dopo l'eliminazione con successo
        card.remove();
        console.log("Prodotto eliminato con successo");
      })
      .catch((error) => {
        console.error("Errore durante l'eliminazione del prodotto:", error);
      });
  }

  //MODIFICA OGGETTO CARD

  // Gestore di eventi per il clic sul pulsante di modifica
  productContainer.addEventListener("click", (event) => {
    const targetButton = event.target;

    if (targetButton.classList.contains("editProductButton")) {
      avviaModificaProdotto(targetButton);
    }
  });

  // Funzione per avviare la modifica del prodotto
  function avviaModificaProdotto(button) {
    const card = button.closest(".card");
    const productId = card.dataset.productId;

    // Popola il modulo di modifica con i dati del prodotto al momento dell'apertura
    fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NjIzNTI2NzYxNDAwMTgzYzJlZWYiLCJpYXQiOjE3MDIzODgyNzcsImV4cCI6MTcwMzU5Nzg3N30.IvxUsVeZgNcFsT1Oqjh0X4EYgwBfKWQxqBwtrQ4znKg",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Popola il modulo di modifica con i dati ottenuti
        popolaModuloModifica(data);
      })
      .catch((error) => {
        console.error(
          "Errore durante il recupero dei dati del prodotto:",
          error
        );
      });

    // Mostra il modale
    const modal = new bootstrap.Modal(document.querySelector("#exampleModal"));
    modal.show();
  }

  // Funzione per popolare il modulo di modifica nel modale con i dati del prodotto
  function popolaModuloModifica(product) {
    const productNameInput = document.querySelector("#productNameEdit");
    const productDescriptionInput = document.querySelector(
      "#productDescriptionEdit"
    );
    const productBrandInput = document.querySelector("#productBrandEdit");
    const productImageUrlInput = document.querySelector("#productImageUrlEdit");
    const productPriceInput = document.querySelector("#productPriceEdit");
    const optionalParamsInput = document.querySelector("#optionalParamsEdit");

    productNameInput.value = product.name;
    productDescriptionInput.value = product.description;
    productBrandInput.value = product.brand;
    productImageUrlInput.value = product.imageUrl;
    productPriceInput.value = product.price;
    optionalParamsInput.value = product.optionalParams;

    // Mostra il pulsante di modifica
    const editProductButton = document.querySelector(".editProductButton");
    editProductButton.style.display = "inline-block";
  }

  // Gestore di eventi per il submit del modulo di modifica nel modale
  const editProductForm = document.querySelector("#editProductForm");
  editProductForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Chiamare la funzione per inviare la richiesta di modifica
    inviaRichiestaModifica(productId);
  });

  // Funzione di invio richiesta di modifica
  function inviaRichiestaModifica(productId) {
    const productNameInput = document.querySelector("#productNameEdit");
    const productDescriptionInput = document.querySelector(
      "#productDescriptionEdit"
    );
    const productBrandInput = document.querySelector("#productBrandEdit");
    const productImageUrlInput = document.querySelector("#productImageUrlEdit");
    const productPriceInput = document.querySelector("#productPriceEdit");
    const optionalParamsInput = document.querySelector("#optionalParamsEdit");

    const productData = {
      name: productNameInput.value,
      description: productDescriptionInput.value,
      brand: productBrandInput.value,
      imageUrl: productImageUrlInput.value,
      price: parseFloat(productPriceInput.value),
      optionalParams: optionalParamsInput.value,
    };

    // Inviare la richiesta di modifica
    fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
      method: "PUT", // Usa il metodo PUT per le richieste di modifica
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NjIzNTI2NzYxNDAwMTgzYzJlZWYiLCJpYXQiOjE3MDIzODgyNzcsImV4cCI6MTcwMzU5Nzg3N30.IvxUsVeZgNcFsT1Oqjh0X4EYgwBfKWQxqBwtrQ4znKg",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Gestisci la risposta del server
        console.log("Prodotto modificato con successo", data);

        // Aggiorna la pagina index dopo la modifica
        window.location.reload();
      })
      .catch((error) => {
        console.error("Errore durante la modifica del prodotto:", error);
      });
  }

  // Chiamare la funzione per inviare la richiesta di modifica
  inviaRichiestaModifica(productName);
});

//PAGINA CREATOR PRODOTTI
document.addEventListener("DOMContentLoaded", function () {
  // Verifica se la pagina corrente è addProduct.html prima di attivare il codice
  if (window.location.pathname.includes("addProduct.html")) {
    const productForm = document.querySelector("#productForm");

    // Aggiungi un gestore di eventi al submit del form
    productForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Raccogli i dati dai campi di input
      const productName = document.querySelector("#productName").value;
      const productDescription = document.querySelector(
        "#productDescription"
      ).value;
      const productBrand = document.querySelector("#productBrand").value;
      const productImageUrl = document.querySelector("#productImageUrl").value;
      const productPrice = document.querySelector("#productPrice").value;
      const optionalParams = document.querySelector("#optionalParams").value;

      // Crea un oggetto con i dati raccolti
      const productData = {
        name: productName,
        description: productDescription,
        brand: productBrand,
        imageUrl: productImageUrl,
        price: parseFloat(productPrice),
        optionalParams: optionalParams ? optionalParams : undefined,
      };

      console.log(productData);
      // Invia i dati al server utilizzando fetch
      fetch("https://striveschool-api.herokuapp.com/api/product/", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NjIzNTI2NzYxNDAwMTgzYzJlZWYiLCJpYXQiOjE3MDIzODgyNzcsImV4cCI6MTcwMzU5Nzg3N30.IvxUsVeZgNcFsT1Oqjh0X4EYgwBfKWQxqBwtrQ4znKg",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          displayProducts(data);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
});
