/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const testGame = new Game ();

document.querySelector('#btn__reset')
 .addEventListener('click', () => {
 	testGame.startGame();
 })

document.querySelectorAll('.key')
.forEach((e) => {
	e.addEventListener('click', (event) => {
		testGame.handleInteraction(event.target);
	})
})
