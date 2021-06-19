/*
    Forca.js disponibiliza e possibilita o manuseio de um game do tipo forca. Contem variaveis 
    para armazenamento e funções internas para manuseio dos dados e para interligação visual dos dados.
    Este conjunto de funções interligam a interface html as funções que rodam o game.
    Eduardo Pereira de Almeida
    15/06/2021
*/


let tentativasFinais;
let tentativasMaximas;
let animeInicial;
let animeFinal;
let listaAnimes = [];
let incognita = "█ ";
let listaCarregada = false;

function start() {
    animeInicial = [];
    animeFinal = [];
    if (listaCarregada === false) {
        carregarJSON((response) => {
            primeiraInstancia(JSON.parse(response));
        })
        listaCarregada = true;
        tentativasFinais = 6;
        tentativasMaximas = 6;
    } else {
        if (listaAnimes.length === 1) {
            listaCarregada = false;
        }
        reloadInstancia();

    }
}

function verificarLetra(letra) {
    let ocorrencias = 0;
    for (let i = 0; i < animeFinal.length; i++) {
        if ((animeFinal[i] === letra.toUpperCase()) && (animeInicial[i] === incognita)) {
            animeInicial[i] = letra.toUpperCase();
            ocorrencias++;
        }
    }
    return ocorrencias;
}

