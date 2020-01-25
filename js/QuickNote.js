AllNotes();

//Search notes
let search = document.getElementById('txtSearch');
search.addEventListener("input", function(){
    let inputVal = search.value.toUpperCase();
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function(element){
        let cardText = element.getElementsByTagName("p")[0].innerText;
        if(cardText.includes(inputVal)){
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
        }
    })
})

//Add a note
let btnAddNote = document.getElementById('btnAddNote');
btnAddNote.addEventListener('click', function (e) {
    let txtAddNote = document.getElementById('exampleFormControlTextarea1');
    let notes = localStorage.getItem('notes');
    notesObj = (notes === null) ? [] : JSON.parse(notes);
    notesObj.push(txtAddNote.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    txtAddNote.value = "";
    AllNotes();
});

//Delete a note
function deleteNote(index) {
  let notes = localStorage.getItem('notes');
    notesObj = (notes === null) ? [] : JSON.parse(notes);
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  AllNotes();
}

//Get all notes
function AllNotes() {
    let notes = localStorage.getItem('notes');
    notesObj = (notes === null) ? [] : JSON.parse(notes);
    let noteStr = "";
    notesObj.forEach(function (element, index) {
        noteStr += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text"> ${element}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
    });
    let allNotes = document.getElementById('allNotes');
    if (notesObj.length != 0) {
        allNotes.innerHTML = noteStr;
    } else {
        allNotes.innerHTML = `Use "Add Note" button to add new note!`;
    }
}
