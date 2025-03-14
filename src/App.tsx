import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './components/templates/MainPage';
import { Profile } from './components/templates/Profile';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="main" element={<MainPage />} />
                <Route path="profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
