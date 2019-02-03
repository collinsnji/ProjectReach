document.addEventListener('load', () => {
    const APIKey = `1426fc2d2e6b242fc2911ccbea6fce4b`;
    const baseUrl = `http://data.orghunter.com/v1/charitysearch?user_key=${APIKey}&searchTerm=treasure%20coast%20humane`
    let searchInput = document.getElementById('search-input');
    document.getElementById('charity-near-me').addEventListener('click', () => {
        if (searchInput.value) {
            let url = encodeURIComponent(`${baseUrl}&searchTerm=${searchInput.value}`);
            let resultsContainer = document.getElementById('charity-near-me');
            fetch(url, {
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            }).then(data => { data.json(); }).then(results => {
                for (let i = 0; i < 5; i++) {
                    let resultString =
                        `
                        <div class="charity-name">${results.data.charityName}</div>
                        <div class="charity-location">${results.data.city}, ${results.data.state}</div>
                        <div class="charity-url">${results.data.url}</div>
                        `;
                    resultsContainer.appendChild(resultString);
                }
            })
        }
    })
})