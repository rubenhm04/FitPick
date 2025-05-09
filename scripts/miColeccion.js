document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const imageGallery = document.querySelector('.image-gallery');
    const cancelDeleteContainer = document.getElementById('cancelDeleteContainer');
    const cancelDeleteButton = document.getElementById('cancelDeleteBtn');
    const btnAñadirGaleria = document.getElementById('submenu-miColeccion-anaidirDeGaleria');
    const btnAñadirCamara = document.getElementById('submenu-miColeccion-anaidirDeCamara');
    const btnAddClothing = document.getElementById('submenu-miColeccion-add');
    const btnDeleteClothing = document.getElementById('submenu-miColeccion-delete');
    const inputGaleria = document.getElementById('inputGaleria');
    const modalCamara = document.getElementById('modalCamara');
    const videoCamara = document.getElementById('videoCamara');
    const btnCapturarFoto = document.getElementById('btnCapturarFoto');
    const btnCancelar = document.getElementById('btnCancelar');
    const canvas = document.getElementById('canvas');
    const addClothingContainer = document.getElementById('addClothingContainer');
    const addClothingBtn = document.getElementById('addClothingBtn');
    const addClothingModal = document.getElementById('addClothingModal');
    const addFromGalleryBtn = document.getElementById('addFromGalleryBtn');
    const addFromCameraBtn = document.getElementById('addFromCameraBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Estado
    let deleteMode = false;

    // Imágenes iniciales
    const imageFolder = 'img/ropa/';
    const images = [
        'ropa1.jpg', 'ropa2.jpg', 'ropa3.jpg', 'ropa4.jpg', 'ropa5.jpg',
        'ropa6.jpg', 'ropa7.jpg', 'ropa8.jpg', 'ropa9.jpg', 'ropa10.jpg',
        'ropa11.jpg', 'ropa12.jpg', 'ropa13.jpg', 'ropa14.jpg', 'ropa15.jpg',
        'ropa16.jpg', 'ropa17.jpg', 'ropa18.jpg', 'ropa19.jpg', 'ropa20.jpg',
        'ropa21.jpg',
    ];
    const selectedImages = images.slice(0, 10);

    // Inicializar galería
    function initializeGallery() {
        imageGallery.innerHTML = '';
        selectedImages.forEach(image => {
            addImageToGallery(`${imageFolder}${image}`);
        });
    }

    // Añadir imagen a la galería
    function addImageToGallery(imageSrc) {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = 'Prenda de ropa';

        const trashIcon = document.createElement('span');
        trashIcon.classList.add('trash-icon');
        trashIcon.innerHTML = '🗑️';
        trashIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            showConfirmationDialog(imageContainer);
        });

        imageContainer.appendChild(img);
        imageContainer.appendChild(trashIcon);
        if (deleteMode) {
            imageContainer.classList.add('delete-mode');
        }

        imageGallery.appendChild(imageContainer);
    }

    // Mostrar diálogo de confirmación para eliminar
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

    // Activar/desactivar modo eliminación
    function toggleDeleteMode(enable) {
        deleteMode = enable;
        const containers = document.querySelectorAll('.image-container');
        containers.forEach(container => {
            if (enable) {
                container.classList.add('delete-mode');
            } else {
                container.classList.remove('delete-mode');
            }
        });
        cancelDeleteContainer.style.display = enable ? 'block' : 'none';
        addClothingContainer.classList.toggle('delete-mode', enable);
    }

    // Añadir desde galería
    btnAñadirGaleria.addEventListener('click', (event) => {
        event.preventDefault();
        inputGaleria.click();
    });

    inputGaleria.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                addImageToGallery(e.target.result);
            };
            reader.onerror = () => {
                alert('Error al cargar la imagen.');
            };
            reader.readAsDataURL(file);
        }
    });

    // Añadir desde cámara
    btnAñadirCamara.addEventListener('click', (event) => {
        event.preventDefault();
        modalCamara.style.display = 'flex';

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    videoCamara.srcObject = stream;
                })
                .catch((err) => {
                    alert(`Error al acceder a la cámara: ${err.message}`);
                    modalCamara.style.display = 'none';
                });
        } else {
            alert('La cámara no está disponible en este navegador.');
            modalCamara.style.display = 'none';
        }
    });

    btnCapturarFoto.addEventListener('click', () => {
        const ctx = canvas.getContext('2d');
        canvas.width = videoCamara.videoWidth;
        canvas.height = videoCamara.videoHeight;
        ctx.drawImage(videoCamara, 0, 0, canvas.width, canvas.height);

        const imgData = canvas.toDataURL('image/png');
        addImageToGallery(imgData);

        const stream = videoCamara.srcObject;
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        videoCamara.srcObject = null;
        modalCamara.style.display = 'none';
    });

    btnCancelar.addEventListener('click', () => {
        const stream = videoCamara.srcObject;
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        videoCamara.srcObject = null;
        modalCamara.style.display = 'none';
    });

    // Manejar modo eliminación
    btnDeleteClothing.addEventListener('click', (event) => {
        event.preventDefault();
        toggleDeleteMode(true);
    });

    cancelDeleteButton.addEventListener('click', () => {
        toggleDeleteMode(false);
    });

    // Manejar botón de añadir prenda
    addClothingBtn.addEventListener('click', () => {
        addClothingModal.style.display = 'flex';
    });

    addFromGalleryBtn.addEventListener('click', () => {
        inputGaleria.click();
        addClothingModal.style.display = 'none';
    });

    addFromCameraBtn.addEventListener('click', () => {
        modalCamara.style.display = 'flex';
        addClothingModal.style.display = 'none';

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    videoCamara.srcObject = stream;
                })
                .catch((err) => {
                    alert(`Error al acceder a la cámara: ${err.message}`);
                    modalCamara.style.display = 'none';
                });
        } else {
            alert('La cámara no está disponible en este navegador.');
            modalCamara.style.display = 'none';
        }
    });

    closeModalBtn.addEventListener('click', () => {
        addClothingModal.style.display = 'none';
    });

    // Manejar scroll para comprimir/extender botones
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            addClothingBtn.classList.add('compressed');
            if (deleteMode) {
                cancelDeleteButton.classList.add('compressed');
            }
        } else {
            addClothingBtn.classList.remove('compressed');
            cancelDeleteButton.classList.remove('compressed');
        }
    });

    // Manejar hover para extender botón de añadir prenda
    addClothingBtn.addEventListener('mouseenter', () => {
        addClothingBtn.classList.remove('compressed');
    });

    addClothingBtn.addEventListener('mouseleave', () => {
        if (window.scrollY > 0) {
            addClothingBtn.classList.add('compressed');
        }
    });

    // Manejar hover para extender botón de cancelar eliminación
    cancelDeleteButton.addEventListener('mouseenter', () => {
        cancelDeleteButton.classList.remove('compressed');
    });

    cancelDeleteButton.addEventListener('mouseleave', () => {
        if (window.scrollY > 0 && deleteMode) {
            cancelDeleteButton.classList.add('compressed');
        }
    });

    // Inicializar la galería al cargar la página
    initializeGallery();
});