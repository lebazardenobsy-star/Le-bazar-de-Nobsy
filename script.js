// Animation d'apparition au chargement
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  container.style.opacity = '0';
  container.style.transform = 'translateY(30px)';

  setTimeout(() => {
    container.style.transition = 'all 0.8s ease';
    container.style.opacity = '1';
    container.style.transform = 'translateY(0)';
  }, 200);
});

// Effet clic sur le bouton + compteur
const link = document.querySelector('a');
let clicks = 0;

link.addEventListener('click', (e) => {
  clicks++;
  console.log(`Clic n°${clicks} sur le lien`);

  // Petite vibration sur mobile
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }

  // Message de confirmation
  setTimeout(() => {
    alert('Redirection vers Le bazar de Nobsy ✅');
  }, 100);
});

// Change la couleur du fond toutes les 5s
const colors = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
];

let colorIndex = 0;
setInterval(() => {
  colorIndex = (colorIndex + 1) % colors.length;
  document.body.style.background = colors[colorIndex];
  document.body.style.transition = 'background 2s ease';
}, 5000);
