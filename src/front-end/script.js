// Function to fetch the Pokémon card data based on the card ID
function fetchCardData() {
    const cardId = document.getElementById('cardId').value.trim();
    const cardDataContainer = document.getElementById('cardData');
    cardDataContainer.innerHTML = ""; // Clear previous data

    if (!cardId) {
        cardDataContainer.innerHTML = "<p>Please enter a card ID.</p>";
        return;
    }

    // Fetch data from the Pokémon API
    fetch(`https://api.pokemontcg.io/v2/cards/${cardId}`)
        .then(response => response.json())
        .then(data => {
            // check if data is returned and contains a valid 'data' object
            if (data && data.data) {
                const card = data.data;

                // Display card data
                cardDataContainer.innerHTML = `
                    <div class="card-data">
                        <div class="card-info">
                            <h2>${card.name}</h2>
                            <p><strong>ID:</strong> ${card.id}</p>
                            <p><strong>Supertype:</strong> ${card.supertype}</p>
                            <p><strong>Set:</strong> ${card.set.name}</p>
                            <p><strong>Rarity:</strong> ${card.rarity || 'N/A'}</p>
                            <p><strong>Artist:</strong> ${card.artist}</p>
                            <p><strong>HP:</strong> ${card.hp || 'N/A'}</p>
                            <p><strong>Types:</strong> ${card.types ? card.types.join(', ') : 'N/A'}</p>
                            <p><strong>Evolves To:</strong> ${card.evolvesTo ? card.evolvesTo.join(', ') : 'N/A'}</p>
                            <h3>Weaknesses:</h3>
                            <ul>
                                ${card.weaknesses ? card.weaknesses.map(weakness => `
                                    <li><strong>${weakness.type}:</strong> ${weakness.value}</li>
                                `).join('') : '<li>N/A</li>'}
                            </ul>
  
                            <h3>Attacks:</h3>
                            <ul>
                                ${card.attacks ? card.attacks.map(attack => `
                                    <li><strong>${attack.name}</strong> (Cost: ${attack.cost.join(', ')}, Damage: ${attack.damage || 'N/A'})</li>
                                `).join('') : '<li>N/A</li>'}
                            </ul>
                        </div>
                        
                        <div class="card-images">
                            <img src="${card.images.large}" alt="${card.name} Card">
                        </div>
                    </div>
                `;
            } else {
                cardDataContainer.innerHTML = "<p>No card found with this ID.</p>";
            }
        })
        .catch(error => {
            cardDataContainer.innerHTML = "<p>Error fetching card data.</p>";
            console.error("Error fetching data: ", error);
        });
  }
  function fetchAllCards() {
    const pokemonName = document.getElementById('pokemonName').value.trim();
    const cardDataContainer = document.getElementById('cardData');
    cardDataContainer.innerHTML = ""; // Clear previous results

    if (!pokemonName) {
        cardDataContainer.innerHTML = "<p>Please enter a Pokémon name.</p>";
        return;
    }

    // Fetch all cards that match the Pokémon name
    fetch(`https://api.pokemontcg.io/v2/cards?q=name:${pokemonName}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.data.length > 0) {
                let cardsHtml = `
                    <div class="card-container">
                        <h2>All Cards for ${pokemonName}</h2>
                        <div class="all-cards">`;

                data.data.forEach(card => {
                    cardsHtml += `
                        <div class="card-item">
                            <img src="${card.images.small}" alt="${card.name}">
                        </div>`;
                });

                cardsHtml += `</div></div>`;
                cardDataContainer.innerHTML = cardsHtml;
            } else {
                cardDataContainer.innerHTML = "<p>No cards found for this Pokémon.</p>";
            }
        })
        .catch(error => {
            cardDataContainer.innerHTML = "<p>Error fetching data.</p>";
            console.error("Error fetching data:", error);
        });
    }