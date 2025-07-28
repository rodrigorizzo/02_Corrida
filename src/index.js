const { resolve } = require('path');

let player1 = {};

let player2 = {};

const personagens = [
    {
        nome: "Mario",
        velocidade: 4,
        manobrabilidade: 3,
        poder: 3,
        pontos: 0
    }, {
        nome: "Peach",
        velocidade: 3,
        manobrabilidade: 4,
        poder: 2,
        pontos: 0
    }, {
        nome: "Yoshi",
        velocidade: 2,
        manobrabilidade: 4,
        poder: 3,
        pontos: 0
    }, {
        nome: "Bowser",
        velocidade: 4,
        manobrabilidade: 2,
        poder: 5,
        pontos: 0
    }, {
        nome: "Luigi",
        velocidade: 3,
        manobrabilidade: 4,
        poder: 4,
        pontos: 0
    }, {
        nome: "Donkey Kong",
        velocidade: 3,
        manobrabilidade: 2,
        poder: 5,
        pontos: 0
    }
]

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

async function selecionarPersonagem() {

    console.log(`Escolha o personagem para competir na corrida. \nVocê pode escolher entre:${personagens.map((p) => " " + p.nome)}.`)

    return new Promise((resolve) => {
        readline.question(
            'Digite o nome de seu personagem:',
            async (selecionado) => {
                //.find()
                const personagemSelecionado = personagens.find(
                    (p) => p.nome.toLowerCase() === selecionado.toLowerCase()
                );

                // verdadeiro se personagemSelecionado não estiver vazio
                if (personagemSelecionado) {
                    player1 = { ...personagemSelecionado };


                    // selecionar aleatoriamente o player 2 diferente do player 1
                    let p2Index;
                    do {
                        p2Index = Math.floor(Math.random() * personagens.length);
                    } while (
                        personagens[p2Index].nome.toLowerCase() === selecionado.toLowerCase()
                    );

                    player2 = {...personagens[p2Index]};
                    console.log(
                        `Você selecionou ${player1.nome} e seu oponente é ${player2.nome}`
                    );
                    resolve();
                } else {
                    console.log(
                        `Personagem "${selecionado}" não encontrado. Digite novamente.`
                    )
                    await selecionarPersonagem().then(resolve);
                }
            }
        )
    })
}

async function inicioCorrida() {
    console.log(`🏁🚦 Corrida entre ${player1.nome} e ${player2.nome} começando...\n`);
}


(async function main() {
    await selecionarPersonagem();
    await inicioCorrida();
    readline.close();
})();





