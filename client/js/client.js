// client.js
const output = document.querySelector('#output');

// function to display countries on the screen
const displayCountries = (data) => {
    console.log("displayCountries received data:", data);
    output.innerHTML = '';

    if (!data.items || data.items.length === 0) {
        console.log("No items found in data! Showing 'No countries found.'");
        output.innerHTML = '<p>No countries found.</p>';
        return;
    }

    console.log(`Looping through ${data.items.length} countries to build cards...`);
    data.items.forEach(country => {
        const card = document.createElement('div');
        card.className = 'country-card';

        card.innerHTML = `
            <h4>Name: ${country.name || 'Unknown'}</h4>
            <p>Capital: ${country.capital || 'Unknown'}</p>
            <p>Region: ${country.region || 'Unknown'}</p>
            <p>Currency: ${country.finance?.currency_name || 'N/A'}</p>
            <p>Currency Symbol: ${country.finance?.currency_symbol || 'N/A'}</p>
        `;
        output.appendChild(card);
    });
    console.log("Finished adding to the screen!");
};

// function to load items based on search and filter criteria
const loadItems = async () => {
    console.log("1. Search button clicked or initial load triggered!");
    const nameSearch = document.querySelector('#searchName').value || '';
    const regionFilter = document.querySelector('#filterRegion').value || '';

    const url = `/search?name=${encodeURIComponent(nameSearch)}&region=${encodeURIComponent(regionFilter)}`;
    console.log("Fetching URL:", url);

    // try-catch to handle potential fetch errors
    try { 
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            },
        });

        const data = await response.json();
        displayCountries(data);
    } catch (err) {
        console.error("Error loading items:", err);
    }
};

// function to handle adding a new country
const addItem = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = new URLSearchParams(formData).toString();

    // try-catch to handle potential fetch errors and response handling
    try {
        const response = await fetch('/addItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json',
            },
            body,
        });

        if (response.status === 201) {
            // Let the user know their country was added
            alert("Country added successfully!");
            e.target.reset();
            loadItems(); 
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (err) {
        console.error("Error adding item:", err);
    }
};

// function to handle editing an existing country
const editItem = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = new URLSearchParams(formData).toString();

    try {
        const response = await fetch('/editItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json',
            },
            body,
        });

        //204 for change
        if (response.status === 204) {
            console.log("Country edited successfully!");
            e.target.reset();
            loadItems(); 
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (err) {
        console.error("Error editing item:", err);
    }
};

// initialization function to set up event listeners
const init = () => {
    console.log("Page loaded, setting up buttons");
    const loadBtn = document.querySelector('#loadBtn');
    const addForm = document.querySelector('#addForm');
    const editForm = document.querySelector('#editForm');

    // Adding to auto update when typing
    document.querySelector('#searchName').addEventListener('input', loadItems);
    document.querySelector('#filterRegion').addEventListener('change', loadItems);


    if (loadBtn) loadBtn.addEventListener('click', loadItems);
    if (addForm) addForm.addEventListener('submit', addItem);
    if (editForm) addForm.addEventListener('submit', editItem);


    // Initial Load
    if (document.querySelector('#output')) {
        loadItems();
    }
};

// init to run when page loads
window.onload = init;