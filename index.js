
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

$('#info').click(function() {
    $('#how-to-play').slideToggle('slow');
  });


// BUTTONS ANIMATIONS AND AUDIO LOGIC END HERE

