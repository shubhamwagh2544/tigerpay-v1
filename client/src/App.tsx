import { BrowserRouter, Route, Routes } from "react-router-dom"
import PrivateRoute from "./auth/PrivateRoute"
import Layout from "./layout/Layout"
import AboutPage from "./pages/AboutPage"
import CreateAccountPage from "./pages/CreateAccountPage"
import DashboardPage from "./pages/DashboardPage"
import DeleteProfilePage from "./pages/DeleteProfilePage"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import { default as ProfilePage, default as UpdateProfilePage } from "./pages/UpdateProfilePage"
import ViewAccountsPage from "./pages/ViewAccountsPage"
import ViewProfilePage from "./pages/ViewProfilePage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout><HomePage /></Layout>}
        />
        <Route
          path="/about"
          element={<AboutPage />}
        />
        <Route
          path="/signup"
          element={<SignUpPage />}
        />
        <Route
          path="/signin"
          element={<SignInPage />}
        />
        <Route element={<PrivateRoute />}>
          <Route
            path="/profile"
            element={<Layout><ProfilePage /></Layout>}
          />
          <Route
            path="/dashboard"
            element={<Layout><DashboardPage /></Layout>}
          />
          <Route
            path="/update-profile"
            element={<Layout><UpdateProfilePage /></Layout>}
          />
          <Route
            path="/view-profile"
            element={<Layout><ViewProfilePage /></Layout>}
          />
          <Route
            path="/delete-profile"
            element={<Layout><DeleteProfilePage /></Layout>}
          />
          <Route
            path="/create-account"
            element={<Layout><CreateAccountPage /></Layout>}
          />
          <Route
            path="/view-accounts"
            element={<Layout><ViewAccountsPage /></Layout>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App