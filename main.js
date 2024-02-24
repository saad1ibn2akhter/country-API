async function getCountry() {
    const btn = document.getElementById('search-btn');
    btn.addEventListener('click', async function() {
        const text = document.getElementById('search').value;
        console.log(text);

        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${text}?fullText=true`);
           
            const data = await response.json();
            
            const capital = data[0].capital[0];
            document.getElementById('capital').innerText = capital;

            const subContinent = data[0].subregion;
            document.getElementById('sub-continent').innerText = subContinent;

            const officialName = data[0].name.official;
            document.getElementById('official-name').innerText = officialName;

            const languages = data[0].languages.ben;
            document.getElementById('language').innerText = languages;

            const population = data[0].population;
            document.getElementById('population').innerText = population;

            const name = data[0].name.common;
            document.getElementById('name').innerText = name;

            const flag = data[0].flags.png;
            document.getElementById('image-container').innerHTML = 
            `<img src="${flag}" class="rounded-lg"> </img>`;

            console.log(capital, subContinent, officialName, languages, population);
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

getCountry();
