import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUpPage from "./pages/SignUpPage"
import Layout from "./layout/Layout"
import SignInPage from "./pages/SignInPage"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout><HomePage /></Layout>}
        />
        <Route
          path="/signup"
          element={<SignUpPage />}
        />
        <Route
          path="/signin"
          element={<SignInPage />}
        />
        <Route
          path="/profile"
          element={<Layout><ProfilePage /></Layout>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
