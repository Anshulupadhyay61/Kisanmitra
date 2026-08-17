import { useState } from 'react'

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

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setLoading(true)
    setResult('')

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

      setResult(data.message)
    } catch (error) {
      console.error(error)
      setResult('❌ Backend connection failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="recommendation-page">
      <h1>Crop Recommendation 🌱</h1>

      <p>Enter your farm details to get a crop recommendation.</p>

      <form
        className="recommendation-form"
        onSubmit={handleSubmit}
      >
        <input
          name="nitrogen"
          type="number"
          placeholder="Nitrogen (N)"
          value={formData.nitrogen}
          onChange={handleChange}
          required
        />

        <input
          name="phosphorus"
          type="number"
          placeholder="Phosphorus (P)"
          value={formData.phosphorus}
          onChange={handleChange}
          required
        />

        <input
          name="potassium"
          type="number"
          placeholder="Potassium (K)"
          value={formData.potassium}
          onChange={handleChange}
          required
        />

        <input
          name="temperature"
          type="number"
          placeholder="Temperature (°C)"
          value={formData.temperature}
          onChange={handleChange}
          required
        />

        <input
          name="humidity"
          type="number"
          placeholder="Humidity (%)"
          value={formData.humidity}
          onChange={handleChange}
          required
        />

        <input
          name="ph"
          type="number"
          placeholder="Soil pH"
          value={formData.ph}
          onChange={handleChange}
          required
        />

        <input
          name="rainfall"
          type="number"
          placeholder="Rainfall (mm)"
          value={formData.rainfall}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Get Recommendation 🌾'}
        </button>
      </form>

      {result && (
        <div className="result">
          <h2>{result}</h2>
        </div>
      )}
    </div>
  )
}

export default Recommendation