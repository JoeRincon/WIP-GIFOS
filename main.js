//----------------MODO NOCTURNO----------------------//
const btnNoc = document.querySelector('#modnoc');

btnNoc.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    //btnNoc.classList.toggle('active');   
});

//-------BUSCADOR GIFS GALERIA HOME X 12-------------//

const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const resultElemnt = document.getElementById('resulta')
const apiKey = 'bUqhRnbPM1ux04CGHWalVAuwC1Zfft8Q'

searchForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const q = searchInput.value
    search(q)
})

function search(q) {     
    apiKey
    const path = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=12&q=${q}`

    fetch(path)
    .then(function (res) {return res.json()})
    .then(function (json) {
        
        let resultsHTML = ''

        json.data.forEach(function (obj) {
            console.log(obj.images)    
            const url = obj.images.downsized_large.url
            const title = obj.title
            resultsHTML += `<img 
            class="item-search"
            src="${url}" 
            alt="${title}">`
        })
     
        resultElemnt.innerHTML = resultsHTML
    }).catch(function (err) {
        console.log(err.message)
    })
}

//-----set  Btn VerMas
let tituloBusqueda = document.getElementById("trends-ppal");
let contOffset =0;
let arrayResult = [];


btnVermas.addEventListener("click", () => {

    busqueda(`${tituloBusqueda.textContent}&offset=${contOffset}`);
    cont+=12;
})

//------------TRAER GIFS AL CAROUSEL---------------//

const pathCarousel = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=12 `

fetch(pathCarousel).then(function(res) {
    return res.json ()
}).then(function(json){
    console.log(json)
    const resultCarousel = document.getElementById('carouselGifs')
    let resultCarouselHTML = ''

    json.data.forEach(function (obj) {
        console.log(obj)

        const url = obj.images.downsized_large.url
        resultCarouselHTML += `<img class="item" src="${url}">`
    })

    resultCarousel.innerHTML = resultCarouselHTML   
}).catch(function(err) {
    console.log(err.message)
})

// ----------BOTONES DEL CAROUSEL TRENDING----------//

let nextBtn = document.getElementById('nextBtn');
nextBtn.onclick = function() {
    let carouselGifs = document.getElementById('trendGifBox');
    sideScroll(carouselGifs,'rigth',18,370,10)
};

let prevBtn = document.getElementById('prevBtn');
prevBtn.onclick = function() {
    let carouselGifs = document.getElementById('trendGifBox');
    sideScroll(carouselGifs,'left',18,370,10)
};

function sideScroll(element,direction,speed,distance,step){
    scrollAmount=0;
    let slideTimer = setInterval(function(){
        if(direction=='left'){
            element.scrollLeft-= step;
        }else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if (scrollAmount>= distance) {
            window.clearInterval(slideTimer);
        }
    },speed);
}

//-----------TRENDS POPULARES TEXTOS----------//

async function trendPops() {
    let trendParagraph = document.getElementsByClassName("item-trend");

    const respTrend = await fetch(`https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`);
    const trendingPops = await respTrend.json();

    for(let c = 0; c < trendParagraph.length; c++) {
        trendParagraph[c].textContent = `${trendingPops.data[c]}`;
        if(c <= 3) {
            trendParagraph[c].after(","); 
        }
    }
};trendPops();