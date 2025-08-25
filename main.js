let apiCarros = [];
let carroEditado = null;

fetch('carros.json')
 .then(response => {
    if (!response.ok) {
        throw Error("Erro na requisição"); 
    } 
        return response.json()
 })
 .then(data => {
    apiCarros = data.carros;
    renderizaCarros();
 })
 .catch(err => console.error(err))

function renderizaCarros(){
    let listaCarros = document.getElementById('listaCarros')
    listaCarros.innerHTML = "";

    apiCarros.forEach(( carro, index )=> {
        const carrosDaLista = document.createElement('li')
        
        carrosDaLista.innerHTML = `<div class="cardCarro">
            <img src="${carro.imagem}" alt="${carro.modelo}">
            <div class="cardCarroInfo">
                <h3>${carro.modelo}</h3> <h3>${carro.ano}</h3>
                <h3>${carro.marca}</h3>
                <div class="divCardBtns">
                    <button id="btnEditar" class="cardCarroBtn btnEditar" data-index="${index}" alt="editar">
                        <img src="/img/editar.jpg">
                    </button>
                    <button id="btnRemover" class="cardCarroBtn btnRemover" data-index="${index}" alt="remover">
                        <img src="./img/lixeira.webp">
                    </button>
                </div>
            </div>    
        </div>
        `;
    listaCarros.appendChild(carrosDaLista);
    })

    //Botão editar =>
    document.querySelectorAll('.btnEditar').forEach(btn =>{
        btn.addEventListener('click', function() {
            const i = this.dataset.index;
            const carro = apiCarros[i];

            document.getElementById('modelo').value = carro.modelo;
            document.getElementById('ano').value = carro.ano;
            document.getElementById('marca').value = carro.marca;
            document.getElementById('imagem').value = carro.imagem;

            carroEditado = i;
        });
    });

    //Botão remover =>
    document.querySelectorAll('.btnRemover').forEach(btn =>{
        btn.addEventListener('click', function() {
            const i = this.dataset.index;
            apiCarros.splice(i, 1)
            renderizaCarros()
        })
    })
}

function enviarDados(event) {
    event.preventDefault();
    let modelo = document.getElementById('modelo').value;
    let ano = document.getElementById('ano').value;
    let marca = document.getElementById('marca').value;
    let imagem = document.getElementById('imagem').value;

    if(modelo === "" || ano === "" || marca === "" || imagem === ""){
        alert("Está faltando algum dado, preencha o formulario novamente!");
        return
    }

    const novoCarro = { modelo, ano, marca, imagem };
    if(carroEditado === null){
        apiCarros.push(novoCarro)
    }else {
        apiCarros[carroEditado] = novoCarro;
        carroEditado = null
    }
    

    renderizaCarros();

    limparInput()
}

function limparInput() {
    document.getElementById('modelo').value = "";
    document.getElementById('ano').value = "";
    document.getElementById('marca').value = "";
    document.getElementById('imagem').value = "";
}
