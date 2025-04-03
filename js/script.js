const apiUrl = 'https://hp-api.onrender.com/api/characters';

// Função para buscar todos os personagens
async function getAllCharacters() {
  try {
    const response = await fetch(apiUrl);
    const characters = await response.json();
    displayCharacters(characters);
    updateCount(characters.length); // Exibe a quantidade total de personagens encontrados
  } catch (error) {
    console.error('Erro ao buscar personagens:', error);
  }
}

// Função para exibir os personagens na página
function displayCharacters(characters) {
  const charactersList = document.getElementById('charactersList');
  charactersList.innerHTML = ''; // Limpa a lista antes de adicionar novos personagens

  // Exibe o número total de personagens encontrados
  updateCount(characters.length);

  characters.forEach((character, index) => {
    const characterCard = document.createElement('div');
    characterCard.classList.add('character-card');

    // Adiciona a classe da casa ao card
    switch (character.house) {
      case 'Gryffindor':
        characterCard.classList.add('gryffindor');
        break;
      case 'Hufflepuff':
        characterCard.classList.add('hufflepuff');
        break;
      case 'Ravenclaw':
        characterCard.classList.add('ravenclaw');
        break;
      case 'Slytherin':
        characterCard.classList.add('slytherin');
        break;
      default:
        break;
    }

    const characterImage = document.createElement('img');
    characterImage.src = character.image || 'https://via.placeholder.com/150'; // Imagem placeholder caso não tenha

    const characterName = document.createElement('h3');
    characterName.innerText = `${index + 1}. ${character.name}`; // Numeração dos personagens

    const characterHouse = document.createElement('p');
    characterHouse.innerText = `Casa: ${character.house || 'Desconhecida'}`;

    characterCard.appendChild(characterImage);
    characterCard.appendChild(characterName);
    characterCard.appendChild(characterHouse);

    charactersList.appendChild(characterCard);
  });
}

// Função para atualizar a contagem de personagens encontrados
function updateCount(count) {
  const countDisplay = document.getElementById('countDisplay');
  countDisplay.innerText = `Total de personagens encontrados: ${count}`;
}

// Função de pesquisa de personagens
async function searchCharacter() {
  const searchQuery = document.getElementById('searchInput').value.toLowerCase();

  try {
    const response = await fetch(apiUrl);
    const characters = await response.json();

    // Filtra os personagens com base no nome
    const filteredCharacters = characters.filter(character => 
      character.name.toLowerCase().includes(searchQuery)
    );

    displayCharacters(filteredCharacters); // Exibe os personagens filtrados
    updateCount(filteredCharacters.length); // Exibe a quantidade de personagens encontrados na busca
  } catch (error) {
    console.error('Erro ao buscar personagem:', error);
  }
}

// Carrega todos os personagens quando a página é carregada
window.onload = getAllCharacters;
