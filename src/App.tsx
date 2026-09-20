import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MainPage } from './components/templates/MainPage';
import { Profile } from './components/templates/Profile';
import { AuthProvider } from './auth/AuthProvider';
import { RequireAuth } from './auth/RequireAuth';
import { ThemeProvider } from './theme/ThemeProvider';
import { MuiThemeBridge } from './theme/MuiThemeBridge';
import { LocaleProvider } from './i18n/LocaleProvider';
import { CartProvider } from './cart/CartProvider';

// import.meta.env.BASE_URL зеркалит `base` из vite.config.ts ('/pandemia/'
// на GitHub Pages, '/' локально) — react-router ждёт basename без слэша в конце.
const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '');

function App() {
    return (
        <ThemeProvider>
            <MuiThemeBridge>
                <LocaleProvider>
                    <AuthProvider>
                        <CartProvider>
                            <BrowserRouter basename={routerBasename}>
                                <Routes>
                                    <Route
                                        path="/"
                                        element={
                                            <Navigate to="/main" replace />
                                        }
                                    />
                                    <Route
                                        path="/main"
                                        element={<MainPage />}
                                    />
                                    <Route
                                        path="/profile"
                                        element={
                                            <RequireAuth>
                                                <Profile />
                                            </RequireAuth>
                                        }
                                    />
                                    <Route
                                        path="*"
                                        element={
                                            <Navigate to="/main" replace />
                                        }
                                    />
                                </Routes>
                            </BrowserRouter>
                        </CartProvider>
                    </AuthProvider>
                </LocaleProvider>
            </MuiThemeBridge>
        </ThemeProvider>
    );
}

export default App;
