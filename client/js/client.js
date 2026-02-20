const output = document.querySelector('#output');

const loadItems = async () => {
    const response = await fetch('/getAll', {
        method : 'GET',
        headers : {
            Accept : 'application/json'
        },
    });

    const data = await response.json();
    output.textContent = JSON.stringify(data, null, 2);
};

document.querySelector('#loadBtn').addEventListener('click', loadItems);

document.querySelector('#addForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const body = new URLSearchParams(formData);

    await fetch('/addItem', {
        method : 'POST', 
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded',
            Accept : 'application/json',
        },
        body,
    });

    loadItems();
});





