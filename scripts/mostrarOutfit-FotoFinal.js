document.addEventListener('DOMContentLoaded', function() {
    // Lista de imágenes en la carpeta img/Monigotes
    const images = Array.from({ length: 32 }, (_, i) => `Monigote${i + 1}.jpeg`);

    // Seleccionar una imagen aleatoria
    const randomImage = images[Math.floor(Math.random() * images.length)];

    // Actualizar el src de la imagen
    const outfitImage = document.getElementById('outfit-image');
    outfitImage.src = `img/Monigotes/${randomImage}`;
});