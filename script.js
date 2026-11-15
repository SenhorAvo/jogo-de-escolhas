
/* ==========================================
   ESCOLHAS - CAPÍTULO 1: PET SHOP
   ========================================== */

// DADOS DO JOGADOR
let player = {
    name: "",
    money: 20,
    hunger: 20,
    health: 100,
    pet: "",
    petName: ""
};

// ANIMAIS DISPONÍVEIS
const pets = [
    "Cachorro",
    "Gato",
    "Coelho",
    "Hamster",
    "Tartaruga",
    "Periquito",
    "Papagaio",
    "Peixe",
    "Rato",
    "Lagarto",
    "Cobra",
    "Ouriço"
];

// MOSTRAR TELAS
function showScreen(screen) {
    document.getElementById("menu").hidden = screen !== "menu";
    document.getElementById("character").hidden = screen !== "character";
    document.getElementById("game").hidden = screen !== "game";
}

// ATUALIZAR DINHEIRO
function updateMoney() {
    document.getElementById("money").textContent =
        player.money.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
}

// ATUALIZAR STATUS
function updateStats() {
    updateMoney();
    document.getElementById("hunger").textContent = player.hunger;
    document.getElementById("health").textContent = player.health;
}

// MOSTRAR HISTÓRIA E OPÇÕES
function story(title, text, options) {
    showScreen("game");

    document.getElementById("chapter").textContent = "Capítulo 1";
    document.getElementById("storyTitle").textContent = title;
    document.getElementById("storyText").textContent = text;

    const area = document.getElementById("options");

    area.innerHTML = "";

    options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option.text;
        button.onclick = option.action;
        area.appendChild(button);
    });

    document.getElementById("feedback").hidden = true;
    updateStats();
}

// MENU E PERSONAGEM
function newGame() {
    player = {
        name: "",
        money: 20,
        hunger: 20,
        health: 100,
        pet: "",
        petName: ""
    };

    document.getElementById("playerName").value = "";
    showScreen("character");
}

function createCharacter() {
    const name = document.getElementById("playerName").value.trim();

    if (!name) {
        alert("Digite seu nome!");
        return;
    }

    const forbiddenNames = ["thierry", "alan"];

    if (forbiddenNames.includes(name.toLowerCase())) {
        alert("Coloca teu nome real seu baitola!");
        return;
    }

    player.name = name;
    showPetSelection();
}

function showCredits() {
    alert("ESCOLHAS\nUm jogo de decisões completamente duvidosas.");
}

function continueGame() {
    alert("Ainda não existe um progresso salvo.");
}

// ESCOLHA DO ANIMAL
function showPetSelection() {
    const options = pets.map((pet, index) => ({
        text: pet + " - R$ 21,00",
        action: () => selectPet(index)
    }));

    story(
        "🐾 ESCOLHA SEU PET",
        "Você entrou em um pet shop.\n\nO atendente apresenta os animais disponíveis.\n\nTodos custam R$ 21,00.\n\nVocê tem apenas R$ 20,00. Boa sorte.",
        options
    );
}

function selectPet(index) {
    player.pet = pets[index];
    showPetShop();
}

// PRIMEIRA CENA: PET SHOP
function showPetShop() {
    story(
        "🐾 PET SHOP",
        "Você escolheu: " + player.pet + ".\n\n" +
        "Você coloca seus R$ 20,00 no balcão.\n\n" +
        "Atendente: Ainda falta 1 real, amigo!",
        [
            {
                text: "A) Insistir para o vendedor aceitar os 20 reais.",
                action: choiceA
            },
            {
                text: "B) Mandar o atendente à merda.",
                action: choiceB
            },
            {
                text: "C) Falar sobre Attack on Titan.",
                action: choiceC
            },
            {
                text: "D) Fugir com o animal.",
                action: choiceD
            }
        ]
    );
}

// ==========================================
// OPÇÃO A - NEGOCIAR
// ==========================================

