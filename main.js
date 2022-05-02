// imports
import "./style.css";
import { notesList } from "./notesList";
import { v4 as uuidv4 } from "uuid";

// selectors
const notesContainer = document.getElementById("notes-group-container");
const entryButton = document.getElementById("entry-button");
const editorContainer = document.getElementById("editor-container");
const textEditor = document.getElementById("text-editor");
const submitButton = document.getElementById("submit-button");

// event listeners
entryButton.addEventListener("click", updateEntryButton);
submitButton.addEventListener("click", submitEntry);
notesContainer.addEventListener("click", deleteNote);

// a function to format each notesList item for display
function noteFormat(note) {
  return `
    <div class="single-note-container" id=${note.id}>
      <div class="note-text-container">
        <p>${note.entryText}</p>
        <p class="date-time">${note.date} ${note.time}</p>
      </div>
      <div class="delete-button-container">
        <i id="delete-button" class="fa-solid fa-trash-can delete-button"></i>
      </div>
    </div>
  `;
}

// at launch, map through each element in the notesList array
// and update the innerHTML
// .join removes the comma being added between each item
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

// a function that switches top button text between Cancel and New Entry
function updateEntryButton() {
  if (entryButton.innerText === "New Entry") {
    entryButton.innerText = "Cancel";
    editorContainer.style.display = "flex";
    // set the date and time as soon as the button is clicked
    // to be used later
    formatDate();
  } else {
    textEditor.value = "";
    entryButton.innerText = "New Entry";
    editorContainer.style.display = "none";
  }
}

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
}

// a function that finds the id associated with the trash can clicked
// and deletes that element and updates the html accordingly
function deleteNote(event) {
  if (event.target.id === "delete-button") {
    let noteId = event.target.parentElement.parentElement.id;
    // find the index of the object that matches the id of the element we want to delete
    let noteIndex = notesList.findIndex((element) => {
      return element.id === noteId;
    });
    notesList.splice(noteIndex, 1);
    notesContainer.innerHTML = notesList.map(noteFormat).join("");
  }
}
