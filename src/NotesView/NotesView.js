import NotesInput from '../components/NotesInput/NotesInput';
import Notes from '../components/Notes/Notes';
import styled from 'styled-components';
import { useCallback, useContext, useEffect, useState } from 'react';
import { fetchNotes, addNote, deleteNote } from '../services/noteService';
import AuthContext from '../AuthContext';

const AppContainer = styled.div`
  background-color: aliceblue;
  min-height: 100vh;
`

const Button = styled.button`
  background-color: orange;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 16px;
  margin: 5px;
  &:hover {
      background-color: #ff7f50;
  }
  margin-top: 30%;
`

// useMemo, useCallback, memo

const NotesView = () => {
  const [notes, setNotes] = useState([]);
  const { logout }  = useContext(AuthContext);

  const getNotes = useCallback(async () => {
    try {
      const data = await fetchNotes();
      setNotes(data);
      console.log("Notes fetched:", data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }, [])

  useEffect(() => {
    getNotes();
  }, [getNotes])

  const handleAddNote = async (text) => {
    if (!text.trim()) return;
    try {
      const newNote = await addNote(text);
      setNotes(prevNotes => [...prevNotes, newNote]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  const handleDeleteNote = async (id) => {
    try{
      await deleteNote(id)
      setNotes(prevNotes => prevNotes.filter(note => note._id !== id))
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  return (
    <AppContainer>
      <NotesInput addNote={handleAddNote} />
      <Notes notes={notes} deleteNote={handleDeleteNote} />
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button onClick={logout}>Logout</Button>
      </div>
    </AppContainer>
  );
}

export default NotesView;