function choiceA() {
    story(
        "O NEGOCIADOR",
        "Você insiste para o vendedor aceitar os R$ 20.\n\n" +
        "Atendente: O atendente cruza os braços, irredutível:\n\n" +
        "\"Regra é regra, chefe. Sem um real, sem bicho.\"\n\n" +
        "Você respira fundo e manda a braba:\n\n" +
        "— Cara, eu levei minha vó no jiu-jitsu ontem! Porque a coitada tava muito tristinha, sabe? O Dia dos Namorados tá chegando, o estoque de pneus já acabou, por isso minha moto tá sem bateria eólica! E daí o peixe morreu afogado também!\n\n" +
        "O atendente trava. Os olhos dele piscam em direções diferentes. A mandíbula cai. Ele olha para você e depois para o nada.\n\n" +
        "— Olha... quer saber? Esquece o real. Pega essa desgraça de bicho, enfia o pneu onde couber e some daqui antes que você me convença a cometer um crime.\n\n" +
        "Você conseguiu o pet de 20 reais pelo poder absoluto da demência verbal.\n\n" +
        "O atendente continua olhando para a parede, murmurando algo sobre ventos e borracharia.\n\n" +
        "O que acontece a seguir?",
        [
            {
                text: "A) Sair da loja andando de costas enquanto faz contato visual intenso.",
                action: choiceA1
            },
            {
                text: "B) Explicar que a bateria eólica da sua moto funciona com vento de ventilador ligado na tomada.",
                action: choiceA2
            }
        ]
    );
}

// OPÇÃO A - A
function choiceA1() {
    story(
        "CONTATO VISUAL",
        "Você dá meia-volta e começa a caminhar em direção à porta andando de costas, sem desviar o olhar do atendente.\n\n" +
        "O atendente, ainda trancado em seu transe de confusão mental, apenas observa em silêncio.\n\n" +
        "Conforme você atravessa a porta, tropeça levemente no Bob, o cachorro do atendente. Mas se recupera com elegância, mantém o contato visual e levanta um joelho como se estivesse fazendo polichinelo.\n\n" +
        "O atendente balança a cabeça lentamente e começa a limpar o balcão.\n\n" +
        "Você está na rua, livre, com um pet de R$ 21,00 adquirido por R$ 20,00 e uma vitória psicológica absoluta!",
        [
            {
                text: "Continuar",
                action: showPetNaming
            }
        ]
    );
}

// OPÇÃO A - B
function choiceA2() {
    story(
        "ENGENHARIA SUSTENTÁVEL",
        "Você se apoia no balcão com uma expressão séria:\n\n" +
        "— Olha, só para você não achar que eu sou maluco... A bateria eólica da minha moto é de ponta, tá? Ela funciona com um ventilador da Casas Bahia de três velocidades ligado na tomada de casa, que joga vento direto na hélice da moto. É sustentabilidade pura.\n\n" +
        "O atendente estreita os olhos. A pouca sanidade que lhe restava evapora de vez.\n\n" +
        "Você começa a rir e sai correndo da loja com seu pet!\n\n" +
        "Você conseguiu sair com o animal!",
        [
            {
                text: "Continuar",
                action: showPetNaming
            }
        ]
    );
}

// ==========================================
// OPÇÃO B - XINGAR O ATENDENTE
// ==========================================

function choiceB() {
    story(
        "EDUCAÇÃO NOTA ZERO",
        "Você bate a mão no balcão e solta:\n\n" +
        "— Ah, vai tomar no seu cu, maluco! É só um real, seu miserável! Arroganthi!\n\n" +
        "O atendente perde o resto de paciência. Ele dá a volta no balcão, pega uma vassoura velha e aponta para uma foto estranha de um homem chamado Igor.\n\n" +
        "Com sangue nos olhos, ele fala:\n\n" +
        "— Tá vendo aquele homem ali?! Se você não ralar daqui, vou chamar ele!\n\n" +
        "O que você faz?",
        [
            {
                text: "A) Chorar para o vendedor não chamar o Igor!",
                action: choiceB1
            },
            {
                text: "B) Sair correndo desesperado e deixar o pet e o vendedor para trás!",
                action: choiceB2
            }
        ]
    );
}

