
function trocarPagina() {
    document.getElementById("tela1").style.display = "none";
    document.getElementById("tela2").style.display = "block";
}


// ⭐ RASTRO DE ESTRELAS

const rastro = document.getElementById("rastro");
const tela2 = document.getElementById("tela2");

function criarEstrela(x, y) {
    // Só cria estrelas quando a tela 2 está visível
    if (getComputedStyle(tela2).display === "none") return;

    // Evita criar estrelas demais
    if (Math.random() > 0.4) return;

    const estrela = document.createElement("span");

    estrela.classList.add("estrelinha");
    estrela.textContent = "✦";

    // Posição da estrela na tela
    estrela.style.left = x + "px";
    estrela.style.top = y + "px";

    rastro.appendChild(estrela);

    // Remove a estrela depois da animação
    setTimeout(function() {
        estrela.remove();
    }, 1500);
}


// Funciona com mouse e com o dedo no celular
document.addEventListener("pointermove", function(event) {
    criarEstrela(event.clientX, event.clientY);
});


// ⭐ PRÓXIMA TELA

function irParaTela3() {
    document.getElementById("tela2").style.display = "none";
    document.getElementById("tela3").style.display = "block";
}


// 🎨 QUADRO DE DESENHO

const quadro = document.getElementById("quadro");
const pincel = quadro.getContext("2d");

let desenhando = false;
let ferramenta = "lapis";

pincel.lineWidth = 4;
pincel.lineCap = "round";
pincel.lineJoin = "round";

function mudarFerramenta(novaFerramenta) {
    ferramenta = novaFerramenta;
}


// Começa a desenhar
quadro.addEventListener("pointerdown", function(evento) {
    desenhando = true;

    quadro.setPointerCapture(evento.pointerId);

    const pos = quadro.getBoundingClientRect();

    pincel.beginPath();

    pincel.moveTo(
        (evento.clientX - pos.left) * quadro.width / pos.width,
        (evento.clientY - pos.top) * quadro.height / pos.height
    );
});


// Continua o desenho
quadro.addEventListener("pointermove", function(evento) {
    if (!desenhando) return;

    const pos = quadro.getBoundingClientRect();

    pincel.lineTo(
        (evento.clientX - pos.left) * quadro.width / pos.width,
        (evento.clientY - pos.top) * quadro.height / pos.height
    );

    if (ferramenta === "borracha") {
        pincel.strokeStyle = "white";
        pincel.lineWidth = 20;
    } else {
        pincel.strokeStyle = document.getElementById("cor").value;
        pincel.lineWidth = 4;
    }

    pincel.stroke();
});


// Para de desenhar
function pararDesenho() {
    desenhando = false;
    pincel.beginPath();
}

quadro.addEventListener("pointerup", pararDesenho);
quadro.addEventListener("pointercancel", pararDesenho);
quadro.addEventListener("lostpointercapture", pararDesenho);


// Limpa o quadro
function limparQuadro() {
    pincel.clearRect(0, 0, quadro.width, quadro.height);
}


// ⭐ TELA DAS CARTINHAS

function irParaTela4() {
    document.getElementById("tela3").style.display = "none";
    document.getElementById("tela4").style.display = "block";
}


// Mensagens das cartinhas
const cartinhas = [
    {
        titulo: "Cartinha 1",
        mensagem: "Você é a pessoa mais importante da minha vida :P"
    },
    {
        titulo: "Cartinha 2",
        mensagem: "Mesmo nos dias difíceis, você merece carinho e cuidado."
    },
    {
        titulo: "Cartinha 3",
        mensagem: "Nunca tenha vergonha de pedir ajuda. Você não precisa enfrentar tudo sozinha."
    },
    {
        titulo: "Cartinha 4",
        mensagem: "Obrigada por fazer parte da minha vida. Torço muito pela sua felicidade!"
    },
    {
        titulo: "Cartinha 5",
        mensagem: "Você merece o mundo :3"
    },
    {
        titulo: "Cartinha 6",
        mensagem: "Seus poemas são os melhores!!!"
    }
];

let cartaAtual = 0;


// Mostra a cartinha atual
function mostrarCarta() {
    document.getElementById("conteudoCarta").innerHTML = `
        <h2>${cartinhas[cartaAtual].titulo}</h2>
        <p>${cartinhas[cartaAtual].mensagem}</p>
    `;

    document.getElementById("voltarCarta").style.display =
        cartaAtual === 0 ? "none" : "inline-block";

    document.getElementById("proximaCarta").textContent =
        cartaAtual === cartinhas.length - 1
            ? "Ler novamente ↻"
            : "Próxima ▶";
}


// Vai para a próxima cartinha
function proximaCarta() {
    if (cartaAtual < cartinhas.length - 1) {
        cartaAtual++;
    } else {
        cartaAtual = 0;
    }

    mostrarCarta();
}


// Volta para a cartinha anterior
function voltarCarta() {
    if (cartaAtual > 0) {
        cartaAtual--;
        mostrarCarta();
    }
}


// Mostra a primeira cartinha ao abrir o site
mostrarCarta();
