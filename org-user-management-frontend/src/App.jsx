import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddOrganization from './pages/AddOrganization';
import EditOrganization from './pages/EditOrganization';
import Navbar from './components/Navbar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-org" element={<AddOrganization />} />
        <Route path="/edit-org/:id" element={<EditOrganization />} />
      </Routes>
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
