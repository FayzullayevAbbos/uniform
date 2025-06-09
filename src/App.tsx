import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ConfigProvider} from 'antd';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import routes_list from './routes_list.tsx';
import {persistor, store} from './store/store.ts';
import Login from './pages/auth/Login..tsx';

// 🔐 Faqat token bo‘lsa kirishga ruxsat (asosiy sahifalar)
const PrivateRoute = ({children}) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/auth" replace />;
};

// 🔓 Faqat token BO‘LMASA kirishga ruxsat (login sahifasi)
const PublicRoute = ({children}) => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/" replace /> : children;
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#14b8a6',
              borderRadius: 10,
            },
          }}
        >
          <BrowserRouter>
            <Routes>
              {/* Public route - login sahifasi */}
              <Route
                path="/auth"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />

              {/* Private route - token bo‘lsa kirishga ruxsat */}
              <Route
                path="/*"
                element={
                  <PrivateRoute>
                    <MainLayout>
                      <Routes>
                        {routes_list.map((route, index) => (
                          <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                          />
                        ))}
                      </Routes>
                    </MainLayout>
                  </PrivateRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
