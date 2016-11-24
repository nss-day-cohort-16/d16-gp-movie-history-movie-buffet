"use strict";

let $ = require('jquery'),
    firebase = require("./firebaseConfig"),
    input = $("#input");

 // input.keyup(function () {instantAdd();});

 // function instantAdd () {
 // 	console.log('instant add running');
 //    if (input.val()) { //-----------------> input.val().length > 3 // (3 character minimum option)
 //  // getMovies(input.val());
 //    } else {
 //      return;
 //    }
 //  }

$("#submit").click(function() {getMovies(input.val());});

function getMovies(input) {
	return new Promise(function(resolve, reject){
		$.ajax({
			url:`http://www.omdbapi.com/?t=${input}&y=&plot=short&r=json`
		}).done(function(data){
			console.log(data);
			resolve(data);
			domPop(data);
		});
	});

}

function domPop(data){
	var imdb = Math.floor(data.imdbRating / 2);
	$("#movieWrap").html(`<div class="col-md-4"><img src="${data.Poster}"><h2>${data.Title}</h2><h3>${data.Director}</h3><h3>${data.Released}</h3><h3>${data.Actors}</h3><h3>${imdb}</h3><select id="starbar">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select><button id="add" type="button">Add to Collection</button></div>`);

      $('#starbar').barrating('show', {
        theme: 'fontawesome-stars'
      });
}



module.exports = getMovies;