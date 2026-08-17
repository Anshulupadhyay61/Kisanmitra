function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        🌾 Kisanmitra
      </div>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#features">Features</a>
        <a href="#contact">Contact</a>
      </div>

      <button className="login-btn">
        Get Started
      </button>
    </nav>
  )
}

export default Navbar