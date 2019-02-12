/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
	constructor () {
		this.missed = 0;
		this.phrases = [
			new Phrase('Deep Purple'),
			new Phrase('The Rolling Stones'),
			new Phrase('Aerosmith'),
			new Phrase('Led Zeppelin'),
			new Phrase('Pink Floyd'),
			new Phrase('Black Sabbath'),
			new Phrase('The Who'),
			new Phrase('The Doors'),
			new Phrase('Queen'),
			new Phrase('The Beatles'),
		];
		this.activePhrase = null;
		this.usedIndexes = [];
	}

	startGame () {
		document.querySelector('.title').innerHTML = "Guess the Rock Band";
		document.querySelector('#phrase ul').innerHTML = '';
		document.querySelectorAll('.key').forEach((e) => {
			e.classList = 'key';
			e.disabled = false;
		});
		document.querySelector('#help-message').innerText = 'You can also use your keyboard :-D';
		document.querySelector('#help-message').style.color = '#4d85be';
		document.querySelector('#overlay').style.display = 'none';
		this.activePhrase = this.getRandomPhrase();
		console.log(this.activePhrase.phrase)
		this.activePhrase.addPhraseToDisplay(this.activePhrase.phrase);
	}

	getRandomPhrase () {
		let newIndex;
		do {
			newIndex = Math.floor(Math.random() * this.phrases.length);
		} while (this.usedIndexes.indexOf(newIndex) !== -1);
		this.usedIndexes.push(newIndex);
		document.body.style.background = this.getRandomColor();
		return this.phrases[newIndex];
	}

	getRandomColor() {
		var hexValues = "ABCD";
		var color = "#";
		for (var i = 0; i < 3; i++) {
			color += hexValues[Math.floor(Math.random() * hexValues.length)];
		}
		return color;
	}

	handleInteraction (letter) {
		let inputLetter = this.activePhrase.showMatchedLetter(this.activePhrase.checkLetter(letter.innerText));

		if (document.querySelector('#overlay').style.display === '') {
			return;
		}
		if (letter.disabled === true) {
			document.querySelector('#help-message').innerText = 'You already selected that letter';
			document.querySelector('#help-message').style.color = 'Goldenrod';
		} else if ( inputLetter.length === 0 && letter.disabled === false ) {
			letter.disabled = true;
			letter.classList.add('wrong');
			this.removeLife();
			document.querySelector('#help-message').innerText = 'Oops :-(';
			document.querySelector('#help-message').style.color = 'IndianRed';
		} else if (inputLetter.length > 0) {
			letter.disabled = true;
			letter.classList.add('chosen');
			document.querySelector('#help-message').innerText = 'Good!'
			document.querySelector('#help-message').style.color = 'ForestGreen';
		}

		if (this.checkForWin() === 'win') {
			this.gameOver('win', 'You guessed the band!', 'Continue')
		} else if (this.checkForWin() === 'victory') {
			this.gameOver('victory', `You guessed all ${this.phrases.length} bands!`, 'Play Again!')
		}
	}

	removeLife() {
		document.querySelectorAll('#scoreboard img')[this.missed].setAttribute('src', 'images/lostHeart.png')
		this.missed ++;
		if (this.missed > 4) {
			this.gameOver('lose', 'You lost the game!', 'Try Again!')
		}
	}

	checkForWin() {
		if (!document.querySelector('.letter.hide') && this.usedIndexes.length === this.phrases.length) {
			document.querySelector('.title').innerHTML = "You finished the game!";
			return 'victory';
		} else if (!document.querySelector('.letter.hide')) {
			return 'win';
		}
	}

	gameOver (result, message, button) {
		document.querySelector('#overlay').style.display = '';
		document.querySelector('#overlay').classList = result;
		document.querySelector('#game-over-message').innerHTML = message;
		document.querySelector('#btn__reset').innerHTML = button;
		if (result === 'win') {
			document.querySelector('#win-counter').style.display = 'block';
			document.querySelector('#win-number').innerHTML = this.usedIndexes.length;
		} else if (result === 'victory' || result=== 'lose') {
			this.missed = 0;
			document.querySelectorAll('#scoreboard img').forEach((e) => e.setAttribute('src', 'images/liveHeart.png'));
			document.querySelector('#win-counter').style.display = 'none';
			this.usedIndexes = [];
		}
	}

}
