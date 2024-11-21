let searchText = document.getElementById('search-text');
let searchBtn = document.getElementById('search-btn');
let posterImg = document.getElementById('poster-img');
let movieDetails = document.getElementById('movie-details');
let buttons = document.getElementById('buttons');
let main = document.getElementById('main');
let myapikey = 'b3cfa3de';

searchBtn.addEventListener('click',()=>{
    banner.style.display = "none";
    banner2.style.display = "flex";
    let moviename = searchText.value.trim();
    buttons.textContent = '';
    if(moviename !== ""){
        getmovieInfo(moviename);
    }
    else{
        searchText.value = "";
        banner2.textContent= "Enter movie name to get movie information";
    }
});

// fetch the movie information
async function getmovieInfo(movie){
    const url = `http://www.omdbapi.com/?apikey=${myapikey}&t=${movie}`;
    banner2.textContent = "Fetching Movie Information...";
    const response = await fetch(url);
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if(data.Response === "True"){
        banner2.style.display = "none";
        banner.style.display = "flex";
        showmoviedata(data);
        // console.log(data);
    }
    else{
        banner2.textContent = "No Movie Found!!!";
    }     
}

//  This function show the movie data on the screen
function showmoviedata(data){
    let {Title,imdbRating,Released,Genre,Runtime,Actors,Plot,Poster}  = data;
    posterImg.src = Poster;
    movieDetails.children[0].textContent = Title;
    movieDetails.children[1].getElementsByTagName('span')[0].textContent = imdbRating;
    movieDetails.children[3].getElementsByTagName('span')[0].textContent = Released;
    
    let genrearray = Genre.split(',');
    genrearray.forEach(element => {
        // console.log(element);
        let ele = element.trim();
        // console.log(ele);
        let button = document.createElement('button');
        button.type = 'button';
        button.textContent = ele;
        buttons.appendChild(button); 
    });
    movieDetails.children[4].getElementsByTagName('span')[0].textContent = Runtime;
    movieDetails.children[5].getElementsByTagName('span')[0].textContent = Actors;
    movieDetails.children[6].getElementsByTagName('span')[0].textContent = Plot;
}