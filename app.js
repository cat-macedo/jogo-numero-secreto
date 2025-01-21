let numerosSorteados = []; // Manter uma lista de números já sorteados
let numeroMaximo = 10;
let numeroSecreto = gerarNumero();
let tentativas = 1;

/* Adicionando texto à tag h1 (título), anteriormente vazia, através do JS */
// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

/* Adicionando texto à tag p, anteriormente vazia, através do JS */
// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número de 1 a 10';

/* Melhorando as linhas acima com uma função */
// JS não é tipado, então não preciso dizer os tipos dos parâmetros
function exibirNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    // Usando responsive voice
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

/* Função nova */
function exibirMsgInicial() {
    exibirNaTela('h1', 'Jogo do número secreto');
    exibirNaTela('p', 'Escolha um número de 1 a 10');
}

exibirMsgInicial();

/* Função para gerar número aleatório */
function gerarNumero() {
    let numero = parseInt(Math.random() * numeroMaximo + 1);

    // Esvaziar a lista se todas as possibilidades já tiverem sido sorteadas
    // Se não, quando clico em Novo Jogo, temos um erro
    let tamLista = numerosSorteados.length;
    if(tamLista == numeroMaximo) {
        numerosSorteados = [];
    }

    // Incluir o número na lista apenas se ele ainda não foi sorteado (evitar repetição)
    if(numerosSorteados.includes(numero)) {
        return gerarNumero();
    } else {
        numerosSorteados.push(numero);
        console.log(numero);
        return numero;
    }
}

/* Função para limpar input */
function limparCampo() {
    let campo = document.querySelector('input');
    campo.value = '';
}

/* Função acionada para verificar o chute (ao clicar no botão) */
function verificarChute() {
    let chute = document.querySelector('input').value; // pegar o valor inserido pelo usuário
    if(chute == numeroSecreto) {
        exibirNaTela('h1', 'Acertou!');

        // O html não suportaria diretamente uma template string
        // Estamos usando para deixar dinâmico o número de tentativas
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTent = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirNaTela('p', mensagemTent);

        // Quando acertar, quero habilitar o botão de Novo Jogo
        // Como tenho vários botões, vou identificá-lo pelo id
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        if (chute > numeroSecreto) {
            exibirNaTela('p', 'O número secreto é menor');
        } else {
            exibirNaTela('p', 'O número secreto é maior');
        }
        tentativas++;

        // Quando errar, quero limpar o input para uma nova tentativa
        limparCampo();
    }
}

/* Função para reiniciar o jogo */
function reiniciarJogo() {
    numeroSecreto = gerarNumero();
    tentativas = 1;
    limparCampo();

    // Mudar o texto do h1 e do p, usando uma função (evitar copiar e colar)
    exibirMsgInicial();

    // Desabilitar o botão de Novo Jogo -> setar o disabled para true
    document.getElementById('reiniciar').setAttribute('disabled', true);
}


