document.addEventListener('DOMContentLoaded', function() {
    // Specific images
    const images = [
        'img/Monigotes/Monigote1.jpeg',
        'img/Monigotes/Monigote2.jpeg',
        'img/Monigotes/Monigote3.jpeg',
        'img/Monigotes/Monigote4.jpeg'
    ];

    // Function to get random likes between 50 and 100
    function getRandomLikes() {
        return Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    }

    // Function to create each image item
    function createImageItem(image) {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        const img = document.createElement('img');
        img.src = image;
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

    // Populate the image gallery
    const imageGallery = document.querySelector('.image-gallery');
    imageGallery.innerHTML = '';
    images.forEach(image => {
        const imageContainer = createImageItem(image);
        imageGallery.appendChild(imageContainer);
    });
});