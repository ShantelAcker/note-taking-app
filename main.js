import "./style.css";
import { notesList } from "./notesList";

// accessing html elements
const notes = document.getElementById("notes");
const entryButton = document.getElementById("entry-button");
const editorContainer = document.getElementById("editor-container");
const textEditor = document.getElementById("text-editor");
const submitButton = document.getElementById("submit-button");

// a function to format each notesList item for display
function noteFormat(note) {
  return `
    <div class="note">
      <h3>${note.date} ${note.time}</h3>
      <p>${note.entryText}</p>
    </div>
  `;
}

// map through each element in the notesList array and update the HTML
notes.innerHTML = notesList.map(noteFormat);

// change the button to say Cancel when clicked
// and to change back to New Entry when clicked again
entryButton.addEventListener("click", updateEntryButton);

function updateEntryButton() {
  if (entryButton.innerText === "New Entry") {
    entryButton.innerText = "Cancel";
    editorContainer.style.display = "block";
  } else {
    entryButton.innerText = "New Entry";
    editorContainer.style.display = "none";
  }
}

submitButton.addEventListener("click", submitEntry);

function submitEntry() {
  console.log(textEditor.value);
}
