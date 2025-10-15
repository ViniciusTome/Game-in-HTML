HEAD

let myGamePiece;
let keys = {};
let game = [1, 2, 3, 4, 5];
let randomX, randomY;
let playerVelocity = 2;
let gameOff = true;
let createTransition = true;
let keysBlock = false;
let startGames = false;
let isInGame = false;
let startPlayer = true;


let bulletShootN = false;
let bulletShootS = false;
let bulletShootL = false;
let bulletShootO = false;

let game1 = false;
let game2 = false;
let game3 = false;
let game4 = false;
let game5 = false;


//contador games
let pointCount = 0;

//GAME 5
let bullet;
let asteroids = [];
let gameAsteroidOff = true;
let bulletpress = false;
let shootingMachnich = false;
number = 0;

// GAME 4
let box = [];
let containerBox = [];
let gameDragEndDrop = false;
let isDragging = false;
let offSetX, offSetY;
 

// GAME 3
let coin;
let gameCollectCoins = false;
newVelocity = false;

// GAME 2
let cards = [];
let gameOfMemory = false;
let numberGenerator = true;
let choiceColor = false;
let numberText ='';
let text1 = 1;
let count = 1;
let countChoice = 0;
let card1;
let card2;
let escolhaAtual;
let ultimaEscolha;

// GAME 1
let gameInput = false;
let textInput;
createInputText = true;




// starta a game
function startGame(){
    if (startPlayer){
        myGameArea.start();

        game[0] = new component(100, 100, "aqua", 150, 150);
        game[1] = new component(100, 100, "aqua", 350, 150);
        game[2] = new component(100, 100, "aqua", 550, 150);
        game[3] = new component(100, 100, "aqua", 150, 350);
        game[4] = new component(100, 100, "aqua", 350, 350);


        myGamePiece = new component(30, 30, "red", 10, 120);
        startPlayer = false;
    }
    
    

    if(gameAsteroidOff == false) {
        for (let i = 0; asteroids.length < 20; i++) {
            asteroidAtari();
 
        }
    }  
    if (gameDragEndDrop) {
        for (let i = 0; i < 8; i++) {
            randomX = Math.floor(Math.random() * (700 - 30 + 1)) + 30;

            box[i]  = new boxComponent(50, 50, "aqua", (100 * (i+1)) , 150, false);

            containerBox[i] = new boxComponent(50, 50, "transparent", randomX, (60 * (i+1)));

        }
    }
    if (gameCollectCoins) {
        randomX = Math.floor(Math.random() * (800 - 30 + 1)) + 30;
        randomY = Math.floor(Math.random() * (600 - 30 + 1)) + 30;
        coin = new asteroidComponent(0, 0, "gold", randomX, randomY, 10, 0, 2);
    }
    if (gameOfMemory){
        for (let i = 0; i < 4; i++){
            for (let j=0; j < 4; j++){
                cards.push(new memoryComponent(70, 70, "aqua",(50 + (125 * (j+1)))  , (-50 + (125 * (i+1))), false, false, true));
            }
        }
    }
    if(gameInput) {
        for (let i = 0; i < 5; i++) {
            randomX = Math.floor(Math.random() * (700 - 30 + 1)) + 30;

            containerBox[i] = new boxComponent(50, 50, "transparent", randomX, (60 * (i+1)));
        }

    }
    
}



// Criando a area do jogo
let myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// Molde para ciar os ASTEROIDS
function asteroidComponent(width, height, color, x, y, radius, startAngle, endAngle) {
    this.width = width;
    this.height = height;
    this.speedX = (myGameArea.canvas.width / 2);
    this.speedY = (myGameArea.canvas.height / 2);
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle * Math.PI;
    this.count = 0;
    this.valueX = x;
    this.valueY = y;
    this.noVisibility = false;
    this.asteroidPos = function() {

        this.x = this.x - this.speedX;
        this.y = this.y - this.speedY;
    },
    this.arcUpdate = function() {
        ctx = myGameArea.context;
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
        ctx.stroke();
        ctx.fill();

    },
    this.crashWith = function(otherObj) {
        return !(
            this.y + this.height < otherObj.y ||  // acima
            this.y > otherObj.y + otherObj.height || // abaixo
            this.x + this.width < otherObj.x || // à esquerda
            this.x > otherObj.x + otherObj.width // à direita
        );
    }
}

