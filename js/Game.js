/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
	constructor () {
		this.missed = 0;
		this.phrases = [
			'This is a test',
			'This is also a test',
			'I am tired of tests',
			'And clases are confusing',
			'But I have to do this'
		];
		this.activePhrase = null;
	}

	startGame () {
		document.querySelector('#overlay').style.display = 'none';
		// const startPhrase = new Phrase (this.getRandomPhrase());
		startPhrase.phrase = this.getRandomPhrase();
		this.activePhrase = startPhrase.phrase;
		console.log(this.activePhrase)
		startPhrase.addPhraseToDisplay(this.activePhrase);
	}

	getRandomPhrase () {
		return this.phrases[Math.floor(Math.random() * this.phrases.length)];
	}

	handleInteraction (letter) {
		if (startPhrase.showMatchedLetter(startPhrase.checkLetter(letter.innerText)) === 'No guess') {
			letter.disabled = true;
			letter.classList.add('wrong');
			this.removeLife();
			this.missed ++;
			console.log(this.missed);
		}
		if (!document.querySelector('#scoreboard li')) {
			console.log('nope');
		}
	}

	removeLife() {
		document.querySelectorAll('#scoreboard img')[this.missed].setAttribute('src', 'images/lostHeart.png');
	}

}



// testGame.startGame(testGame.getRandomPhrase());
// console.log(testGame.getRandomPhrase());
