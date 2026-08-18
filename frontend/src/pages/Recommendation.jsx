import { useEffect, useState } from 'react'

const analysisSteps = [
  { icon: '🌱', text: 'Analyzing Soil' },
  { icon: '🌤️', text: 'Analyzing Climate' },
  { icon: '🤖', text: 'AI Processing' },
]

function Recommendation() {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
  })

  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [analysisStep, setAnalysisStep] = useState(0)

  useEffect(() => {
    if (!loading) return

    const timer = setInterval(() => {
      setAnalysisStep((step) =>
        step < analysisSteps.length - 1 ? step + 1 : step
      )
    }, 800)

    return () => clearInterval(timer)
  }, [loading])

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setLoading(true)
    setError('')
    setResult('')
    setAnalysisStep(0)

    try {
      
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nitrogen: Number(formData.nitrogen),
          phosphorus: Number(formData.phosphorus),
          potassium: Number(formData.potassium),
          temperature: Number(formData.temperature),
          humidity: Number(formData.humidity),
          ph: Number(formData.ph),
          rainfall: Number(formData.rainfall),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Something went wrong')
      }

      setAnalysisStep(analysisSteps.length)
      setResult(data.message)
    } catch (err) {
      console.error(err)
      setError(
        'We could not connect to the recommendation service. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="recommendation-page">

      {/* HEADER */}
      <section className="recommendation-header">
        <span className="recommendation-badge">
          ✨ AI-POWERED FARM INTELLIGENCE
        </span>

        <h1>
          Make the right crop decision
          <span> with AI.</span>
        </h1>

        <p>
          Enter your farm conditions and let Kisanmitra analyze
          soil, climate and rainfall information.
        </p>
      </section>

      {/* FORM */}
      <form className="recommendation-form" onSubmit={handleSubmit}>

        {/* SOIL */}
        <section className="input-card">
          <div className="card-heading">
            <div className="card-icon soil-icon">🌱</div>

            <div>
              <h2>Soil Nutrients</h2>
              <p>Tell us about your soil composition</p>
            </div>
          </div>

          <div className="input-grid">

            <div className="field">
              <label htmlFor="nitrogen">Nitrogen</label>

              <div className="input-wrapper">
                <span>🧪</span>

                <input
                  id="nitrogen"
                  name="nitrogen"
                  type="number"
                  placeholder="e.g. 90"
                  value={formData.nitrogen}
                  onChange={handleChange}
                  required
                />

                <small>mg/kg</small>
              </div>
            </div>

            <div className="field">
              <label htmlFor="phosphorus">Phosphorus</label>

              <div className="input-wrapper">
                <span>🧪</span>

                <input
                  id="phosphorus"
                  name="phosphorus"
                  type="number"
                  placeholder="e.g. 42"
                  value={formData.phosphorus}
                  onChange={handleChange}
                  required
                />

                <small>mg/kg</small>
              </div>
            </div>

            <div className="field">
              <label htmlFor="potassium">Potassium</label>

              <div className="input-wrapper">
                <span>🧪</span>

                <input
                  id="potassium"
                  name="potassium"
                  type="number"
                  placeholder="e.g. 43"
                  value={formData.potassium}
                  onChange={handleChange}
                  required
                />

                <small>mg/kg</small>
              </div>
            </div>

            <div className="field">
              <label htmlFor="ph">Soil pH</label>

              <div className="input-wrapper">
                <span>⚗️</span>

                <input
                  id="ph"
                  name="ph"
                  type="number"
                  step="0.1"
                  min="0"
                  max="14"
                  placeholder="e.g. 6.5"
                  value={formData.ph}
                  onChange={handleChange}
                  required
                />

                <small>pH</small>
              </div>
            </div>

          </div>
        </section>

        {/* CLIMATE */}
        <section className="input-card">
          <div className="card-heading">
            <div className="card-icon climate-icon">🌤️</div>

            <div>
              <h2>Climate Conditions</h2>
              <p>Current environmental conditions</p>
            </div>
          </div>

          <div className="input-grid">

            <div className="field">
              <label htmlFor="temperature">Temperature</label>

              <div className="input-wrapper">
                <span>🌡️</span>

                <input
                  id="temperature"
                  name="temperature"
                  type="number"
                  step="0.1"
                  placeholder="e.g. 25"
                  value={formData.temperature}
                  onChange={handleChange}
                  required
                />

                <small>°C</small>
              </div>
            </div>

            <div className="field">
              <label htmlFor="humidity">Humidity</label>

              <div className="input-wrapper">
                <span>💧</span>

                <input
                  id="humidity"
                  name="humidity"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  placeholder="e.g. 80"
                  value={formData.humidity}
                  onChange={handleChange}
                  required
                />

                <small>%</small>
              </div>
            </div>

          </div>
        </section>

        {/* RAIN */}
        <section className="input-card">
          <div className="card-heading">
            <div className="card-icon rain-icon">🌧️</div>

            <div>
              <h2>Rainfall</h2>
              <p>Available rainfall in your farming area</p>
            </div>
          </div>

          <div className="input-grid single-input">

            <div className="field">
              <label htmlFor="rainfall">Rainfall</label>

              <div className="input-wrapper">
                <span>🌧️</span>

                <input
                  id="rainfall"
                  name="rainfall"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="e.g. 200"
                  value={formData.rainfall}
                  onChange={handleChange}
                  required
                />

                <small>mm</small>
              </div>
            </div>

          </div>
        </section>

        {/* BUTTON */}
        <button
          className="analyze-button"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="button-spinner"></span>
              Analyzing your farm...
            </>
          ) : (
            <>
              Analyze My Farm
              <span>→</span>
            </>
          )}
        </button>

      </form>

      {/* AI LOADING */}
      {loading && (
        <section className="analysis-card">

          <div className="analysis-header">
            <div className="ai-pulse">🤖</div>

            <div>
              <h2>Kisanmitra AI is analyzing</h2>
              <p>Processing your farm information...</p>
            </div>
          </div>

          <div className="analysis-steps">

            {analysisSteps.map((step, index) => {

              const completed = analysisStep > index
              const active = analysisStep === index

              return (
                <div
                  key={step.text}
                  className={`analysis-step ${
                    completed ? 'completed' : ''
                  } ${active ? 'active' : ''}`}
                >

                  <div className="step-icon">
                    {completed ? '✓' : step.icon}
                  </div>

                  <span>{step.text}</span>

                  {active && (
                    <span className="step-loading">
                      •••
                    </span>
                  )}

                </div>
              )
            })}

          </div>

        </section>
      )}

      {/* SUCCESS RESULT */}
      {!loading && result && !error && (
        <section className="result-card">

          <div className="result-top">

            <div className="result-check">
              ✓
            </div>

            <div>
              <span className="result-label">
                AI RECOMMENDATION
              </span>

              <h2>
                Recommended Crop
              </h2>
            </div>

          </div>

          <div className="recommendation-result">

            <span className="crop-icon">
              🌾
            </span>

            <h3>
              {result}
            </h3>

          </div>

          <div className="result-explanation">

            <h4>
              Recommendation basis
            </h4>

            <div className="reason">
              <span>✓</span>

              <p>
                The recommendation is based on the farm
                parameters submitted above.
              </p>
            </div>

            <div className="reason">
              <span>✓</span>

              <p>
                Soil nutrient information was included in
                the analysis.
              </p>
            </div>

            <div className="reason">
              <span>✓</span>

              <p>
                Climate and rainfall conditions were included
                in the model input.
              </p>
            </div>

          </div>

        </section>
      )}

      {/* ERROR */}
      {!loading && error && (
        <section className="error-card">

          <div className="error-icon">
            ⚠️
          </div>

          <div>
            <h2>
              Recommendation unavailable
            </h2>

            <p>
              {error}
            </p>
          </div>

          <button
            type="button"
            className="retry-button"
            onClick={() => setError('')}
          >
            Try Again
          </button>

        </section>
      )}

    </main>
  )
}

export default Recommendation