// Funzione per creare una card per un prodotto
    function createProductCard(product) {
      if (product && product.name) {
      const card = document.createElement("div");
      card.classList.add("card", "col-3", "mx-3", "my-3");

      const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.innerHTML = `
      <div class="d-flex my-3 justify-content-center">
        <button type="button" class="btn clrblu scopriDiPiu mx-2" data-toggle="modal" data-target="#exampleModalOne">Scopri di più</button>
        <button class="btn clrblu startEditButton">Voglio Modificare</button>
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
    }}

    function mostraTastiModifica(button) {
      console.log("mostraTastiModifica called");
      const card = button.closest(".card");
      const editProductButton = card.querySelector(".editProductButton");
      const deleteProductButton = card.querySelector(".deleteProductButton"); 
      const startEdit = card.querySelector(".startEditButton"); 
    
      if (editProductButton && deleteProductButton) {
        editProductButton.style.display = 'inline-block';
        deleteProductButton.style.display = 'inline-block';
        startEdit.style.display = 'none';
      }
    }

        // tasto reset form
        function resetForm() {
          document.getElementById("productName").value = "";
          document.getElementById("productDescription").value = "";
          document.getElementById("productBrand").value = "";
          document.getElementById("productImageUrl").value = "";
          document.getElementById("productPrice").value = "";
        }

document.addEventListener("DOMContentLoaded", () => {
  // Verifica se la pagina corrente è index.html prima di attivare il codice
  if (window.location.pathname.includes("index.html")) {
    const productContainer = document.getElementById("productContainer");

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
      const productContainer = document.getElementById("productContainer");
    
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
        const productContainer = document.getElementById("productContainer");
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
        const matchingProduct = data.find((product) => product.name === productName);
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

  // Verifica se la pagina corrente è back.html prima di attivare il codice
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
        body: JSON.stringify(productData), // Pass the productData as the payload
      })
        .then((response) => response.json())
        .then((data) => {
          // Gestisci la risposta del server
          console.log(data);
          displayProducts(data);
        })
        .catch((error) => {
          // Gestisci gli errori
          console.error(error);
        });
    });
  }
});