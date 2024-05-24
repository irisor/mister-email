import { HashRouter as Router, Routes, Route } from 'react-router-dom'

// import { Home } from './pages/Home'
import { MailIndex } from './pages/MailIndex'
import { Header } from './cmps/Header'
import { Nav } from './cmps/Nav'
import './App.css'

function App() {

  return (
    <Router>
      <section className='main-app'>
        <header className="app-header">
          <section className="container">
            <Header />
          </section>
        </header>

        <div className="app-nav">
          <Nav />
        </div>

        <main className='main'>
          <div className='container'>
            <Routes>
              <Route path="/:filter" element={<MailIndex />} />
            </Routes>
          </div>
        </main>

      </section>
    </Router>
  )
}

export default App
