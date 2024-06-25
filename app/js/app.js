import intlTelInput from 'intl-tel-input';

document.addEventListener('DOMContentLoaded', () => {
	// Initialize phone number input
	const inputPhone = document.querySelector('#phone');

	intlTelInput(inputPhone, {
		initialCountry: 'ua',
		strictMode: true,
		separateDialCode: true,
		utilsScript: '../utils/utils.js',
	});

	// Telegram bot details
	let tg = {
		token: '6490333690:AAEx9iHe6BQsHRsor28JfGfFLYmdlSLD09I', // Replace with your bot's token from @BotFather
		chat_id: 'OlexanderTsiomakh', // Replace with the user's Telegram chat id
	};

	/**
	 * Sends a message to a specific Telegram user.
	 * @param {String} text - The text message to send.
	 */
	function sendMessage(text) {
		const url = `https://api.telegram.org/bot${tg.token}/sendMessage`;
		const params = {
			chat_id: tg.chat_id,
			text: text,
		};

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(params),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.ok) {
					confirm(text);
				} else {
					confirm(`Error sending message to ${tg.chat_id}:`, data.description);
				}
			})
			.catch((error) => {
				console.error('Error sending message:', error);
			});
	}

	// Handle form submission
	const form = document.getElementById('form');

	form.addEventListener('submit', (event) => {
		event.preventDefault(); // Prevent default form submission

		// Gather form data
		const name = document.getElementById('name').value;
		const phone = inputPhone.value;
		const email = document.getElementById('email').value;

		// Send message with form data
		sendMessage(
			`New form submission: \nName: ${name} \nPhone: ${phone} \nEmail: ${email}`
		);
	});
});
