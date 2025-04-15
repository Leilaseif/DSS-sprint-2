let questions = [
    "do you want to speack with me?"
];

let currentQuestion = 0;
let answers = JSON.parse(localStorage.getItem("chatAnswers")) || {}; // Load previous answers

// Video Player and Rating logic
const video = document.getElementById("videoPlayer");
const ratingContainer = document.getElementById("ratingContainer");
const stars = document.querySelectorAll(".star");
const submitRatingButton = document.getElementById("submitRating");
const darkOverlay = document.getElementById("darkOverlay");

video.addEventListener("ended", () => {
    ratingContainer.style.display = "block"; // Make the container visible
    setTimeout(() => {
        ratingContainer.classList.add("show"); // Add the animation class after making it visible
    }, 10); // Small delay to ensure the transition works
    darkOverlay.style.display = "block"; // Darken the background after video ends
});

if (window.location.pathname.includes('index.html')) {
    console.log("Page A logic executed");

    let chatTriggered = false; // Flag to prevent multiple executions
    let linksTriggered = false; // Flag to prevent multiple executions for links
    let aiTextTriggered = false; // Flag to prevent multiple executions for AI text

    video.addEventListener("timeupdate", () => {
        if (Math.floor(video.currentTime) === 7) {
            console.log("Page A: showVideoPopup triggered");
            showVideoPopup();
        }
        if (Math.floor(video.currentTime) === 34 && !chatTriggered) {
            console.log("Page A: Chatbot triggered with 'researching...'");
            const chatContainer = document.getElementById("chatContainer");
            const chatBox = document.getElementById("chatBox");

            if (!chatBox) {
                console.error("Element with id 'chatBox' not found in the DOM.");
                return;
            }

            // Ensure the chat container is visible
            if (chatContainer) {
                chatContainer.style.display = "block";

                // Add "researching..." message
                chatBox.innerHTML += `<p><strong>Bot:</strong> Researching...</p>`;
                chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom

                chatTriggered = true; // Prevent re-triggering
            } else {
                console.error("Chat container not found in the DOM.");
            }
        }

        if (Math.floor(video.currentTime) === 35 && !aiTextTriggered) {
            console.log("Page A: Chatbot shows AI training datasets text");
            const chatBox = document.getElementById("chatBox");

            if (!chatBox) {
                console.error("Element with id 'chatBox' not found in the DOM.");
                return;
            }

            // Add the AI training datasets text
            chatBox.innerHTML += `
                <p><strong>Bot:</strong> AI training datasets are collections of data used to teach models how to make predictions. Selecting poor or biased data can lead to inaccurate, unfair, or unreliable AI outputs. Risks include amplifying societal biases, spreading misinformation, and ethical concerns around privacy. Ensuring diverse, high-quality datasets is critical for building trustworthy and effective AI systems.</p>
            `;
            chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom

            aiTextTriggered = true; // Prevent re-triggering
        }

        if (Math.floor(video.currentTime) === 37 && !linksTriggered) {
            console.log("Page A: Chatbot shows links");

            const chatBox = document.getElementById("chatBox");

            if (!chatBox) {
                console.error("Element with id 'chatBox' not found in the DOM.");
                return;
            }

            // Add the links to the chatbox
            if (chatBox) {
                chatBox.innerHTML += `
                    <p><strong>Bot:</strong> Here are some useful resources:</p>
                    <p><a href="https://www.anolytics.ai/blog/the-impact-of-unrepresentative-data-on-ai-model-biases/" target="_blank" style="color: blue;">https://www.anolytics.ai/blog/the-impact-of-unrepresentative-data-on-ai-model-biases/</a></p>
                    <p><a href="https://www.twoday.com/blog/the-dangers-of-poor-data-quality-in-ai-systems" target="_blank" style="color: blue;">https://www.twoday.com/blog/the-dangers-of-poor-data-quality-in-ai-systems</a></p>
                `;
                chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom

                linksTriggered = true; // Prevent re-triggering
            } else {
                console.error("Chat box not found in the DOM.");
            }
        }

        if (Math.floor(video.currentTime) === 50 && !chatTriggered) {
            console.log("Page A: Chatbot triggered with the critical observation question");
            const chatContainer = document.getElementById("chatContainer");
            const chatBox = document.getElementById("chatBox");

            if (!chatBox) {
                console.error("Element with id 'chatBox' not found in the DOM.");
                return;
            }

            // Ensure the chat container is visible
            chatContainer.style.display = "block";

            // Add the question to the chatbox
            chatBox.innerHTML += `<p><strong>Bot:</strong> That’s a critical observation. I’ve cross-referenced your concern with the EU AI Act’s transparency guidelines and identified three real-world cases where explainability tools mitigated bias. Would you like me to:
            <br>1. Break down these cases to compare with your perspective?
            <br>2. Discuss ethical frameworks for addressing blackboxing?
            <br>3. Save this topic to your ethics journal for future reference?</p>`;
            chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom

            // Wait for the user's response
            const userInput = document.getElementById("userInput");
            const handleResponse = (event) => {
                if (event.key === "Enter") {
                    const userResponse = userInput.value.trim();
                    if (userResponse) {
                        console.log("User response:", userResponse);

                        // Display the user's response
                        chatBox.innerHTML += `<p><strong>You:</strong> ${userResponse}</p>`;
                        userInput.value = ""; // Clear the input field

                        // Provide a final response based on the user's choice
                        if (userResponse.trim() === "1") {
                            chatBox.innerHTML += `<p><strong>Bot:</strong> Great! Let me break down these cases for you...</p>`;
                        } else if (userResponse.trim() === "2") {
                            chatBox.innerHTML += `<p><strong>Bot:</strong> Let's discuss ethical frameworks for addressing blackboxing...</p>`;
                        } else if (userResponse.trim() === "3") {
                            chatBox.innerHTML += `<p><strong>Bot:</strong> I've saved this topic to your ethics journal for future reference.</p>`;
                        } else {
                            chatBox.innerHTML += `<p><strong>Bot:</strong> Thank you for your input! Let me know if you'd like to discuss further.</p>`;
                        }

                        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
                        userInput.removeEventListener("keydown", handleResponse);
                    }
                }
            };

            userInput.addEventListener("keydown", handleResponse);
            chatTriggered = true; // Prevent re-triggering
        }
    });
} else if (window.location.pathname.includes('page-b.html')) {
    console.log("Page B logic executed");

    let chatTriggered = false; // Flag to prevent multiple executions

    video.addEventListener("timeupdate", () => {
        if (Math.floor(video.currentTime) === 7) {
            console.log("Page B: showInfoPopup triggered");
            showInfoPopup(); // Page B info popup
        }
        if (Math.floor(video.currentTime) === 36 && !chatTriggered) {
            console.log("Page B: openChatWithMessage triggered");
            openChatWithMessage(); // Open chatbot with a specific message
            chatTriggered = true; // Set the flag to true to prevent re-triggering
        }
    });

    video.addEventListener("ended", () => {
        console.log("Page B: Video ended, triggering chatbot feedback");
        askForFeedback(); // Trigger the chatbot feedback interaction
    });
}

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

