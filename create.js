document.addEventListener("DOMContentLoaded", () => {
  const surveyForm = document.getElementById("survey-form");
  const surveysContainer = document.getElementById("surveys-container");

  // Загрузка сохраненных опросов из localStorage
  let surveys = JSON.parse(localStorage.getItem("surveys")) || [];

  // Функция для добавления опроса в список
  function addSurveyToList(survey) {
    const listItem = document.createElement("div");
    const deleteBtn = document.createElement("button");
    listItem.classList.add("survey-item");
    deleteBtn.innerHTML = "delete";

    const surveyTitle = document.createElement("h3");
    surveyTitle.textContent = survey.question;
    listItem.appendChild(surveyTitle);

    const optionsList = document.createElement("ul");
    survey.options.forEach((option, i) => {
      const optionItem = document.createElement("li");
      optionItem.textContent = `Вариант ${i + 1}: ${option}`;
      optionsList.appendChild(optionItem);
    });

    const correctAnswerItem = document.createElement("li");
    correctAnswerItem.textContent = `Правильный ответ: Вариант ${
      survey.correctOptionIndex + 1
    }`;
    optionsList.appendChild(correctAnswerItem, deleteBtn);

    listItem.appendChild(optionsList);
    listItem.appendChild(deleteBtn);
    surveysContainer.appendChild(listItem);

    deleteBtn.addEventListener("click", () => {
      surveysContainer.removeChild(listItem);
    });
  }

  // Отображение всех опросов при загрузке страницы
  surveys.forEach((survey) => addSurveyToList(survey));

  // Обработка отправки формы
  surveyForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const question = document.getElementById("question").value.trim();
    const options = [
      document.getElementById("option1").value.trim(),
      document.getElementById("option2").value.trim(),
      document.getElementById("option3").value.trim(),
    ].filter((value) => value);

    const correctOptionIndex =
      parseInt(document.getElementById("correct-option").value) - 1;

    if (options.length === 0) {
      alert("Добавьте хотя бы один вариант ответа.");
      return;
    }

    if (correctOptionIndex < 0 || correctOptionIndex >= options.length) {
      alert("Правильный вариант должен быть в пределах доступных вариантов.");
      return;
    }

    const survey = {
      question,
      options,
      correctOptionIndex,
    };

    surveys.push(survey);
    localStorage.setItem("surveys", JSON.stringify(surveys));
    addSurveyToList(survey);
    surveyForm.reset();
  });
});