// Molde para ciar os BOX PARA O JOGO DA MEMÓRIA
function memoryComponent(width, height, color, x, y, move, choiceColor, countChoice,text1){
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.move = move;
    this.boxIn = false;
    this.text1 = text1;
    this.choiceColor = choiceColor;
    this.countChoice = countChoice;
    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    this.updateColigion = function(color1){
        ctx = myGameArea.context;
        ctx.fillStyle = color1;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    },
    this.text = function(){
        ctx = myGameArea.context;
        ctx.beginPath();
        ctx.font = 'bold 10px Arial';
        if(this.choiceColor){
            ctx.fillStyle = 'black';
        } else{
            ctx.fillStyle = 'aqua';
        }
        
        ctx.textAlign = 'center';
        ctx.fillText(this.text1, (35 + this.x), (35 + this.y));
    },
    this.crashWith = function(otherObj) {
        return !(
            this.y + this.height < otherObj.y ||  // acima
            this.y > otherObj.y + otherObj.height || // abaixo
            this.x + this.width < otherObj.x || // à esquerda
            this.x > otherObj.x + otherObj.widthw // à direita
        );
    }
}

// Molde para ciar os BOX
function boxComponent(width, height, color, x, y, move){
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.move = move;
    this.boxIn = false;
    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    this.updateColigion = function(color1){
        ctx = myGameArea.context;
        ctx.fillStyle = color1;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    },
    this.crashWith = function(otherObj) {
        return !(
            this.y + this.height < otherObj.y ||  // acima
            this.y > otherObj.y + otherObj.height || // abaixo
            this.x + this.width < otherObj.x || // à esquerda
            this.x > otherObj.x + otherObj.widthw // à direita
        );
    }
}

// Molde para ciar o PERSONAGEM (é um quadrado)
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = (myGameArea.canvas.width / 2);
    this.speedY = (myGameArea.canvas.height / 2);
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    this.updateColigion = function(color1){
        ctx = myGameArea.context;
        ctx.fillStyle = color1;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    },
    this.newPos = function() {
        this.x = this.speedX;
        this.y = this.speedY;
    },
    this.crashWith = function(otherObj) {
        return !(
            this.y + this.height < otherObj.y ||  // acima
            this.y > otherObj.y + otherObj.height || // abaixo
            this.x + this.width < otherObj.x || // à esquerda
            this.x > otherObj.x + otherObj.width // à direita
        );
    }
}





