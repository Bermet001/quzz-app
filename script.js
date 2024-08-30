document.addEventListener('DOMContentLoaded', () => {
    const createSurveyForm = document.getElementById('create-survey-form');
    const surveyListItems = document.getElementById('survey-list-items');
    const takeSurvey = document.getElementById('take-survey');
    const takeSurveyForm = document.getElementById('take-survey-form');
    const surveyTitleDisplay = document.getElementById('survey-title-display');
    const resultDiv = document.getElementById('result');

    // Загрузить опросы из LocalStorage при загрузке страницы
    function loadSurveys() {
        const surveys = JSON.parse(localStorage.getItem('surveys')) || [];
        surveyListItems.innerHTML = '';

        surveys.forEach((survey, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${survey.title}</span>
                <button onclick="takeSurvey(${index})">Пройти</button>
            `;
            surveyListItems.appendChild(listItem);
        });
    }

    // Создать новый опрос
    createSurveyForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('survey-title').value;
        const question = document.getElementById('question').value;
        const answers = document.getElementById('answers').value.split(',').map(answer => answer.trim());

        const newSurvey = {
            title,
            question,
            answers
        };

        const surveys = JSON.parse(localStorage.getItem('surveys')) || [];
        surveys.push(newSurvey);
        localStorage.setItem('surveys', JSON.stringify(surveys));

        createSurveyForm.reset();
        loadSurveys();
    });

    // Пройти опрос
    window.takeSurvey = function (index) {
        const surveys = JSON.parse(localStorage.getItem('surveys')) || [];
        const survey = surveys[index];
        
        takeSurvey.style.display = 'block';
        surveyTitleDisplay.textContent = survey.title;
        
        takeSurveyForm.innerHTML = `
            <label>${survey.question}</label>
            ${survey.answers.map((answer, i) => `
                <div>
                    <input type="radio" id="answer${i}" name="answer" value="${answer}">
                    <label for="answer${i}">${answer}</label>
                </div>
            `).join('')}
        `;
        
        document.getElementById('submit-survey').addEventListener('click', () => {
            const selectedAnswer = document.querySelector('input[name="answer"]:checked');
            if (selectedAnswer) {
                resultDiv.textContent = `Вы выбрали: ${selectedAnswer.value}`;
            } else {
                resultDiv.textContent = 'Выберите вариант ответа.';
            }
        });
    };

    // Инициализация
    loadSurveys();
});
