const {
  semuaDataFavorite,
} = require('../restaurantFavoriteIdb');

const getAllFavoriteRestaurant = async () => {
  try {
    const responseFavorite = await semuaDataFavorite();
    const kontener = document.getElementById('kontener');
    kontener.innerHTML = '';
    responseFavorite.forEach((el) => {
      kontener.innerHTML += `
          <div class='itemKontener'>
            <div style="background-color: white; padding: 20px 0px; min-height: 44px; min-width: 44px; color: black; display: flex; justify-content: center;">
              <a href='/#/detail/${el.id}' class='textLinkDetail' style="min-height: 44px; min-width: 44px; align-items: center" id="${el.id}">
                <h1 style='text-align: center; color: black; min-height: 44px; min-width: 44px; align-items: center; align-self: center;'>${el.name}</h1>
              </a>
            </div>
            <img class='imageItemContainer lazyload' data-src='https://restaurant-api.dicoding.dev/images/small/${el.pictureId}' alt=${el.name}>
            <p><b>🏙️ Kota</b>  : ${el.city}</p>
            <p><b>⭐ Rating</b>  :  ${el.rating}</p>
            <p><b>📜 Deskripsi</b>  : ${el.description}</p>
          </div>
          `;
    });

    document.querySelectorAll('.textLinkDetail').forEach((itemKontener) => {
      itemKontener.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(itemKontener.getAttribute('id'));
        sessionStorage.setItem('id', itemKontener.getAttribute('id'));
        window.location.hash = `/detail/${itemKontener.getAttribute('id')}`;
        sessionStorage.setItem('routes', `/detail/${itemKontener.getAttribute('id')}`);
        window.location.reload();
      });
    });
  } catch (e) {
    console.log(e);
  }
};

export default getAllFavoriteRestaurant;