function showInfoPopup() {
    // Check if the info icon already exists to avoid duplicates
    if (document.getElementById("infoIcon")) return;

    // Create the info icon element
    const infoIcon = document.createElement("div");
    infoIcon.id = "infoIcon";
    infoIcon.textContent = "ℹ️"; // Info icon
    infoIcon.style.position = "absolute";
    infoIcon.style.top = "10%"; // Adjust position within the video player
    infoIcon.style.right = "10%";
    infoIcon.style.fontSize = "24px";
    infoIcon.style.cursor = "pointer";
    infoIcon.style.color = "white";
    infoIcon.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    infoIcon.style.borderRadius = "50%";
    infoIcon.style.padding = "5px";
    infoIcon.style.zIndex = "1000";

    // Create the tooltip message
    const tooltip = document.createElement("div");
    tooltip.id = "infoTooltip";
    tooltip.textContent = "A black box AI is an AI system whose internal workings are a mystery to its users.";
    tooltip.style.position = "absolute";
    tooltip.style.top = "50px"; // Position below the icon
    tooltip.style.right = "10%";
    tooltip.style.padding = "10px";
    tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    tooltip.style.color = "white";
    tooltip.style.borderRadius = "5px";
    tooltip.style.fontSize = "14px";
    tooltip.style.display = "none"; // Hidden by default
    tooltip.style.zIndex = "1000";

    // Append the tooltip to the video container
    const videoContainer = document.querySelector(".video-container");
    videoContainer.style.position = "relative"; // Ensure the container is positioned
    videoContainer.appendChild(infoIcon);
    videoContainer.appendChild(tooltip);

    // Show the tooltip on hover
    infoIcon.addEventListener("mouseover", () => {
        tooltip.style.display = "block";
    });

    // Hide the tooltip when not hovering
    infoIcon.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
    });
}

