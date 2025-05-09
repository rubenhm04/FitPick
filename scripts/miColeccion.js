document.addEventListener('DOMContentLoaded', function () {
    const imageFolder = 'img/ropa/';
    const images = [
        'ropa1.jpg', 'ropa2.jpg', 'ropa3.jpg', 'ropa4.jpg', 'ropa5.jpg',
        'ropa6.jpg', 'ropa7.jpg', 'ropa8.jpg', 'ropa9.jpg', 'ropa10.jpg',
        'ropa11.jpg', 'ropa12.jpg', 'ropa13.jpg', 'ropa14.jpg', 'ropa15.jpg',
        'ropa16.jpg', 'ropa17.jpg', 'ropa18.jpg', 'ropa19.jpg', 'ropa20.jpg',
        'ropa21.jpg',
    ];
    const selectedImages = images.slice(0, 10);
    const imageGallery = document.querySelector('.image-gallery');
    const cancelDeleteContainer = document.getElementById("cancelDeleteContainer");
    const cancelDeleteButton = document.getElementById("cancelDeleteBtn");

    let deleteMode = false;

    imageGallery.innerHTML = '';

    function createImageItem(imageSrc) {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        const img = document.createElement('img');
        img.src = `${imageSrc}`;

        const trashIcon = document.createElement('span');
        trashIcon.classList.add('trash-icon');
        trashIcon.innerHTML = '🗑️';
        trashIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            showConfirmationDialog(imageContainer);
        });

        imageContainer.appendChild(img);
        imageContainer.appendChild(trashIcon);
        return imageContainer;
    }

    selectedImages.forEach(image => {
        const container = createImageItem(`${imageFolder}${image}`);
        imageGallery.appendChild(container);
    });

    function addImageToGallery(imageSrc) {
        const container = createImageItem(imageSrc);
        imageGallery.appendChild(container);
        if (deleteMode) {
            container.classList.add('delete-mode');
        }
    }

    function showConfirmationDialog(imageContainer) {
        const overlay = document.createElement('div');
        overlay.classList.add('confirmation-overlay');
        overlay.style.display = 'flex';

        const dialog = document.createElement('div');
        dialog.classList.add('confirmation-dialog');
        dialog.innerHTML = `
            <p>¿Seguro que quieres eliminar esta prenda?</p>
            <button class="confirm-btn">Sí</button>
            <button class="cancel-btn">No</button>
        `;

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        dialog.querySelector('.confirm-btn').addEventListener('click', () => {
            imageContainer.remove();
            overlay.remove();
        });

        dialog.querySelector('.cancel-btn').addEventListener('click', () => {
            overlay.remove();
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }

    const addClothingButton = document.getElementById("submenu-miColeccion-add");
    const deleteClothingButton = document.getElementById("submenu-miColeccion-delete");
    const gallery = document.getElementById("gallery");

    // Menú para añadir prenda
    const dropdownMenu = document.createElement("div");
    dropdownMenu.classList.add("dropdown-menu");
    dropdownMenu.innerHTML = `
        <button id="choose-gallery">Añadir desde Galería</button>
        <button id="choose-camera">Añadir desde Cámara</button>
    `;
    dropdownMenu.style.display = "none";
    document.body.appendChild(dropdownMenu);

    addClothingButton.addEventListener("click", (event) => {
        event.preventDefault();
        dropdownMenu.style.display = "block";
        dropdownMenu.style.position = "absolute";
        dropdownMenu.style.left = `${event.pageX}px`;
        dropdownMenu.style.top = `${event.pageY}px`;
    });

    document.addEventListener("click", (event) => {
        if (!dropdownMenu.contains(event.target) && event.target !== addClothingButton) {
            dropdownMenu.style.display = "none";
        }
    });

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);

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

    document.getElementById("choose-camera").addEventListener("click", async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const video = document.createElement("video");
            video.srcObject = stream;
            video.play();

            const cameraOverlay = document.createElement("div");
            cameraOverlay.classList.add("camera-overlay");
            cameraOverlay.innerHTML = `
                <video autoplay></video>
                <button id="capture-photo">Capturar</button>
                <button id="close-camera">Cerrar</button>
            `;
            document.body.appendChild(cameraOverlay);
            cameraOverlay.querySelector("video").srcObject = stream;

            document.getElementById("capture-photo").addEventListener("click", () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                addImageToGallery(canvas.toDataURL("image/png"));
                stream.getTracks().forEach(track => track.stop());
                cameraOverlay.remove();
            });

            document.getElementById("close-camera").addEventListener("click", () => {
                stream.getTracks().forEach(track => track.stop());
                cameraOverlay.remove();
            });

        } catch (error) {
            console.error("Error al acceder a la cámara:", error);
        }
        dropdownMenu.style.display = "none";
    });

    // Activar modo eliminación
    deleteClothingButton.addEventListener("click", (event) => {
        event.preventDefault();
        deleteMode = true;

        const containers = document.querySelectorAll(".image-container");
        containers.forEach(container => container.classList.add("delete-mode"));

        cancelDeleteContainer.style.display = "block";
    });

    // Cancelar modo eliminación
    cancelDeleteButton.addEventListener("click", () => {
        deleteMode = false;

        const containers = document.querySelectorAll(".image-container");
        containers.forEach(container => container.classList.remove("delete-mode"));

        cancelDeleteContainer.style.display = "none";
    });
});

