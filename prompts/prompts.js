const question = `
    Responda à questão de prova em formato JSON.

    IMPORTANTE: A resposta deve ser um JSON com 5 campos. Certifique-se de que o JSON é válido. Caso um campo esteja em branco, responda com "Sem resposta." Na quebra de linhas use <br>. Nunca deixe um campo em branco.

    Formato do JSON:
    {    
    "question": "Aqui você colocará a questão completa",
    "subject": "Aqui você colocará a matéria da questão",    
    "content": [Aqui você colocará os conteúdos abordados na questão, este tópico sempre deverá ser uma array],    
    "correction": "Aqui você vai explicar a resolução da questão",    
    "answer": "Aqui você dirá a resposta da questão"
    }

    Questão:
    { QUESTION-HERE }
`;

export default {
  question,
};
