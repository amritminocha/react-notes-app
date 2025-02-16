import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  min-height: 100vh;
`;

const NoteInput = styled.textarea`
  width: 300px;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 5px;

  &:hover {
    background-color: #218838;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

const NoteCard = styled.div`
  background: white;
  padding: 15px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 320px;
  display: flex;
  flex-direction: column;
`;

const NotesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!text.trim()) return;
    setNotes([...notes, { id: uuidv4(), text }]);
    setText("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <AppContainer>
      <h1>Note Making App</h1>
      <NoteInput value={text} onChange={(e) => setText(e.target.value)} placeholder="Write your note..." />
      <Button onClick={addNote}>Add Note</Button>
      <NotesContainer>
        {notes.map((note) => (
          <NoteCard key={note.id}>
            <p>{note.text}</p>
            <DeleteButton onClick={() => deleteNote(note.id)}>Delete</DeleteButton>
          </NoteCard>
        ))}
      </NotesContainer>
    </AppContainer>
  );
}

export default App;
