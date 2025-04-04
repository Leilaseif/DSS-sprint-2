let questions = [
    "What is your name?",
    "How are you feeling today?",
    "What is your favorite movie?",
    "Where are you from?",
    "Do you like watching videos?",
    "What topic interests you the most?",
    "What do you hope to learn today?",
    "Any final thoughts before we end?"
];

let currentQuestion = 0;
let answers = JSON.parse(localStorage.getItem("chatAnswers")) || {}; // Load previous answers
let rating = 0;

// Video Player and Rating logic
const video = document.getElementById("videoPlayer");
const ratingContainer = document.getElementById("ratingContainer");
const stars = document.querySelectorAll(".star");
const submitRatingButton = document.getElementById("submitRating");
const darkOverlay = document.getElementById("darkOverlay");

video.addEventListener("ended", () => {
    ratingContainer.style.display = "block";
    darkOverlay.style.display = "block"; // Darken the background after video ends
});

// Add the popup logic here
video.addEventListener("timeupdate", () => {
    if (Math.floor(video.currentTime) === 7) {
        showVideoPopup();
    }
});

function showVideoPopup() {
    // Check if the popup already exists to avoid duplicates
    if (document.getElementById("videoPopup")) return;

    // Create the popup element
    const popup = document.createElement("div");
    popup.id = "videoPopup";
    popup.textContent = "A black box AI is an AI system whose internal workings are a mystery to its users.";
    popup.style.position = "absolute";
    popup.style.top = "15%"; // Adjusted to position it slightly lower
    popup.style.left = "25%"; // Centered horizontally within the video player
    popup.style.width = "50%"; // Reduced width to fit the text better
    popup.style.padding = "8px"; // Smaller padding for a compact look
    popup.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    popup.style.color = "white";
    popup.style.textAlign = "center";
    popup.style.borderRadius = "5px";
    popup.style.fontSize = "14px"; // Adjusted font size for better readability
    popup.style.zIndex = "1000";

    // Append the popup to the video container
    const videoContainer = document.querySelector(".video-container");
    videoContainer.style.position = "relative"; // Ensure the container is positioned
    videoContainer.appendChild(popup);

    // Remove the popup after 4 seconds
    setTimeout(() => {
        popup.remove();
    }, 4000); // Lasts for 4 seconds
}

stars.forEach(star => {
    star.addEventListener("click", function () {
        rating = this.getAttribute("data-index");
        stars.forEach((star, index) => {
            star.style.color = index < rating ? "gold" : "gray";
        });
        submitRatingButton.style.display = "block"; // Show submit button
    });
});

submitRatingButton.addEventListener("click", () => {
    localStorage.setItem("rating", rating);
    showPopup();
    ratingContainer.style.display = "none";
    darkOverlay.style.display = "none"; // Hide rating after submission
});

// Chatbot logic
function toggleChat() {
    let chatContainer = document.getElementById("chatContainer");
    if (chatContainer.style.display === "none") {
        chatContainer.style.display = "block";
        startChat();
    } else {
        chatContainer.style.display = "none";
    }
}

function startChat() {
    let chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = ""; // Clear chat
    currentQuestion = 0;
    showNextQuestion();
}

function showNextQuestion() {
    if (currentQuestion < questions.length) {
        document.getElementById("chatBox").innerHTML += `<p><strong>Bot:</strong> ${questions[currentQuestion]}</p>`;
    } else {
        document.getElementById("chatBox").innerHTML += `<p><strong>Bot:</strong> Thank you for chatting with me! 😊</p>`;
        localStorage.setItem("chatAnswers", JSON.stringify(answers)); // Save to local storage
    }
}

function sendMessage() {
    let userInput = document.getElementById("userInput").value.trim();
    let chatBox = document.getElementById("chatBox");

    if (userInput === "") return;

    answers[questions[currentQuestion]] = userInput;

    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    currentQuestion++;
    setTimeout(showNextQuestion, 500);

    document.getElementById("userInput").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Thank you popup logic
function showPopup() {
    let thankYouMessage = document.getElementById("thankYouMessage");
    thankYouMessage.textContent = `I can share your ${rating}-star rating with your friends.`;
    document.getElementById("thankYouPopup").style.display = "block";

    document.getElementById("yesButton").addEventListener("click", askForFriendInfo);
    document.getElementById("noButton").addEventListener("click", () => {
        thankYouMessage.textContent = "Thanks for your feedback! I’ll share this with my colleague.";
        setTimeout(() => {
            document.getElementById("thankYouPopup").style.display = "none";
        }, 2000);
    });
}

function askForFriendInfo() {
    let friendName = prompt("Enter your friend's name:");
    let friendNumber = prompt("Enter your friend's number:");
    alert(`Thanks! I’ll share your ${rating}-star rating with ${friendName} (${friendNumber}).`);
    document.getElementById("thankYouPopup").style.display = "none";
}
