document.addEventListener('DOMContentLoaded', function() {
    // List of images
    const imageFolder = 'img/Monigotes/';
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

    // Function to shuffle array and select 12 images
    function getRandomImages() {
        const shuffled = [...images].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 12);
    }

    // Function to create each image item
    function createImageItem(image) {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        const img = document.createElement('img');
        img.src = `${imageFolder}${image}`;
        img.loading = 'lazy';
        img.alt = `Outfit ${image}`;
        img.onerror = () => { img.src = 'img/placeholder.jpg'; };
        imageContainer.appendChild(img);

        const likeContainer = document.createElement('div');
        likeContainer.classList.add('like-container');

        likeContainer.innerHTML = `
            <button class="comment-button" aria-label="Comentar">\u{1F4AC}</button>
            <button class="like-button" aria-label="Me gusta">\u{1F90D}</button>
        `;

        const commentButton = likeContainer.querySelector('.comment-button');
        const likeButton = likeContainer.querySelector('.like-button');

        commentButton.addEventListener('click', function() {
            alert('No está registrado');
        });

        likeButton.addEventListener('click', function() {
            alert('No está registrado');
        });

        imageContainer.appendChild(likeContainer);
        return imageContainer;
    }

    // Populate the image gallery with random images
    const imageGallery = document.querySelector('.image-gallery');
    imageGallery.innerHTML = '';
    const randomImages = getRandomImages();
    randomImages.forEach(image => {
        const imageContainer = createImageItem(image);
        imageGallery.appendChild(imageContainer);
    });
});