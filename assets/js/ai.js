const aiButton = document.querySelector(".ai-button");
const aiChat = document.querySelector(".ai-chat");
const closeAI = document.querySelector(".close-ai");

const input = document.querySelector(".ai-input input");
const sendBtn = document.querySelector(".ai-input button");
const messages = document.querySelector(".ai-messages");

aiButton.onclick = () => aiChat.classList.add("active");

closeAI.onclick = () => aiChat.classList.remove("active");

document.addEventListener("click",(e)=>{

    if(!e.target.closest(".ai-container")){

        aiChat.classList.remove("active");

    }

});

function addMessage(text,type="bot"){

    const div=document.createElement("div");

    div.className=`ai-message ${type}`;

    div.innerHTML=text;

    messages.appendChild(div);

    messages.scrollTop=messages.scrollHeight;

}

function showTyping(){

    const typing=document.createElement("div");

    typing.className="ai-message bot typing";

    typing.innerHTML="Shahzad AI is typing...";

    messages.appendChild(typing);

    messages.scrollTop=messages.scrollHeight;

    return typing;

}

function reply(question){

    question=question.toLowerCase();

    if(question.includes("about")){

        return portfolioKnowledge.about;

    }

    if(question.includes("skill")){

        return "Skills:<br>"+portfolioKnowledge.skills.join(", ");

    }

    if(question.includes("education")){

        return portfolioKnowledge.education;

    }

    if(question.includes("goal")){

        return portfolioKnowledge.goals;

    }

    if(question.includes("resume")){

        return portfolioKnowledge.resume;

    }

    if(question.includes("contact") || question.includes("email")){

        return portfolioKnowledge.contact;

    }

    return "I'm still learning. More intelligent AI features are coming soon.";
}

sendBtn.onclick=()=>{

    const question=input.value.trim();

    if(question==="") return;

    addMessage(question,"user");

    const typing=showTyping();

    setTimeout(()=>{

    typing.remove();

    addMessage(reply(question));

},800);

    input.value="";

};

input.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        sendBtn.click();

    }

});

const suggestionButtons =
document.querySelectorAll(".suggestions button");

suggestionButtons.forEach(button=>{

    button.onclick=()=>{

        input.value=button.textContent;

        sendBtn.click();

    };

});