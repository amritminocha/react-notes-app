import React from 'react'
import styled from 'styled-components'
import Note from '../Note/Note'

const NoteContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const Notes = ({notes, deleteNote}) => {
  return (
    <NoteContainer>
        {notes.map(note => (
            <Note key={note?._id} note={note} deleteNote={()=>deleteNote(note?._id)} />
        ))}
    </NoteContainer>
  )
}

export default Notes