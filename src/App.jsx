import { Provider } from "react-redux";
import { store } from "./base/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./Routes/Login";
import RequireAuth from "./features/auth/RequireAuth";
import Welcome from "./Routes/Welcome";
import Public from "./Routes/Public";
import UsersList from "./Routes/UsersList";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Layout />}>
            {/* public routes */}
            <Route index element={<Public />} />
            <Route path="login" element={<Login />} />

            {/* protected routes */}
            <Route element={<RequireAuth />}>
              <Route path="welcome" element={<Welcome />} />
              <Route path="userslist" element={<UsersList />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
