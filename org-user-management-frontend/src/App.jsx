import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddOrganization from './pages/AddOrganization';
import EditOrganization from './pages/EditOrganization';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-org" element={<AddOrganization />} />
        <Route path="/edit-org/:id" element={<EditOrganization />} />
      </Routes>
    </Router>
  );
}

export default App;
