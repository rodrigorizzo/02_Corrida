let jogadores = [];

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
                    jogadores.push(personagemSelecionado);

                    // selecionar aleatoriamente o player 2 diferente do player 1
                    let p2Index;
                    do {
                        p2Index = Math.floor(Math.random() * personagens.length);
                    } while (
                        personagens[p2Index].nome.toLowerCase() === selecionado.toLowerCase()
                    );

                    jogadores.push(personagens[p2Index]);

                    console.log(
                        `Você selecionou ${jogadores[0].nome} e seu oponente é ${jogadores[1].nome}`
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

async function rolarDados() {
    return Math.floor(Math.random() * 6) + 1;
}

async function inicioCorrida() {
    console.log(`🏁🚦 Corrida entre ${jogadores[0].nome} e ${jogadores[1].nome} começando...\n`);
}


async function engineCorrida(jogadores) {
    for (let round = 1; round <= 5; round++) {
        let bloco = await selecionarBloco();

        const relacaoBlocoHabilidade = {
            "RETA": "velocidade",
            "CURVA": "manobrabilidade",
            "CONFRONTO": "poder"
        }

        console.log(`Rodada ${round}`);
        console.log(`Bloco: ${bloco}`);

        // as info necessarias do player estao em um array que pode ser expandido
        let infoPlayers = [];
        for (const p of jogadores) {
            const dado = await rolarDados();
            const tipoModificador = relacaoBlocoHabilidade[bloco];

            infoPlayers.push({
                nome: p.nome,
                resultadoDado: dado,
                modificador: p[tipoModificador],
                tipoModificador: tipoModificador,
                get pontuacao() {
                    return this.resultadoDado + this.modificador
                }
            })
        }

        let vencedor = { nome: "", pontuacao: 0 }

        infoPlayers.forEach(p => {
            console.log(
                `${p.nome} 🎲 rolou um dado de ${p.tipoModificador} ${p.resultadoDado} + ${p.modificador} = ${p.pontuacao}`
            );

            if (vencedor.pontuacao < p.pontuacao) {
                vencedor.nome = p.nome;
                vencedor.pontuacao = p.pontuacao;
            } else if (vencedor.pontuacao == p.pontuacao) {
                vencedor.nome = "";
            }
        })


        jogadores.find(jogador => {
            if (jogador.nome == vencedor.nome) jogador.pontos++;
        })

        const msgm = vencedor.nome == "" ? "Empate!" : `${vencedor.nome} marcou um ponto!`;
        console.log(msgm)
        console.log("---------------------------------")




    }
}

async function selecionarBloco() {
    const random = Math.random();

    switch (true) {
        case random < 0.33:
            return "RETA";
        case random < 0.66:
            return "CURVA";
        default:
            return "CONFRONTO"
    }
}

async function declararVencedor(jogadores) {
    let vencedor = { nome: "", pontos: 0 }

    for (const j of jogadores) {
        console.log(
            `Pontos de ${j.nome}: ${j.pontos} `
        )
        if (vencedor.pontos < j.pontos) {
            vencedor.nome = j.nome;
            vencedor.pontos = j.pontos;
        } else if (vencedor.pontos == j.pontos) {
            vencedor.nome = "";
        }
    }

    const msgm = vencedor.nome == "" ? "Empate!" : `${vencedor.nome} Ganhou!🥇`;
    console.log(`\n\n\n${msgm}`)


}


(async function main() {
    await selecionarPersonagem();
    await inicioCorrida();
    await engineCorrida(jogadores);
    await declararVencedor(jogadores);
    readline.close();
})();





