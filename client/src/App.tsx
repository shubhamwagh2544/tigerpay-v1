import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUpPage from "./pages/SignUpPage"
import Layout from "./layout/Layout"
import SignInPage from "./pages/SignInPage"

//routes
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout><SignUpPage /></Layout>}
        />
        <Route
          path="/signup"
          element={<Layout><SignUpPage /></Layout>}
        />
        <Route
          path="/signin"
          element={<SignInPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