// atualiza a tela (50 quadros por segundo).
function updateGameArea() {
    
    myGameArea.clear();
    controller();

    if(startGames) {
        startGame();   
        startGames = false;
        playerVelocity = 2;
    }

    //inicializa as boxs dos jogos.
    if (gameOff){
        isInGame = false;
        for (let i in game) {
            game[i].update();
            
        } 
        
        verification(); // verifica se esta dentro do 'quadrado' do jogo.
    } else if (game5) { 
        isInGame = true;
        controllerGame5();
        for (let i in asteroids){
            if (!asteroids[i].noVisibility) {
                asteroids[i].arcUpdate();
                if (myGamePiece.crashWith(asteroids[i])){

                myGamePiece.speedX = Math.floor(Math.random() * (800 - 30 + 1)) + 30;
                myGamePiece.speedY = Math.floor(Math.random() * (600 - 30 + 1)) + 30;
            }
            }
            asteroids[i].asteroidPos();
            
            if(isArcInsideCanvas(myGameArea, asteroids[i].x, asteroids[i].y, asteroids[i].radius)){

            } else {
                if (asteroids[i] && !isArcInsideCanvas(myGameArea, asteroids[i].x, asteroids[i].y, asteroids[i].radius)){
                    asteroids[i].count += 1;
                    if(asteroids.length != 0) {
                        if (asteroids[i].count > 20){
                            let pos = asteroidAtariNewPosition(i)
                            asteroids[i].x = pos.x
                            asteroids[i].y = pos.y
                            asteroids[i].count = 0;
                            asteroids[i].noVisibility = false;
                            
                        }
                    }
                    
                }
            }
        } 
        if(shootingMachnich){
        if(bulletpress == true) {
            bullet.arcUpdate();
            bulletControl();
            for (let i in asteroids) {
                if(asteroids[i].crashWith(bullet)) {
                    asteroids[i].noVisibility = true;
                    pointCount += 1;

                }   
            }
            if(pointCount == 15){
                isInGame = true;
                transition(6);
                pointCount = 0;
                freezeMap();
            }
            
        } 
    

        if (bulletShootN) { 
            bullet.y -= 8;
        }
        
        if(bulletShootS) {
            bullet.y += 8;
        } 
        if(bulletShootL) {
            bullet.x += 8;
        }
        if(bulletShootO) {
            bullet.x -= 8;
        }
    }

        
    } else if (game4) {
        isInGame = true;
        playerVelocity = 1;
        
        for (let i in box){
            box[i].update();
            containerBox[i].updateColigion();
            containerBox[i].update();
            
            controllerGame4(myGamePiece.crashWith(box[i]), box[i]);   

            if (isDragging && box[i].move) {
                moveRect(box[i]);
            }

            console.log((box[0].y + (box[0].height )), (containerBox[0].y + containerBox[0].height), (box[0].x + (box[0].width)), (containerBox[0].x + containerBox[0].width));

            if((box[i].y + (box[i].height)) == containerBox[i].y + containerBox[i].height &&
                (box[i].x + (box[i].width)) == containerBox[i].x + containerBox[i].width 
                && !containerBox[i].boxIn ){
                containerBox[i].color = "lightgreen";
                pointCount += 1;
                containerBox[i].boxIn = true;
            }

            if(pointCount == containerBox.length){
                isInGame = true;
                transition(6);
                pointCount = 0;
            }
        }
        

    } else if (game3) {
        isInGame = true;
        controllerGame3();

        if (pointCount != '5'){
            coin.arcUpdate();
        }
        

        if(newVelocity){
            playerVelocity = 8;
            newVelocity = false;
        }

        if (myGamePiece.crashWith(coin)){
            coinNewPos(coin)
        }

        

        

    } else if (game2) {
        isInGame = true;

        if(numberGenerator) {
            createTextNumber();
            shuffleArray(cards);
            numberGenerator = false;  
            
        } 
        


        for (let i in cards){
            createTextNumber();
            cards[i].update();
        
            controllerGame2(myGamePiece.crashWith(cards[i]), cards[i]);
            
  
            if(cards[i].choiceColor == true && cards[i].countChoice == true){
                cards[i].countChoice = false
                countChoice += 1;   
                if(countChoice > 1){
                    card2 = card1;
                }
                card1 = cards[i];
            } 

            

            if (countChoice > 1){
                ultimaEscolha = card2.text1;
                escolhaAtual = card1.text1;
                countChoice = 0;

                if(ultimaEscolha == escolhaAtual) {
                    pointCount += 1;
                } else {
                    setTimeout(function() {
                        card2.choiceColor = false;
                        card2.countChoice = true;

                        card1.choiceColor = false;
                        card1.countChoice = true;
                    }, 1000);
                    
                }
            }

            if (pointCount == 8) {
                pointCount = 0;
                gameOfMemory = false;
                transition(6);
            }

        }
        

    } else if (game1) {
        isInGame = true;
        playerVelocity = 0;
        controllerGame1();

        if (createInputText){
            createInput();
        }
        
        

        for (let i in containerBox){
            containerBox[i].updateColigion();
            

            if (myGamePiece.crashWith(containerBox[i]) && !containerBox[i].boxIn) {
                containerBox[i].color = "lightgreen";
                pointCount += 1;
                containerBox[i].boxIn = true;
            }
            containerBox[i].update();

            if (pointCount == containerBox.length){
                isInGame = true;
                pointCount = 0;
                deleteInput();
                transition(6);
                
            }
        }
        controllerInput();
        
        
    }

    myGamePiece.newPos();
    myGamePiece.update(); 
 
}



// let count = 0;

function isArcInsideCanvas(ctx, x, y, raio) {
  const canvas = ctx.canvas;
  
  // Verifica se o ponto central do arco está dentro dos limites do canvas
  const isXInside = x - raio >= 0 && x + raio <= canvas.width;
  const isYInside = y - raio >= 0 && y + raio <= canvas.height;
  
  return isXInside && isYInside;
}




