import {Route, Routes} from "react-router-dom"


import RegisterForm from "./components/auth/RegisterForm";
import LoginForm from "./components/auth/LoginForm";
import AllContacts from "./components/dashboard/AllContacts";
import UserInfo from "./components/dashboard/UserInfo";
import Unauth from "./components/auth/Unauth";
import CheckAuth from "./HOC/checkAuth";


function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<CheckAuth Component = {UserInfo} />} />
          <Route path="/contacts" element={<CheckAuth Component = {AllContacts} />} />
          <Route path= "*" element={<Unauth />} />


          
        </Routes>
      </div>
  );
}

export default App;
