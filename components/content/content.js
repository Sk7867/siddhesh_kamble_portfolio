/**
 * Funtion to fetch project data using fetch()
 */
function fetchprojectData() {
  fetch('/data/projectData.json')
  .then(response => {
    if(!response.ok){
      throw new Error('Network response was not ok');
    }
    return response.json()
  })
  .then(data => {
    console.log('data', data)
    loadCardTemplate(data.data)
  })
}

let isCardStylesLoadeded = false

/**
 * Funtion to load card html and css
 * @param cards : project Data object
 * 
 * Loads card styles and fetches card html using fetch()
 */
function loadCardTemplate(cards){
    // Load the card CSS only if it hasn't been loaded yet
    if (!isCardStylesLoadeded) {
      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.type = 'text/css';
      linkElement.href = '/components/card/cardStyles.css';  // Path to the cardStyles.css file
      document.head.appendChild(linkElement);
      isCardStylesLoadeded = true; // Set the flag to true after loading the styles
    }

  fetch('/components/card/card.html')
  .then(response => {
    if(!response.ok){
      throw new Error('Failed to load card template');
    }
    return response.text()
  })
  .then(cardTemplate => {
    let nestedCardsData = divideArraybyChunkSize(cards, 4);
    nestedCardsData.forEach((cardRow, i) => {
      let cardRowHTML
      cardRowHTML = document.createElement('div');
      cardRowHTML.className = 'content-row';
      cardRowHTML.id =  `content-row-${i}`
      cardRow.forEach(cardData => {
        const cardHTML = renderCard(cardTemplate, cardData);
        cardRowHTML.innerHTML += cardHTML
      });
      document.getElementById('content').appendChild(cardRowHTML);
    })
  })
}

function renderCard(template, data){
  let cardHtml = template;
  cardHtml = cardHtml.replace('{{cardName}}', data.projectName);
  cardHtml = cardHtml.replace('{{cardDescription}}', data.projectDescription);
  return cardHtml;
}

function divideArraybyChunkSize(array, chunkSize){
  const nestedArray = []

  for (let i = 0; i < array.length; i+=chunkSize) {
    // Slice the array from the current index (i) to the current index + chunkSize
    const chunk = array.slice(i, i + chunkSize);
    nestedArray.push(chunk)
  }

  return nestedArray
}

fetchprojectData()