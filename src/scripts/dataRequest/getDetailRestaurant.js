import {
  tambahFavorite, hapusFavorite, ngecekFavorite,
} from '../restaurantFavoriteIdb';

const getDetailRestaurant = async (link, id) => {
  try {
    const response = await fetch(`${link}/detail/${id}`);
    const data = await response.json();
    console.log(data.restaurant);
    const kontenerDetail = document.getElementById('kontenerDetail');
    kontenerDetail.innerHTML += `
          <div id="tempDetail1">
            <h1 style='text-align: center; padding-top: 20px'>${data.restaurant.name}</h1>
            <img id='detailGambarRestaurant' class="lazyload" data-src='https://restaurant-api.dicoding.dev/images/medium/${data.restaurant.pictureId}' alt=${data.restaurant.name}>
            <div>
              <p id="likeUnlike_${data.restaurant.id}" style='text-align: center; cursor: pointer; min-height: 44px; min-width: 44px;'>&#9825;</p>
            </div>
          </div>
          <div id="tempDetail2">
            <section>
              <h3>Kota:</h3>
              <p>${data.restaurant.city}</p>
            </section>

            <section>
              <h3>Alamat:</h3>
              <p>${data.restaurant.address}</p>
            </section>

            <section>
              <h3>Deskripsi:</h3>
              <p>${data.restaurant.description}</p>
            </section>

            <section>
              <h3>Menu Makanan:</h3>
              <ol type="1" style="padding-left: 25px">
                ${data.restaurant.menus.foods.map((a) => `<li>${a.name}</li>`).join('')}
              </ol>
            </section>

            <section>
              <h3>Menu Minuman:</h3>
              <ol type="1" style="padding-left: 25px">
                ${data.restaurant.menus.drinks.map((a) => `<li>${a.name}</li>`).join('')}
              </ol>
            </section>

            <section>
                <h3>Customer Review:</h3>
                <ol>
                    ${data.restaurant.customerReviews.map(
    (a) => `
                        <div style="border: 2px solid white; margin: 20px 0px; padding: 5px">
                            <p>${a.name}</p>
                            <p>${a.review}</p>
                            <p>${a.date}</p>
                        </div>
                        `,
  )
    .join('')}
                </ol>
            </section>
          </div>
        `;

    let favorite = await ngecekFavorite(data.restaurant.id);
    document.getElementById(`likeUnlike_${data.restaurant.id}`).innerText = favorite ? '\u2665' : '\u2661';
    document.getElementById(`likeUnlike_${data.restaurant.id}`).addEventListener('click', async () => {
      favorite = await ngecekFavorite(data.restaurant.id);
      if (favorite) {
        document.getElementById(`likeUnlike_${data.restaurant.id}`).innerText = '\u2661'; // ♡
        await hapusFavorite(data.restaurant.id);
      } else {
        document.getElementById(`likeUnlike_${data.restaurant.id}`).innerText = '\u2665'; // ♥
        await tambahFavorite(data.restaurant);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

export default getDetailRestaurant;
