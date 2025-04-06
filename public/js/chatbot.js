const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageButton = document.querySelector("#send-message");
const fileInput = document.querySelector("#file-input");
const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
const fileCancelButton = document.querySelector("#file-cancel");
const emojiToggleBtn = document.getElementById("emoji-picker");

//API Key dan URL dari Google Gemini
const API_URL = "/api/chat";

const userData ={
    message: null,
    file:{
        data: null,
        mime_type: null
    }
}

const chatHistory = [];

//Fungsi untuk membuat elemen pesan
const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
}

//Generate bot response menggunakan API Google Gemini
const generateBotResponse = async (incomingMessageDiv) => {
    const messageElement = incomingMessageDiv.querySelector(".message-text");

    //Menambahkan response pesanan user ke dalam chat history
    chatHistory.push({
        role: "user",
        parts: [{text: userData.message}, ...(userData.file.data ? [{ inline_data: userData.file }] : [])],
    });

    const requestOptions={
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: chatHistory
        })
    }

    try{
        //Fetch Bot response dari API
        const API_URL = "/api/chat";
        const response = await fetch(API_URL, requestOptions);
        
        const data = await response.json();
        if(!response.ok) throw new Error(data.error.message);

        const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        messageElement.innerText = apiResponseText; //Mengisi pesan bot dengan response dari API

        //Menambahkan response bot ke dalam chat history
        chatHistory.push({
            role: "model",
            parts: [{ text: apiResponseText}]
        });

    }catch (error) {
        console.error(error);
        messageElement.innerText = error.message;
        messageElement.style.color = "red";

    }finally{
        userData.file = {}; //Menghapus data file setelah mengirim pesan
        incomingMessageDiv.classList.remove("thinking"); 
        chatBody.scrollTo({top: chatBody.scrollHeight, behavior: "smooth"});

    }
}

//Fungsi untuk menangani pesan user yg keluar
const handleOutgoingMessage = (e) => {
    e.preventDefault();
    userData.message = messageInput.value.trim();
    messageInput.value = ""; //Menghapus inputan setelah mengirim pesan
    fileUploadWrapper.classList.remove("file-uploaded");

    //Membuat & menampilkan pesan user
    const messageContent = `<div class="message-text"></div>
                            ${userData.file.data ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class = "attachment" />` : ""}`;

    const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
    outgoingMessageDiv.querySelector(".message-text").textContent = userData.message;
    chatBody.appendChild(outgoingMessageDiv);
    chatBody.scrollTo({top: chatBody.scrollHeight, behavior: "smooth"}); 

    //Simulasi pemrosesan pesan bot dengan thinking indicator 
    setTimeout(() => {
        const messageContent = `<span class="material-symbols-outlined">face_4</span>
                <div class="message-text">
                    <div class="thinking-indicator">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>`;

        const incomingMessageDiv = createMessageElement(messageContent, "bot-message", "thinking");
        chatBody.appendChild(incomingMessageDiv);
        chatBody.scrollTo({top: chatBody.scrollHeight, behavior: "smooth"}); 
        generateBotResponse(incomingMessageDiv);
    }, 600);
}

//Tombol enter untuk mengirim pesan
messageInput.addEventListener("keydown", (e) =>{
    const userMessage = e.target.value.trim();
    if (e.key === "Enter" && userMessage) {
        handleOutgoingMessage(e);
    }
});

//Fungsi untuk menangani upload file
fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        fileUploadWrapper.querySelector("img").src = e.target.result; //Menampilkan preview gambar yg diupload
        fileUploadWrapper.classList.add("file-uploaded"); //Menampilkan wrapper upload file 
        const base64String = e.target.result.split(",")[1]; //Mengambil string base64 dari hasil pembacaan file

        //Mengisi data file ke dalam userData
        userData.file = {
        data: base64String,
        mime_type: file.type
        }
        
        fileInput.value = ""; //Menghapus inputan file setelah mengupload
    };

    reader.readAsDataURL(file);
});

//Fungsi untuk menghapus file yg diupload
fileCancelButton.addEventListener("click", () => {
    userData.file = {}; 
    fileUploadWrapper.classList.remove("file-uploaded");
});

emojiToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("show-emoji-picker");
});

const picker = new EmojiMart.Picker({
    theme: "light",
    skinTonePosition: "none",
    previewPosition: "none",
    onEmojiSelect: (emoji) => {
        const { selectionStart: start, selectionEnd: end } = messageInput;
        messageInput.setRangeText(emoji.native, start, end, "end"); //Menambahkan emoji ke inputan
        messageInput.focus(); //Fokus kembali ke inputan setelah menambahkan emoji
    },

    onClickOutside: (e) => {
        if(e.target.id === "emoji-picker"){
            document.body.classList.toogle("show-emoji-picker");
        } else{
            document.body.classList.remove("show-emoji-picker");
        }
    }
});

document.querySelector(".chat-form").appendChild(picker); 

sendMessageButton.addEventListener("click", (e) => handleOutgoingMessage(e));
document.querySelector("#file-upload").addEventListener("click", () => fileInput.click());
document.getElementById("close-chatbot").addEventListener("click", function() {
    window.location.href = "index.html";
});
