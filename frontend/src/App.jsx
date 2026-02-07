import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LeadCaptureProvider } from "./context/LeadCaptureContext";

import { Home } from "./pages/Home";
import { Programs } from "./pages/Programs";
import { Application } from "./pages/Application";
import { Login } from "./pages/Login";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { Activate } from "./pages/Activate";
import { Dashboard } from "./pages/Dashboard";
import { Scholarships } from "./pages/Scholarships";

import { Engineering } from "./pages/programs/Engineering";
import { BCA } from "./pages/programs/BCA";
import { BBA } from "./pages/programs/BBA";
import { DataScience } from "./pages/programs/DataScience";
import { CSE } from "./pages/programs/CSE";
import { ECE } from "./pages/programs/ECE";
import { EEE } from "./pages/programs/EEE";
import { ME } from "./pages/programs/ME";
import { CE } from "./pages/programs/CE";

import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { ApplicationDetail } from "./pages/admin/ApplicationDetail";
import { AdminUserManagement } from "./pages/admin/AdminUserManagement";

import { FloatingChatbot } from "./components/common/FloatingChatbot";
import { FloatingCTA } from "./components/common/FloatingCTA";
import FloatingWhatsApp from "./components/common/FloatingWhatsApp";

if (import.meta.env.DEV) {
  import("./utils/apiTest");
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="sitm-ui-theme">
      <LeadCaptureProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            
            <Route path="/programs/engineering" element={<Engineering />} />
            <Route path="/programs/engineering/:branch" element={<Engineering />} />
            
            <Route path="/programs/cse" element={<CSE />} />
            <Route path="/programs/ece" element={<ECE />} />
            <Route path="/programs/eee" element={<EEE />} />
            <Route path="/programs/me" element={<ME />} />
            <Route path="/programs/ce" element={<CE />} />
            
            <Route path="/programs/bca" element={<BCA />} />
            <Route path="/programs/bba" element={<BBA />} />
            <Route path="/programs/data-science" element={<DataScience />} />
            
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/application/:leadId" element={<Application />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/activate/:token" element={<Activate />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/student/dashboard" element={<Dashboard />} />

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUserManagement />} />
            <Route path="/admin/application/:id" element={<ApplicationDetail />} />
            <Route path="/admin/applications/:id" element={<ApplicationDetail />} />
          </Routes>

          <FloatingWhatsApp/>
          <FloatingCTA />
        </Router>
      </LeadCaptureProvider>
    </ThemeProvider>
  );
}

export default App;
