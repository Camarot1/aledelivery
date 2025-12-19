import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header'
import Footer from './components/footer'
import Individual from './pages/main-individuals/individuals.jsx'
import Login from './pages/login/login.jsx'
import Code from './pages/login/code.jsx'
import Track from './pages/track/track.jsx'
import PriceComm from './pages/price/pricecomm.jsx'
import Profile from './pages/profile/profile.jsx'
import Post from './pages/post/post.jsx';
import Company from './pages/company/company.jsx'
import NotFound from './pages/404/404.jsx'
function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <main>
                    <Routes>
                            <Route path="/" element={<Individual/>} />
                            <Route path="/login" element={<Login/>} />
                            <Route path="/code" element={<Code/>} />
                            <Route path="/track" element={<Track/>}/>
                            <Route path="/pricecomm" element={<PriceComm/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/post" element={<Post/>}/>
                            <Route path="/company" element={<Company/>}/>
                            <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </main>
                <Footer/>
            </div>

        </Router>
    );
}

export default App;