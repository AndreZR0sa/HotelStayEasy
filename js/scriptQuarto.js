const quartoForm = document.getElementById("quartoForm");
const selecaoHotel = document.getElementById("hotel");

const apiUrl = "http://localhost:5280/api/Hoteis";
const apiUrlQuartos = "http://localhost:5280/api/Quartos";

document.addEventListener("DOMContentLoaded", function() {
    const backBtn = document.getElementById("backBtn");

    backBtn.addEventListener("click", function() {
        window.location.href = "index.html";
    });
});

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