function showChatbotMessage() {
    // Check if the message already exists to avoid duplicates
    const chatBox = document.getElementById("chatBox");

    if (!chatBox) {
        console.error("Element with id 'chatBox' not found in the DOM.");
        return;
    }

    if (document.getElementById("chatbotMessage")) return;

    // Create the chatbot message
    const message = document.createElement("p");
    message.id = "chatbotMessage";
    message.innerHTML = `<strong>Bot:</strong> AI training datasets are collections of data used to teach models how to make predictions. Selecting poor or biased data can lead to inaccurate, unfair, or unreliable AI outputs. Risks include amplifying societal biases, spreading misinformation, and ethical concerns around privacy. Ensuring diverse, high-quality datasets is critical for building trustworthy and effective AI systems.`;

    // Append the message to the chatbox
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom of the chatbox
}

function openChatAndShowMessage() {
    const chatContainer = document.getElementById("chatContainer");
    const chatBox = document.getElementById("chatBox");

    if (!chatBox) {
        console.error("Element with id 'chatBox' not found in the DOM.");
        return;
    }

    // Ensure the chat container is visible
    chatContainer.style.display = "block";

    // Add the message to the chatbox
    chatBox.innerHTML += `<p><strong>Bot:</strong> AI training datasets are collections of data used to teach models how to make predictions. Selecting poor or biased data can lead to inaccurate, unfair, or unreliable AI outputs. Risks include amplifying societal biases, spreading misinformation, and ethical concerns around privacy. Ensuring diverse, high-quality datasets is critical for building trustworthy and effective AI systems.</p>`;

    // Scroll to the bottom of the chatbox
    chatBox.scrollTop = chatBox.scrollHeight;
}

function openChatWithMessage() {
    // Ensure the chat container is visible
    const chatContainer = document.getElementById("chatContainer");
    chatContainer.style.display = "block";

    const chatBox = document.getElementById("chatBox");

    if (!chatBox) {
        console.error("Element with id 'chatBox' not found in the DOM.");
        return;
    }

    // Add the initial message to the chatbox
    chatBox.innerHTML += `<p><strong>Bot:</strong> Do you want to know more about AI training datasets?</p>`;

    // Add Yes/No buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.id = "chatButtons";
    buttonContainer.style.marginTop = "10px";

    const yesButton = document.createElement("button");
    yesButton.textContent = "Yes";
    yesButton.style.marginRight = "10px";
    yesButton.style.padding = "5px 10px";
    yesButton.style.cursor = "pointer";
    yesButton.addEventListener("click", () => {
        // Show the detailed message when "Yes" is clicked
        chatBox.innerHTML += `<p><strong>Bot:</strong> AI training datasets are collections of data used to teach models how to make predictions. Selecting poor or biased data can lead to inaccurate, unfair, or unreliable AI outputs. Risks include amplifying societal biases, spreading misinformation, and ethical concerns around privacy. Ensuring diverse, high-quality datasets is critical for building trustworthy and effective AI systems.</p>`;
        buttonContainer.remove(); // Remove the buttons after the response
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    });

    const noButton = document.createElement("button");
    noButton.textContent = "No";
    noButton.style.padding = "5px 10px";
    noButton.style.cursor = "pointer";
    noButton.addEventListener("click", () => {
        // Do nothing when "No" is clicked
        buttonContainer.remove(); // Remove the buttons
    });

    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(noButton);
    chatBox.appendChild(buttonContainer);

    // Scroll to the bottom of the chatbox
    chatBox.scrollTop = chatBox.scrollHeight;
}

