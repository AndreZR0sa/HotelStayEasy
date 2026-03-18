const quartoForm = document.getElementById("quartoForm");
const selecaoHotel = document.getElementById("hotel");

const apiUrl = "http://localhost:5280/api/Hoteis";
const apiUrlQuartos = "http://localhost:5280/api/Quartos";

const divCards = document.getElementById("cards");

document.addEventListener("DOMContentLoaded", function() {
    const backBtn = document.getElementById("backBtn");

    backBtn.addEventListener("click", function() {
        window.location.href = "index.html";
    });
});

async function buscarQuartos(){
    try{
        const resposta = await fetch(apiUrlQuartos)
        if (!resposta.ok){
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        const dados = await resposta.json();
        divCards.innerHTML = "";
        dados.forEach((dado) => {
            let card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = card.innerHTML = `
                        <h2>Quarto ${dado.id}</h2>
                        <h3>Hotel: ${dado.nomeHotel}</h3>
                        <p>Tipo: ${dado.tipo}</p>
                        <button onclick="mostrarDetalhes(${dado.id})" class="avanVol">Ver Detalhes</button>
                        <div id="detalhes_quarto_${dado.id}" style="display:none"></div>
                        `
                divCards.appendChild(card);
        });
    } catch (error){
        console.error("Erro ao buscar quartos:", error);
    }
}

async function mostrarDetalhes(quartoId){
    const detalhesDiv = document.getElementById(`detalhes_quarto_${quartoId}`);
    if (detalhesDiv.style.display === "none"){
        detalhesDiv.style.display = "block";
        mostrarQuartos(quartoId);
    } else{
        detalhesDiv.style.display = "none";
            detalhesDiv.innerHTML = "";
    }
}

async function mostrarQuartos(quartoId){
    try{
        const response = await fetch(`${apiUrlQuartos}/${quartoId}`);

        if(response.ok){
            const quarto = await response.json(); // 👈 é UM objeto

            const detalhesDiv = document.getElementById(`detalhes_quarto_${quartoId}`);
            
            let quartosHTML = `
                <div class="quarto-card">
                    <h4>Preço: R$ ${quarto.preco}</h4>
                </div>
            `;

            detalhesDiv.innerHTML += quartosHTML;
        }
    } catch (error) {
        console.log("Erro ao carregar quartos: ", error)
    }
}

async function carregarHoteis(){
    try{
        const response = await fetch(apiUrl);

        if(!response.ok){
            throw new Error(`Falha ao carregar os hotéis: ${response.status}`);
        }

        const hoteis = await response.json();

        console.log("Hoteis carregados:", hoteis);

        selecaoHotel.innerHTML = "<option value=''>Selecione um hotel</option>";

        hoteis.forEach((hotel) => {
            const option = document.createElement("option");

            option.value = hotel.id;
            option.textContent = hotel.nome;

            selecaoHotel.appendChild(option);
        });

    } catch (error) {
        console.log(error);
    }
}

async function cadastrarQuarto(event){
    event.preventDefault();

    const tipo = document.getElementById("tipo").value;
    const preco = parseFloat(document.getElementById("preco").value);
    const hotelId = parseInt(document.getElementById("hotel").value);

    try{
        const resposta = await fetch(apiUrlQuartos, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                hotelId: hotelId,
                tipo: tipo,
                preco: preco
            })
        });

        if(!resposta.ok){
            throw new Error("Erro ao cadastrar quarto");
        }

        const dados = await resposta.json();

        console.log("Quarto cadastrado:", dados);

        quartoForm.reset();

    } catch (error){
        console.error("Erro ao cadastrar quarto:", error);
    }
}

quartoForm.addEventListener("submit", cadastrarQuarto);

carregarHoteis();
buscarQuartos();