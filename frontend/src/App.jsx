import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { Authentication } from "./pages/Authentication";
import { MoneySent } from "./pages/MoneySent";
import { Profile } from "./pages/Profile";
import { History } from "./pages/History";



function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
        <Route path="/" element={<Authentication />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="/money-sent" element={<MoneySent />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App