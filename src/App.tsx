import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { AuthGate } from './components/AuthGate'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { QuizPage } from './pages/QuizPage'
import { LibraryPage } from './pages/LibraryPage'
import { ScriptDetailPage } from './pages/ScriptDetailPage'
import { SubmitPage } from './pages/SubmitPage'
import { AboutPage } from './pages/AboutPage'
import { DashboardPage } from './pages/DashboardPage'
import { TermsPage } from './pages/TermsPage'

function App() {
  return (
    <AuthProvider>
      <AuthGate>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="quiz" element={<QuizPage />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="library/:id" element={<ScriptDetailPage />} />
            <Route path="share" element={<SubmitPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </AuthGate>
    </AuthProvider>
  )
}

export default App
