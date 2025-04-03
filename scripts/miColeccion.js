document.addEventListener('DOMContentLoaded', function() {
    // Array de imágenes disponibles (especifica aquí todas las imágenes de la carpeta 'img/ropa/')
    const imageList = [
        'ropa1.jpg', 'ropa2.jpg', 'ropa3.jpg', 'ropa4.jpg', 'ropa5.jpg',
        'ropa6.jpg', 'ropa7.jpg', 'ropa8.jpg', 'ropa9.jpg', 'ropa10.jpg',
        'ropa11.jpg', 'ropa12.jpg', 'ropa13.jpg', 'ropa14.jpg', 'ropa15.jpg'
    ];

    // Función para obtener 10 imágenes aleatorias del array
    function getRandomImages(imageArray, numImages) {
        const shuffled = imageArray.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, numImages);
    }

    // Ruta de la carpeta donde se almacenan las imágenes
    const imageFolder = 'img/ropa/';

    // Obtener 10 imágenes aleatorias
    const randomImages = getRandomImages(imageList, 10);

    // Seleccionar el contenedor de la galería
    const gallery = document.getElementById('gallery');

    // Limpiar la galería antes de agregar nuevas imágenes
    gallery.innerHTML = '';

    // Crear los contenedores de imagen y agregarlos a la galería
    randomImages.forEach(image => {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        // Crear un elemento img y asignarle la imagen
        const img = document.createElement('img');
        img.src = `${imageFolder}${image}`;
        img.alt = 'Imagen aleatoria';

        // Insertar la imagen dentro del contenedor
        imageContainer.appendChild(img);

        // Insertar el contenedor de la imagen en el gallery
        gallery.appendChild(imageContainer);
    });
});
