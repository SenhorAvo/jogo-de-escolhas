

let player = {
    name: "",
    money: 3,
    hunger: 20,
    health: 100,
    pet: "",
    scene: "petshop"
};

let next = "";

const pets = [
    "🐶 Cachorro",
    "🐱 Gato",
    "🐰 Coelho",
    "🐹 Hamster",
    "🐢 Tartaruga",
    "🐦 Periquito",
    "🦜 Papagaio",
    "🐠 Peixe",
    "🐭 Rato",
    "🦎 Lagarto",
    "🐍 Cobra",
    "🦔 Ouriço"
];

const scenes = {

    petshop: {
        chapter: "CAPÍTULO 01 — O PET SHOP",
        title: "UMA PÉSSIMA IDEIA?",
        text: "Você está andando pela cidade quando encontra um pet shop. Os animais parecem estar esperando por você. O problema é que você tem apenas R$ 3.",
        options: [
            { text: "A) Entrar e escolher um animal.", action: "pets" },
            { text: "B) Ignorar e continuar andando.", action: "street" }
        ]
    },

    street: {
        chapter: "CAPÍTULO 02 — A RUA",
        title: "UMA CAMINHADA",
        text: "Você continua andando e encontra uma carteira caída no chão. Não há ninguém por perto.",
        options: [
            { text: "A) Pegar a carteira.", action: "wallet" },
            { text: "B) Procurar o dono.", action: "owner" },
            { text: "C) Fingir que não viu.", action: "breakfast" }
        ]
    },

    breakfast: {
        chapter: "CAPÍTULO 03 — A FOME",
        title: "SEU ESTÔMAGO ESTÁ RECLAMANDO",
        text: "Você está com muita fome. Uma padaria aparece logo à frente.",
        options: [
            { text: "A) Comprar alguma coisa.", action: "buyfood" },
            { text: "B) Pedir um pão de graça.", action: "freefood" },
            { text: "C) Continuar sem comer.", action: "job" }
        ]
    },

    wallet: {
        chapter: "CAPÍTULO 02 — O ACHADO",
        title: "ACHOU DINHEIRO!",
        text: "Você abriu a carteira e encontrou R$ 50. Junto havia um documento com o nome do proprietário.",
        options: [
            { text: "A) Ficar com o dinheiro.", action: "keepmoney" },
            { text: "B) Devolver a carteira.", action: "returnmoney" }
        ]
    },

    owner: {
        chapter: "CAPÍTULO 02 — O BOM SAMARITANO",
        title: "UMA BOA AÇÃO",
        text: "Você encontra o dono da carteira. Ele fica tão feliz que resolve te dar uma recompensa.",
        options: [
            { text: "A) Aceitar a recompensa.", action: "reward" },
            { text: "B) Recusar educadamente.", action: "breakfast" }
        ]
    },

    job: {
        chapter: "CAPÍTULO 04 — EMPREGO",
        title: "A ENTREVISTA",
        text: "Você encontrou uma vaga de emprego. O chefe pergunta: por que deveríamos contratar você?",
        options: [
            { text: "A) Porque sou trabalhador.", action: "work" },
            { text: "B) Porque preciso de dinheiro.", action: "honest" },
            { text: "C) Porque sou bonito.", action: "beautiful" },
            { text: "D) Perguntar quanto paga.", action: "salary" }
        ]
    }
};

function showScreen(id) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.hidden = true;
    });

    document.getElementById(id).hidden = false;
}

function saveGame() {
    localStorage.setItem("escolhas_save", JSON.stringify(player));
}

function updateStats() {
    document.getElementById("money").textContent =
        "R$ " + player.money;

    document.getElementById("hunger").textContent =
        player.hunger + "%";

    document.getElementById("health").textContent =
        player.health + "%";
}

function newGame() {
    player = {
        name: "",
        money: 3,
        hunger: 20,
        health: 100,
        pet: "",
        scene: "petshop"
    };

    showScreen("character");
}

function createCharacter() {
    const name = document.getElementById("playerName")
        .value.trim();

    if (!name) {
        alert("Digite seu nome primeiro!");
        return;
    }

    player.name = name;
    showPetShop();
}

function showPetShop() {
    showScreen("game");

    document.getElementById("chapter").textContent =
        "ESCOLHA SEU MASCOTE";

    document.getElementById("storyTitle").textContent =
        "BEM-VINDO AO PET SHOP!";

    document.getElementById("storyText").textContent =
        player.name + ", escolha seu novo companheiro. " +
        "Você tem apenas R$ 3. Boa sorte explicando isso ao vendedor.";

    const options = document.getElementById("options");
    options.innerHTML = "";

    pets.forEach(pet => {
        const button = document.createElement("button");
        button.className = "option-button";
        button.textContent = pet;

        button.onclick = () => choosePet(pet);

        options.appendChild(button);
    });

    document.getElementById("feedback").hidden = true;
    updateStats();
}

function choosePet(pet) {
    player.pet = pet;

    document.getElementById("options").innerHTML = "";

    showFeedback(
        "VOCÊ É BURRO, CARA?!",
        "Não tem comida nem pra você e ainda quer adotar um animal?! " +
        "Parabéns, " + player.name + ". Agora são duas bocas para alimentar.",
        "breakfast"
    );

    saveGame();
}

