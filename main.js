import "./style.css";
import { notesList } from "./notesList";

CKEDITOR.replace("editor");

const notes = document.getElementById("notes");

// a function to format each notesList item for display
function noteFormat(note) {
  return `
  <div class="note">
    <h1>${note.title}</h1>
    <h2>Category: ${note.category}</h2>
    <h3>${note.date} ${note.time}</h3>
    <p>${note.entryText}</p>
  </div>
  `;
}

// map through each element in the notesList array and update the HTML
notes.innerHTML = notesList.map(noteFormat);

// change the button to say Cancel when clicked
// and to change back to New Entry when clicked again
