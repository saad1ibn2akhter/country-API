async function getCountry() {
    const btn = document.getElementById('search-btn');
    btn.addEventListener('click', async function() {
        const text = document.getElementById('search').value.toLowerCase();
        console.log(text);

        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${text}?fullText=true`);
           
            const data = await response.json();
            
            const capital = data[0].capital[0];
            document.getElementById('capital').innerText = capital;

            const subContinent = data[0].region;
            document.getElementById('sub-continent').innerText = subContinent;

            const officialName = data[0].name.official;
            document.getElementById('official-name').innerText = officialName;

            const languages = data[0].languages;
            const languageNames = Object.values(languages);
            // console.log(languageNames[0]);
            if( typeof languageNames[1] !== "string"){
                document.getElementById('language').innerText = languageNames[0];
            }
            else{
                document.getElementById('language').innerText = languageNames[1];
            }

            const population = data[0].population;
            let million =0;
            let thousands =0;
            if(population / 1000000 >=1){
                million = parseInt(population/1000000);
                thousands = parseInt((population % 1000000) / 1000);
            }
            document.getElementById('population').innerText =+million + " million , " + thousands +" thousands" ;
            

            const name = data[0].name.common;
            document.getElementById('name').innerText = name;

            const flag = data[0].flags.png;
            document.getElementById('image-container').innerHTML = 
            `<img src="${flag}" class="rounded-lg"> </img>`;
            // https://en.wikipedia.org/wiki/Australia
            document.getElementById('linkTo').innerHTML =
            `<a href="https://en.wikipedia.org/wiki/${name}">Learn More </a>`;
            console.log(capital, subContinent, officialName, languages, population);
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

getCountry();