function showScene(sceneId) {
    const scene = scenes[sceneId];

    if (!scene) {
        showFeedback(
            "FIM DESTA PARTE",
            "Você chegou ao final do conteúdo disponível nesta versão. Novas histórias virão!",
            "menu"
        );
        return;
    }

    player.scene = sceneId;

    showScreen("game");

    document.getElementById("chapter").textContent =
        scene.chapter;

    document.getElementById("storyTitle").textContent =
        scene.title;

    document.getElementById("storyText").textContent =
        scene.text;

    const options = document.getElementById("options");
    options.innerHTML = "";

    document.getElementById("feedback").hidden = true;

    scene.options.forEach(option => {
        const button = document.createElement("button");

        button.className = "option-button";
        button.textContent = option.text;

        button.onclick = () => makeChoice(option.action);

        options.appendChild(button);
    });

    updateStats();
    saveGame();
}

function showFeedback(title, message, destination) {
    document.getElementById("options").innerHTML = "";

    document.getElementById("feedbackTitle").textContent =
        title;

    document.getElementById("feedbackText").textContent =
        message;

    document.getElementById("feedback").hidden = false;

    next = destination;
    updateStats();
    saveGame();
}

function makeChoice(action) {
    document.getElementById("options").innerHTML = "";

    switch (action) {

        case "pets":
            showPetShop();
            return;

        case "street":
            showFeedback(
                "VOCÊ NÃO FEZ NADA.",
                "Pelo menos você não conseguiu piorar sua situação.",
                "street"
            );
            return;

        case "wallet":
            showScene("wallet");
            return;

        case "owner":
            showScene("owner");
            return;

        case "breakfast":
            player.hunger += 15;
            showScene("breakfast");
            return;

        case "buyfood":
            if (player.money >= 5) {
                player.money -= 5;
                player.hunger = Math.max(0, player.hunger - 35);

                showFeedback(
                    "UMA REFEIÇÃO!",
                    "Você conseguiu comprar um lanche. Seu estômago agradece.",
                    "job"
                );
            } else {
                showFeedback(
                    "VOCÊ ESTÁ FALIDO!",
                    "O atendente olhou seu dinheiro, olhou pra você e chamou isso de piada.",
                    "job"
                );
            }
            return;

        case "freefood":
            showFeedback(
                "O PEDIDO",
                "Você pediu um pão de graça. O padeiro te deu um guardanapo e desejou boa sorte.",
                "job"
            );
            return;

        case "keepmoney":
            player.money += 50;
            showFeedback(
                "ENRIQUECEU!",
                "Você ficou com os R$ 50. Sua consciência está fazendo perguntas.",
                "breakfast"
            );
            return;

        case "returnmoney":
            showFeedback(
                "CIDADÃO HONESTO",
                "Você devolveu a carteira. O dono agradeceu e foi embora. Nem um centavo.",
                "breakfast"
            );
            return;

        case "reward":
            player.money += 10;
            showFeedback(
                "RECOMPENSA!",
                "Você recebeu R$ 10 pela boa ação.",
                "breakfast"
            );
            return;

        case "work":
            player.money += 20;
            showFeedback(
                "CONTRATADO!",
                "O chefe gostou da resposta. Você conseguiu um emprego! R$ 20 pelo primeiro dia.",
                "end"
            );
            return;

        case "honest":
            player.money += 10;
            showFeedback(
                "PELO MENOS FOI HONESTO",
                "O chefe ficou com pena e resolveu te dar uma chance.",
                "end"
            );
            return;

        case "beautiful":
            showFeedback(
                "A ENTREVISTA ACABOU",
                "O chefe pediu seu currículo. Você entregou uma foto 3x4.",
                "end"
            );
            return;

        case "salary":
            showFeedback(
                "VOCÊ FOI DIRETO",
                "O chefe respondeu: primeiro você precisa ser contratado.",
                "end"
            );
            return;
    }
}

function nextScene() {
    if (next === "menu") {
        showScreen("menu");
        return;
    }

    if (next === "end") {
        showFeedback(
            "FIM DO PRIMEIRO CAPÍTULO",
            "Sua jornada está apenas começando. O resto da sua vida ainda pode piorar!",
            "menu"
        );
        return;
    }

    showScene(next);
}

function continueGame() {
    const saved = localStorage.getItem("escolhas_save");

    if (!saved) return;

    try {
        player = JSON.parse(saved);

        if (player.scene === "petshop" && !player.pet) {
            showPetShop();
        } else {
            showScene(player.scene || "petshop");
        }
    } catch {
        alert("Não foi possível carregar o jogo salvo.");
    }
}

function showCredits() {
    alert(
        "ESCOLHAS\n\n" +
        "Um jogo de decisões duvidosas.\n" +
        "Desenvolvido por Thierry.\n\n" +
        "Boa sorte. Você vai precisar."
    );
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("escolhas_save")) {
        document.getElementById("continueButton").hidden = false;
    }
});
