document.addEventListener('DOMContentLoaded', function() {
    const outfitTypeSelect = document.getElementById('outfit-type');
    const automaticOutfit = document.getElementById('automatic-outfit');
    const questionsOutfit = document.getElementById('questions-outfit');
    const autoButton = document.getElementById('auto-button');
    const submitQuestionsButton = document.getElementById('submit-questions');

    // Generar outfit automático por defecto al cargar la página
    automaticOutfit.classList.add('active');
    questionsOutfit.classList.remove('active');
    outfitTypeSelect.value = 'automatic';

    // Mostrar sección según la selección del dropdown
    outfitTypeSelect.addEventListener('change', function() {
        if (this.value === 'automatic') {
            automaticOutfit.classList.add('active');
            questionsOutfit.classList.remove('active');
        } else if (this.value === 'questions') {
            questionsOutfit.classList.add('active');
            automaticOutfit.classList.remove('active');
        }
    });

    // Generar outfit automático y redirigir a intermedia.html
    autoButton.addEventListener('click', function() {
        window.location.href = 'intermedia.html';
    });

    // Generar outfit por preguntas y redirigir a intermedia.html
    submitQuestionsButton.addEventListener('click', function() {
        window.location.href = 'intermedia.html';
    });
});