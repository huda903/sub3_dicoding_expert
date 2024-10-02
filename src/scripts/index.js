import 'regenerator-runtime';
import '../styles/main.css';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import navigasi from './navigasi';
import getAllRestaurant from './dataRequest/getAllRestaurant';
import getDetailRestaurant from './dataRequest/getDetailRestaurant';
import getAllFavoriteRestaurant from './dataRequest/getAllFavoriteRestaurant';
import swRegister from './utils/swRegister';

console.log('Hello Coders! :)');

const kk = document.getElementById('kk');
const panjangKk = kk.children.length;
const navigasiEtcetera = document.getElementById('naviagasiEtcetera');
const kontenerNavigasi = document.getElementById('kontenerNavigasi');
const tutupNavigasi = document.getElementById('tutupNavigasi');
const hamburgerButton = document.getElementById('hamburgerButton');
const subTitle = document.getElementById('sub_title');
const jumboTron = document.getElementById('jumboTron');

if (!sessionStorage.getItem('routes')) {
  sessionStorage.setItem('routes', '/');
} else {
  sessionStorage.getItem('routes');
}

const tutup = () => {
  kontenerNavigasi.style.marginRight = '100%';
  kontenerNavigasi.style.display = 'none';
};

const buka = () => {
  kontenerNavigasi.style.marginRight = '50%';
  kontenerNavigasi.style.display = 'flex';
};

hamburgerButton.addEventListener('click', buka);
navigasiEtcetera.addEventListener('click', tutup);
tutupNavigasi.addEventListener('click', tutup);

navigasi();

const navigasiAbc = document.getElementById('navigasi_abc');
const navigasiDef = document.getElementById('navigasi_def');
const links1 = navigasiAbc.querySelectorAll('a');
const links2 = navigasiDef.querySelectorAll('a');

links1.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(link.innerText);
    sessionStorage.setItem('routes', link.getAttribute('href'));
    window.location.reload();
  });
});

links2.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(link.innerText);
    sessionStorage.setItem('routes', link.getAttribute('href'));
    window.location.reload();
  });
});

document.getElementById('logo').addEventListener('click', (event) => {
  event.preventDefault();
  sessionStorage.setItem('routes', event.currentTarget.getAttribute('href'));
  window.location.reload();
});

switch (sessionStorage.getItem('routes')) {
  case '/':
    jumboTron.style.display = 'block';
    subTitle.innerText = '';
    subTitle.innerText = 'EXPLORE FOODSTREET';
    window.history.replaceState(null, '', '/');
    if (sessionStorage.getItem('routes')) {
      let kontener = document.getElementById('kontener');
      if (!kontener) {
        kontener = document.createElement('div');
        kontener.id = 'kontener';
        kk.insertBefore(kontener, kk.children[panjangKk - 1]);
      }
    }
    getAllRestaurant('https://restaurant-api.dicoding.dev');
    break;
  case '/favorite':
    document.getElementById('kontener').remove();
    jumboTron.style.display = 'none';
    subTitle.style.paddingTop = '25px';
    subTitle.innerText = '';
    subTitle.innerText = 'FAVORITE FOODSTREET';
    window.location.hash = '/favorite';
    if (sessionStorage.getItem('routes')) {
      let kontener = document.getElementById('kontener');
      if (!kontener) {
        kontener = document.createElement('div');
        kontener.id = 'kontener';
        kk.insertBefore(kontener, kk.children[panjangKk - 1]);
      }
    }
    getAllFavoriteRestaurant();
    break;
  case `/detail/${sessionStorage.getItem('id')}`:
    document.getElementById('kontener').remove();
    jumboTron.style.display = 'none';
    subTitle.style.paddingTop = '15px';
    subTitle.innerText = '';
    subTitle.innerText = 'DETAIL FOODSTREET';
    window.location.hash = `/detail/${sessionStorage.getItem('id')}`;
    if (sessionStorage.getItem('routes')) {
      let kontenerDetail = document.getElementById('kontenerDetail');
      if (!kontenerDetail) {
        kontenerDetail = document.createElement('div');
        kontenerDetail.id = 'kontenerDetail';
        kk.insertBefore(kontenerDetail, kk.children[panjangKk - 1]);
      }
    }
    getDetailRestaurant('https://restaurant-api.dicoding.dev', sessionStorage.getItem('id'));
    break;
  default:
    console.log('tidak ditemukan halaman apapun');
    break;
}

window.addEventListener('load', () => {
  swRegister();
});
