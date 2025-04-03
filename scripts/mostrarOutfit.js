// Variables de referencia
const outfitTypeSelect = document.getElementById('outfit-type');
const automaticOutfit = document.getElementById('automatic-outfit');
const questionsOutfit = document.getElementById('questions-outfit');
const autoButton = document.getElementById('auto-button');
const questionsButton = document.getElementById('questions-button');
const submitQuestionsButton = document.getElementById('submit-questions');
const outfitImage = document.getElementById('outfit-image');
const questionsOutfitImage = document.getElementById('questions-outfit-image');

// Muestra el outfit automático
autoButton.addEventListener('click', () => {
    
    outfitImage.innerHTML = `
        <img src="img/Monigotes/Monigote1.jpeg" alt="Outfit Automático">
        <p>Este conjunto ha sido diseñado pensando en la ocasión, combinando de manera impecable estilo y comodidad. Cada pieza ha sido elegida con atención al detalle, logrando una armonía perfecta entre los elementos. La mezcla de colores y tejidos crea una estética refinada que transmite confianza y distinción, todo con un toque relajado que resalta la elegancia natural.</p>
    `;
    outfitImage.classList.add('active');
});

// Muestra el outfit basado en preguntas
submitQuestionsButton.addEventListener('click', () => {
    const occasion = document.getElementById('occasion').value;
    const weather = document.getElementById('weather').value;
    const mood = document.getElementById('mood').value;

    let outfit = '';
    let outfitText = '';
    
    outfitText = 'Este outfit es la elección perfecta para la ocasión, destacando por su equilibrio y armonía. Cada prenda ha sido cuidadosamente seleccionada para complementar a la perfección, creando un conjunto que transmite elegancia y estilo sin esfuerzo. Los colores y las texturas se combinan de manera fluida, ofreciendo una apariencia sofisticada y a la vez relajada.';

    questionsOutfitImage.innerHTML = `
        <img src="img/Monigotes/Monigote2.jpeg" alt="Outfit basado en preguntas">
        <p>${outfitText}</p>
    `;
    questionsOutfitImage.classList.add('active');
});

// Mostrar la sección correspondiente cuando cambie el tipo de generador
outfitTypeSelect.addEventListener('change', (e) => {
    if (e.target.value === 'automatic') {
        automaticOutfit.classList.add('active');
        questionsOutfit.classList.remove('active');
    } else {
        questionsOutfit.classList.add('active');
        automaticOutfit.classList.remove('active');
    }
});

// Iniciar mostrando la opción automática por defecto
outfitTypeSelect.value = 'automatic';
outfitTypeSelect.dispatchEvent(new Event('change'));