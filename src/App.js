// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Login/Login';
import { Register } from './Registeration/Registeration';
import { MainPage } from './Componant/mainPageDashboard/mainPage';
import Post from './Componant/CreatePost/Post';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/posts' element={<MainPage/>} />
          <Route path='/createpost' element={<Post/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
