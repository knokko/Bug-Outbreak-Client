const AUTH_SERVER_IP = '192.168.2.17';
const AUTH_SERVER_PORT = 42649;
const MAX_USERNAME_LENGTH = 30;

function weirdServerResponse(){
	console.log('Weird auth server response');
	window.alert('The authentication server is acting weird, this can be a bug, a connection problem or a corrupt server');
}

function weirdProfileServerResponse(){
	console.log('Weird profile server response');
	window.alert('The profile server is acting weird, this can be a bug, a connection problem or a corrupt server');
}