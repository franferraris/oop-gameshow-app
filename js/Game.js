/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
	constructor () {
		this.missed = 0;
		this.phrases = [
			'Focaccia genovese',
			'Pasta alla Norma',
			'Ragu alla bolognese',
			'Mozzarella di bufala',
			'Panino con la Porchetta',
			'Bagna cauda',
			'Risotto alla milanese',
			'Impepata di cozze',
			'Pizza con la nduja'
		];
		this.activePhrase = null;
		this.activeIndex = null;
	}

	startGame () {
		document.querySelector('#phrase ul').innerHTML = '';
		document.querySelectorAll('.key').forEach((e) => {
			e.classList = 'key';
			e.disabled = false;
		});
		this.missed = 0;
		document.querySelectorAll('#scoreboard img').forEach((e) => e.setAttribute('src', 'images/liveHeart.png'));
		document.querySelector('#help-message').innerText = 'You can also use your keyboard :-D';
		document.querySelector('#help-message').style.color = '#4d85be';
		document.querySelector('#overlay').style.display = 'none';
		this.activePhrase = new Phrase (this.getRandomPhrase());
		console.log(this.activePhrase.phrase)
		this.activePhrase.addPhraseToDisplay(this.activePhrase.phrase);
	}

	getRandomPhrase () {
		let newIndex;
		do {
			newIndex = Math.floor(Math.random() * this.phrases.length);
		} while (newIndex === this.activeIndex);
		this.activeIndex = newIndex;
		document.body.style.background = this.getRandomColor();
		return this.phrases[this.activeIndex];
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

		if (letter.disabled === true) {
			document.querySelector('#help-message').innerText = 'You already selected that letter';
			document.querySelector('#help-message').style.color = 'Goldenrod';
		} else if ( inputLetter === 'No guess' && letter.disabled === false ) {
			letter.disabled = true;
			letter.classList.add('wrong');
			this.removeLife();
			document.querySelector('#help-message').innerText = 'Oops :-(';
			document.querySelector('#help-message').style.color = 'IndianRed';
		} else if (inputLetter !== undefined) {
			letter.disabled = true;
			letter.classList.add('chosen');
			document.querySelector('#help-message').innerText = 'Good!'
			document.querySelector('#help-message').style.color = '#41583a';
		}

		if (this.checkForWin()) {
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
