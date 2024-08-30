document.addEventListener('DOMContentLoaded', () => {
    const testContainer = document.getElementById('test-container');
    const resultContainer = document.getElementById('result-container');

    const surveys = JSON.parse(localStorage.getItem('surveys')) || [];
    let currentQuestionIndex = 0;
    let userAnswers = [];

    if (surveys.length === 0) {
        resultContainer.innerHTML = 'Нет доступных опросов для теста.';
        return;
    }

    function displayQuestion() {
        testContainer.innerHTML = '';

        if (currentQuestionIndex < surveys.length) {
            const survey = surveys[currentQuestionIndex];
            const question = survey.question;
            const options = survey.options;

            const questionDiv = document.createElement('div');
            questionDiv.classList.add('test-question');

            const questionElement = document.createElement('h3');
            questionElement.textContent = question;
            questionDiv.appendChild(questionElement);

            options.forEach((option, i) => {
                const button = document.createElement('button');
                button.textContent = `Вариант ${i + 1}: ${option}`;
                button.classList.add('option-button');
                button.addEventListener('click', () => selectOption(i));
                questionDiv.appendChild(button);
            });

            const nextButton = document.createElement('button');
            nextButton.textContent = 'Следующий вопрос';
            nextButton.addEventListener('click', () => {
                currentQuestionIndex++;
                if (currentQuestionIndex < surveys.length) {
                    displayQuestion();
                } else {
                    showResults();
                }
            });

            testContainer.appendChild(questionDiv);
            testContainer.appendChild(nextButton);
        }
    }

    function selectOption(optionIndex) {
        userAnswers[currentQuestionIndex] = optionIndex;

        const buttons = document.querySelectorAll('#test-container .option-button');
        buttons.forEach((button, index) => {
            if (index === optionIndex) {
                button.classList.add('selected');
            } else {
                button.classList.remove('selected');
            }
        });
    }

    function showResults() {
        let correctAnswers = 0;

        surveys.forEach((survey, index) => {
            if (userAnswers[index] === survey.correctOptionIndex) {
                correctAnswers++;
            }
        });

        resultContainer.innerHTML = `Тест завершен!<br>Вы ответили на ${correctAnswers} правильных ответов из ${surveys.length} вопросов.`;
    }

    displayQuestion();
});
