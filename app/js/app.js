import intlTelInput from 'intl-tel-input';

document.addEventListener('DOMContentLoaded', () => {
	// Custom JS
	const input = document.querySelector('#phone');

	intlTelInput(input, {
		initialCountry: 'ua',
		strictMode: true,
		separateDialCode: true,
		utilsScript: './app.min.js',
	});

	const form = document.getElementById('form');

	form.addEventListener('submit', (event) => {
		event.preventDefault(); // Prevent default form submission

		const name = document.getElementById('name').value;
		const phone = document.getElementById('phone').value;
		const email = document.getElementById('email').value;

		const jsonData = {
			name: name,
			phone: phone,
			email: email,
		};

		confirm('Form Data: ' + JSON.stringify(jsonData));
	});
});
