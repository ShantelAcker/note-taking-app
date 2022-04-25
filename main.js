// imports
import "./style.css";
import { notesList } from "./notesList";
import { v4 as uuidv4 } from "uuid";

// accessing html elements
const notesContainer = document.getElementById("notes-container");
const entryButton = document.getElementById("entry-button");
const editorContainer = document.getElementById("editor-container");
const textEditor = document.getElementById("text-editor");
const submitButton = document.getElementById("submit-button");

// a function to format each notesList item for display
function noteFormat(note) {
  return `
    <div class="note">
      <p>${note.entryText}</p>
      <p>${note.date} ${note.time}</p>
    </div>
  `;
}

// at launch, map through each element in the notesList array
// and update the innerHTML
// the .join removes the comma being added between each item
notesContainer.innerHTML = notesList.map(noteFormat).join("");

// global variables for the date and time for later
let currentFullDate = "";
let currentTime = "";

function formatDate() {
  const dateObject = new Date();
  const currentMonth = dateObject.getMonth() + 1;
  const currentDate = dateObject.getDate();
  const currentYear = dateObject.getFullYear();
  const currentHours = dateObject.getHours();
  const currentMinutes = dateObject.getMinutes();

  currentFullDate = `${currentMonth}/${currentDate}/${currentYear}`;
  currentTime = `${currentHours}:${
    currentMinutes < 10 ? "0" + currentMinutes : currentMinutes
  }`;
}

// switch button text between Cancel and New Entry
entryButton.addEventListener("click", updateEntryButton);

function updateEntryButton() {
  if (entryButton.innerText === "New Entry") {
    entryButton.innerText = "Cancel";
    editorContainer.style.display = "block";
    // set the date and time as soon as the button is clicked
    // to be used later
    formatDate();
  } else {
    textEditor.value = "";
    entryButton.innerText = "New Entry";
    editorContainer.style.display = "none";
  }
}

submitButton.addEventListener("click", submitEntry);

// a function that formats and adds a new note to the notesList array
// then updates the notesContainer innerHTML and closes the text editor again
function submitEntry() {
  notesList.unshift({
    id: uuidv4(),
    date: currentFullDate,
    time: currentTime,
    entryText: textEditor.value,
  });

  notesContainer.innerHTML = notesList.map(noteFormat).join("");
  textEditor.value = "";
  entryButton.innerText = "New Entry";
  editorContainer.style.display = "none";

  console.log(notesList[0]);
}
