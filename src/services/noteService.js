import axios from "axios";

const API_URL = "http://localhost:8080/api/notes";

const getAuthHeaders = () => ({
  headers: { 
    "x-auth-token": localStorage.getItem("token"),
    "Content-Type": "application/json"
  },
  withCredentials: true
});

// Fetch all notes
export const fetchNotes = async () => {
  try {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error.response?.data || error.message);
    throw error;
  }
};

// Add a new note
export const addNote = async (text) => {
  try {
    const response = await axios.post(API_URL, { content: text }, { withCredentials: true });
    return response.data.note;
  } catch (error) {
    console.error("Error adding note:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a note
export const deleteNote = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
  } catch (error) {
    console.error("Error deleting note:", error.response?.data || error.message);
    throw error;
  }
};
