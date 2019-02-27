/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const newGame = new Game ();

// Click on button starts the game
document.querySelector('#btn__reset')
 .addEventListener('click', () => {
 	newGame.startGame();
 })

// Event listener clicking on buttons
document.querySelectorAll('.key')
.forEach((e) => {
	e.addEventListener('click', (event) => {
		newGame.handleInteraction(event.target);
	})
})

// Event listener on keypress. Enter starts/continues game while keys work the same as clicking on the buttons.
document.addEventListener('keypress', (event) => {
	if (document.querySelector('#overlay').style.display === '' && event.key === 'Enter' ) {
		newGame.startGame();
	}
	document.querySelectorAll('.key').
	forEach((e) => {
		if (e.innerHTML === event.key.toLowerCase()) {
			newGame.handleInteraction(e);
		}
	})
})
