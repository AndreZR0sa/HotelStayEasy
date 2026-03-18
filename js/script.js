const hotelForm = document.getElementById("hotelForm");
const apiUrl = "http://localhost:5280/api/Hoteis";
const divCards = document.getElementById("cards");

document.addEventListener("DOMContentLoaded", function() {
        const nextBtn = document.getElementById("nextBtn");

        nextBtn.addEventListener("click", function() {
            // Redireciona para a próxima página
            window.location.href = "quarto.html";
        });
    });

async function buscarHoteis(){
    try{
        const resposta = await fetch(apiUrl);
        if(!resposta.ok){
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        const dados = await resposta.json();
        divCards.innerHTML = "";
        dados.forEach((dado) => {
            let card = document.createElement("div");
            card.classList.add("card");
            const estrelasCheias = "⭐".repeat(dado.qtdEstrelas);
            const estrelasVazias = "☆".repeat(5 - dado.qtdEstrelas);
            const estrelas = estrelasCheias + estrelasVazias;
            card.innerHTML = card.innerHTML = `
                        <h2>${dado.nome}</h2>
                        <p>${estrelas}</p>
                        <button onclick="mostrarDetalhes(${dado.id})" class="avanVol">Ver Detalhes</button>
                        <div id="detalhes_hotel_${dado.id}" style="display:none"></div>
                        `;
            divCards.appendChild(card);
        });
    } catch (error){
        console.error("Erro ao buscar hotéis:", error);
    }
}

async function mostrarDetalhes(hotelId){
    const detalhesDiv = document.getElementById(`detalhes_hotel_${hotelId}`);
    if (detalhesDiv.style.display === "none"){
        detalhesDiv.style.display = "block";
        mostrarQuartos(hotelId);
    } else{
        detalhesDiv.style.display = "none";
            detalhesDiv.innerHTML = "";
    }
}

async function mostrarQuartos(hotelId){
    try{
        const response = await fetch(`${apiUrl}/${hotelId}`);

        if(response.ok){
            const hotel = await response.json();
            console.log("Quartos: ", hotel.quartos);
            const detalhesDiv = document.getElementById(`detalhes_hotel_${hotelId}`);
            let quartosHTML = "<h4>Quartos:</h4>";
            hotel.quartos.forEach((quarto) => {
                quartosHTML += `<div class="quarto-card">
                                <h5>Tipo: ${quarto.tipo}</h5>
                                <p> R$${quarto.preco}</p>
                                </div>`;
            });
            detalhesDiv.innerHTML += quartosHTML;
        }
    } catch (error) {
        console.log("Erro ao carregar quartos: ", error)
    }
}

async function cadastrarHotel(event){
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const cidade = document.getElementById("cidade").value;
    const qtdEstrelas = parseInt(document.getElementById("estrelas").value);
    try{
        const resposta = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                cidade: cidade,
                qtdEstrelas: qtdEstrelas
            })
        });
        console.log("Resposta da API:", resposta);
        if(!resposta.ok){
            console.error("Erro ao cadastrar hotel:", resposta);
        }
        const dados = await resposta.json();
        console.log("Hotel cadastrado:", dados);
        hotelForm.reset();
        await buscarHoteis();
    } catch (error){
        console.error("Erro ao cadastrar hotel:", error);
    }
}

hotelForm.addEventListener("submit", cadastrarHotel);
buscarHoteis();