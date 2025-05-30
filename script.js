let sentences = [];
let currentIndex = 0;
let isTyping = false;
let typingTimeout;

function start() {
  const inputName = document.getElementById("name").value.trim().toLowerCase();
  const box = document.getElementById("textBox");
  const textContent = document.getElementById("textContent");
  const imageContent = document.getElementById("imageContent");

  const key = Object.keys(data).find(
    k => k.toLowerCase() === inputName.toLowerCase()
  );
  
  if (!key) {
    textContent.innerText = "Name not found.";
    box.style.display = "block";
    imageContent.style.display = "none";
    return;
  }
  
  const user = data[key];

  if ("password" in user) {
    const enteredPasscode = prompt("Oh? I didn't expect you to read what I write. Can you tell me the last Enrollment ID we talked about on Zalo?");
    if (enteredPasscode !== user.password) {
      textContent.innerText = "Access denied.";
      box.style.display = "block";
      imageContent.style.display = "none";
      return;
    }
  }

  sentences = splitIntoSentences(user.message);
  currentIndex = 0;

  box.style.display = "block";
  imageContent.style.display = "none";
  textContent.innerText = "";
  box.onclick = showNext;

  showCurrent();
}

function splitIntoSentences(text) {
  // Regex to find URLs (http or https)
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Extract URLs and temporarily replace them with placeholders
  const urls = [];
  let tempText = text.replace(urlRegex, (match) => {
    urls.push(match);
    return `__URL${urls.length - 1}__`; // placeholder
  });

  // Now split tempText by sentence-ending punctuation
  const sentenceRegex = /[^.!?]+[.!?]+|[^.!?]+$/g;
  let sentences = tempText.match(sentenceRegex) || [];

  // Replace placeholders back with original URLs
  sentences = sentences.map(sentence => {
    return sentence.replace(/__URL(\d+)__/g, (_, index) => urls[index]);
  });

  // Trim whitespace from each sentence
  return sentences.map(s => s.trim());
}


function showNext() {
  if (isTyping) return; // Prevent skipping while typing

  currentIndex++;
  if (currentIndex < sentences.length) {
    showCurrent();
  } else {
    const textContent = document.getElementById("textContent");
    const imageContent = document.getElementById("imageContent");
    textContent.innerText = "End of message.";
    imageContent.style.display = "none";
    document.getElementById("textBox").onclick = null;
  }
}

function showCurrent() {
  const textEl = document.getElementById("textContent");
  const imgEl = document.getElementById("imageContent");

  if (typingTimeout) clearTimeout(typingTimeout);
  imgEl.style.display = "none";
  textEl.innerText = "";
  isTyping = true;

  typeWriter(sentences[currentIndex], textEl, 0);
}

function typeWriter(text, element, index) {
  if (index < text.length) {
    element.textContent += text.charAt(index);
    typingTimeout = setTimeout(() => typeWriter(text, element, index + 1), 30);
  } else {
    isTyping = false;
  }
}
