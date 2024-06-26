import intlTelInput from 'intl-tel-input';

document.addEventListener('DOMContentLoaded', () => {
	// Handle form submission
	const form = document.getElementById('form');
	const inputPhone = document.querySelector('#phone');

	intlTelInput(inputPhone, {
		initialCountry: 'ua',
		strictMode: true,
		separateDialCode: true,
		utilsScript: '../utils/utils.js',
	});

	form.addEventListener('submit', (event) => {
		// Prevent default form submission
		event.preventDefault();

		// Gather form data
		const name = document.getElementById('name').value;
		const phone = inputPhone.value;
		const email = document.getElementById('email').value;
		const siteUrl = window.location.href;

		//  Construct the message content with user details
		const formattedMessage = `<b>Message from site ${siteUrl}:</b>\n<b>Name:</b> <i>${name}</i>\n<b>Phone:</b> <i>${phone}</i>\n<b>Email:</b> <i>${email}</i>`;

		// Telegram API details (replace with yours)
		const token = '6772419107:AAGo6vvV1-HFbFaYR2hsFuvOsyo6F3CizEY';
		const chatId = '@TestFormDataShowcase';

		// Build the URL with query parameters
		const url = `https://api.telegram.org/bot${token}/sendMessage`;

		const data = {
			chat_id: chatId,
			text: formattedMessage,
			parse_mode: 'HTML',
		};

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);

				if (data.ok) {
					console.log(`Successfully sent to Telegram: ${chatId}`);

					confirm(
						`Successfully sent to Telegram ${chatId} \nHTML Preview: \n${formattedMessage}`
					);
				} else {
					console.log(`${chatId} Error: ${data.error_code} \n${data.description}`);

					alert(`${chatId} Error: ${data.error_code} \n${data.description}`);
				}
			})
			.catch((error) => console.error('Error sending message:', error));
	});
});