function carregarJSON(callback) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'animes.json', true);
    xobj.onreadystatechange = () => {
        if (xobj.readyState === 4 && xobj.status === 200) {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function primeiraInstancia(response) {
    response.forEach(nome => {
        listaAnimes.push(Object.values(nome)[0].toUpperCase());
    });
    reloadInstancia();
}

function reloadInstancia() {
    animeFinal = listaAnimes.pop().split('');
    for (let i = 0; i < animeFinal.length; i++) {
        if (animeFinal[i] === " ") {
            animeInicial.push(" ");
        } else {
            animeInicial.push(incognita);
        }
    }
    tentativasFinais = 6;
    atualizarVidas();
    atualizarLetrasAnime();
    iniciarBotoesLetras();
    document.getElementById("sec-vidas").style.visibility = "visible";
    document.getElementById("sec-charada").style.visibility = "visible";
    document.getElementById("sectionLetras").style.visibility = "visible";
}


function atualizarLetrasAnime() {
    let temp = [];
    animeInicial.forEach(letra => {
        if (letra === " ") {
            temp.push("&ensp;");
        } else {
            temp.push(letra + " ");
        }
    })
    document.getElementById("div-charada").innerHTML = "<h5>" + temp.join('') + "</h5>";
}

function atualizarVidas() {
    let vidas = String();
    for (let i = 0; i < tentativasMaximas; i++) {
        if (i < tentativasFinais) {
            vidas += '<a><i class="material-icons red-text small" >favorite</i></a>';
        } else {
            vidas += '<a><i class="material-icons red-text small" >favorite_border</i></a>';
        }
    }
    document.getElementById("div-vidas").innerHTML = vidas;
}

function iniciarBotoesLetras() {
    let innertInicial = '<a class="btn-floating green letraChute" id="letra-A" onclick="atualizarBotoesLetras(this.id)">A</a>\n' +
        '                <a class="btn-floating green letraChute" id="letra-B" onclick="atualizarBotoesLetras(this.id)">B</a>\n' +
        '                <a class="btn-floating green letraChute" id="letra-C" onclick="atualizarBotoesLetras(this.id)">C</a>\n' +
        '                <a class="btn-floating green letraChute" id="letra-D" onclick="atualizarBotoesLetras(this.id)">D</a>\n' +
        '                <a class="btn-floating green letraChute" id="letra-E" onclick="atualizarBotoesLetras(this.id)">E</a>\n' +
        '                <a class="btn-floating green letraChute" id="letra-F" onclick="atualizarBotoesLetras(this.id)">F</a>\n' +
        '                <a class="btn-floating green letraChute" id="letra-G" onclick="atualizarBotoesLetras(this.id)">G</a>\n' +
        '                <a class="btn-floating green letraChute" id="letra-H" onclick="atualizarBotoesLetras(this.id)">H</a>\n' +
        '                <a class="btn-floating green letraChute" id="letra-I" onclick="atualizarBotoesLetras(this.id)">I</a>\n' +
        '                <a class="btn-floating green letraChute" id="letra-J" onclick="atualizarBotoesLetras(this.id)">J</a>\n' +
        '                <a class="btn-floating green letraChute" id="letra-K" onclick="atualizarBotoesLetras(this.id)">K</a>\n' +
        '                <a class="btn-floating green letraChute" id="letra-L" onclick="atualizarBotoesLetras(this.id)">L</a>\n' +
        '                <a class="btn-floating green letraChute" id="letra-M" onclick="atualizarBotoesLetras(this.id)">M</a>\n' +
        '                <a class="btn-floating green letraChute" id="letra-N" onclick="atualizarBotoesLetras(this.id)">N</a>\n' +
        '                <a class="btn-floating green letraChute" id="letra-O" onclick="atualizarBotoesLetras(this.id)">O</a>\n' +
        '                <a class="btn-floating green letraChute" id="letra-P" onclick="atualizarBotoesLetras(this.id)">P</a>\n' +
        '                <a class="btn-floating green letraChute" id="letra-Q" onclick="atualizarBotoesLetras(this.id)">Q</a>\n' +
        '                <a class="btn-floating green letraChute" id="letra-R" onclick="atualizarBotoesLetras(this.id)">R</a>\n' +
        '                <a class="btn-floating green letraChute" id="letra-S" onclick="atualizarBotoesLetras(this.id)">S</a>\n' +
        '                <a class="btn-floating green letraChute" id="letra-T" onclick="atualizarBotoesLetras(this.id)">T</a>\n' +
        '                <a class="btn-floating green letraChute" id="letra-U" onclick="atualizarBotoesLetras(this.id)">U</a>\n' +
        '                <a class="btn-floating green letraChute" id="letra-V" onclick="atualizarBotoesLetras(this.id)">V</a>\n' +
        '                <a class="btn-floating green letraChute" id="letra-W" onclick="atualizarBotoesLetras(this.id)">W</a>\n' +
        '                <a class="btn-floating green letraChute" id="letra-X" onclick="atualizarBotoesLetras(this.id)">X</a>\n' +
        '                <a class="btn-floating green letraChute" id="letra-Y" onclick="atualizarBotoesLetras(this.id)">Y</a>\n' +
        '                <a class="btn-floating green letraChute" id="letra-Z" onclick="atualizarBotoesLetras(this.id)">Z</a>';
    document.getElementById("div-btnLetras").innerHTML = innertInicial;
}

function atualizarBotoesLetras(idButtonLetra) {
    if (verificarLetra(document.getElementById(idButtonLetra).innerText) === 0) {
        tentativasFinais--;
        document.getElementById(idButtonLetra).style.border = "1px solid red";
        atualizarVidas();
    } else {
        document.getElementById(idButtonLetra).style.border = "1px solid #4caf50";
        atualizarLetrasAnime();
    }
    document.getElementById(idButtonLetra).classList.add('disabled');
    fimDeJogo();
}

function fimDeJogo() {
    let origem = animeFinal.join('');
    let tentativa = animeInicial.join('');
    if (origem === tentativa) {
        document.getElementById("div-charada").innerHTML =
            "<p style='color: forestgreen; font-weight: bolder;'>ESPIRITO OTAKU!!!</p>" +
            "<h5>" + animeFinal.join('') + "</h5>";
        document.getElementById("sectionLetras").style.visibility = "hidden";
        return true;
    }
    if (tentativasFinais === 0) {
        document.getElementById("div-charada").innerHTML =
            "<p style='color: darkred; font-weight: bolder;'>SUAS VIDAS ACABRAM, VOCÊ FOI ENFORCADO!</p>" +
            "<h5>" + animeFinal.join('') + "</h5>";
        document.getElementById("sectionLetras").style.visibility = "hidden";
        return true;
    }

}
