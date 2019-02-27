/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
	constructor (phrase){
		// Forces any newly created phrase to be lowercase.
		this.phrase = phrase.toLowerCase();
	}

	/* Adds phrase to display with list items that have a class of the letter inside */
	addPhraseToDisplay () {
		let lettersUl = document.querySelector('#phrase ul');
		for (let i = 0; i < this.phrase.length; i++) {
			let letterLi = document.createElement('li');
			if (this.phrase[i] === ' ') {
				letterLi.classList = 'space';
				lettersUl.appendChild(letterLi);
			} else {
				letterLi.classList = `hide letter ${this.phrase[i]}`;
				letterLi.innerHTML = this.phrase[i];
				lettersUl.appendChild(letterLi);
			}
		}
	}

	/* Returns all items with the guessed letter class */
	checkLetter (guessedLetter) {
		return document.querySelectorAll(`.letter.${guessedLetter}`);
	}

	/* If the querySelector is positive, it shows the letters */
	showMatchedLetter(checkLetter) {
		if (checkLetter.length > 0) {
			checkLetter.forEach((e) => e.classList.add('show'));
			checkLetter.forEach((e) => e.classList.remove('hide'));
		}
		return checkLetter;
	}
}
