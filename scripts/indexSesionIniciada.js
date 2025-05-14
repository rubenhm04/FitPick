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
        'Monigote19.jpeg', 'Monigote20.jpeg',
        'Monigote21.jpeg', 'Monigote22.jpeg', 'Monigote23.jpeg',
        'Monigote24.jpeg', 'Monigote25.jpeg', 'Monigote26.jpeg',
        'Monigote27.jpeg', 'Monigote28.jpeg', 'Monigote29.jpeg',
        'Monigote30.jpeg', 'Monigote31.jpeg', 'Monigote32.jpeg'
    ];

    // Function to shuffle array and select 12 images
    function getRandomImages() {
        const shuffled = [...images].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 12);
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
        img.loading = 'lazy';
        img.alt = `Outfit ${image}`;
        img.onerror = () => { img.src = 'img/placeholder.jpg'; };
        imageContainer.appendChild(img);

        const likeContainer = document.createElement('div');
        likeContainer.classList.add('like-container');

        const imageKey = `like_${image}`;
        const savedLike = localStorage.getItem(imageKey);
        const initialLikes = savedLike ? parseInt(savedLike) : getRandomLikes();
        const isLiked = savedLike ? localStorage.getItem(`${imageKey}_liked`) === 'true' : false;

        likeContainer.innerHTML = `
            <button class="comment-button" aria-label="Comentar">\u{1F4AC}</button>
            <div>
                <span class="like-count">${initialLikes} Me Gusta</span>
                <button class="like-button" data-liked="${isLiked}" data-count="${initialLikes}" aria-label="Me gusta">${isLiked ? '\u{2764}' : '\u{1F90D}'}</button>
            </div>
        `;

        const likeCount = likeContainer.querySelector('.like-count');
        const likeButton = likeContainer.querySelector('.like-button');
        const commentButton = likeContainer.querySelector('.comment-button');

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
                likeButton.innerHTML = '\u{1F90D}';
                count -= 1;
            } else {
                likeButton.classList.add('liked');
                likeButton.innerHTML = '\u{2764}';
                animateHeart();
                likeButton.dataset.liked = 'true';
                count += 1;
            }

            likeButton.dataset.count = count;
            likeCount.textContent = `${count} Me Gusta`;
            localStorage.setItem(imageKey, count);
            localStorage.setItem(`${imageKey}_liked`, likeButton.dataset.liked);
        });

        commentButton.addEventListener('click', function() {
            alert('Función de comentarios en desarrollo');
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

    function handleSearch() {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `redSocialPerfil.html?query=${encodeURIComponent(query)}`;
        } else {
            window.location.href = 'redSocialPerfil.html';
        }
    }

    searchIcon.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });
});