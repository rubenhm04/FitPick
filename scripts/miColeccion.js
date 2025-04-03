document.addEventListener('DOMContentLoaded', function() {
    // Ruta de la carpeta donde se almacenan las imágenes
    const imageFolder = 'img/ropa/';
    
    // Array de imágenes disponibles
    const images = [
        'ropa1.jpg', 'ropa2.jpg', 'ropa3.jpg', 'ropa4.jpg', 'ropa5.jpg',
        'ropa6.jpg', 'ropa7.jpg', 'ropa8.jpg', 'ropa9.jpg', 'ropa10.jpg',
        'ropa11.jpg', 'ropa12.jpg', 'ropa13.jpg', 'ropa14.jpg', 'ropa15.jpg',
        'ropa16.jpg', 'ropa17.jpg', 'ropa18.jpg', 'ropa19.jpg', 'ropa20.jpg',
        'ropa21.jpg',
    ];

    // Función para seleccionar 10 imágenes aleatorias
    function getRandomImages() {
        let selectedImages = [];
        while (selectedImages.length < 10) {
            const randomIndex = Math.floor(Math.random() * images.length);
            if (!selectedImages.includes(images[randomIndex])) {
                selectedImages.push(images[randomIndex]);
            }
        }
        return selectedImages;
    }

    // Función para crear el HTML de cada imagen
    function createImageItem(image) {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
    
        // Crear la imagen
        const img = document.createElement('img');
        img.src = `${imageFolder}${image}`;
        
        // Insertar la imagen dentro del contenedor
        imageContainer.appendChild(img);
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

// AGREGAR IMAGEN
document.addEventListener("DOMContentLoaded", () => {
    const addClothingButton = document.getElementById("submenu-miColeccion-add");
    const gallery = document.getElementById("gallery");

    // Crear menú desplegable para elegir fuente de imagen
    const dropdownMenu = document.createElement("div");
    dropdownMenu.classList.add("dropdown-menu");
    dropdownMenu.innerHTML = `
        <button id="choose-gallery">Añadir desde Galería</button>
        <button id="choose-camera">Añadir desde Cámara</button>
    `;
    dropdownMenu.style.display = "none"; // Ocultar por defecto
    document.body.appendChild(dropdownMenu);

    // Mostrar menú desplegable al hacer clic en "Añadir Prenda"
    addClothingButton.addEventListener("click", (event) => {
        event.preventDefault();
        dropdownMenu.style.display = "block";
        dropdownMenu.style.position = "absolute";
        dropdownMenu.style.left = `${event.pageX}px`;
        dropdownMenu.style.top = `${event.pageY}px`;
    });

    // Ocultar el menú si se hace clic fuera de él
    document.addEventListener("click", (event) => {
        if (!dropdownMenu.contains(event.target) && event.target !== addClothingButton) {
            dropdownMenu.style.display = "none";
        }
    });

    // Crear un input oculto para seleccionar imagen desde la galería
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);

    // Manejar selección de imagen desde la galería
    document.getElementById("choose-gallery").addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                addImageToGallery(e.target.result);
            };
            reader.readAsDataURL(file);
        }
        dropdownMenu.style.display = "none";
    });

    // Manejar la captura de imagen con la cámara
    document.getElementById("choose-camera").addEventListener("click", async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const video = document.createElement("video");
            video.srcObject = stream;
            video.play();

            // Crear interfaz para la cámara
            const cameraOverlay = document.createElement("div");
            cameraOverlay.classList.add("camera-overlay");
            cameraOverlay.innerHTML = `
                <video autoplay></video>
                <button id="capture-photo">Capturar</button>
                <button id="close-camera">Cerrar</button>
            `;
            document.body.appendChild(cameraOverlay);
            cameraOverlay.querySelector("video").srcObject = stream;

            // Capturar la imagen cuando se presiona el botón
            document.getElementById("capture-photo").addEventListener("click", () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                addImageToGallery(canvas.toDataURL("image/png"));
                stream.getTracks().forEach(track => track.stop()); // Detener la cámara
                cameraOverlay.remove();
            });

            // Cerrar la cámara sin capturar
            document.getElementById("close-camera").addEventListener("click", () => {
                stream.getTracks().forEach(track => track.stop()); // Detener la cámara
                cameraOverlay.remove();
            });

        } catch (error) {
            console.error("Error al acceder a la cámara:", error);
        }
        dropdownMenu.style.display = "none";
    });

    // Función para agregar imágenes a la galería con el mismo formato
    function addImageToGallery(imageSrc) {
        // Crear contenedor de imagen con la misma estructura que el CSS
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");

        // Crear imagen y aplicarle el mismo formato
        const imgElement = document.createElement("img");
        imgElement.src = imageSrc;
        imgElement.alt = "Nueva prenda";

        // Agregar imagen dentro del contenedor y luego a la galería
        imageContainer.appendChild(imgElement);
        gallery.appendChild(imageContainer);
    }
});