import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { Home } from "./pages/Home";
import { Programs } from "./pages/Programs";
import { FloatingChatbot } from "./components/common/FloatingChatbot";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="sitm-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
        </Routes>
        <FloatingChatbot />
      </Router>
    </ThemeProvider>
  );
}

export default App;
