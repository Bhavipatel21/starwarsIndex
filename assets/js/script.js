 //Sets the number of stars to display
const stars = 100;
//For every star to display
for (let i = 0; i < stars; i++) {
    let star = document.createElement("div");
    star.className = "star";
    var xy = getRandomPosition();
    star.style.top = xy[0] + 'px';
    star.style.left = xy[1] + 'px';
    document.body.append(star);
}

// Gets random x, y values based on the size of the container
function getRandomPosition() {
    var y = window.innerWidth;
    var x = window.innerHeight;
    var randomX = Math.floor(Math.random() * x);
    var randomY = Math.floor(Math.random() * y);
    return [randomX, randomY];
}
$(document).ready(function () {

    var searchBtn = $("#search-btn");
    console.log("check the button-->", searchBtn);
  
    searchBtn.click(function () {
      var name = $("#name").val();
      getSwapiApiData(name);
     
    });
  
    //create a function to pull data from swapi api
    function getSwapiApiData(name) {
      var swapiUrl = "https://swapi.dev/api/people/?search=" + name;
      $("#details").empty();
  
      fetch(swapiUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (swapiData) {
          console.log(swapiData)
          var logerror = swapiData.count;
          console.log(logerror);
          if (logerror === 0) {
  
            //var myImage ="./assets/images/ohno.gif"
            
            var myImage ="./assets/images/mesa-sorry.jpg"
  
            //alert(myImage)
            showImage(myImage);
  
          } else {
  
            console.log("results--->",swapiData.results)
            console.log("species--->",swapiData.results[0].species)
            getGiphyApiData(name);
            var people = swapiData.results[0].name;
            var h1 = $("<h1>" + people + "<h1>");
            $("#details").append(h1);
          }
        });
    }
    //create a function to get data from giphy api
    function getGiphyApiData(name) {
      var giphyUrl = "https://api.giphy.com/v1/gifs/search?api_key=qLywnb8DOGJTO3xvVyo9GBenPnQ4O5G0&q=" + name + "&limit=25&offset=0&rating=g&lang=en";
      $("#details").empty();
  
      fetch(giphyUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (giphyData) {
        console.log("giphydata--->", giphyData);
          
          var i = Math.floor(Math.random() * 25);
          console.log("height---->",giphyData.data[i].images.downsized_still.url);
  
          var myImage = giphyData.data[i].images.downsized_still.url;
          showImage(myImage);
      
        });
    }
  
    function showImage(myImage){
  
      var altText = "my giphy image";
      var imgTag = $("<img>");
      imgTag.attr("src", myImage);
      imgTag.attr("alt", altText);
      $("#details").append(imgTag);
    } 
  
  });
  
 