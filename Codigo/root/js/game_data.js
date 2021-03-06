import { getUpdatedGames, createCard } from "./game_crud.js";
import data2 from "./data2.js"

let game_db = {};

const initialData = {
	game_list: data2
}

function init() {
	const gameJSON = localStorage.getItem('game_db');

    if (!gameJSON) {   
        game_db = initialData;
        localStorage.setItem('game_db', JSON.stringify (initialData));
				getUpdatedGames(game_db);
    }
    else  {
        game_db = JSON.parse(gameJSON);
				getUpdatedGames(game_db);
    }
}


const searchBttn = document.getElementById('mainBttn');
searchBttn.addEventListener('click', searchGames)

const url = 'https://cors.bridged.cc/https://api.igdb.com/v4/games';
const myHeaders = new Headers();
myHeaders.append('Client-ID', 'rnxg276wty5wu058cirpt702s7ry4c');
myHeaders.append('Authorization','Bearer vpg2qovzjnzizgjwhl289fr9tchzla');
myHeaders.append('Access-Control-Allow-Origin', '*');


function searchGames() {
	const query = document.getElementById('search').value

	const body = `fields name, cover, screenshots, videos; search "${query}"; where version_parent = null; limit 1;`

	const myInit = { method: 'POST', body: body , headers: myHeaders};

	fetch(url, myInit)
	.then(response => response.json())
	.then(data => {
			for (let i = 0; i < data.length; i++) {
					const game = {
							'name': data[i].name,
							'media': {
									'cover': data[i].cover,
									'screenshots': data[i].screenshots,
									'videos': data[i].videos,
							}
					}
					addGame(game);
			}
	})
}

function generateID() {
	var d = new Date().getTime();//Timestamp
	var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
	return 'yxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16;//random number between 0 and 16
			if(d > 0){//Use timestamp until depleted
					r = (d + r)%16 | 0;
					d = Math.floor(d/16);
			} else {//Use microseconds since page-load if supported
					r = (d2 + r)%16 | 0;
					d2 = Math.floor(d2/16);
			}
			return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
}


function addGame(gameData) {
	const gameObject = {
			'id': `${generateID()}`,
			'title': `${gameData.name}`,
			'tags': {
				genre: [],
				graphics: [],
				age_rate: [],
			},
			'devs': [],
			'media': {
					'cover': gameData.media.cover,
					'screenshots': gameData.media.screenshots,
					'videos': gameData.media.videos,
			},
			'stores' : {
				steam: '',
				epic: ''
			}
	}
	game_db.game_list.push(gameObject);
	localStorage.setItem('game_db', JSON.stringify (game_db));
	createCard(gameObject);
}

export function removeGame(id) {
	const gameJSON = localStorage.getItem('game_db');
	game_db = JSON.parse(gameJSON);

	const gameList = game_db.game_list;

	for (let i = 0; i < gameList.length; i++) {
		const game = gameList[i];
		
		if (game.id == id) {
			gameList.splice(i, 1)
			localStorage.setItem('game_db', JSON.stringify (game_db));
		}
	}
}

init();