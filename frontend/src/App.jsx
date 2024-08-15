import Header from "./components/Header.jsx";
import { Routes, Route } from "react-router-dom";
import Task from "./pages/Main.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuth } from "./context/authContext.jsx";
import Home from "./pages/Home";
function App() {
  const auth = useAuth();

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {auth?.isLoggedIn && auth.user && (
          <Route path="/tasks" element={<Task />} />
        )}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </main>
  );
}

export default App;