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

const restart = document.getElementById("restart").addEventListener("click", () =>{
  if(confirm("Do you want to restart the game?")){
      location.reload();
    
  } else {
    console.log("do nothing")
  }
  
});


// start button logic
let userName = "";
const notification = document.getElementById("notification");
const scoreBoard = document.getElementById("score");

document.getElementById("name").addEventListener("change",function(){
  userName = document.getElementById("name").value;
});



document.getElementById("start-button").addEventListener("click", async () => {
  await startGame();
});

async function startGame() {
  if (!userName) {
    alert("Please Enter your name to start the game!!!!");
  } else {
    document.querySelectorAll('.piano-button').forEach(btn => btn.disabled = true);
    notification.innerText = `Hiii ${userName}, Welcome to the Game!!!`;

    document.getElementById("score-board").style.display = "block";
    $('.name-div').slideToggle('slow');
    $('#start-button').slideToggle('slow');

    notification.innerHTML = `Hii ${userName}, Welcome to the Game!!! <br> Level 1 <br> Listen 📢`;
    setTimeout(async () => {
      await gameLogic();  // optional, only if you need to wait here
    }, 2000);

    // alert("i am immediately here")
    // window.location.reload();
  }
};


async function gameLogic() {
  let score = 0, level = 1;
  let music = [], player = [];

  while (level < 10) {
    notification.innerHTML = `Level ${level} <br> Listen 📢`;
    scoreBoard.value = `${score}`;

    music = [];
    for (let i = 0; i < level; i++) {
      music.push(randomizer());
    }
    console.log("Music sequence:", music);

    await clickButtonNTimes(level, 750, music);

    document.querySelectorAll('.piano-button').forEach(btn => btn.disabled = false);
    notification.innerHTML = `Level ${level} <br> Play 🎹`;

    await getPlayerInput(player, music);

    const correct = player.every((val, i) => val === music[i]);

    if (!correct) {
      notification.innerHTML = `Oops! Wrong sequence. Game Over 😢<br>Final Score: ${score}`;
              await new Promise(res => setTimeout(res, 5000));
      location.reload();
      return;
    } else {
              // ✅ Add 1000ms delay here
        notification.innerHTML = `Level ${level + 1} <br> Good 🥳`;
        await new Promise(res => setTimeout(res, 2000));
    }

    score++;
    level++;
  }
}


function randomizer(){
  return Math.trunc(Math.random()*81%9);
}


//music delay
function clickButtonNTimes(level, interval, music) {
  return new Promise((resolve) => {
    let count = 0;
    const clickInterval = setInterval(() => {
      document.getElementById(`key-${music[count]}`).focus();
      document.getElementById(`key-${music[count]}`).click(); // Simulate button click
      count++;
      if (count >= level) {
        clearInterval(clickInterval);
        resolve(); // Resolve the Promise when done
      }
    }, interval);
  });
}


// Player Input
function getPlayerInput(player, music) {
  return new Promise((resolve) => {
    player.length = 0;
    const buttons = document.querySelectorAll('.piano-button');

    const clickHandler = async (e) => {
      const index = parseInt(e.target.id.split('-')[1]);
      player.push(index);

      if (player.length === music.length) {
        buttons.forEach(btn => btn.removeEventListener('click', clickHandler));


        resolve(); // continue game after 1s pause
      }
    };

    buttons.forEach(btn => btn.addEventListener('click', clickHandler));
  });
}


