let tentativasFinais;
let tentativasMaximas;
let animeInicial = [];
let animeFinal;
let listaAnimes = [];

function inicializar() {
    carregarJSON((response) => {
        let temp = JSON.parse(response);
        jsonToArray(temp);
    })
    tentativasFinais = 6;
    tentativasMaximas = 6;
    prepararForca();
}

function prepararForca() {
    animeFinal = listaAnimes.pop().split('');
    for (let i = animeFinal.length; i > 0; i--) {
        animeInicial.push("");
    }
}

function verificarLetra(letra) {
    let ocorrencias = 0;
    for (let i = 0; i < animeFinal.length; i++) {
        if ((animeFinal[i] === letra.toUpperCase()) && (animeInicial[i] === '')) {
            animeInicial[i] = letra.toUpperCase();
            ocorrencias++;
        }
    }
    return ocorrencias;
}

function dicaLetra() {
    while ((verificarLetra((animeFinal)[Math.floor(Math.random() * animeFinal.length)]) === 0) && (animeInicial !== animeFinal)) {
    }
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

function jsonToArray(response) {
    response.forEach(nome => {
        listaAnimes.push(Object.values(nome)[0].toUpperCase());
    });
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

function testarLetraEscolhida(idButtonLetra) {
    if (verificarLetra(document.getElementById(idButtonLetra).innerText) === 0) {
        tentativasFinais--;
        document.getElementById(idButtonLetra).style.border = "1px solid red";
        atualizarVidas();
    }else{
        document.getElementById(idButtonLetra).style.border = "1px solid #4caf50";
    }
    document.getElementById(idButtonLetra).classList.add('disabled');
}