// VERIFICATION AREA
function verification(){

    if (myGamePiece.crashWith(game[4])) {
        if (gameOff){
            game[4].updateColigion("black");
        }
        
        if(keys["Enter"] && createTransition){                 //verifica se a tecla 'enter foi apertada'
            
            transition(5);  // faz a transição 
            
            shootingMachnich = true;
            gameAsteroidOff = false;

            console.log('Game 5')
        }
    
    } else if (myGamePiece.crashWith(game[3])) { 

        game[3].updateColigion("black");
        

        if(keys["Enter"] && createTransition){
            
            gameDragEndDrop = true;
            transition(4);                    
            console.log('Game 4')
        }

    } else if (myGamePiece.crashWith(game[2])) {

        game[2].updateColigion("black");


        if(keys["Enter"] && createTransition){ 

            gameCollectCoins = true;
            transition(3);                     
            console.log('Game 3')
        }

    } else if (myGamePiece.crashWith(game[1])) {

        game[1].updateColigion("black");


        if(keys["Enter"] && createTransition){ 
            gameOfMemory = true;
            transition(2);                    
            console.log('Game 2')
        }
    } else if (myGamePiece.crashWith(game[0])) {

        game[0].updateColigion("black");


        if(keys["Enter"] && createTransition){ 
            transition(1);                     
            console.log('Game 1')
        }
    } else {
    
    }
}





//CONTROLLER AREA
function controller() {
    if (keys["w"]) myGamePiece.speedY -= playerVelocity;
    if (keys["s"]) myGamePiece.speedY += playerVelocity;
    if (keys["a"]) myGamePiece.speedX -= playerVelocity;
    if (keys["d"]) myGamePiece.speedX += playerVelocity;

    if (keys["ArrowUp"]) myGamePiece.speedY -= playerVelocity;
    if (keys["ArrowDown"]) myGamePiece.speedY += playerVelocity;
    if (keys["ArrowLeft"]) myGamePiece.speedX -= playerVelocity;
    if (keys["ArrowRight"]) myGamePiece.speedX += playerVelocity;

}

function controllerGame5(){
    if (keys[" "]) {
        bulletpress = true;
        bullet = new asteroidComponent(10,10,"black",(myGamePiece.x + 15), (myGamePiece.y + 15), 3, 0, 2);
    }

    if(keys["Escape"] && createTransition) {
        freezeMap();
        transition(6);
        gameAsteroidOff = true;
    }
}

function controllerGame4(verification, box) {

    if(keys[" "] && verification) {
        selectRect(box);
    }

    if(!keys[" "]){
        isDragging = false;
        myGameArea.canvas.classList.add('dragging');
        box.move = false;
    }

    if(keys["Escape"] && createTransition) {
        
        isInGame = true;
        transition(6);
    }
}

function controllerGame3() {
    if(keys["Escape"] && createTransition) {
        
        isInGame = true;
        transition(6);
    }
}

function controllerGame2(verification, card) {
    if(keys["Escape"] && createTransition) {
        
        isInGame = true;
        transition(6);
    }

    if(keys[" "] && verification) {
        
        card.choiceColor = true;
        card.text()

    } 
}

function controllerGame1() {
    if(keys["Escape"] && createTransition) {
        
        isInGame = true;
        gameInput = false;
        pointCount = 0;
        deleteInput();
        transition(6);
    }
}

let lastDirection;
function bulletControl() {
     
    if (keys[" "]){
        if (lastDirection == 'w' || lastDirection == 'ArrowUp'){
            bulletShootS = false;
            bulletShootO = false;
            bulletShootL = false;

            bulletShootN = true;
        }
        
    } 

    if (keys[" "]){
        if (lastDirection == 's' || lastDirection == 'ArrowDown'){
            bulletShootN = false;
            bulletShootO = false;
            bulletShootL = false;

            bulletShootS = true;
        }
        
    } 

    if (keys[" "]){
        if (lastDirection == 'd' || lastDirection == 'ArrowRight'){
            bulletShootS = false;
            bulletShootO = false;
            bulletShootN = false;

            bulletShootL = true;
        }
        
    } 
    
    if (keys[" "]){
            
        if (lastDirection == 'a' || lastDirection == 'ArrowLeft'){
            bulletShootS = false;
            bulletShootN = false;
            bulletShootL = false;

            bulletShootO = true;
        }
        
    }

    

}

document.body.addEventListener('keydown', (event) => {
    
    if(keysBlock == true) {
        event.preventDefault()
    } else {
        keys[event.key] = true;

    }

    if (event.key == 'w' || event.key == 'a' || event.key == 's'|| event.key == 'd' || 
        event.key == 'ArrowUp' || event.key == 'ArrowDown' || event.key == 'ArrowLeft'|| event.key == 'ArrowRight') {
        lastDirection = event.key;
    }

})

