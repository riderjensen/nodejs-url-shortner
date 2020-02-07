const submitButton = document.getElementById('submitButton');
const URLBox = document.getElementById('expURL');
const IDBox = document.getElementById('expShortID');
const ourErrorHtml = document.getElementById('errorArea');

submitButton.addEventListener('click', (event) => {
	event.preventDefault();
	URLBox.value === '' ? createErr('Missing URL', 'danger') : fetchInfo();
})

function createErr(text, errorColor) {
	URLBox.className += ` border border-${errorColor}`
	ourErrorHtml.setAttribute('class', `alert alert-${errorColor}`);
	ourErrorHtml.setAttribute('role', 'alert');
	ourErrorHtml.innerText = text;

}

function fetchInfo() {
	let myRequestVar;
	IDBox.value === '' ? myRequestVar = '5c7df95bcd19ac2d58fb4aa0' : myRequestVar = IDBox.value;
	return fetch(`/c/${myRequestVar}`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			url: URLBox.value,
		})
	}).then(response => {
		return response.json();
	}).then(myJson => {
		console.log(myJson);
		document.getElementById('cardTitle').innerHTML = `<a target="_blank" href="/${myJson.resp.shortId}">${myJson.resp.shortId}</a>`;
	}).catch(err => console.log(err));

}