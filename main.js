// imports
import "./style.css";
import { notesList } from "./notesList";

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
// and update the HTML
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

// format and add a new note to the notesList array
// then update the notesContainer innerHTML an close the text editor again
function submitEntry() {
  // this works for now, but will need different implementation
  // once the ability to delete notes gets added
  let noteID = notesList[0].id + 1;
  notesList.unshift({
    id: noteID,
    date: currentFullDate,
    time: currentTime,
    entryText: textEditor.value,
  });

  notesContainer.innerHTML = notesList.map(noteFormat).join("");
  textEditor.value = "";
  entryButton.innerText = "New Entry";
  editorContainer.style.display = "none";
}
