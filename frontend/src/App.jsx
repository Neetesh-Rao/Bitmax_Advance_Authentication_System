import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from './IndexPage.jsx';
import RegisterPage from './RegisterPage.jsx';
import OTPVerificationPage from './OTPVerificationPage.jsx';
import SetPasswordPage from './SetPassword.jsx';
import LoginPage from './Login.jsx';
import LoginNextPage from './LoginNext.jsx';
import DashboardPage from './DashboardPage.jsx';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
     <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/otp-verification/:email" element={<OTPVerificationPage />} />
        <Route path="/set-password/:email" element={<SetPasswordPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login-next" element={<LoginNextPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
