/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
	constructor (phrase){
		this.phrase = phrase.toLowerCase();
	}

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

	checkLetter (guessedLetter) {
		return document.querySelectorAll(`.letter.${guessedLetter}`);
	}

	showMatchedLetter(checkLetter) {
		if (checkLetter.length === 0) {
			return 'No guess';
		} else {
			checkLetter.forEach((e) => e.classList.add('show'));
			checkLetter.forEach((e) => e.classList.remove('hide'));
		}
	}
}
