import { useState } from "react";

export default function Home() {
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const textQuestionInput = document.getElementById("textQuestion");
    const imageQuestionInput = document.getElementById("imageQuestion");
    if (!textQuestionInput.value && !imageQuestionInput.files.length) {
      alert("Preencha ao menos um campo!");
      return;
    }

    const fileInput = document.getElementById("imageQuestion");
    const file = fileInput.files[0];
    const textQuestion = document.getElementById("textQuestion").value;
    const questions = { textQuestion };

    if (file) {
      const fileType = file.type;
      const reader = new FileReader();
      reader.onload = async () => {
        questions.imageQuestion = reader.result.split(",")[1];
        questions.fileType = fileType;
        await sendQuestions(questions);
      };
      reader.readAsDataURL(file);
    } else {
      await sendQuestions(questions);
    }
  };

  const sendQuestions = async (questions) => {
    try {
      const response = await fetch("/api/v1/chatbot/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(questions),
      });
      if (!response.ok)
        throw new Error("Chamada na API não deu certo. Tente novamente.");

      const data = await response.json();
      updateAnswer(data);
    } catch (error) {
      updateError("Chamada na API não deu certo. Tente novamente.");
    }
  };

  const updateError = (errorMessage) => {
    const container = document.querySelector(".container.answer");
    container.innerHTML = "";
    container.innerHTML = `<h3>ERRO! ${errorMessage}</h3>`;
  };

  function updateAnswer(data) {
    const container = document.querySelector(".container.answer");
    container.innerHTML = "";

    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `<h2>${data.question}</h2><p></p>`;
    container.appendChild(questionDiv);

    const subjectDiv = document.createElement("div");
    subjectDiv.innerHTML = `<h3>Matéria:</h3><p>${data.subject}</p>`;
    container.appendChild(subjectDiv);

    const contentDiv = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.textContent = "Tópicos abordados:";
    contentDiv.appendChild(h3);
    data.content.forEach((item) => {
      const p = document.createElement("p");
      p.textContent = item;
      contentDiv.appendChild(p);
    });
    container.appendChild(contentDiv);

    const correctionDiv = document.createElement("div");
    correctionDiv.innerHTML = `<h3>Correção:</h3><p>${data.correction}</p>`;
    container.appendChild(correctionDiv);

    const answerDiv = document.createElement("div");
    answerDiv.innerHTML = `<h3>Resposta:</h3><p>${data.answer}</p>`;
    container.appendChild(answerDiv);
  }

  const handleClear = (e) => {
    e.preventDefault();
    setImageFile(null);
    document.getElementById("textQuestion").value = "";
    document.getElementById("imageQuestion").value = "";
    const answerContainer = document.querySelector(".container.answer");
    answerContainer.innerHTML = "";
  };

  return (
    <>
      <h1>Professor IA</h1>
      <h5>
        (As respostas são geradas por um modelo de Inteligência Artificial e
        podem estar erradas. Confira sempre a veracidade dos resultados.)
      </h5>
      <form onSubmit={handleSubmit}>
        <label htmlFor="textQuestion">Questão</label>
        <textarea id="textQuestion" name="textQuestion"></textarea>
        <input
          type="file"
          id="imageQuestion"
          name="imageQuestion"
          accept="image/*"
          onChange={(event) => setImageFile(event.target.files[0])}
        ></input>
        <div className="buttons">
          <button type="submit">Enviar</button>
          <button onClick={handleClear}>Limpar</button>
        </div>
      </form>
      <div className="container answer"></div>
    </>
  );
}
