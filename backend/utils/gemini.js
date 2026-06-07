import "dotenv/config";

const getGeminiAPIResponse = async (thread) => {
  const contents= [];
  thread.messages.forEach((msg) => {
    contents.push({role:msg.role, parts:[{text:msg.content}]});
  });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: contents,
    }),
  };
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      options,
    );
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (err) {
    console.log(err);
  }
};

export default getGeminiAPIResponse;
