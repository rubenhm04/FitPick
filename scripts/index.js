document.addEventListener('DOMContentLoaded', function() {
    // Ruta de la carpeta donde se almacenan las imágenes
    const imageFolder = 'img/Monigotes/';
    
    // Lista de imágenes de la carpeta 'img/Monigotes'
    const images = [
        'Monigote1.jpeg', 'Monigote2.jpeg', 'Monigote3.jpeg',
        'Monigote4.jpeg', 'Monigote5.jpeg', 'Monigote6.jpeg',
        'Monigote7.jpeg', 'Monigote8.jpeg', 'Monigote9.jpeg',
        'Monigote10.jpeg', 'Monigote11.jpeg', 'Monigote12.jpeg',
        'Monigote13.jpeg', 'Monigote14.jpeg', 'Monigote15.jpeg',
        'Monigote16.jpeg', 'Monigote17.jpeg', 'Monigote18.jpeg',
        'Monigote19.jpeg', 'Monigote20.jpeg', 'Monigote21.jpg',
        'Monigote22.jpeg', 'Monigote23.jpeg', 'Monigote24.jpeg',
        'Monigote25.jpeg', 'Monigote26.jpeg', 'Monigote27.jpeg',
        'Monigote28.jpeg', 'Monigote29.jpeg', 'Monigote30.jpeg',
        'Monigote31.jpeg', 'Monigote32.jpeg', 'Monigote33.jpeg'
    ];

    // Función para seleccionar 14 imágenes aleatorias
    function getRandomImages() {
        let selectedImages = [];
        while (selectedImages.length < 14) {
            const randomIndex = Math.floor(Math.random() * images.length);
            if (!selectedImages.includes(images[randomIndex])) {
                selectedImages.push(images[randomIndex]);
            }
        }
        return selectedImages;
    }

    // Función para obtener un valor aleatorio de likes entre 100 y 2500
    function getRandomLikes() {
        return Math.floor(Math.random() * (2500 - 100 + 1)) + 100;
    }

    // Función para crear el HTML de cada imagen
    function createImageItem(image) {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        // Crear la imagen
        const img = document.createElement('img');
        img.src = `${imageFolder}${image}`;
        imageContainer.appendChild(img);

        // Crear el contenedor de like y el contador
        const likeContainer = document.createElement('div');
        likeContainer.classList.add('like-container');
        
        // Inicializar el contador de likes aleatorio
        const initialLikes = getRandomLikes();
        
        likeContainer.innerHTML = `   
            <span class="like-count">${initialLikes} Me Gusta</span>
            <span class="like-button">❤️</span>
        `;

        // Obtener elementos
        const likeCount = likeContainer.querySelector('.like-count');
        const likeButton = likeContainer.querySelector('.like-button');

        // Estado de si la imagen ya tiene like o no
        let hasLiked = false;

        // Función para animar el corazón
        function animateHeart() {
            likeButton.classList.remove('animate');  // Eliminar la animación
            void likeButton.offsetWidth;             // Forzar el reflujo para reiniciar la animación
            likeButton.classList.add('animate');     // Volver a añadir la clase de animación
        }

        // Acción al dar like
        likeButton.addEventListener('click', function() {
            if (!hasLiked) {
                // Si no ha dado like, dar like
                likeButton.classList.add('liked'); // Rellenar el corazón
                animateHeart(); // Animar el corazón
                let likes = parseInt(likeCount.textContent.split(' ')[0]);
                likes++;
                likeCount.textContent = `${likes} Me Gusta`;
                hasLiked = true; // Marcar como que ya ha dado like
            } else {
                // Si ya ha dado like, quitar like
                likeButton.classList.remove('liked'); // Vaciar el corazón
                likeCount.textContent = `${parseInt(likeCount.textContent.split(' ')[0]) - 1} Me Gusta`;
                hasLiked = false; // Marcar como que ya no ha dado like
            }
        });

        imageContainer.appendChild(likeContainer);
        return imageContainer;
    }

    // Obtener el contenedor donde se mostrarán las imágenes
    const imageGallery = document.querySelector('.image-gallery');

    // Limpiar la galería antes de agregar nuevas imágenes
    imageGallery.innerHTML = '';

    // Obtener las imágenes aleatorias
    const randomImages = getRandomImages();

    // Crear y agregar las imágenes al contenedor
    randomImages.forEach(image => {
        const imageContainer = createImageItem(image);
        imageGallery.appendChild(imageContainer);
    });
});