import { Routes, Route } from 'react-router-dom';
import Login from '../Views/Login';
import Home from '../Views/Home';
import Register from '../Views/Register';
import Main from '../Views/Main';
import PrivateRoute from '../Views/PrivateRoute';
import CreateAccount from '../Views/CreateAccount';

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
                <Route path="/main" element={<Main />} />
                <Route path="/main/create" element={<CreateAccount />} />
            </Route>
        </Routes>
    );
}
