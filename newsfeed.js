const apiKey = "your_api_key";
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const baseUrl = "https://newsapi.org/v2/everything?";
const headlinesUrl = "http://newsapi.org/v2/top-headlines?";
// Date object
const today = new Date();
// Global Default Development Date
let date = 2020-02-12;

function addNewsToHtml(wantedDescriptions, divID, numberOfArticles){
  if (wantedDescriptions.length > 0) {
    var ul = document.createElement("ul");
    ul.style = ("list-style-type", "dot");

    for(var i=0; i<numberOfArticles; i++){
      var new_description_holder = document.createElement("li");
      new_description_holder.id = 'new_description_holder'+i;
      ul.appendChild(new_description_holder);
      new_description_holder.innerHTML = wantedDescriptions[i];
    }

    document.getElementById(divID).appendChild(ul);

  } else {
    console.log("Empty Descriptions");
  }
}

function collectNotNullDescriptions(articlesArray){
  let wantedDescriptions = [];
  if(Array.isArray(articlesArray) && articlesArray.length > 0){
    articlesArray.forEach(function(element){
      var description = element.description;
      if( description ) {
        wantedDescriptions.push(description);
      }
    });
  }
  return wantedDescriptions;
}

function setDate(date){
  return date = date;
}

function fetchBloombergNews(){
  fetch(proxyurl + headlinesUrl +
    new URLSearchParams({
      apiKey: apiKey,
      sources: 'bloomberg',
      to: date,
      from: date
    }),
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => collectNotNullTitles(data.articles))
    .then(wantedTitles => addNewsToHtml(wantedTitles, 'Bloomberg_News_Feed', 10))
    .catch(function(error) {
      console.log(error);
    });
  }

  function fetchBbcNews(){
    fetch(proxyurl + baseUrl +
      new URLSearchParams({
        apiKey: apiKey,
        domains: 'bbc.co.uk',
        from: date,
        to: date
      }),
      {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'GET'
      })
      .then(response => response.json())
      .then(data => collectNotNullDescriptions(data.articles))
      .then(wantedDescriptions => addNewsToHtml(wantedDescriptions, 'BBC_News_Feed', 5))
      .catch(function(error) {
        console.log(error);
      });
    }

    function collectNotNullTitles(titlesArray){
      let wantedTitles = [];
      if(Array.isArray(titlesArray) && titlesArray.length > 0){
        titlesArray.forEach(function(element){
          var title = element.title;
          if( title ) {
            wantedTitles.push(title);
          }
        });
      }
      return wantedTitles;
    }

    function fetchIndCricketNews(){
      fetch(proxyurl + headlinesUrl +
        new URLSearchParams({
          apiKey: apiKey,
          country: 'in',
          category: 'sport'
        }),
        {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: 'GET'
        })
        .then(response => response.json())
        .then(data => collectNotNullTitles(data.articles))
        .then(wantedTitles => addNewsToHtml(wantedTitles, 'Cricket_News', 5))
        .catch(function(error) {
          console.log(error);
        });
      }
