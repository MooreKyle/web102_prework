/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        const game = games[i];

        // create a new div element, which will become the game card
        const gameCard = document.createElement("div");

        // add the class game-card to the list
        gameCard.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        gameCard.innerHTML = `
            <h2>${game.name}</h2>
            <p>Description: ${game.description}</p>
            <p>Pledged: $${game.pledged}</p>
            <p>Goal: $${game.goal}</p>
            <p>Backers: ${game.backers}</p>
            <p>Attribute 1: ${game.attribute1}</p>
            <p>Attribute 2: ${game.attribute2}</p>
            <img src="${game.img}" alt="${game.name}" class="game-img" />
        `;
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")

        // Assuming you have the element with the id "our-games" as the parent
        const ourGamesContainer = document.getElementById("our-games");

        // append the game (card) to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// Call the addGamesToPage function with the correct variable (e.g., GAMES_JSON)
addGamesToPage(GAMES_JSON);

// Call the function we just defined, using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// calculate the total amount of money pledged across all games
const totalAmountPledged = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// set inner HTML using template literal with a dollar sign and commas for thousands
raisedCard.innerHTML = `$${totalAmountPledged.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// Calculate the total number of games
const totalGames = GAMES_JSON.length;

// Display the total number of games in the gamesCard
gamesCard.innerHTML = totalGames.toString();


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Log the number of unfunded games
    console.log("Number of unfunded games:", unfundedGames.length);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal);

    // Log the number of funded games
    console.log("Number of funded games:", fundedGames.length);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// Add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly); // Ensure this function is defined
allBtn.addEventListener('click', showAllGames); // Ensure this function is defined

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.reduce((count, game) => {
    if (game.pledged < game.goal) {
        return count + 1;
    }
    return count;
}, 0);

// create a string that explains the number of unfunded games using the ternary operator
const fundraisingInfo = `
    We have raised $${totalAmountPledged.toLocaleString()} across ${totalGames} games.
    There ${unfundedGamesCount === 1 ? 'is' : 'are'} ${unfundedGamesCount} 
    ${unfundedGamesCount === 1 ? 'unfunded game' : 'unfunded games'} in our collection.
`;

// create a new DOM element containing the template string and append it to the description container
const fundraisingInfoElement = document.createElement("p");
fundraisingInfoElement.textContent = fundraisingInfo;

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...restOfGames] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
// do the same for the runner up item

// Create a new element for the top funded game's name
const firstGameNameElement = document.createElement("h2");
firstGameNameElement.textContent = firstGame.name;

// Create a new element for the second most funded game's name
const secondGameNameElement = document.createElement("h2");
secondGameNameElement.textContent = secondGame.name;

// Append the elements to their respective containers
firstGameContainer.appendChild(firstGameNameElement);
secondGameContainer.appendChild(secondGameNameElement);