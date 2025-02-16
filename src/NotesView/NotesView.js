import NotesInput from '../components/NotesInput/NotesInput';
import Notes from '../components/Notes/Notes';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from "uuid";

const AppContainer = styled.div`
  background-color: aliceblue;
  min-height: 100vh;
`

// useMemo, useCallback, memo

const NotesView = () => {
  const [notes, setNotes] = useState(()=>{
    const savedNotes = JSON.parse(localStorage.getItem("notes"))
    return savedNotes || []
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  const addNote = (text) => {
    if (!text.trim()) return;
    setNotes([...notes, {
      id: uuidv4(),
      text: text
    }])
  }

  const deleteNote = (id) => {
    setNotes(prevNotes => {
        const updatedNotes = prevNotes.filter(note => note.id !== id)
        localStorage.setItem("notes", JSON.stringify(updatedNotes))
        return updatedNotes
    })
  }

  return (
    <AppContainer>
      <NotesInput addNote={addNote} />
      <Notes notes={notes} deleteNote={deleteNote} />
    </AppContainer>
  );
}

export default NotesView;
