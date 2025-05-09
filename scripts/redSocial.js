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

    // Function to select 12 random images
    function getRandomImages() {
        let selectedImages = [];
        while (selectedImages.length < 12) {
            const randomIndex = Math.floor(Math.random() * images.length);
            if (!selectedImages.includes(images[randomIndex])) {
                selectedImages.push(images[randomIndex]);
            }
        }
        return selectedImages;
    }

    // Function to get random likes between 50 and 100
    function getRandomLikes() {
        return Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    }

    // Function to create each image item
    function createImageItem(image) {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        const img = document.createElement('img');
        img.src = `${imageFolder}${image}`;
        imageContainer.appendChild(img);

        const likeContainer = document.createElement('div');
        likeContainer.classList.add('like-container');

        const initialLikes = getRandomLikes();
        likeContainer.innerHTML = `
            <span class="comment-button">💬</span>
            <div>
                <span class="like-count">${initialLikes} Me Gusta</span>
                <span class="like-button" data-liked="false" data-count="${initialLikes}">🤍</span>
            </div>
        `;

        const likeCount = likeContainer.querySelector('.like-count');
        const likeButton = likeContainer.querySelector('.like-button');

        function animateHeart() {
            likeButton.classList.remove('animate');
            void likeButton.offsetWidth;
            likeButton.classList.add('animate');
        }

        likeButton.addEventListener('click', function() {
            const isLiked = likeButton.dataset.liked === 'true';
            let count = parseInt(likeButton.dataset.count);

            if (isLiked) {
                likeButton.classList.remove('liked');
                likeButton.dataset.liked = 'false';
                likeButton.innerHTML = '🤍';
                count -= 1;
            } else {
                likeButton.classList.add('liked');
                likeButton.innerHTML = '❤️';
                animateHeart();
                likeButton.dataset.liked = 'true';
                count += 1;
            }

            likeButton.dataset.count = count;
            likeCount.textContent = `${count} Me Gusta`;
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

    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchIcon = document.querySelector('.search-icon');

    searchIcon.addEventListener('click', function() {
        window.location.href = 'redSocialPerfil.html';
    });

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            window.location.href = 'redSocialPerfil.html';
        }
    });
});