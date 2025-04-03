document.addEventListener('DOMContentLoaded', function() {
    // Lista de imágenes de la carpeta 'img/Monigotes'
    const images = [
        'Monigotes/Monigote1.jpeg', 'Monigotes/Monigote2.jpeg', 'Monigote3.jpeg',
        'Monigotes/Monigote4.jpeg', 'Monigotes/Monigote5.jpeg', 'Monigote6.jpeg',
        'Monigotes/Monigote7.jpeg', 'Monigotes/Monigote8.jpeg', 'Monigote9.jpeg',
        'Monigotes/Monigote10.jpeg', 'Monigotes/Monigote11.jpeg', 'Monigote12.jpeg',
        'Monigotes/Monigote13.jpeg', 'Monigotes/Monigote14.jpeg', 'Monigotes/Monigote15.jpeg',
        'Monigotes/Monigote16.jpeg', 'Monigotes/Monigote17.jpeg', 'Monigotes/Monigote18.jpeg',
        'Monigotes/Monigote19.jpeg', 'Monigotes/Monigote20.jpeg', 'Monigotes/Monigote21.jpg',
        'Monigotes/Monigote22.jpeg', 'Monigotes/Monigote23.jpeg', 'Monigotes/Monigote24.jpeg',
        'Monigotes/Monigote25.jpeg', 'Monigotes/Monigote26.jpeg', 'Monigotes/Monigote27.jpeg',
        'Monigotes/Monigote28.jpeg', 'Monigotes/Monigote29.jpeg', 'Monigotes/Monigote30.jpeg',
        'Monigotes/Monigote31.jpeg', 'Monigotes/Monigote32.jpeg', 'Monigotes/Monigote33.jpeg'
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
        const imageItem = document.createElement('div');
        imageItem.classList.add('image-item');

        // Crear la imagen
        const img = document.createElement('img');
        img.src = `img/${image}`;  // Usamos la carpeta 'img' y el nombre de la imagen
        imageItem.appendChild(img);

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
            void likeButton.offsetWidth;  // Forzar el reflujo para reiniciar la animación
            likeButton.classList.add('animate');  // Volver a añadir la clase de animación
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

        imageItem.appendChild(likeContainer);

        return imageItem;
    }

    // Obtener las imágenes aleatorias
    const randomImages = getRandomImages();

    // Obtener el contenedor donde se mostrarán las imágenes
    const imageGallery = document.querySelector('.image-gallery');

    // Crear y agregar las imágenes al contenedor
    randomImages.forEach(image => {
        const imageItem = createImageItem(image);
        imageGallery.appendChild(imageItem);
    });
});