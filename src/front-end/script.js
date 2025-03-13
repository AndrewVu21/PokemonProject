// Function to fetch the Pokémon card data based on the card ID
function fetchCardData() {
  const cardId = document.getElementById('cardId').value.trim();
  const cardDataContainer = document.getElementById('cardData');
  cardDataContainer.innerHTML = ""; // Clear previous data

  if (!cardId) {
      cardDataContainer.innerHTML = "Please enter a card ID.";
      return;
  }

  // Fetch data from the Pokémon API
  fetch(`http://localhost:8080/GetCard/${cardId}`)
      .then(response => response.json())
      .then(data => {
          // Check if data is returned and contains a valid 'data' object
          if (data && data.data) {
              const card = data.data;  // Directly use the card data

              // Display card data
              cardDataContainer.innerHTML = `
                  <h2>${card.name}</h2>
                  <p><strong>ID:</strong> ${card.id}</p>
                  <p><strong>Supertype:</strong> ${card.supertype}</p>
                  <p><strong>Set:</strong> ${card.set.name}</p>
                  <p><strong>Rarity:</strong> ${card.rarity}</p>
                  <p><strong>Artist:</strong> ${card.artist}</p>
                  <p><strong>HP:</strong> ${card.hp}</p>
                  <p><strong>Types:</strong> ${card.types ? card.types.join(', ') : 'N/A'}</p>
                  <p><strong>Evolves To:</strong> ${card.evolvesTo ? card.evolvesTo.join(', ') : 'N/A'}</p>
                  <h3>Attacks:</h3>
                  <ul>
                      ${card.attacks.map(attack => `
                          <li><strong>${attack.name}</strong> (Cost: ${attack.cost.join(', ')}, Damage: ${attack.damage})</li>
                      `).join('')}
                  </ul>
                  <h3>Weaknesses:</h3>
                  <ul>
                      ${card.weaknesses.map(weakness => `
                          <li><strong>${weakness.type}:</strong> ${weakness.value}</li>
                      `).join('')}
                  </ul>
                  <h3>Card Images:</h3>
                  <img src="${card.images.small}" alt="${card.name}" />
                  <img src="${card.images.large}" alt="${card.name} Large" />
              `;
          } else {
              cardDataContainer.innerHTML = "No card found with this ID.";
          }
      })
      .catch(error => {
          cardDataContainer.innerHTML = "Error fetching card data.";
          console.error("Error fetching data: ", error);
      });
}
