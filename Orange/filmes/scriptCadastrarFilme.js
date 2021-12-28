class Filme{
	constructor(titulo, categoria){
		this.titulo = titulo
		this.categoria = categoria
	}

	validarFilme(){
		if(this.titulo == '' || this.titulo == null){
			return 1
		}
	}
}

class Bd{
    constructor(){
        let id = localStorage.getItem('id')
        if(id === null || id == undefined || id == ''){
        	localStorage.setItem('id', 0)
        }
	}

	getProximoId(){
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId)+1
	}

	gravar(d){
		let id = this.getProximoId()
		localStorage.setItem(id, JSON.stringify(d))
		localStorage.setItem('id', id)
	}

	mostrarFilmes(){
		let filmes = Array()
		let id = localStorage.getItem('id')

		for(var i = 1; i <= id; i ++){
			let filme = JSON.parse(localStorage.getItem(i))

			if(filme === null){
				continue	
			}
			filmes.push(filme)
		}
		return filmes
	}
}

let bd = new Bd()

function cadastrarFilme(){

	let tituloFilme = $('#tituloFilme').val()
	let categoriaFilme = $('#categoriaFilme').val()

	if(tituloFilme == '' || categoriaFilme == ''){
		$('#validarModal').modal('show')
		$('#titulo_modal').attr('class', 'text-danger')
		document.getElementById('titulo_modal').innerHTML = 'Erro!'
		$('#btnModal').attr('class', 'btn btn-danger')
		document.getElementById('btnModal').innerHTML = 'Corrigir'
		$('#corpoModal').attr('class', 'text-danger')
		document.getElementById('corpoModal').innerHTML = 'Verifique os campos'

	}else{
		$('#validarModal').modal('show')
		$('#titulo_modal').attr('class', 'text-success')
		document.getElementById('titulo_modal').innerHTML = 'Sucesso!'
		$('#btnModal').attr('class', 'btn btn-success')
		document.getElementById('btnModal').innerHTML = 'Ok!'
		$('#corpoModal').attr('class', 'text-success')
		document.getElementById('corpoModal').innerHTML = 'Filme Cadastrado.'

		let tituloFilme = $('#tituloFilme')
		let categoriaFilme = $('#categoriaFilme')
		let filme = new Filme(tituloFilme.val(), categoriaFilme.val())
		bd.gravar(filme)
	}


}

function mostrarFilmes(){
	let filmes = Array()
	filmes = bd.mostrarFilmes()
	let listaFilmes = document.getElementById('listaFilmes')

	filmes.forEach(function(d){

		console.log(d)
		$("#filmesCadastrados").append(`
				<div class="card" style="width: 16.5rem;">
					<img class="card-img-top mt-3" src="${d.categoria}">
					<div class="card-body">
						<h5 class="card-title">${d.titulo}</h5>
						<p class="card-text"></p>
						<button class="btn" onclick="">Assistir</button>
					</div>
				</div>`);
	})

	
}