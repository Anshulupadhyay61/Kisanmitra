import './App.css'
import Navbar from './components/Navbar'
import Recommendation from './pages/Recommendation'

function App() {
  return (
    <>
      <Navbar />

      <main>
        <section id="home" className="hero">
          <div className="hero-content">
            <p className="tagline">
              AI-Powered Farming Intelligence
            </p>

            <h1>
              Smart Farming,
              <br />
              <span>Better Future.</span>
            </h1>

            <p className="hero-text">
              Kisanmitra helps farmers make smarter crop decisions
              using Artificial Intelligence, soil data and weather insights.
            </p>

            <a href="#recommendation">
              <button className="hero-btn">
                Get Crop Recommendation →
              </button>
            </a>
          </div>

          <div className="hero-card">
            🌾
            <h2>AI Crop Recommendation</h2>
            <p>
              Make data-driven farming decisions.
            </p>
          </div>
        </section>

        <section id="recommendation" className="section">
          <Recommendation />
        </section>

        <section id="features" className="section">
          <h2>Our Features</h2>

          <div className="features">
            <div className="feature-card">
              🌱
              <h3>Crop Recommendation</h3>
              <p>AI-based crop suggestions for your farm.</p>
            </div>

            <div className="feature-card">
              🌦️
              <h3>Weather Intelligence</h3>
              <p>Use weather insights for better decisions.</p>
            </div>

            <div className="feature-card">
              📊
              <h3>Farm Analytics</h3>
              <p>Understand your farm data easily.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default App