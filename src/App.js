import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import NotesView from './NotesView/NotesView'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

const App = () => {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/notes" element={<ProtectedRoute><NotesView /></ProtectedRoute>} />
          <Route path="*" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>

  );
}

export default App;
