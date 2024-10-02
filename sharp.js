const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/heros');
const destination = path.resolve(__dirname, 'dist/images/heros');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true }); // Mengaktifkan pembuatan direktori secara rekursif
}

fs.readdirSync(target)
  .forEach((image) => {
    const imageName = path.parse(image).name; // Mendapatkan nama file tanpa ekstensi
    const imageExt = path.parse(image).ext;   // Mendapatkan ekstensi file

    // Mendefinisikan path output
    const largeImagePath = path.resolve(destination, `${imageName}-large${imageExt}`);
    const smallImagePath = path.resolve(destination, `${imageName}-small${imageExt}`);

    // Mengubah ukuran ke lebar 800px dan menyimpan sebagai large
    sharp(path.join(target, image))
      .resize(800)
      .toFile(largeImagePath)
      .then(() => {
        console.log(`Berhasil dibuat: ${largeImagePath}`);
      })
      .catch(err => {
        console.error(`Error saat membuat gambar besar untuk ${image}:`, err);
      });

    // Mengubah ukuran ke lebar 480px dan menyimpan sebagai small
    sharp(path.join(target, image))
      .resize(480)
      .toFile(smallImagePath)
      .then(() => {
        console.log(`Berhasil dibuat: ${smallImagePath}`);
      })
      .catch(err => {
        console.error(`Error saat membuat gambar kecil untuk ${image}:`, err);
      });
  });
