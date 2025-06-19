// BUTTONS ANIMATIONS AND AUDIO LOGIC STARTS HERE

const piano = document.querySelector('.piano');

const colors = [
  '#e74c3c', '#f39c12', '#f1c40f',
  '#2ecc71', '#1abc9c', '#3498db',
  '#9b59b6', '#e67e22', '#f45b5b'
];

const notes = [
  'd4.wav','a4.wav','c5.wav','c4.wav','e4.wav',
  'f4.wav','g4.wav','b4.wav'
  ,'d3.wav'
];

// add sound to each button
for (let i = 0; i < 9; i++) {
  const btn = document.createElement('button');
  btn.className = 'piano-button';
  btn.id = `key-${i}`;
  btn.style.backgroundColor = colors[i];
  btn.dataset.sound = notes[i];
  btn.innerText = i + 1;

//   animation
  btn.addEventListener('click', () => {
    const audio = new Audio(`sound/${notes[i]}`);
    audio.play();

    // Animate button using jQuery: scale up then back
    $(btn).css('transform', 'scale(1.1)');
    setTimeout(() => {
      $(btn).css('transform', 'scale(1)');
    }, 100);
  });

  piano.appendChild(btn);
}

$('#how-to-play').slideToggle('fast');
document.getElementById("name").value="";
$('#info').click(function() {
    $('#how-to-play').slideToggle('slow');
  });


// BUTTONS ANIMATIONS AND AUDIO LOGIC END HERE

document.getElementById("restart").addEventListener("click",restart);

function restart(){ 
  // location.reload();
}

// start button logic
let userName = "";
const notification = document.getElementById("notification");
const scoreBoard = document.getElementById("score");

document.getElementById("name").addEventListener("change",function(){
  userName = document.getElementById("name").value;
});


document.getElementById("start-button").addEventListener("click", startGame);

function startGame(){
  if(!userName){
    alert("Please Enter your name to start the game!!!!");
  } else{
    document.querySelectorAll('.piano-button').forEach(btn => btn.disabled = true);
      notification.innerText = `Hiii ${userName}, Welcome to the Game!!!`;

      document.getElementById("score-board").style.display = "block";
      $('.name-div').slideToggle('slow');
      $('#start-button').slideToggle('slow');


      notification.innerHTML = `Hii ${userName}, Welcome to the Game!!! <br> Level 1 <br> Listen 📢`;
      setTimeout(function() {
      gameLogic();
      }, 3000);

    restart();
  }
};

function gameLogic(){
// clickButtonNTimes(3, 1000);

 let score = 0, level = 3;
 let music = [], player = []; 

 while(level<4){
  notification.innerHTML = `Level ${level} <br> Listen 📢`;
  scoreBoard.value = `${score}`;

  //random music generator and player
  for(let i = 0; i < level; i++ ){
    music.push(randomizer());
  }
  clickButtonNTimes(level, 1000, music);


  //player input
  document.querySelectorAll('.piano-button').forEach(btn => btn.disabled = false);
  notification.innerHTML = `Level ${level} <br> Play 📢`;

  player = getPlayerInput(player);

  score++;
  level++;
 }
}


function randomizer(){
  return Math.trunc(Math.random()*81%9);
}


//music delay
function clickButtonNTimes(level, interval, music) {
  let count = 0;
  const clickInterval = setInterval(() => {
    document.getElementById(`key-${music[count]}`).click(); // Simulate button click
    count++;
    if (count >= level) {
      clearInterval(clickInterval);
    }
  }, interval);
}


// Player Input
function getPlayerInput(player){
  
}