'use strict';
(function(){
	var keys = require('./keys');
	var Twitter = require('twitter');
	var Spotify = require('node-spotify-api');
	var request = require('request');
	var fs = require('fs');
	var moment = require('moment');
	var inquirer = require("inquirer");
 
	// Assigning keys to variable client
	var client = new Twitter(keys.twitterKeys);
	var spotify = new Spotify(keys.spotifyKeys);

	var action;
	var input;

// Create a "Prompt" with a series of questions.
inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "What is your name?",
      name: "username"
    },
    {
      type: "list",
      message: "How can I help you today? \n The available commands are:",
      choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
      name: "action"
    },
    // Here we ask the user to confirm.
    {
      type: "confirm",
      message: "Are you sure:",
      name: "confirm",
      default: true
    },
    {
      type: "input",
      message: "What are you searching for? (Leave blank for \"my-tweets\" and \"do-what-it-says\"",
      name: "input"
    },
    {
      type: "confirm",
      message: "Are you sure:",
      name: "confirm",
      default: true
    }

  ])
  .then(function(inquirerResponse) {
    
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pizza choice(s) from the answers.
    if (inquirerResponse.confirm) {
      
      console.log("\nWelcome " + inquirerResponse.username);
      console.log("chosen action: "+inquirerResponse.action);

      action = inquirerResponse.action; 
      input = inquirerResponse.input; 

      if(action!=="do-what-it-says"){
		init(action);
	  }
	  else{
		dowhat();
	  }
    }
    else {
      console.log("\nThat's okay " + inquirerResponse.username + ", come again when you require my assistance.\n");
    }
  });

	function init(action, input){
		// We will then create a switch-case statement (if-then would also work).
		// The switch-case will direct which function gets run.
		switch (action) {
		  case "my-tweets":
		    myTweets();
		    break;

		  case "spotify-this-song":
		    spotifyThis();
		    break;
			
		  case "movie-this":
		    movieThis(input)
		    break;

		  case "do-what-it-says":
		    dowhat();
		    break;

		  default:
		  	instructions();
			break;
		}
	}

	function instructions(){
		console.log("The Available Commands Are: ");
		console.log("* \`my-tweets\`");
		console.log("* \`spotify-this-song\`");
		console.log("* \`movie-this\`");
		console.log("* \`do-what-it-says\`"); 
	}

	function myTweets(){
		var params = {screen_name: 'booogeygirl',
		              count: '20'};

		client.get('statuses/user_timeline', params, function(error, tweets, response){
			// If the request was successful...
			if (!error && response.statusCode === 200) {
			  
			    for(var i=0;i<tweets.length;i++){
			      console.log(tweets[i].text);
			      console.log(tweets[i].created_at);
			      console.log(' ');

			    }
			}
			else if (error){
				console.log(error);
			}	

			appendFile(action,input,response.statusCode);
		});
	}


	function spotifyThis(){
		var statusCode;
		if(input==undefined || input==""){
			//* If no song is provided then your program will default to "The Sign" by Ace of Base.
			input = "The Sign Ace of Base";
		}		

			spotify.search({ type: 'track', query: input }, function(err, data) {
			  if (err) {
			    return console.log('Error occurred: ' + err);
			  }

			  else{
			  		statusCode = '200';
			 	   	var trackData = data.tracks.items;
				    trackData.forEach(function(song) {
				      console.log('Artist: ' + song.artists[0].name);
				      console.log('Song: ' + song.name);
				      console.log('Preview Link: ' + song.external_urls.spotify);
				      console.log('Album: ' + song.album.name);

				      console.log('\r\n');
				    });
			   }

			   appendFile(action,input,statusCode);			   
			});
		
	}
	
	function movieThis(){
		if(input==undefined || input==""){
			// * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
			input = "Mr. Nobody.";
     		console.log('If you haven\'t watched "Mr. Nobody." then you should: <http://www.imdb.com/title/tt0485947/>\nIt\'s on Netflix!');    

     		appendFile(action,input,"200");
		}		
		else{

			request('http://www.omdbapi.com/?t='+encodeURIComponent(input)+'&y=&plot=short&apikey=40e9cece', function (err, response, body) {
			  if (err) {
			    return console.log('Error occurred: ' + err);
			  }

			  else{

				var movies = JSON.parse(body);

				console.log("* Title of the movie: "+movies.Title);
				console.log("* Year the movie came out: "+movies.Year);
				console.log("* IMDB Rating of the movie: "+movies.imdbRating);
				console.log("* Country where the movie was produced: "+movies.Country);
				console.log("* Language of the movie: "+movies.Language);
				console.log("* Plot of the movie: "+movies.Plot);
				console.log("* Actors in the movie: "+movies.Actors);
				console.log("* Movie Website: "+movies.Website);
		
			    console.log('\r\n');
			   }

			   appendFile(action,input,response.statusCode);
			});
		}
	}

	function dowhat(){

		fs.readFile("random.txt", 'utf8', function(err,data){
			if(err){
				return console.log(err);
			}

			var ranAction = data;
			var array = ranAction.split(",");

			action = array[0].trim();
			if(input){
				input = array[1].replace(/['"]+/g, '').trim();
			}

			console.log("<----------Do What It Says Action: "+action+"---------->\r\n");

			init(action, input);		

		});
	}

	function appendFile(action,input,status){

		if(input==undefined){
			input = "";
			var loggedCmd = "["+(moment().format('LLLL')+"] \"Action: "+action+"\" \"Status:"+status+"\"");
		}
		else{
			var loggedCmd = "["+(moment().format('LLLL')+"] \"Action: "+action+"\" \"Input: "+input+"\" \"Status:"+status+"\"");
		}
		// console.log(loggedCmd);

		fs.appendFile("log.txt", loggedCmd+"\r\n", 'utf8', function(err,data){
			if(err) return console.log(err);
			else{
				console.log("<----------Log Saved!---------->");
			}
		});
	}

})();
