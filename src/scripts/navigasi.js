const navigasi = () => {
  const splashScreen = document.getElementById('splashScreen');
  if (sessionStorage.getItem('routes') === '/') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        splashScreen.style.display = 'none';
      }, 2000);
    });
  } else {
    splashScreen.style.display = 'none';
  }
  document.querySelector('#menujuKontenBrok').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#kontener').scrollIntoView({
      behavior: 'smooth',
    });
  });
};

export default navigasi;
