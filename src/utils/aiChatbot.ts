export const getBotReplyGemini = async (userMessage : string) : Promise<string | undefined | Blob> =>{
    if (!userMessage || userMessage.trim() === "") {
        return "Please provide a valid message.";
    }

    try {
        const response = await fetch("https://talkito-34as.onrender.com/talkito", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: "your name is talkito " + userMessage }),
        });
    
        const data = await response.json();
    
        if (data.reply) {
          return data.reply;
        } else if (data.error) {
          return "Error from Talkito: " + data.error;
        } else {
          return "Unexpected response from Talkito.";
        }
      } catch (error) {
        console.error("Error calling Talkito backend:", error);
        return "Something went wrong while getting response from Talkito.";
      }
}