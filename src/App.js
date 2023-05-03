import {Route, Routes} from "react-router-dom"


import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import AllContacts from "./components/dashboard/AllContacts";
import UserInfo from "./components/dashboard/UserInfo";


function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<AllContacts />} />
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/contacts" element={<AllContacts />} />

          
        </Routes>
      </div>
  );
}

export default App;
