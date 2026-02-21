// client.js
const output = document.querySelector('#output');

const displayCountries = (data) => {
    output.innerHTML = '';

    if (!data.items || data.items.length === 0) {
        output.innerHTML = '<p>No countries found.</p>';
        return;
    }

    data.items.forEach(country => {
        const card = document.createElement('div');
        card.className = 'country-card';

        card.innerHTML = `
            <h4>Name: ${country.name}</h4>
            <p>Capital: ${country.capital}</p>
            <p>Region: ${country.region}</p>
            <p>Currency: ${country.finance?.currency_name || 'N/A'}</p>
        `;
        output.appendChild(card);
    });
};

const loadItems = async () => {
    const nameSearch = document.querySelector('#searchName').value;
    const regionFilter = document.querySelector('#filterRegion').value;

    const url = `/search?name=${encodeURIComponent(nameSearch)}&region=${encodeURIComponent(regionFilter)}`;

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

const addItem = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const body = new URLSearchParams(formData);

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
            console.log("Country added successfully!");
            e.target.reset();
            loadItems(); // Refresh the list
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (err) {
        console.error("Error adding item:", err);
    }
};

document.querySelector('#loadBtn').addEventListener('click', loadItems);
document.querySelector('#addForm').addEventListener('submit', addItem);

// Initial Load
loadItems();