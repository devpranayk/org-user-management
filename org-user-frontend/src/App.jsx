import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Organizations from "./pages/Organizations";
import OrgDetails from "./pages/OrgDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/organizations/:id" element={<OrgDetails />} />
        <Route path="*" element={<Organizations />} /> {/* fallback */}
      </Routes>
    </Router>
  );
}

export default App;
