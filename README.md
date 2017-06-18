# LIRI Node Application (Language Interpretation and Recognition Interface)

In week 11, we built a node application to accept command line arguments and connect to multiple APIs to grab data in JSON format.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To run this application you will need Node.JS and NPM installed on your system.

### Installing
First, clone the project:
```
git clone https://github.com/novialim/liri-node-app.git
```


Inside of the folder in which you've cloned the files to, run the following command:
```
npm install
```

## Running the application 

```
node liri
```

Available commands:

my-tweets
* This will show your last 20 tweets and when they were created at in your terminal/bash window.

spotify-this-song
* 
This will show the following information about the song in your terminal/bash window
** Artist(s)
** The song's name
** A preview link of the song from Spotify
** The album that the song is from

movie-this
* This will output the following information to your terminal/bash window:

```
   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.
   * Rotten Tomatoes URL.
```

do-what-it-says 
* Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

All commands are logged to `log.txt` file.


## Built With

* [Node.JS](https://nodejs.org/en/) - The backend this application is built on
* [Twitter](http://www.twitter.com) - Cannot have tweets without twitter :smile:
* [Spotify](http://www.spotify.com) - Used to get song information
* [OMDb API](https://www.omdbapi.com/) - Used to get movie information

## Authors

* **Novia Lim** - *Project work* - [NoviaLim](https://github.com/novialim)

## License

This project is licensed under the MIT License

