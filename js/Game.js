/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
	constructor () {
		// Stores the number of mistakes the User has made
		this.missed = 0;
		// Stores all the phrases. All program adapts to any length of array.
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
		// Stores the phrase currently printed on screen.
		this.activePhrase = null;
		// Stores the index of the phrases already used to ensure a new one every time
		this.usedIndexes = [];
	}

	/* Resets all values for a new game except the lifecount since the life total remains fixed even if you win:
	   Title, empties phrase Unordered List, resets used keys, Help Message and removes overlay
	   It sets the Active Phrase and prints it on the screen */
	startGame () {
		document.querySelector('#phrase ul').innerHTML = '';
		document.querySelectorAll('.key').forEach((e) => {
			e.classList = 'key';
			e.disabled = false;
		});
		document.querySelector('#help-message').style.color = '#4d85be';
		document.querySelector('#overlay').style.display = 'none';
		this.activePhrase = this.getRandomPhrase();
		this.activePhrase.addPhraseToDisplay(this.activePhrase.phrase);
	}

	/* Gets a random phrase that is always different from the previous one and pushes it on the usedIndexes array
	   It also calls the randomColor method to change the background every game */
	getRandomPhrase () {
		let newIndex;
		do {
			newIndex = Math.floor(Math.random() * this.phrases.length);
		} while (this.usedIndexes.indexOf(newIndex) !== -1);
		this.usedIndexes.push(newIndex);
		document.body.style.background = this.getRandomColor();
		return this.phrases[newIndex];
	}

	/* Creates a random hex color in the brightest range of colors */
	getRandomColor() {
		var hexValues = "ABCD";
		var color = "#";
		for (var i = 0; i < 3; i++) {
			color += hexValues[Math.floor(Math.random() * hexValues.length)];
		}
		return color;
	}

	/* It receives the element of the key as an argument both from click or keypress
	and handles right or wrong guesses, disabling the key and checking at the end
	if the user fulfilled requirements for a win or a "Victory" (guessing all words) */
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
			document.querySelector('#help-message').innerText = 'Oops :-(';
			document.querySelector('#help-message').style.color = 'IndianRed';
			this.removeLife();
		} else if (inputLetter.length > 0) {
			letter.disabled = true;
			letter.classList.add('chosen');
			document.querySelector('#help-message').innerText = 'Good!'
			document.querySelector('#help-message').style.color = 'ForestGreen';
		}

		if (this.checkForWin() === 'win') {
			this.gameOver('win', 'Keep playing to win the game!', 'Continue')
		} else if (this.checkForWin() === 'victory') {
			this.gameOver('victory', `You guessed all ${this.phrases.length} bands!`, 'Play Again!')
		}
	}

	/* Removes a life and, if all lives are lost, runs game over method */
	removeLife() {
		document.querySelectorAll('#scoreboard img')[this.missed].setAttribute('src', 'images/lostHeart.png')
		this.missed ++;
		if (this.missed > 4) {
			this.gameOver('lose', 'You ran out of lives', 'Try Again!');
		}
	}

	/* Verifies if customer won the game if all letters are shown and creates "Victory" if all phrases were guessed */
	checkForWin() {
		if (!document.querySelector('.letter.hide') && this.usedIndexes.length === this.phrases.length) {
			return 'victory';
		} else if (!document.querySelector('.letter.hide')) {
			return 'win';
		}
	}

	/* It sets up general resets for all results and at the end creates two different scenarios
	based on losing or finishing the game since it empties the usedIndexes array */
	gameOver (result, message, button) {
		document.querySelector('#overlay').style.display = '';
		document.querySelector('#help-message').innerText = 'Remember you can also use your keyboard ;-)';
		document.querySelector('#help-message').style.color = '#4d85be';
		document.querySelector('#overlay').classList = result;
		document.querySelector('#game-over-message').innerHTML = message;
		document.querySelector('#btn__reset').innerHTML = button;
		if (result === 'win') {
			document.querySelector('.title').innerHTML = `You guessed ${this.activePhrase.phrase.toUpperCase()}!`;
			document.querySelector('#win-counter').style.display = 'block';
			document.querySelector('#win-number').innerHTML = this.usedIndexes.length;
		} else if (result === 'victory' || result=== 'lose') {
			this.missed = 0;
			document.querySelectorAll('#scoreboard img').forEach((e) => e.setAttribute('src', 'images/liveHeart.png'));
			document.querySelector('#win-counter').style.display = 'none';
			this.usedIndexes = [];
		}
		if (result === 'victory') {
				document.querySelector('.title').innerHTML = 'You finished the game!';
		} else if (result === 'lose') {
				document.querySelector('.title').innerHTML = 'You lost the game!';
		}
	}

}
