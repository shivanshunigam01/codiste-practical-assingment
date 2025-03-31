import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import './App';
import PostApp from './components/PostApp';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const queryClient = new QueryClient();

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
             <Provider store={store}>
             <Router>
                <div style={{ height: '100vh' }}>
                    <div style={{ width: '99vw', textAlign: 'center', background: '#f9fafb' }}>
                        <h1>CODISTE: Practical Assingment</h1>
                    </div>
                    <Routes>
                        <Route path="/" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/postApp" element={<PostApp />} />
                    </Routes>
                </div>
            </Router>   
             </Provider>

           
        </QueryClientProvider>
        

    );
};

export default App;
