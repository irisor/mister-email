import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import { HomePage } from './pages/HomePage'
import { AboutUs } from './pages/AboutUs'
import { EmailIndex } from './pages/EmailIndex'
import { EmailDetails } from './pages/EmailDetails'

function App() {

  return (
    <Router>
        <main className='main'>
          <div className='container'>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/mail/:folder" element={<EmailIndex />}>
                <Route path="/mail/:folder/:emailId" element={<EmailDetails />} />
              </Route>
            </Routes>
          </div>
        </main>
    </Router>
  )
}

export default App
