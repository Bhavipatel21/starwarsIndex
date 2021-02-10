//Sets the number of stars to display
const stars = 100;
//For every star to display
for (let i = 0; i < stars; i++) {
  let star = document.createElement("div");
  star.className = "star";
  var xy = getRandomPosition();
  star.style.top = xy[0] + "px";
  star.style.left = xy[1] + "px";
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

$("#section-card").hide();
$("#Tab").hide();

var secondsLeft = 60;
$(document).ready(function () {
 
     function setTimer() {
   setInterval(function () {
    
     if (secondsLeft === 0) {
        $("#section-card").show()
        $("#Tab").show();
          } else {
        secondsLeft--;
      }
    }, 1000);
  }
  setTimer();
  

  var searchBtn = $("#search-btn");
  // console.log("check the button-->", searchBtn);

  searchBtn.click(function () {
    var name = $("#name").val();
    getSwapiApiData(name);
    
  });


  //create a function to pull data from swapi api
  function getSwapiApiData(name) {
    var swapiUrl = "https://swapi.dev/api/people/?search=" + name;

    console.log(swapiUrl);
    $("#details").empty();

    fetch(swapiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (swapiData) {
        console.log(swapiData);
        var logerror = swapiData.count;
        console.log(logerror);
        if (logerror === 0) {

          //var myImage ="./assets/images/ohno.gif"
          var myImage = "./assets/images/mesa-sorry.jpg";
          var message = "Please enter valid character name!!!"  

          var h3 =$("<h3>" + message + "</h3>");
         // h3.attr("style","color:yellow;")
          h3.attr("style","text-align:center; color:yellow;")
          $("#details").append(h3);

          showImage(myImage);
        } else {
          console.log("results--->", swapiData.results);

          getGiphyApiData(name);
          var people = swapiData.results[0].name;
          var h1 = $("<h1>" + people + "<h1>");
          $("#details").append(h1);

          var birth_year = swapiData.results[0].birth_year;
          var p = $("<p>" + "Birth_Year :  " + birth_year + "</p>");
          $("#details").append(p);

          var gender = swapiData.results[0].gender;
          var p = $("<p>" + "Gender :  " + gender + "</p>");
          $("#details").append(p);

          var height = swapiData.results[0].height;
          var p = $("<p>" + "Height :  " + height + "</p>");
          $("#details").append(p);

          //Species
          var species = swapiData.results[0].species;

          fetch(species)
            .then(function (response) {
              return response.json();
            })
            .then(function (speciesData) {
              // console.log("speciesData--->", speciesData);

              //Planet
              var planet = speciesData.homeworld;
              fetch(planet)
                .then(function (response) {
                  return response.json();
                })
                .then(function (planetData) {
                  var language = speciesData.language;
                  var p = $("<p>" + "Language :  " + language + "</p>");
                  $("#details").append(p);

                  var planetname = planetData.name;
                  var p = $("<p>" + "Planet :  " + planetname + "</p>");
                  $("#details").append(p);
                });
            });
        }
      });
  }
  //create a function to get data from giphy api
  function getGiphyApiData(name) {
    var giphyUrl =
      "https://api.giphy.com/v1/gifs/search?api_key=qLywnb8DOGJTO3xvVyo9GBenPnQ4O5G0&q=" +
      name +
      "&limit=25&offset=0&rating=g&lang=en";

    $("#images").empty();

    fetch(giphyUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (giphyData) {
        //console.log("giphydata--->", giphyData);

        var i = Math.floor(Math.random() * 25);
        //console.log("height---->",giphyData.data[i].images.downsized_still.url);

        var myImage = giphyData.data[i].images.downsized_still.url;
        showImage(myImage);
        searchHistory(name)
      });
  }

  function showImage(myImage) {
    $("#images").empty();
    var altText = "my giphy image";
    var imgTag = $("<img>");
    imgTag.attr("src", myImage);
    imgTag.attr("alt", altText);
    $("#images").append(imgTag);

  }

  //local storage

  function searchHistory(name) {
    $(".list-items").empty();

    var searchItems = localStorage.getItem("name");
    console.log("Key name---->", searchItems);

    if (searchItems === null) {
      searchItems = [];
      //searchItems.empty();

    } else {
      searchItems = JSON.parse(searchItems);
    }

    searchItems.push(name);
    var myNames = JSON.stringify(searchItems);
    localStorage.setItem("name", myNames);

    for (i = 0; i < searchItems.length; i++) {
      var liText = searchItems[i]
      console.log(liText)
      var li = $("<li>" + liText + "</li>")
      $(".list-items").append(li)

        }

        $('#clear-btn').click(function(){
          localStorage.clear()
          $(".list-items").empty();
        })

  }

});
