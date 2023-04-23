import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ChatPage from './components/ChatPage';
import socketIO from "socket.io-client"

const socket = socketIO.connect("http://localhost:4000")
function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatPage socket={socket} />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