function askForFeedback() {
    const chatContainer = document.getElementById("chatContainer");
    const chatBox = document.getElementById("chatBox");

    if (!chatBox) {
        console.error("Element with id 'chatBox' not found in the DOM.");
        return;
    }

    // Ensure the chat container is visible
    chatContainer.style.display = "block";

    // Add the like/dislike question to the chatbox
    chatBox.innerHTML += `<p><strong>Bot:</strong> Did you like this video? <button id="likeButton" style="margin-right: 10px;">👍 Like</button><button id="dislikeButton">👎 Dislike</button></p>`;

    // Add event listeners for the Like and Dislike buttons
    const likeButton = document.getElementById("likeButton");
    const dislikeButton = document.getElementById("dislikeButton");

    likeButton.addEventListener("click", () => {
        chatBox.innerHTML += `<p><strong>You:</strong> 👍 Like</p>`;
        chatBox.innerHTML += `<p><strong>Bot:</strong> Let's discuss why you liked this video. Have feedback? Tap me anytime!</p>`;
        displayFinalFeedback(chatBox); // Display the final thank-you message
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    });

    dislikeButton.addEventListener("click", () => {
        chatBox.innerHTML += `<p><strong>You:</strong> 👎 Dislike</p>`;
        chatBox.innerHTML += `<p><strong>Bot:</strong> Let's discuss why you didn't like this video. Have feedback?</p>`;
        displayFinalFeedback(chatBox); // Display the final thank-you message
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    });

    // Scroll to the bottom of the chatbox
    chatBox.scrollTop = chatBox.scrollHeight;
}

function displayFinalFeedback(chatBox) {
    if (!chatBox) {
        console.error("Element with id 'chatBox' not found in the DOM.");
        return;
    }


    const userInput = document.getElementById("userInput");

    // Add an event listener to wait for the user's response
    const handleUserResponse = (event) => {
        if (event.key === "Enter") {
            const userResponse = userInput.value.trim();
            if (userResponse) {
                // Display the user's response
                chatBox.innerHTML += `<p><strong>You:</strong> ${userResponse}</p>`;
                userInput.value = ""; // Clear the input field

                // Show the final thank-you message
                chatBox.innerHTML += `<p><strong>Bot:</strong> Thank you for your feedback! 😊</p>`;
                chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom

                // Remove the event listener to prevent duplicate responses
                userInput.removeEventListener("keydown", handleUserResponse);
            }
        }
    };

    userInput.addEventListener("keydown", handleUserResponse);
}

function askPostRatingQuestions() {
    const chatContainer = document.getElementById("chatContainer");
    const chatBox = document.getElementById("chatBox");

    if (!chatBox) {
        console.error("Element with id 'chatBox' not found in the DOM.");
        return;
    }

    // Ensure the chat container is visible
    chatContainer.style.display = "block";

    // Ask the first question
    chatBox.innerHTML += `<p><strong>Bot:</strong> How do you feel about the challenges of understanding AI decisions in fields like healthcare or criminal justice?</p>`;
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom

    // Wait for the user to respond, then ask the next question
    const userInput = document.getElementById("userInput");
    userInput.addEventListener("keydown", function handleFirstResponse(event) {
        if (event.key === "Enter") {
            const userResponse = userInput.value.trim();
            if (userResponse) {
                chatBox.innerHTML += `<p><strong>You:</strong> ${userResponse}</p>`;
                userInput.value = ""; // Clear the input field

                userInput.removeEventListener("keydown", handleFirstResponse);
                // Note: handleSecondResponse is not defined here, so this would cause an error
                // Fixed by removing this line
            }
        }
    });
}

