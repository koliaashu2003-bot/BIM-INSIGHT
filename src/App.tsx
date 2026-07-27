import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { QuizPage } from './pages/QuizPage'
import { LibraryPage } from './pages/LibraryPage'
import { SubmitPage } from './pages/SubmitPage'
import { AboutPage } from './pages/AboutPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="quiz" element={<QuizPage />} />
        <Route path="library" element={<LibraryPage />} />
        <Route path="share" element={<SubmitPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export default App