// OPÇÃO B - A
function choiceB1() {
    story(
        "NÃO CHAMA O IGOR!",
        "Você cai de joelhos no chão da pet shop, junta as mãos e começa a chorar desesperadamente:\n\n" +
        "— Pelo amor de Deus, não chama o Igor! Eu não estou psicologicamente preparado para lidar com aquele homem hoje!\n\n" +
        "O atendente olha para você com uma mistura de nojo e pena. Abaixa a vassoura e dá um suspiro profundo:\n\n" +
        "— Pega essa porcaria desse bicho e some da minha frente antes que eu ligue para ele.\n\n" +
        "Você agarra o pet rapidamente, vai embora apavorado e promete nunca mais voltar naquela loja.",
        [
            {
                text: "Continuar",
                action: showPetNaming
            }
        ]
    );
}

// OPÇÃO B - B
function choiceB2() {
    gameOver(
        "MORTE POR BANANAS",
        "Você arranca pela porta da pet shop em disparada alucinada, correndo a absurdos 220 km/h na calçada.\n\n" +
        "Em uma fração de segundo, tropeça no próprio pé e perde o controle da física.\n\n" +
        "Você acerta em cheio um cacho de bananas exposto na calçada da feira ao lado.\n\n" +
        "O jogador cai no chão, encerrando sua jornada de forma trágica e completamente ridícula."
    );
}

// ==========================================
// OPÇÃO C - ATTACK ON TITAN
// ==========================================

function choiceC() {
    story(
        "ATTACK ON TITAN",
        "O atendente cruza os braços esperando os 21 reais, mas você respira fundo, olha fixamente nos olhos dele e manda a braba:\n\n" +
        "— Cara... Você já parou pra pensar que o Eren em Attack on Titan só queria proteger os amigos, mas acabou virando o maior vilão da história? Tipo, toda a premissa da liberdade...\n\n" +
        "O atendente trava. A expressão de raiva some do rosto dele.\n\n" +
        "— Rapaz... finalmente alguém que entende! O problema não é o Eren, é que a humanidade dentro das muralhas não tinha escolha! Mas ó, para mim o final foi...\n\n" +
        "Vocês passam 5 horas debatendo geopolítica de Marley, as facções de Paradis e se o Armin merecia ou não o Titã Colossal.\n\n" +
        "No final, o atendente te abraça emocionado:\n\n" +
        "— Cara, você é um irmão. Esquece esse um real. Pode levar o pet de graça, e se voltar amanhã a gente debate a temporada nova!",
        [
            {
                text: "A) Levar o pet.",
                action: choiceC1
            },
            {
                text: "B) Pegar um café e falar mais um pouco sobre Attack on Titan.",
                action: choiceC2
            }
        ]
    );
}

// OPÇÃO C - A
function choiceC1() {
    story(
        "PET GRATUITO!",
        "Você pega a caixa do pet, dá um tapinha no ombro do novo amigo e sai da loja com a sensação de dever cumprido.\n\n" +
        "Você levou um animalzinho de R$ 21,00 totalmente de graça após um debate geopolítico e existencial de 5 horas.\n\n" +
        "Vitória!",
        [
            {
                text: "Continuar",
                action: showPetNaming
            }
        ]
    );
}

// OPÇÃO C - B
function choiceC2() {
    gameOver(
        "OVERDOSE DE LORE",
        "Você decide que 5 horas ainda foram pouco para esgotar o lore da obra.\n\n" +
        "Você corre na padaria da esquina, compra dois cafés pingados e um pão de queijo, volta para o balcão da pet shop e passa o resto da vida discutindo Attack on Titan com o vendedor.\n\n" +
        "Os anos passam. A Terra é esquecida, o mundo lá fora muda, mas vocês continuam ali, firmes no balcão, debatendo teorias da conspiração Eldiana e as reviravoltas dos arcos finais.\n\n" +
        "Dez anos depois, completamente consumidos pela loucura, os dois desabam juntos no chão da pet shop, murmurando sobre liberdade e titãs."
    );
}

// ==========================================
// OPÇÃO D - FUGIR COM O ANIMAL
// ==========================================