function startDiscussion(chatBox) {
    if (!chatBox) {
        console.error("Element with id 'chatBox' not found in the DOM.");
        return;
    }

    // Ensure the chat container is visible
    const chatContainer = document.getElementById("chatContainer");
    chatContainer.style.display = "block";

    // Ask the first question
    chatBox.innerHTML += `<p><strong>Bot:</strong> How do you feel about the challenges of understanding AI decisions in fields like healthcare or criminal justice?</p>`;
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom

    const userInput = document.getElementById("userInput");

    // Wait for the user's response to the first question
    const handleFirstResponse = (event) => {
        if (event.key === "Enter") {
            const userResponse = userInput.value.trim();
            if (userResponse) {
                // Display the user's response
                chatBox.innerHTML += `<p><strong>You:</strong> ${userResponse}</p>`;
                userInput.value = ""; // Clear the input field

                // Ask the second question
                chatBox.innerHTML += `<p><strong>Bot:</strong> That's a critical observation. I've cross-referenced your concern with the EU AI Act's transparency guidelines and identified three real-world cases where explainability tools mitigated bias. Would you like me to:
                <br>1. Break down these cases to compare with your perspective?
                <br>2. Discuss ethical frameworks for addressing blackboxing?
                <br>3. Save this topic to your ethics journal for future reference?</p>`;
                chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom

                // Wait for the user's response to the second question
                const handleSecondResponse = (event) => {
                    if (event.key === "Enter") {
                        const secondResponse = userInput.value.trim();
                        if (secondResponse) {
                            // Display the user's response
                            chatBox.innerHTML += `<p><strong>You:</strong> ${secondResponse}</p>`;
                            userInput.value = ""; // Clear the input field

                            // Provide a final response based on the user's choice
                            if (secondResponse.trim() === "1") {
                                chatBox.innerHTML += `<p><strong>Bot:</strong> Great! Let me break down these cases for you...</p>`;
                            } else if (secondResponse.trim() === "2") {
                                chatBox.innerHTML += `<p><strong>Bot:</strong> Let's discuss ethical frameworks for addressing blackboxing...</p>`;
                            } else if (secondResponse.trim() === "3") {
                                chatBox.innerHTML += `<p><strong>Bot:</strong> I've saved this topic to your ethics journal for future reference.</p>`;
                            } else {
                                chatBox.innerHTML += `<p><strong>Bot:</strong> Thank you for your input! Let me know if you'd like to discuss further.</p>`;
                            }

                            chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
                            userInput.removeEventListener("keydown", handleSecondResponse);
                        }
                    }
                };

                userInput.addEventListener("keydown", handleSecondResponse);
                userInput.removeEventListener("keydown", handleFirstResponse);
            }
        }
    };

    userInput.addEventListener("keydown", handleFirstResponse);
}

document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("videoPlayer");
    const ratingContainer = document.getElementById("ratingContainer");
    const stars = document.querySelectorAll(".star");
    const submitRatingButton = document.getElementById("submitRating");

    let rating = 0; // Initialize the rating variable

    // Show the rating system when the video ends
    video.addEventListener("ended", () => {
        ratingContainer.style.display = "block"; // Show the rating container
    });

    // Handle star selection - FIXED ITERATION ISSUE
    stars.forEach(star => {
        star.addEventListener("click", function () {
            rating = parseInt(this.getAttribute("data-index")); // Update the rating variable

            // Clear all stars first
            stars.forEach(s => {
                s.style.color = "gray";
            });

            // Then color the selected stars
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.style.color = "gold";
                    s.classList.add("selected");
                } else {
                    s.classList.remove("selected");
                }
            });

            submitRatingButton.style.display = "block"; // Show the submit button
        });
    });

    // Handle rating submission
    submitRatingButton.addEventListener("click", () => {
        alert(`Thank you for rating this video ${rating} stars!`);
        ratingContainer.style.display = "none"; // Hide the rating container after submission
        showPopup(rating); // Pass the rating to showPopup
    });

    const userInput = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    if (!userInput || !chatBox) {
        console.error("Required elements not found in the DOM.");
        return;
    }

    const chatToggleButton = document.querySelector(".chat-toggle");
    if (chatToggleButton) {
        chatToggleButton.textContent = "Context Agent";
    }

    if (!document.querySelector(".chat-toggle")) {
        const chatToggleButton = document.createElement("button");
        chatToggleButton.className = "chat-toggle";
        chatToggleButton.textContent = "Context Agent";
        chatToggleButton.onclick = toggleChat;
        document.body.appendChild(chatToggleButton);
    }
});

