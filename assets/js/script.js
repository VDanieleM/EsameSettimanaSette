document.addEventListener('DOMContentLoaded', () => {

      // Verifica se la pagina corrente è index.html prima di attivare il codice
      if (window.location.pathname.includes('index.html')) {

        const productContainer = document.getElementById('productContainer');

        // Funzione per creare una card per un prodotto
        function createProductCard(product) {
          const card = document.createElement('div');
          card.classList.add('card', 'col-3', 'mx-3');
      
          const cardBody = document.createElement('div');
          cardBody.classList.add('card-body');
          cardBody.innerHTML = `
          <div class="d-flex my-3 justify-content-center">
          <button id="startEditButton" class="btn clrblu" onclick="mostraTastiModifica()">Voglio Modificare</button>
          <button id="editProductButton" class="btn clrblu mx-2">Modifica Prodotto</button>
          <button id="deleteProductButton" class="btn btn-danger">Cancella Prodotto</button>
          </div> `
      
          const productName = document.createElement('h5');
          productName.classList.add('card-title');
          productName.textContent = product.name;
      
          const productDescription = document.createElement('p');
          productDescription.classList.add('card-text');
          productDescription.textContent = product.description;
      
          const productBrand = document.createElement('p');
          productBrand.classList.add('card-text');
          productBrand.textContent = `Brand: ${product.brand}`;
      
          const productImage = document.createElement('img');
          productImage.classList.add('card-img-top');
          productImage.src = product.imageUrl;
          productImage.alt = product.name;
      
          const productPrice = document.createElement('h6');
          productPrice.classList.add('card-subtitle', 'mb-2', 'text-muted');
          productPrice.textContent = `Price: $${product.price}`;
      
          cardBody.appendChild(productName);
          cardBody.appendChild(productDescription);
          cardBody.appendChild(productBrand);
          cardBody.appendChild(productPrice);
      
          card.appendChild(productImage);
          card.appendChild(cardBody);
      
          return card;
        }

/*         const mostraTastiModifica = () => {
          const editProductButton = document.getElementById('editProductButton');
          const deleteProductButton = document.getElementById('deleteProductButton');
          
          editProductButton.style.display = 'inline-block';
          deleteProductButton.style.display = 'inline-block';
        }

        mostraTastiModifica(); */
    
      // Funzione per visualizzare i prodotti come card nell'HTML
      function displayProducts(products) {
        productContainer.innerHTML = '';
      
        products.forEach(product => {
          const card = createProductCard(product);
          productContainer.appendChild(card);
        });
    }

fetch('https://striveschool-api.herokuapp.com/api/product/', {
  method: 'GET',
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NjIzNTI2NzYxNDAwMTgzYzJlZWYiLCJpYXQiOjE3MDIzODgyNzcsImV4cCI6MTcwMzU5Nzg3N30.IvxUsVeZgNcFsT1Oqjh0X4EYgwBfKWQxqBwtrQ4znKg",
    "Content-Type": "application/json"
}
})
.then(response => response.json())
.then(data => {
  // Gestisci i dati ottenuti
  const productContainer = document.getElementById('productContainer');
  displayProducts(data, productContainer);
})
.catch(error => {
  console.error('Errore durante il recupero dei dati:', error);
});

}


      // Verifica se la pagina corrente è back.html prima di attivare il codice
  if (window.location.pathname.includes('addProduct.html')) {
    const productForm = document.querySelector('#productForm');
  
// Aggiungi un gestore di eventi al submit del form
productForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Raccogli i dati dai campi di input
  const productName = document.querySelector('#productName').value;
  const productDescription = document.querySelector('#productDescription').value;
  const productBrand = document.querySelector('#productBrand').value;
  const productImageUrl = document.querySelector('#productImageUrl').value;
  const productPrice = document.querySelector('#productPrice').value;
  const optionalParameter = document.querySelector('#optionalParameter').value;

  // Crea un oggetto con i dati raccolti
  const productData = {
    name: productName,
    description: productDescription,
    brand: productBrand,
    imageUrl: productImageUrl,
    price: parseFloat(productPrice),
    optionalParameter: optionalParameter ? optionalParameter : undefined,
  };

  // Invia i dati al server utilizzando fetch
  fetch('https://striveschool-api.herokuapp.com/api/product/', {
    method: 'POST',
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NjIzNTI2NzYxNDAwMTgzYzJlZWYiLCJpYXQiOjE3MDIzODgyNzcsImV4cCI6MTcwMzU5Nzg3N30.IvxUsVeZgNcFsT1Oqjh0X4EYgwBfKWQxqBwtrQ4znKg",
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData), // Pass the productData as the payload
  })
    .then(response => response.json())
    .then(data => {
      // Gestisci la risposta del server
      console.log(data);
      displayProducts(data);
    })
    .catch(error => {
      // Gestisci gli errori
      console.error(error);
    });
});

}})