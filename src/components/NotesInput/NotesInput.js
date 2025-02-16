import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 200px;
    border: 1px solid #ccc;
    padding: 20px;
`

const NoteInput = styled.textarea`
    width: 300px;
    height: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    margin-bottom: 10px;
`

const Button = styled.button`
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 16px;
    margin: 5px;
    &:hover {
        background-color: #218838;
    }
`

const NotesInput = ({addNote}) => {
  const [noteInput, setNoteInput] = useState('')

  const handleNote = () => {
    addNote(noteInput)
    setNoteInput('')
  }

  return (
    <Container>
        <NoteInput value={noteInput} onChange={(e)=>setNoteInput(e.target.value)} />
        <Button onClick={handleNote}>Add Note</Button>
    </Container>
  )
}

export default NotesInput