// Chatbot logic
function toggleChat() {
    const chatContainer = document.getElementById("chatContainer");
    const chatToggleButton = document.querySelector(".chat-toggle");

    if (chatContainer.style.display === "none" || chatContainer.style.display === "") {
        chatContainer.style.display = "block"; // Show the chatbot
        chatToggleButton.style.display = "none"; // Hide the button
        startChat();
    } else {
        chatContainer.style.display = "none"; // Hide the chatbot
        chatToggleButton.style.display = "block"; // Show the button
    }
}

function startChat() {
    let chatBox = document.getElementById("chatBox");

    if (!chatBox) {
        console.error("Element with id 'chatBox' not found in the DOM.");
        return;
    }

    chatBox.innerHTML = ""; // Clear chat
    currentQuestion = 0;
    showNextQuestion();
}

function showNextQuestion() {
    const chatBox = document.getElementById("chatBox");

    if (!chatBox) {
        console.error("Element with id 'chatBox' not found in the DOM.");
        return;
    }

    if (currentQuestion < questions.length) {
        chatBox.innerHTML += `<p><strong>Bot:</strong> ${questions[currentQuestion]}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } else {
        // No more questions, end the chat or provide a final message
        chatBox.innerHTML += `<p><strong>Bot:</strong> Thank you for your feedback!</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;

        // Save the answers to localStorage
        localStorage.setItem("chatAnswers", JSON.stringify(answers));
    }
}

function sendMessage() {
    let userInput = document.getElementById("userInput").value.trim();
    let chatBox = document.getElementById("chatBox");

    if (!chatBox) {
        console.error("Element with id 'chatBox' not found in the DOM.");
        return;
    }

    if (userInput === "") return;

    answers[questions[currentQuestion]] = userInput;

    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    currentQuestion++;
    setTimeout(showNextQuestion, 500);

    document.getElementById("userInput").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Add event listener for the Enter key in the input box
document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById("userInput");
    if (userInput) {
        userInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                sendMessage(); // Trigger the sendMessage function
            }
        });
    }
});

// Thank you popup logic
function showPopup(rating) {
    let thankYouMessage = document.getElementById("thankYouMessage");
    if (!thankYouMessage) {
        console.error("Element with id 'thankYouMessage' not found in the DOM.");
        return;
    }
    thankYouMessage.textContent = `I can share your ${rating}-star rating with your friends.`; // Use the passed rating

    const thankYouPopup = document.getElementById("thankYouPopup");
    if (!thankYouPopup) {
        console.error("Element with id 'thankYouPopup' not found in the DOM.");
        return;
    }
    thankYouPopup.style.display = "block";

    const yesButton = document.getElementById("yesButton");
    const noButton = document.getElementById("noButton");

    if (yesButton) {
        yesButton.addEventListener("click", () => askForFriendInfo(rating));
    }

    if (noButton) {
        noButton.addEventListener("click", () => {
            thankYouMessage.textContent = "Thanks for your feedback! I'll share this with the Recommender Agent.";
            setTimeout(() => {
                thankYouPopup.style.display = "none";
            }, 2000);
        });
    }
}

function askForFriendInfo(rating) {
    let friendName = prompt("Enter your friend's name:");
    let friendNumber = prompt("Enter your friend's number:");
    alert(`Thanks! I'll share your ${rating}-star rating with ${friendName} (${friendNumber}).`);

    const thankYouPopup = document.getElementById("thankYouPopup");
    if (thankYouPopup) {
        thankYouPopup.style.display = "none";
    }
}

// CSS for star rating
const style = document.createElement("style");
style.textContent = `
.star {
    font-size: 40px;
    color: gray;
    cursor: pointer;
    transition: transform 0.2s ease, color 0.2s ease;
}

.star:hover {
    color: gold;
    transform: scale(1.2); /* Slight zoom effect */
}

.star.selected {
    color: gold;
}
`;
document.head.appendChild(style);

