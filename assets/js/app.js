//NAvbar animation links
$('.navbar-nav a, #botao-portfolio').click(function(e){
	e.preventDefault();

	var id = $(this).attr('href')
		var menuHeight = ($('nav').innerHeight()),
			targetOffset = $(id).offset().top;

    $('html, body').animate({
        scrollTop: targetOffset
    }, 720);
});

$('#volta-topo').click(function(e){
	e.preventDefault();

    $('html, body').animate({
        scrollTop: 0
    }, 1250);
});




formulario = document.querySelector('#form-contato');

formulario.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
	event.preventDefault();
	document.querySelector('#enviar').remove();

	const divForm = document.querySelector('#formulario');
	const p = document.createElement('p');
	p.innerHTML = 'Carregando... Por favor, aguarde!'
	p.className = 'btn btn-primary';
	p.id = 'sendInformation'

	const divCarregando = document.createElement('div');
	divCarregando.className = 'c-loader';
	divCarregando.id = 'c-loader';


	divForm.appendChild(p);
	divForm.appendChild(divCarregando);

    nome = document.getElementsByName('nome')[0]
	email = document.getElementsByName('email')[0];
	telefone = document.getElementsByName('telefone')[0];
	mensagem = document.getElementsByName('mensagem')[0];

	const data = {
        nome: nome.value,
		email: email.value,
		telefone: telefone.value,
		mensagem: mensagem.value,
	}

    nome.value = '';
	email.value = '';
	telefone.value = '';
	mensagem.value = '';

	

	const readyData = JSON.stringify(data)

	const ajax = new XMLHttpRequest();

	ajax.open('POST', 'envia_email.php');
	ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	ajax.send(readyData)

	ajax.onreadystatechange = function () {
		// O código escrito aqui será executada toda vez em que haja progresso na chamada HTTP.
		// O estado atual pode ser consultado através do `this.readyState`, que retorna um valor entre 0 e 4 (inclusive).
	  
		if (this.readyState == 4) { // Se a chamada HTTP completou
		  if (this.status == 200) { // Se o código da chamada HTTP é 200 (isto é, sucesso)
			divCarregando.remove()

			var response = JSON.parse(this.responseText);
			 // Busca a resposta da chamada

			if(response.enviado == true){
				document.querySelector('#sendInformation').className = 'btn btn-success';
				document.querySelector('#sendInformation').innerHTML = "Enviado com sucesso, agradecemos seu contato!"
			}

			if(response.enviado == false){
				document.querySelector('#sendInformation').className = 'btn btn-danger';
				document.querySelector('#sendInformation').innerHTML = "Houve um erro, tente mais tarde!"
			}
		  };
		};
	};

	


}