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

	// Handle form submission
	const form = document.getElementById('form');

	form.addEventListener('submit', (event) => {
		event.preventDefault(); // Prevent default form submission

		// Gather form data
		const name = document.getElementById('name').value;
		const phone = inputPhone.value;
		const email = document.getElementById('email').value;

		//  Construct the message content with user details
		const formattedMessage = `Form Data: \nName: ${name} \nPhone: ${phone} \nEmail: ${email}`;

		confirm(formattedMessage);

		const token = '6772419107:AAGo6vvV1-HFbFaYR2hsFuvOsyo6F3CizEY'; // Replace with your Telegram bot token
		const chatId = '@RGBwebShowcaseFormData'; // Replace with your Telegram chat ID
		const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${formattedMessage}&parse_mode=html`;

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formattedMessage),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(JSON.stringify(data));

				if (data.ok) {
					console.log(`Message sent To ${chatId} successfully:`, data);
				} else {
					console.error('Error sending message:', data.description);
				}
				confirm(`Message Sent to ${chatId}`, `Form Data:`, data);
			})
			.catch((error) => console.error('Error sending message:', error));
	});
});