document.body.addEventListener('keyup', (event) => {
    keys[event.key] = false;

    
})





// TRANSITION AREA
function transition(numJogo){
    let transitionGame = document.createElement('div');
    document.body.appendChild(transitionGame)
    transitionGame.appendChild(myGameArea.canvas)
    createTransition = false;
    keysBlock = true;        // inpedir movimentação do teclado
    // numJogo = numJogo


    transitionGame.style.width = `${myGameArea.canvas.width}px`;
    transitionGame.style.height = `${myGameArea.canvas.height}px`;
    transitionGame.style.opacity = 1;
    fadeOut(transitionGame, numJogo);

}

function fadeOut(element, numJogo) {
    let opacity = 1;
    let time = setInterval(function(){
        if (opacity < 0) {
            clearInterval(time);
        }
        element.style.opacity = opacity;
        if(opacity <= 0){
            

            if (isInGame) {                 // Verifica se estou no game ou não para mudar para o menu
                gameOff = true;
            } else {
                gameOff = false;
            }

            fadeIn(element, 5000, numJogo);
        }
        opacity -= 0.019;
    }, 100);

}

function fadeIn(element, duration, numJogo){
    myGameArea.canvas.style.position = 'relative'
    myGameArea.canvas.style.zIndex = -1;
    let opacity = 0;
    const interval = duration / 100;

    const fadeInterval = setInterval(function(){
        if(opacity > 1) {
            clearInterval(fadeInterval);
            reset(element);
            callGame(numJogo);
        } else {
            opacity += 0.01;
            element.style.opacity = opacity;
            element.style.filter = `alpha(opacity=${opacity * 100})`;
        }
    }, interval)

    createTransition = true;
}

function reset(element) {
    document.body.appendChild(myGameArea.canvas);
    element.remove();
    keysBlock = false;
    startGames = true;
}

function callGame(nGame) {
    if (nGame == 1){
        game1 = true;
        gameInput = true;
        myGamePiece.speedX = 400;
        myGamePiece.speedY = 570;
        containerBox = [];
        createInputText = true;
    } else if (nGame == 2){
        game2 = true;
        text1 = 1;
        count = 1;
        countChoice = 0;
        card1;
        card2;
        escolhaAtual = '';
        ultimaEscolha = '';
        cards =[];
        numberGenerator = true;
    } else if (nGame == 3) {
        game3 = true;
        newVelocity = true;
    } else if (nGame == 4) {
        game4 = true;
        box = [];
        containerBox= [];
    } else if (nGame == 5) {
        game5 = true;
        asteroids = [];
        number = 0;
    } else if (nGame == 6) {
        game1 = false;
        game2 = false;
        game3 = false;
        game4 = false;
        game5 = false;
        pointCount = 0;
    }
}





// GAMES

// Mini Game ASTEROID ATARI


function asteroidAtari(){
    const value = initialValuesAsteroids();
    
    if(value == -4){
        const choice = xOrY()
        if(choice == 'x') {
            asteroids.push(number);
            
            const valorY = createRandomNumber(1, 600);
            asteroids[number] = new asteroidComponent(0,0,"black",value, valorY, 10, 0, 2);
            asteroids[number].speedX = - 1.5;
            asteroids[number].speedY = - 1.5;

            number += 1;
        } else {
            asteroids.push(number);
            
            const valorX = createRandomNumber(1, 800);
            asteroids[number] = new asteroidComponent(0,0,"black",valorX, value, 10, 0, 2);
            asteroids[number].speedX = 0;
            asteroids[number].speedY = - 1.5;

            number += 1;
        }
    } else if (value == 604){
        asteroids.push(number);
        
        const valorX = createRandomNumber(1, 800);
        asteroids[number] = new asteroidComponent(0,0,"black", valorX, value, 10, 0, 2);
        asteroids[number].speedX = 0;
        asteroids[number].speedY = 1.5;

        number += 1;
    } else if (value == 804){
        asteroids.push(number);
        
        const valorY = createRandomNumber(1, 600);
        asteroids[number] = new asteroidComponent(0,0,"black",value, valorY, 10, 0, 2);
        asteroids[number].speedX = 1.5;
        asteroids[number].speedY = 0;

        number += 1;
    }

}

function createRandomNumber(min, max) {
    const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;

    return numeroAleatorio;
}

