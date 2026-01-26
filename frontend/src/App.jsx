import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { Home } from "./pages/Home";
import { Programs } from "./pages/Programs";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="sitm-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
