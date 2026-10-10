import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { GuestRoute, ProtectedRoute } from './components/ProtectedRoute';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import TemplateDetail from './pages/TemplateDetail';
import Templates from './pages/Templates';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/templates" replace />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/templates/:id" element={<TemplateDetail />} />

        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/favorites" element={<Favorites />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
