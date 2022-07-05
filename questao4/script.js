const pullCardBtn = document.querySelector("#pull");
const cards = document.querySelector("#cards");
const message = document.querySelector("#message");

const cheap = [
    "spade-2", "spade-3", "spade-4", "spade-5", "spade-6", "spade-7", "spade-8", "spade-9", "spade-10", "spade-J", "spade-Q", "spade-K", "spade-A",
    "club-2", "club-3", "club-4", "club-5", "club-6", "club-7", "club-8", "club-9", "club-10", "club-J", "club-Q", "club-K", "club-A",
    "diamond-2", "diamond-3", "diamond-4", "diamond-5", "diamond-6", "diamond-7", "diamond-8", "diamond-9", "diamond-10", "diamond-J", "diamond-Q", "diamond-K", "diamond-A",
    "heart-2", "heart-3", "heart-4", "heart-5", "heart-6", "heart-7", "heart-8", "heart-9", "heart-10", "heart-J", "heart-Q", "heart-K", "heart-A"
];

const suits = {
    spade: "spade",
    club: "club",
    diamond: "diamond",
    heart: "heart"
};

const separator = "-";
const selected = [];

pullCardBtn.onclick = pull;

function pull() {
    const card = getCard();
    selected.push(card);

    appendCard();

    if (selected.length === 5) {
        showCards(selected);
        setWaitButtonStyle();
    };
};

function restart() {
    selected.splice(0, selected.length);
    message.textContent = "";
    removeCards();
    setPullButtonStyle();
};

function getCard() {
    const card = cheap[Math.floor(Math.random() * 52)];
    if (selected.includes(card)) {
        return getCard();
    };

    return card; 
};

function setPullButtonStyle() {
    pullCardBtn.onclick = pull;
    pullCardBtn.textContent = "Puxar carta";
    pullCardBtn.style.backgroundColor = "#424242";
    pullCardBtn.style.color = "#FFFFFF";
    pullCardBtn.style.border = "none";
    pullCardBtn.style.cursor = "pointer";
};

function setWaitButtonStyle() {
    pullCardBtn.onclick = null;
    pullCardBtn.textContent = "Aguarde...";
    pullCardBtn.style.backgroundColor = "#FFFFFF";
    pullCardBtn.style.color = "#424242";
    pullCardBtn.style.border = "none";
    pullCardBtn.style.cursor = "wait";
};

function setRestartButtonStyle() {
    pullCardBtn.onclick = restart;
    pullCardBtn.textContent = "Reiniciar";
    pullCardBtn.style.backgroundColor = "#FFFFFF";
    pullCardBtn.style.color = "#424242";
    pullCardBtn.style.border = "solid 0.5px #424242";
    pullCardBtn.style.cursor = "pointer";
};

function appendCard() {
    const img = document.createElement("img");
    img.src = "./assets/back.svg";
    img.alt = "card";

    cards.appendChild(img);
};

function removeCards() {
    for (let i = cards.children.length - 1; i >= 0; i -=1) {
        cards.removeChild(cards.children[i]);
    };
};

function showCards(selected) {
    selected.forEach((card, index) => {
        setTimeout(() => {
            cards.children[index].src = `./assets/${card}.svg`;

            if (index === selected.length - 1) {
                check(selected);
                setRestartButtonStyle();
            };
        }, (index + 1) * 1000);
    });
};

function check(selected) {
    if (checkStraightFlush(selected)) {
        message.textContent = "Straight Flush";
        return;
    };

    if (checkQuadra(selected)) {
        message.textContent = "Quadra";
        return;
    };

    if (checkFullHouse(selected)) {
        message.textContent = "Full House";
        return;
    };

    if (checkSequencia(selected)) {
        message.textContent = "Sequência";
        return;
    };

    if (checkTrinca(selected)) {
        message.textContent = "Trinca";
        return;
    };

    if (checkDoisPares(selected)) {
        message.textContent = "Dois Pares";
        return;
    };

    if (checkPar(selected)) {
        message.textContent = "Par";
        return;
    };
};

function checkStraightFlush(selected) {
    const indexes = selected.map((item) => {
        return cheap.findIndex((card) => {
            return card === item;
        });
    });

    indexes.sort((a, b) => {
        return a - b;
    });

    const isSpades = indexes.every(index => { return cheap[index].includes(suits.spade) });
    const isClubs = indexes.every(index => { return cheap[index].includes(suits.club) });
    const isDiamonds = indexes.every(index => { return cheap[index].includes(suits.diamond) });
    const isHearts = indexes.every(index => { return cheap[index].includes(suits.heart) });
    if (!isSpades && !isClubs && !isDiamonds && !isHearts) {
        return false;
    };

    for (let i = 0; i < indexes.length; i += 1) {
        if (i !== indexes.length - 1) {
            if ((indexes[i] + 1) !== indexes[i + 1]) {
                return false;
            };
        };
    };

    return true;
};

function checkQuadra(selected) {
    for (let i = 0; i < selected.length; i += 1) {
        const value = selected[i].split(separator)[1];
        if (getSameValueNum(value, selected, 4)) {
            return true;
        };
    };

    return false;
};

function checkFullHouse(selected) {
    let threeValue = "";

    for (let i = 0; i < selected.length; i += 1) {
        const value = selected[i].split(separator)[1];
        if (getSameValueNum(value, selected, 3)) {
            threeValue = value;
        };
    };

    if (threeValue !== "") {
        for (let i = 0; i < selected.length; i += 1) {
            const value = selected[i].split(separator)[1];
            if (value !== threeValue && getSameValueNum(value, selected, 2)) {
                return true;
            };
        };
    };

    return false;
};

function checkSequencia(selected) {
    const values = selected.map((item) => {
        return parseInt(item.split(separator)[1], 10);
    });

    values.sort((a, b) => {
        return a - b;
    });

    for (let i = 0; i < values.length; i += 1) {
        if (i !== values.length - 1) {
            if ((values[i] + 1) !== values[i + 1]) {
                return false;
            };
        };
    };

    return true;
};

function checkTrinca(selected) {
    for (let i = 0; i < selected.length; i += 1) {
        const value = selected[i].split(separator)[1];
        if (getSameValueNum(value, selected, 3)) {
            return true;
        };
    };

    return false;
};

function checkDoisPares(selected) {
    let firstValue = "";

    for (let i = 0; i < selected.length; i += 1) {
        const value = selected[i].split(separator)[1];
        if (getSameValueNum(value, selected, 2)) {
            firstValue = value;
        };
    };

    if (firstValue !== "") {
        for (let i = 0; i < selected.length; i += 1) {
            const value = selected[i].split(separator)[1];
            if (value !== firstValue && getSameValueNum(value, selected, 2)) {
                return true;
            };
        };
    };

    return false;
};

function checkPar(selected) {
    for (let i = 0; i < selected.length; i += 1) {
        const value = selected[i].split(separator)[1];
        if (getSameValueNum(value, selected, 2)) {
            return true;
        };
    };

    return false;
};

function getSameValueNum(value, selected, wantNum) {
    let num = 0;
    selected.forEach(item => {
        if (item.split(separator)[1] === value) {
            num += 1;
        };
    });

    return num === wantNum;
};