function choiceD() {
    story(
        "LADRÃO DE PET!",
        "Você ignora o Pix e a conversa fiada!\n\n" +
        "Você pega o pet de 21 reais com cuidado, coloca debaixo do braço e dispara em direção à porta do pet shop!\n\n" +
        "O atendente fica pistola e sai correndo atrás de você!\n\n" +
        "— TRAIDOR! PEGA LADRÃO!! PEGA O VAGABUNDO! O LULA!!!\n\n" +
        "O atendente agarra a vassoura e sai correndo atrás de você, enquanto pedestres entram em pânico ao ver um maluco correndo com um animal debaixo do braço e um atendente louco gritando na rua.\n\n" +
        "O que você faz agora na fuga?",
        [
            {
                text: "A) Se disfarçar de manequim em uma loja de roupas ao lado.",
                action: choiceD1
            },
            {
                text: "B) Entrar no meio de uma aula de zumba na praça e fingir que faz parte da coreografia.",
                action: choiceD2
            }
        ]
    );
}

// OPÇÃO D - A
function choiceD1() {
    story(
        "MANEQUIM HUMANO",
        "Você entra correndo na primeira loja que vê, congela em uma pose esquisita segurando o pet debaixo do braço e tenta se passar por um manequim de vitrine.\n\n" +
        "Você coloca um vestidinho com uma meia-calça preta!\n\n" +
        "O atendente passa correndo pela rua gritando:\n\n" +
        "— PEGA O LADRÃO!!\n\n" +
        "Você fica imóvel, suando frio e tentando não espirrar.\n\n" +
        "Depois de alguns minutos, a perseguição parece ter terminado. Você conseguiu despistar o atendente!",
        [
            {
                text: "Continuar",
                action: showPetNaming
            }
        ]
    );
}

// OPÇÃO D - B
function choiceD2() {
    story(
        "ZUMBA PROFISSIONAL",
        "Você dá de cara com um grupo de senhoras fazendo zumba ao ar livre.\n\n" +
        "Entra no meio da roda com o pet debaixo do braço e começa a imitar os passos de dança com perfeição absoluta.\n\n" +
        "O atendente chega correndo com a vassoura, fica completamente hipnotizado com sua sincronia no rebolado e acaba desistindo da perseguição por respeito artístico.\n\n" +
        "Você escapou!",
        [
            {
                text: "Continuar",
                action: showPetNaming
            }
        ]
    );
}

// ==========================================
// SISTEMA DE NOME DO PET
// ==========================================

function showPetNaming() {
    story(
        "🐾 DÊ UM NOME AO SEU PET",
        "Parabéns! Você conseguiu ficar com um " + player.pet + "!\n\n" +
        "Agora escolha um nome para seu novo companheiro.",
        [
            {
                text: "Escolher nome",
                action: enterPetName
            }
        ]
    );
}

function enterPetName() {
    document.getElementById("storyTitle").textContent = "🐾 NOME DO PET";
    document.getElementById("storyText").textContent =
        "Qual será o nome do seu " + player.pet + "?";

    document.getElementById("options").innerHTML = `
        <input type="text" id="petNameInput" placeholder="Digite o nome do seu pet" maxlength="20">
        <button onclick="finishPetNaming()">Confirmar nome</button>
    `;
}

function finishPetNaming() {
    const input = document.getElementById("petNameInput");
    const name = input.value.trim();

    if (!name) {
        alert("Seu pet precisa de um nome!");
        return;
    }

    player.petName = name;

    story(
        "🐾 NOVO COMPANHEIRO!",
        "Você agora tem um " + player.pet + " chamado " + player.petName + "!\n\n" +
        "Dinheiro restante: R$ " + player.money.toFixed(2) + ".\n\n" +
        "O primeiro capítulo terminou. Sua jornada está apenas começando!\n\n" +
        "CONTINUA...",
        [
            {
                text: "Voltar ao menu",
                action: returnToMenu
            }
        ]
    );
}

// ==========================================
// GAME OVER
// ==========================================

function gameOver(title, text) {
    story(
        "💀 GAME OVER - " + title,
        text + "\n\nGAME OVER",
        [
            {
                text: "Tentar novamente",
                action: newGame
            },
            {
                text: "Voltar ao menu",
                action: returnToMenu
            }
        ]
    );
}

// VOLTAR AO MENU
function returnToMenu() {
    showScreen("menu");
}

// INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("continueButton").hidden = true;
    showScreen("menu");
});