// AÑADIR IMAGEN DESDE LA CAMARA
// Obtener los elementos del DOM
const btnAñadirCamara = document.getElementById('submenu-miColeccion-anaidirDeCamara');
const videoCamara = document.getElementById('videoCamara');
const btnCapturarFoto = document.getElementById('btnCapturarFoto');
const btnCancelar = document.getElementById('btnCancelar');
const modalCamara = document.getElementById('modalCamara');
const canvas = document.getElementById('canvas');

// Mostrar el modal y activar la cámara
btnAñadirCamara.addEventListener('click', function(event) {
    event.preventDefault();
    modalCamara.style.display = 'flex';  // Mostrar el modal

    // Acceder a la cámara del dispositivo
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                // Mostrar el flujo de video en el contenedor <video>
                videoCamara.srcObject = stream;
            })
            .catch(function(err) {
                alert("Error al acceder a la cámara: " + err);
            });
    } else {
        alert("La cámara no está disponible en este navegador.");
    }
});

// Capturar la foto cuando el usuario haga clic en "Capturar Foto"
btnCapturarFoto.addEventListener('click', function() {
    // Crear un contexto en el canvas para dibujar la imagen
    const ctx = canvas.getContext('2d');

    // Establecer el tamaño del canvas igual al tamaño del video
    canvas.width = videoCamara.videoWidth;
    canvas.height = videoCamara.videoHeight;

    // Dibujar el cuadro del video en el canvas
    ctx.drawImage(videoCamara, 0, 0, canvas.width, canvas.height);

    // Convertir la imagen del canvas en un URL de imagen
    const imgData = canvas.toDataURL('image/png');

    // Crear un contenedor para la imagen
    const container = document.createElement('div');
    container.classList.add('image-container');  // Aplicamos la clase del contenedor

    // Crear un elemento de imagen y asignarle la fuente
    const imgElement = document.createElement('img');
    imgElement.src = imgData;
    imgElement.alt = "Imagen capturada";

    // Añadir la imagen al contenedor
    container.appendChild(imgElement);

    // Añadir el contenedor con la imagen a la galería
    document.getElementById('gallery').appendChild(container);

    // Detener la transmisión del video (no seguirá utilizando la cámara)
    let stream = videoCamara.srcObject;
    let tracks = stream.getTracks();
    tracks.forEach(function(track) {
        track.stop();
    });

    videoCamara.srcObject = null;  // Detenemos la transmisión del video

    // Cerrar el modal
    modalCamara.style.display = 'none';
});

// Cancelar la captura y cerrar el modal
btnCancelar.addEventListener('click', function() {
    // Detener la transmisión del video y cerrar el modal
    let stream = videoCamara.srcObject;
    let tracks = stream.getTracks();
    tracks.forEach(function(track) {
        track.stop();
    });

    videoCamara.srcObject = null;
    modalCamara.style.display = 'none';
});

// AÑADIR IMAGEN DESDE GALERIA

// Obtener el enlace y el input de tipo file
const inputGaleria = document.getElementById('inputGaleria');
const btnAñadirGaleria = document.getElementById('submenu-miColeccion-anaidirDeGaleria');

// Event listener para abrir el selector de archivos cuando se hace clic en "Añadir desde Galería"
btnAñadirGaleria.addEventListener('click', function(event) {
    event.preventDefault();  // Evitar que el enlace haga su acción predeterminada
    inputGaleria.click();    // Abrir el explorador de archivos
});

// Event listener para manejar el archivo seleccionado
inputGaleria.addEventListener('change', function(event) {
    const archivo = event.target.files[0];  // Obtener el archivo seleccionado

    if (archivo) {
        // Aquí puedes hacer lo que necesites con el archivo, por ejemplo:
        console.log("Imagen seleccionada:", archivo.name);

        // Si deseas mostrar la imagen seleccionada:
        const reader = new FileReader();
        reader.onload = function(e) {
            // Crear un contenedor para la imagen
            const container = document.createElement('div');
            container.classList.add('image-container');  // Aplicamos la clase del contenedor

            // Crear un elemento de imagen y asignarle la fuente
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            imgElement.alt = archivo.name;

            // Añadir la imagen al contenedor
            container.appendChild(imgElement);

            // Añadir el contenedor con la imagen a la galería
            document.getElementById('gallery').appendChild(container);
        };
        reader.readAsDataURL(archivo);  // Leer el archivo como URL de imagen

        // Aquí puedes agregar lógica para guardar la imagen, por ejemplo, enviarla al servidor.
    }
});