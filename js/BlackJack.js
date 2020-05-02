function ageInDays(){
    let birthYear = prompt('hey whats your birth year ?');
    let days = (2018 - birthYear) *365;
    let textAnswer = document.createTextNode('you are ' + days + ' days old');
    let h1 = document.createElement('h1');
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('ageInDays').remove();
}

function generateCat(){
    let img = document.createElement('img')
    let div = document.getElementById("catGen")
    img.src = 'https://cdn2.thecatapi.com/images/7si.gif'
    div.appendChild(img)
}

////// challenge 3

function rpsGame(yourChoice){
    let bot = botChoice(randomNumber());
    let me = yourChoice.id;
    let myScore = decideWinner(me,bot);
    let message = findMessage(myScore);
    rpsFrontEnd(me,bot,message); 
}

function randomNumber(){
    return Math.floor(Math.random() * 3);
}

function botChoice(choice){
    return ['rock','paper','scissors'][choice];
}

function decideWinner(me, bot){
    const rpsData = {
        'rock' : {'rock': 0.5, 'paper': 0, 'scissors': 1},
        'paper' : {'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors' : {'rock': 0, 'paper': 1, 'scissors': 0.5}
    };
    return rpsData[me][bot];
}

function findMessage(score){
    if(score == 0) 
        return {'message': 'You lost!', 'color': 'red'};
    else if(score == 1)
        return {'message': 'You won!', 'color': 'blue'};
    else
        return {'message': 'You Tied!', 'color': 'yellow'};  
}

function rpsFrontEnd(humanChoice, botChoice, finalMessage){
    const imgData = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    };

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    let humanDiv = document.createElement('div');
    let msgDiv = document.createElement('div');
    let botDiv = document.createElement('div');
    
    humanDiv.innerHTML = "<img src='" +imgData[humanChoice] +
         "'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);' >";
    botDiv.innerHTML = "<img src='" +imgData[botChoice] +
         "'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1);' >";
    msgDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px;'>"+ 
            finalMessage['message']  + "</h1>";
                  
    document.getElementById('flex-box').appendChild(humanDiv);
    document.getElementById('flex-box').appendChild(msgDiv);
    document.getElementById('flex-box').appendChild(botDiv);
}

//////  challenge-4

let allButtons = document.getElementsByTagName('button');
var copyAllButton = []
for(let i=0; i<allButtons.length; i++){
    copyAllButton.push(allButtons[i].classList[1]);
}

function buttonColorChange(buttonThingy){
    if(buttonThingy.value == 'red'){
        buttonRed();
    } else if(buttonThingy.value == 'green'){
        buttonGreen();
    } else if(buttonThingy.value == 'reset'){
        buttonReset();
    } else if(buttonThingy.value == 'random'){
        buttonRandom();
    }
}

function buttonRed(){
    for(let i=0; i<allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger'); 
    }
}

function buttonGreen(){
    for(let i=0; i<allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success'); 
    }
}

function buttonReset(){
    for(let i=0; i<allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButton[i]); 
    }
}

function buttonRandom(){
    let number = copyAllButton.length;
    for(let i=0; i<allButtons.length; i++){
        let choice = Math.floor(Math.random() * number); 
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButton[choice]); 
    }
}

//////////////////////-----challenge 5 blackjack

let blackJackGame = {
    'you' : { 'scoreSpan': '#your-result', 'div': '#your-box','score': 0 },
    'dealer': { 'scoreSpan': '#dealer-result' ,'div': '#dealer-box','score': 0 },
    'cards': ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardMap': {'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10,
                'J':10, 'Q':10, 'K':10, 'A':[1,11] },
    'wins': 0,
    'loss': 0,
    'draws': 0,  
    'isStand': false,
    'turnsOver': false,          
}
const YOU = blackJackGame['you']
const DEALER = blackJackGame['dealer']

document.querySelector('#hitButton').addEventListener('click',blackKJackHit);
document.querySelector('#dealButton').addEventListener('click',blackKJackDeal);
document.querySelector('#standButton').addEventListener('click',blackKJackStand);

let hitSound = new Audio('sounds/swish.m4a');
let winSound = new Audio('sounds/cash.mp3');
let lostSound = new Audio('sounds/aww.mp3');

function blackKJackHit(){
    if(blackJackGame['isStand']) 
        return;

    let card = randomCard();
    showCard(card,YOU);
    updateScore(card,YOU)
    showScore(YOU)
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackJackGame['cards'][randomIndex];
}

function showCard(card,activePlayer){
    if(activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function updateScore(card,activePlayer){
    console.log('cardValue : ' + blackJackGame['cardMap'][card])
    if(card == 'A'){
        if(activePlayer['score'] + blackJackGame['cardMap'][card][1] <= 21){
            activePlayer['score'] += blackJackGame['cardMap'][card][1];    
        } else {
            activePlayer['score'] += blackJackGame['cardMap'][card][0];
        }    
    } else {
        activePlayer['score'] += blackJackGame['cardMap'][card];
    }
    console.log('score: ' + activePlayer['score'])
}

function showScore(activePlayer){
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'Bust!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red'
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    } 
}

function blackKJackDeal(){
    if(!blackJackGame['turnsOver']) 
        return;
    blackJackGame['isStand'] = false;    
    let yourImages = document.querySelector(YOU['div']).querySelectorAll('img')
    let dealerImages = document.querySelector(DEALER['div']).querySelectorAll('img')
    for(i=0; i<yourImages.length; i++){
        yourImages[i].remove();
    }
    for(i=0; i<dealerImages.length; i++){
        dealerImages[i].remove();       
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-result').textContent = 0;
    document.querySelector('#your-result').style.color = 'white';

    document.querySelector('#dealer-result').textContent = 0;
    document.querySelector('#dealer-result').style.color = 'white';

    document.querySelector('#blackJack-result').textContent = "Let's Play";
    document.querySelector('#blackJack-result').style.color = 'black';

    blackJackGame['turnsOver'] = true;

}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function blackKJackStand(){
    blackJackGame['isStand'] = true;
    while(DEALER['score'] < 16 && blackJackGame['isStand']){
        let card = randomCard();
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    blackJackGame['turnsOver'] = true;
    showResult(computeWinner());
}

function computeWinner() {
    let winner;
    if(YOU['score'] <= 21) {
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            blackJackGame['wins']++;
            winner = YOU;
        } else if( YOU['score'] < DEALER['score']) {
            blackJackGame['loss']++;
            winner = DEALER;
        } else if(YOU['score'] === DEALER['score']) {
            blackJackGame['draws']++;
        }
    } else if(YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackJackGame['loss']++;
        winner = DEALER;
    } else if(YOU['score'] > 21 && DEALER['score'] > 21) {
        blackJackGame['draws']++;
    }

    return winner;
}

function showResult(winner){
    let message, messageColor;
    if(!blackJackGame['turnsOver']) 
        return;

    if(winner == YOU) {
        message = 'You Won!';
        messageColor = 'green';
        winSound.play();
        document.querySelector('#wins').textContent = blackJackGame['wins'];
    } else if(winner == DEALER) {
        message = 'You lost!';
        messageColor = 'red';
        lostSound.play();
        document.querySelector('#losses').textContent = blackJackGame['loss'];
    } else {
        message = 'You Drew!';
        messageColor = 'black';
        document.querySelector('#draws')    .textContent = blackJackGame['draws'];
    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
}

