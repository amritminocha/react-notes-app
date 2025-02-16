import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import NotesView from './NotesView/NotesView'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/notes" element={<NotesView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
