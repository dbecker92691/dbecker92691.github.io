let seconds = 00; 
let minutes = 00;
$('.playagain').hide();

$('.how-to-play').on('click', () =>{
    $('.modal').modal('show')
} )




const helicopter = {
    X: 3,
    Y: 4,
    lives: 3,
    helicopterDown(){
        if(this.lives === 0){
            gameOver();
        }
    }

} 

const allObstacles = [];

class Obstacle  {
    constructor(){
        this.X = 15;
        this.Y = Math.floor(Math.random() * 7);
        allObstacles.push(this);
    }
   generate(){
    $(`.square-${this.X}-${this.Y}`).addClass('obstacle')

   } 
   moveLeft(){
    if(this.X >= 0) {
        let currentSquare = $(`.square-${this.X}-${this.Y}`)
        currentSquare.removeClass('obstacle');
        this.X--;
        $(`.square-${this.X}-${this.Y}`).addClass('obstacle')
    }
    }
    collision(){
        let currentSquare = $(`.square-${this.X}-${this.Y}`)
        if(currentSquare.hasClass('obstacle') && currentSquare.hasClass('helicopter')){
            helicopter.lives --;
            helicopter.helicopterDown();
            $('.lives').text(`Lives: ${helicopter.lives}`)
        }
    }

}



for(let x = 1; x < 16; x++){
    $('.game').append(`<div class='game-column game-column-${x}'></div>`)
    for(let y = 7; y > 0; y--){
        const gameSquare = $('<div/>')
        gameSquare.addClass('square')
        gameSquare.addClass(`square-${x}-${y}`)
        $(`.game-column-${x}`).append(gameSquare)
    }
} 

$('.square-3-4').addClass('helicopter');
$('.helicopter').hide();
$('.lives').text(`Lives: ${helicopter.lives}`)




const moveUp = () => {
    if(helicopter.Y <= 6){
        const currentSquare = $('.helicopter');
        currentSquare.removeClass('helicopter');
        helicopter.Y++;
        $(`.square-${helicopter.X}-${helicopter.Y}`).addClass('helicopter');
    }
}
const moveDown = () => {
    if(helicopter.Y >= 2) {
        const currentSquare = $('.helicopter');
        currentSquare.removeClass('helicopter');
        helicopter.Y--;
        $(`.square-${helicopter.X}-${helicopter.Y}`).addClass('helicopter');
    }

}

const moveRight = () => {
    if(helicopter.X <= 14) {
        const currentSquare = $('.helicopter');
        currentSquare.removeClass('helicopter');
        helicopter.X++;
        $(`.square-${helicopter.X}-${helicopter.Y}`).addClass('helicopter');
    }

}

const moveLeft = () => {
    if(helicopter.X >= 2) {
        const currentSquare = $('.helicopter');
        currentSquare.removeClass('helicopter');
        helicopter.X--;
        $(`.square-${helicopter.X}-${helicopter.Y}`).addClass('helicopter');
    }

}

$('body').keydown((e)=> {
    if(e.which == 38){
        moveUp();
    }else if(e.which == 40){
        moveDown();
    } else if(e.which == 39){
        moveRight();
    } else if(e.which == 37){
        moveLeft();
    }

})

const gameTimer = () => {
    gameTime = setInterval(()=>{
        seconds++;
        if(seconds % 2 === 0){
            let newObstacle = new Obstacle();
        }
        moveObsticles();
        detectCollision();
        if(seconds % 60 === 0){
            minutes++;
            seconds = 00;
         } if(seconds % 30 === 0){
            levelUp();
         }  
        $('.timer').text(`Timer:  ${minutes}:${seconds}`);
    },1000);

    
}
let speed = 1000
const levelUp = () => {
    if(helicopter.lives > 0){
        speed -= 20;
        levelUpTimer = setInterval(()=>{
            if(seconds % 1 === 0){
                let newObstacle = new Obstacle();
            }
            moveObsticles();
            detectCollision();
        }, speed)
    }
}


$('.startGame').on('click', () => {
$('.startGame').hide();
$('.helicopter').show();
gameTimer();
})


const moveObsticles = () => {
    for(let i = 0; i < allObstacles.length; i++){
        allObstacles[i].moveLeft();
    }
 }


 const detectCollision = () => {
     for(let i = 0; i < allObstacles.length; i++){
         allObstacles[i].collision();
     }
 }  



const gameOver = () => {
    // if you die before 30 seconds the 
    // levelUpTimer is not called so it
    // gets an error
        clearInterval(gameTime);
        clearInterval(levelUpTimer)
        $('.playagain').show();
        $(`.square`).removeClass('obstacle');
        $(`.square`).removeClass('helicopter');
        $('.game').append("<h1 class='gameOver'>Game Over</h1>");

 }


$('.playagain').on('click', () => {
    location.reload(true);
})

