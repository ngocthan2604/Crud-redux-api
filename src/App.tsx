import './App.module.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListUser from './pages/Home/home';
import AddUser from './pages/Create/adduser';
import Layout from './Layout/layout';

function App() {
    return (
        <Router>
            <Layout />
            <Routes>
                <Route path="/" element={<ListUser />} />
                <Route path="/add" element={<AddUser />} />
            </Routes>
        </Router>
    );
}

export default App;
