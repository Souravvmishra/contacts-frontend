import {Route, Routes} from "react-router-dom"


import RegisterForm from "./components/auth/RegisterForm";
import LoginForm from "./components/auth/LoginForm";
import UserInfo from "./components/dashboard/UserInfo";
import CheckAuth from "./HOC/checkAuth";


function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<CheckAuth Component = {UserInfo} />} />

          <Route path= "*" element={<>
          404 | Error
          </>} />


          
        </Routes>
      </div>
  );
}

export default App;
