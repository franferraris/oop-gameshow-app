/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const newGame = new Game ();

document.querySelector('#btn__reset')
 .addEventListener('click', () => {
 	newGame.startGame();
 })

document.querySelectorAll('.key')
.forEach((e) => {
	e.addEventListener('click', (event) => {
		newGame.handleInteraction(event.target);
	})
})

document.addEventListener('keypress', (event) => {
	document.querySelectorAll('.key').
	forEach((e) => {
		if (e.innerHTML === event.key.toLowerCase()) {
			newGame.handleInteraction(e);
		}
	})
})
