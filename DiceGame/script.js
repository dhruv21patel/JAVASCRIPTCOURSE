let dice = {
    1 : './images/1.jpeg',
    2 : './images/2.jpeg',
    3 : './images/3.jpeg',
    4 : './images/4.jpeg',
    5 : './images/5.jpeg',
    6 : './images/6.jpeg',
}

const img = document.getElementById('image');
const roll = document.querySelector('.roll');
const hold = document.querySelector('.hold');
const p1hold = document.querySelector('.holding-1');
const p2hold = document.querySelector('.holding-2');
const p1score = document.querySelector('.score-1');
const p2score = document.querySelector('.score-2');
const player1 = document.querySelector('.player-1');
const player2 = document.querySelector('.player-2');
const player1name = document.querySelector('.p1');
const player2name = document.querySelector('.p2');
let number = 0;

roll.addEventListener('click', rolldice);
hold.addEventListener('click', holdvalue);

function rolldice(){
    number = Math.trunc(Math.random()*6)+1;
    img.src = String(dice[number]);
    img.style.display = 'block';
    if(number == 1)
    {
        changeplayer();

    }
    else{
        updatescore(); 
    }
   
}

function holdvalue(){
    if(player1.classList.contains('active'))
    {
        p1score.textContent = String(Number(p1score.textContent) + Number(p1hold.textContent));
        if(Number(p1score.textContent)>= 100)
        {
            player1name.textContent = "Player 1 Wins";
            setTimeout(reset,'3000');
        }
        // player1.classList.remove('active');
        // player2.classList.add('active');
        changeplayer();
        
    }
    else{
        p2score.textContent = String(Number(p2score.textContent) + Number(p2hold.textContent));
        if(Number(p2score.textContent)>= 100)
        {
            player2name.textContent = "Player 2 Wins";
            setTimeout(reset,'3000');
        }
        // player2.classList.remove('active');
        // player1.classList.add('active');
        changeplayer();
        
    }
}


function reset(){
    p1hold.textContent = '0';
    p2hold.textContent = '0';
    p1score.textContent = '0';
    p2score.textContent = '0';
    player1name.textContent = "Player 1 ";
    player2name.textContent = "Player 2 ";
    img.style.display = 'none';
}

function changeplayer(){
    if(player1.classList.contains('active'))
    {
        player1.classList.remove('active');
        player2.classList.add('active');
        p1hold.textContent = '0';
    }
    else{
        player2.classList.remove('active');
        player1.classList.add('active');
        p2hold.textContent = '0';
    }
}
function updatescore(){
    if(player1.classList.contains('active'))
    {
        p1hold.textContent = String(Number(p1hold.textContent) + number);
    }
    else{
        p2hold.textContent = String(Number(p2hold.textContent) + number);
    }
}