function initialValuesAsteroids() {
    const initialValuesAsteroids = [-4, 804, 604];
    const indiceAleatorio = Math.floor(Math.random() * initialValuesAsteroids.length);
    const value = initialValuesAsteroids[indiceAleatorio];

    return value
}

function xOrY() {
    const initialValuesAsteroids = ['x', 'y'];
    const indiceAleatorio = Math.floor(Math.random() * initialValuesAsteroids.length);
    const value = initialValuesAsteroids[indiceAleatorio];

    return value
}

function asteroidAtariNewPosition(number){
    const value = initialValuesAsteroids();
    
    if(value == -4){
        const choice = xOrY()
        if(choice == 'x') {
            
            const valorY = createRandomNumber(1, 600);
            asteroids[number].speedX =  - 1.5;
            asteroids[number].speedY =  - 1.5;
            return {'x': -4,'y': valorY }

        } else {
            
            const valorX = createRandomNumber(1, 800);
            
            asteroids[number].speedX = 0;
            asteroids[number].speedY = - 1.5;
            return {'x':valorX ,'y': -4 }

        }
    } else if (value == 604){
        
        const valorX = createRandomNumber(1, 800);
        
        asteroids[number].speedX = 0;
        asteroids[number].speedY = 1.5;
        return {'x':valorX ,'y': 604 }

    } else if (value == 804){
        
        const valorY = createRandomNumber(1, 600);
        
        asteroids[number].speedX = 1.5;
        asteroids[number].speedY = 0;
        return {'x':804 ,'y': valorY }
    }

}

function freezeMap(){
    shootingMachnich = false;
    bulletpress = false;
    isInGame = true;
    for (let i in asteroids){
            asteroids[i].speedX = 0;
            asteroids[i]. speedY = 0;
            if (!isArcInsideCanvas(myGameArea, asteroids[i].x, asteroids[i].y, asteroids[i].radius)){
                asteroids[i].noVisibility = true;
                asteroids[i].speedX = 0;
                asteroids[i]. speedY = 0;
            }
        }
}


// Mini Game ORDENAR QUADRADOS

function selectRect(box){
    isDragging = true;
    box.move = true;

    offSetX = myGamePiece.x - box.x;
    offSetY = myGamePiece.y - box.y;

    myGameArea.canvas.classList.add('dragging')
}

function moveRect(box) {

    box.x = myGamePiece.x - offSetX;
    box.y = myGamePiece.y - offSetY;
}




// Mini Game COLETAR MOEDAS

function coinNewPos(coin) {
    coin.x = createRandomNumber(1, 800);
    coin.y = createRandomNumber(1, 600);
    pointCount += 1;
    playerVelocity = playerVelocity / (pointCount)

    if (pointCount == '5') {
        isInGame = true;
        transition(6);
        
    }
}



// Mini Game JOGO DA MEMORIA

function createTextNumber(){
    for (let i in cards){
        textString = `${text1}`;
        cards[i].text1 = textString
        cards[i].text();
            
            if (count === 2){
                text1 += 1;
                count = 0;
            }
            count += 1;
    }
    text1 = 1;
    count = 1;
}

function shuffleArray(array){
    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        // [array[i.text1], array[j.text1]] = [array[j.text1], array[i.text1]];
    }

    return array;
}


// Mini Game DIGITE PARA ANDAR
let input;
let valueText;
let oneClick = true;
let oneMove = false;

function controllerInput(){

    if(keys["Enter"]){
        if (oneClick){
            input = document.getElementById('input');
            valueText = input.value;
            input.value = '';
            oneClick = false;
        }
        

    }

    if(!keys["Enter"]){
        oneClick = true;
        // oneMove = true;
    }
    
    movePlayer(valueText)
    valueText = '';

}

function movePlayer(valueText){

    if (valueText == 'cima') myGamePiece.speedY -= 20;
    if (valueText == 'baixo') myGamePiece.speedY += 20;
    if (valueText == 'esquerda') myGamePiece.speedX -= 20;
    if (valueText == 'direita') myGamePiece.speedX += 20;


}


function createInput(){
    textInput = document.createElement('input');
    textInput.id = 'input';
    textInput.placeholder = 'cima|baixo|direita|esquerda';
    textInput.setAttribute('autocomplete', 'off');
    document.body.appendChild(textInput);
    createInputText = false;
}


function deleteInput(){
    textInput.remove();
}