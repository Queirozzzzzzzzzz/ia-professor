import chatbot from "/models/chatbot";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const textQuestion = req.body.textQuestion;
    const imageQuestion = req.body.imageQuestion;
    const fileType = req.body.fileType;

    const response = await chatbot.getQuestion(
      textQuestion,
      imageQuestion,
      fileType
    );

    if (response == 500) {
      return res.status(500).json(response);
    }

    return res.status(200).json(response);
  }

  return res.status(405).json({ message: "Método não permitido" });
}
