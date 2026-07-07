const aiButton = document.querySelector(".ai-button");
const aiChat = document.querySelector(".ai-chat");
const closeAI = document.querySelector(".close-ai");

const input = document.querySelector(".ai-input input");
const sendBtn = document.querySelector(".ai-input button");
const messages = document.querySelector(".ai-messages");

aiButton.onclick = () => {
    aiChat.classList.add("active");
    input.focus();
};

closeAI.onclick = () => aiChat.classList.remove("active");

document.addEventListener("click", (e) => {
    if (!e.target.closest(".ai-container")) {
        aiChat.classList.remove("active");
    }
});

function addMessage(text, type = "bot") {

    const div = document.createElement("div");

    div.className = `ai-message ${type}`;

    div.innerHTML = text;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;
}

function showTyping() {

    const typing = document.createElement("div");

    typing.className = "ai-message bot typing";

    typing.innerHTML = "Shahzad AI is typing...";

    messages.appendChild(typing);

    messages.scrollTop = messages.scrollHeight;

    return typing;
}

async function askAI(question) {

    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: question
            })

        });

        if (!response.ok) {

            throw new Error("Server Error");

        }

        const data = await response.json();

        return data.reply;

    } catch (error) {

        console.error(error);

        return "⚠️ Sorry, I couldn't connect to the AI server.";

    }

}

sendBtn.onclick = async () => {

    const question = input.value.trim();

    if (question === "") return;

    addMessage(question, "user");

    input.value = "";

    const typing = showTyping();

    const reply = await askAI(question);

    typing.remove();

    addMessage(reply);

};

input.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        sendBtn.click();

    }

});

const suggestionButtons = document.querySelectorAll(".suggestions button");

suggestionButtons.forEach(button => {

    button.onclick = () => {

        input.value = button.textContent;

        sendBtn.click();

    };

});