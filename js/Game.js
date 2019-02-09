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
		document.querySelector('#phrase ul').innerHTML = '';
		document.querySelectorAll('.key').forEach((e) => {
			e.classList = 'key';
			e.disabled = false;
		});
		this.missed = 0;
		document.querySelectorAll('#scoreboard img').forEach((e) => e.setAttribute('src', 'images/liveHeart.png'));
		document.querySelector('#overlay').style.display = 'none';
		this.activePhrase = new Phrase (this.getRandomPhrase());
		console.log(this.activePhrase.phrase)
		this.activePhrase.addPhraseToDisplay(this.activePhrase.phrase);
	}

	getRandomPhrase () {
		return this.phrases[Math.floor(Math.random() * this.phrases.length)];
	}

	handleInteraction (letter) {
		let clickedLetter = this.activePhrase.showMatchedLetter(this.activePhrase.checkLetter(letter.innerText));
		if ( clickedLetter === 'No guess') {
			letter.disabled = true;
			letter.classList.add('wrong');
			this.removeLife();
			console.log(this.missed);
		} else {
			letter.disabled = true;
			letter.classList.add('chosen');
		}
		if (this.checkForWin() === true) {
			this.gameOver('win', 'You won the game!')
		}
	}

	removeLife() {
		document.querySelectorAll('#scoreboard img')[this.missed].setAttribute('src', 'images/lostHeart.png')
		this.missed ++;
		if (this.missed === 5) {
			this.gameOver('lose', 'You lost the game!')
		}
	}

	checkForWin() {
		if (!document.querySelector('.letter.hide')) {
			return true;
		}
	}

	gameOver (result, message) {
		document.querySelector('#overlay').style.display = '';
		document.querySelector('#overlay').classList = result;
		document.querySelector('#game-over-message').innerHTML = message;
		document.querySelector('#btn__reset').innerHTML = 'Try Again!';
	}

}
