/*

const myMenu = document.getElementById('nav-menu');

window.addEventListener("load", (e) => {
    // loadData();
});

myMenu.addEventListener("click", (e)=>{
    const listItem = e.target.closest("li");
    if (listItem) {
        return;
    }
// Get Data Attribute
    const searchQuery = listItem.getAttribute("data-category");
    loadQuery(searchQuery);
});

async function loadQuery(searchQuery = "general", page = 1, pageSize = 20) {
    const apikey = ''
    const url = 'https://'

    try {
        const response =  await fetch(url);
        const data = response.json();
        const articles = data.articles;
        articles.forEach((item) => {
            const {title, description, url, urlToImage} = item;
        });

    } catch (error) {
        alert("Something Went Wrong")
    }
}

*/

// Select the navigation menu and card wrapper elements
const myMenu = document.querySelector('.nav-menu');
const cardWrapper = document.querySelector('.card-wrapper');

// Dummy API Key and URL (Replace these with your actual API key and endpoint)
const API_KEY = '70adcac7c869443cb18b99b1093db835'; // Dummy API Key
const BASE_URL = 'https://newsapi.org/v2/top-headlines'; // Dummy API URL

// Event listener for when the window loads
window.addEventListener("load", () => {
    loadQuery(); // Load general news by default
});

// Event listener for clicks on the navigation menu
myMenu.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default link behavior

    // Find the closest <li> element to the clicked target
    const listItem = e.target.closest("li");

    // If a list item was clicked
    if (listItem) {
        // Get the category from the data-category attribute
        const searchQuery = listItem.getAttribute("data-category");

        // Load news articles based on the selected category
        loadQuery(searchQuery);
    }
});

/**
 * Fetches news articles based on the category and updates the DOM.
 * @param {string} searchQuery - The category to search for.
 * @param {number} page - The page number for pagination.
 * @param {number} pageSize - The number of articles per page.
 */
async function loadQuery(searchQuery = "general", page = 1, pageSize = 20) {
    // Construct the full API URL with query parameters
    const url = `${BASE_URL}?category=${searchQuery}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}&country=us`;

    try {
        // Fetch data from the News API
        const response = await fetch(url);

        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            if (response.status === 429) {
                throw new Error("You have reached the API request limit. Please try again later.");
            } else {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
        }

        // Parse the JSON data
        const data = await response.json();

        // Extract articles from the data
        const articles = data.articles;

        // Clear any existing articles in the card wrapper
        cardWrapper.innerHTML = '';

        // Check if there are articles
        if (articles.length === 0) {
            cardWrapper.innerHTML = '<p>No articles found for this category.</p>';
            return;
        }

        // Iterate over each article and create a card
        articles.forEach((item) => {
            const { title, description, url, urlToImage } = item;

            // Create the card element
            const card = document.createElement('div');
            card.classList.add('card');

            // Create the image element
            const img = document.createElement('img');
            img.src = urlToImage || 'https://via.placeholder.com/300x180?text=No+Image'; // Fallback image
            img.alt = "Article Thumbnail";
            img.classList.add('card__image');

            // Create the details container
            const details = document.createElement('div');
            details.classList.add('card__details');

            // Create the title element
            const titleElement = document.createElement('h3');
            titleElement.classList.add('card__details__title');
            titleElement.textContent = title || 'No Title Available';

            // Create the description element
            const descElement = document.createElement('p');
            descElement.classList.add('card__details__description');
            descElement.textContent = description || 'No description available.';

            // Create the "Read More" button
            const readMoreBtn = document.createElement('button');
            readMoreBtn.textContent = 'Read More';
            readMoreBtn.classList.add('read-more-btn');

            // Add event listener to the "Read More" button
            readMoreBtn.addEventListener('click', () => {
                window.open(url, '_blank'); // Open the article in a new tab
            });

            // Append elements to the details container
            details.appendChild(titleElement);
            details.appendChild(descElement);
            details.appendChild(readMoreBtn);

            // Append image and details to the card
            card.appendChild(img);
            card.appendChild(details);

            // Append the card to the card wrapper
            cardWrapper.appendChild(card);
        });

    } catch (error) {
        console.error("Error fetching news articles:", error);
        alert(error.message || "Something went wrong while fetching the news. Please try again later.");
    }
}
/*""*/