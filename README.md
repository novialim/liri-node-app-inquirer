# LIRI Node Application

In week 11, we coded a node application to accept command line arguments and connect to multiple APIs to grab data in JSON format.

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

Grab tweets from Twitter: `node liri my-tweets`

Search a song on Spotify: `node liri spotify-this-song [song]`

Get information about a movie: `node liri movie-this [movie]`

Run any commands you have run in the past: `node liri do-what-it-says`


All commands are logged to the `random.txt` file.


## Built With

* [Node.JS](https://nodejs.org/en/) - The backend this application is built on
* [Twitter](http://www.twitter.com) - Cannot have tweets without twitter :smile:
* [Spotify](http://www.spotify.com) - Used to get song information
* [OMDb API](https://www.omdbapi.com/) - Used to get movie information

## Authors

* **Novia Lim** - *Project work* - [NoviaLim](https://github.com/novialim)

## License

This project is licensed under the MIT License

