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

            const area = data[0].area;
            document.getElementById('area').innerText = area;

            const time  = data[0].timezones;
            const times = Object.values(time);
            document.getElementById('time').innerText = times[0];

            const currenncy = data[0].currencies;
            const c = Object.values(currenncy) ;
            const cur = Object.values(c);

            document.getElementById('currency').innerText = cur[0] +'  ' + cur[1];

            const map = data[0].maps.googleMaps;
            document.getElementById('map').innerHTML = map;

            // https://en.wikipedia.org/wiki/Australia
            document.getElementById('linkTo').innerHTML =
            `<a href="https://en.wikipedia.org/wiki/${name}">Learn More </a>`;
            console.log(capital, subContinent, officialName, languages, population,area,time,map);

            const response2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${capital}&appid=cdc1b9191464e59cb545d46186dd4cb8`);
            const info = await response2.json();

            const avgTemp = info.main.temp;
            document.getElementById('avgtemp').innerText = avgTemp +'  C*' ;
            console.log(info);


            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

getCountry();
