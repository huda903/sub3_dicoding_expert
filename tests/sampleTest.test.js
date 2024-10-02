const {
  tambahFavorite, hapusFavorite, ngecekFavorite, semuaDataFavorite,
} = require('../src/scripts/restaurantFavoriteIdb');

describe('Integritas Testing Favorite Restoran', () => {
  const resto = [
    {
      id: 'restaurant_1',
      name: 'Ayumu no Food',
      city: 'Cibaduyut',
      rating: 4.9,
      description: 'Restaurant ini merupakan tempat makan yang menyajikan makanan khas jepang',
      pictureId: '0',
    },
    {
      id: 'restaurant_2',
      name: 'Pizza France',
      city: 'Cianjur',
      rating: 4.7,
      description: 'Restaurant ini merupakan tempat makan yang menyajikan pizza khas prancis',
      pictureId: '1',
    },
    {
      id: 'restaurant_3',
      name: 'Java Food Illuminate',
      city: 'Jakarta',
      rating: 4.8,
      description: 'Restaurant ini merupakan tempat makan yang menyajikan makanan khas jawa',
      pictureId: '2',
    },
  ];

  beforeEach(async () => {
    resto.forEach(async (rest) => {
      await hapusFavorite(rest.id);
    });
  });

  afterEach(async () => {
    resto.forEach(async (rest) => {
      await hapusFavorite(rest.id);
    });
  });

  test('Menambahkan 1 restoran ke favorit', async () => {
    await tambahFavorite(resto[1]);
    const result = await ngecekFavorite(resto[1].id);
    expect(result).toBe(true);
    const allFavorites = await semuaDataFavorite();
    expect(allFavorites).toEqual([resto[1]]);
    await tambahFavorite(resto[2]);
    const updatedFavorites = await semuaDataFavorite();
    expect(updatedFavorites).toEqual([resto[1], resto[2]]);
  });

  test('Menghapus 1 restoran dari favorit', async () => {
    await tambahFavorite(resto[1]);
    await hapusFavorite(resto[1].id);
    const result = await ngecekFavorite(resto[1].id);
    expect(result).toBe(false);
    const allFavorites = await semuaDataFavorite();
    expect(allFavorites).toEqual([]);
  });

  test('Menambahkan beberapa restoran ke favorit', async () => {
    await tambahFavorite(resto[1]);
    await tambahFavorite(resto[2]);
    const allFavorites = await semuaDataFavorite();
    expect(allFavorites).toEqual([resto[1], resto[2]]);
  });

  test('Memeriksa restoran sudah ada di favorit', async () => {
    await tambahFavorite(resto[1]);
    const result = await ngecekFavorite(resto[1].id);
    expect(result).toBe(true);
  });
});
