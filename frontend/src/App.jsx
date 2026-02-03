import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LeadCaptureProvider } from "./context/LeadCaptureContext";

import { Home } from "./pages/Home";
import { Programs } from "./components/sections/Programs";
import { Application } from "./pages/Application";
import { Login } from "./pages/Login";
import { Activate } from "./pages/Activate";
import { Dashboard } from "./pages/Dashboard";
import { Scholarships } from "./pages/Scholarships";

import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { ApplicationDetail } from "./pages/admin/ApplicationDetail";
import { AdminUserManagement } from "./pages/admin/AdminUserManagement";

import { FloatingChatbot } from "./components/common/FloatingChatbot";
import { FloatingCTA } from "./components/common/FloatingCTA";
import FloatingWhatsApp from "./components/common/FloatingWhatsApp";

// Import API test utility in development only
if (import.meta.env.DEV) {
  import("./utils/apiTest");
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="sitm-ui-theme">
      <LeadCaptureProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/application/:leadId" element={<Application />} />
            <Route path="/login" element={<Login />} />
            <Route path="/activate/:token" element={<Activate />} />

            {/* User dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/student/dashboard" element={<Dashboard />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUserManagement />} />
            <Route path="/admin/application/:id" element={<ApplicationDetail />} />
            <Route path="/admin/applications/:id" element={<ApplicationDetail />} />
          </Routes>

          {/* Global floating components */}
          <FloatingWhatsApp/>
          <FloatingChatbot />
          <FloatingCTA />
        </Router>
      </LeadCaptureProvider>
    </ThemeProvider>
  );
}

export default App;
