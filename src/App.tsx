import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import './App.css'

// Your Supabase credentials
const supabaseUrl = 'https://qedrvgccmqovzndkzwqg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlZHJ2Z2NjbXFvdnpuZGt6d3FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNjgwNDYsImV4cCI6MjA5Mzk0NDA0Nn0.2DyS2KF7AK8GG4_k69RQ7JYHrxLhtCkKTGTmgYDa6rs'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (errorMessage) setErrorMessage('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsLoading(true)
    setErrorMessage('')

    try {
      console.log('Sending data to Supabase...')
      
      // Insert into contacts table
      const { data, error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ])

      if (error) {
        console.error('Supabase error:', error)
        
        // Specific error messages
        if (error.code === '42501') {
          throw new Error('Permission denied. Please run: ALTER TABLE contacts DISABLE ROW LEVEL SECURITY; in Supabase SQL editor')
        } else if (error.code === '42P01') {
          throw new Error('Table not found. Please create the contacts table in Supabase')
        } else {
          throw new Error(`Database error: ${error.message}`)
        }
      }

      console.log('Success!', data)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setIsSubmitted(false), 3000)
    } catch (error: any) {
      console.error('Error:', error)
      setErrorMessage(error.message || 'Failed to send message. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCertificateClick = (certificate: any) => {
    setSelectedCertificate(certificate)
  }

  return (
    <div className="portfolio">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">EA</div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero fullscreen">
        <div className="hero-content">
          <div className="avatar">
            <div className="avatar-circle">
              <img 
                src="\public\profile.jpg"
                alt="Edrael Angcon"
                className="profile-img"
              />
            </div>
          </div>
          <h1>Edrael Q. Angcon</h1>
          <p className="title">Frontend Developer & Creative Technologist</p>
          <p className="bio">
            Building modern web experiences with React, TypeScript, and Vite.
            Passionate about creating elegant, performant applications.
          </p>
          <div className="tech-stack">
            <span>React</span>
            <span>TypeScript</span>
            <span>Vite</span>
            <span>Node.js</span>
          </div>
          <a href="#contact" className="cta-button">Get in touch →</a>
        </div>
        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="about">
        <div className="container">
          <h2>About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a passionate frontend developer with a keen eye for design and a love for creating 
                intuitive, user-friendly web applications. My journey in web development started with 
                a curiosity about how websites work, which quickly evolved into a full-blown passion 
                for coding and creating digital experiences.
              </p>
              <p>
                I believe that great software is built with a combination of technical excellence and 
                deep understanding of user needs. I'm constantly learning and exploring new technologies 
                to stay at the forefront of web development.
              </p>
              <div className="personal-details">
                <div className="detail-item">
                  <strong>🎂 Birthday:</strong> January 15, 2000
                </div>
                <div className="detail-item">
                  <strong>📱 Phone:</strong> +63 912 345 6789
                </div>
                <div className="detail-item">
                  <strong>🎓 Education:</strong> BS Information Technology
                </div>
                <div className="detail-item">
                  <strong>🌐 Languages:</strong> English, Filipino, Cebuano
                </div>
              </div>
            </div>
            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-number">3+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">20+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">15+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">∞</div>
                <div className="stat-label">Coffee Cups</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience">
        <div className="container">
          <h2>My Experience</h2>
          
          <div className="experience-timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-date">2024 - 2025</div>
                <h3>IT OJT Intern</h3>
                <h4>Inspiro BPO</h4>
                <p>As an IT OJT intern at Inspiro BPO, I gained hands-on experience providing technical support for internal systems and employee workstations. My responsibilities included troubleshooting hardware and software issues, assisting with network connectivity problems, and helping maintain the IT ticketing system. I also supported data entry and database management tasks while collaborating with the IT team on system updates and maintenance. This experience enhanced my problem-solving skills and deepened my understanding of corporate IT operations.</p>
                <div className="achievement-badges">
                  <span>Technical Support</span>
                  <span>Network Troubleshooting</span>
                  <span>Hardware Maintenance</span>
                  <span>IT Ticketing Systems</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-date">2023 - 2024</div>
                <h3>IT Support OJT</h3>
                <h4>Barangay Office</h4>
                <p>During my IT support OJT at the Barangay office, I provided computer maintenance and technical support for administrative systems. I was responsible for digitizing barangay records, managing resident databases, and setting up computer systems and peripherals. I also helped barangay staff with software troubleshooting and basic computer training. Additionally, I maintained inventory of IT equipment and created digital forms to streamline barangay transactions. This experience taught me the importance of IT in government services and improved my communication skills when working with non-technical users.</p>
                <div className="achievement-badges">
                  <span>IT Support</span>
                  <span>Database Management</span>
                  <span>Computer Maintenance</span>
                  <span>System Configuration</span>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements & Certifications Section */}
          <div className="achievements-section">
            <h3>Achievements & Certifications</h3>
            <div className="achievements-grid">
              <div className="achievement-card" onClick={() => handleCertificateClick({
                title: '100% Client Satisfaction',
                imageUrl: '/public/3cert.png'
              })}>
                <div className="certificate-image-container">
                  <img 
                    src="/public/3cert.png" 
                    alt="React Certified - Meta Frontend Professional Certificate"
                    className="certificate-img"
                  />
                  <div className="certificate-overlay">
                    <span>🔍 View Certificate</span>
                  </div>
                </div>
                <h4>Settings Up Computer Servers</h4>
              
              </div>
              
              <div className="achievement-card" onClick={() => handleCertificateClick({
                title: '100% Client Satisfaction',
                imageUrl: '/public/5cert.png'
              })}>
                <div className="certificate-image-container">
                  <img 
                    src="/public/5cert.png" 
                    alt="100% Client Satisfaction - Across 15+ Projects"
                    className="certificate-img"
                  />
                  <div className="certificate-overlay">
                    <span>🔍 View Certificate</span>
                  </div>
                </div>
                <h4>Responsive Web Design</h4>
              
              </div>

              
              <div className="achievement-card" onClick={() => handleCertificateClick({
                title: '100% Client Satisfaction',
                imageUrl: '/public/2cert.png'
              })}>
                <div className="certificate-image-container">
                  <img 
                    src="/public/2cert.png" 
                    alt="100% Client Satisfaction - Across 15+ Projects"
                    className="certificate-img"
                  />
                  <div className="certificate-overlay">
                    <span>🔍 View Certificate</span>
                  </div>
                </div>
                <h4>Installing and Configuring Computer Systems</h4>
               
              </div>

              
              <div className="achievement-card" onClick={() => handleCertificateClick({
                title: '100% Client Satisfaction',
                imageUrl: '/public/1cert.png'
              })}>
                <div className="certificate-image-container">
                  <img 
                    src="/public/1cert.png" 
                    alt="100% Client Satisfaction - Across 15+ Projects"
                    className="certificate-img"
                  />
                  <div className="certificate-overlay">
                    <span>🔍 View Certificate</span>
                  </div>
                </div>
                <h4>Maintaining Computer Systems and Networks</h4>
                <p>Across 15+ Projects</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2>Featured Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-icon">🎨</div>
              <h3>Design System</h3>
              <p>Component library built with React and Tailwind CSS</p>
              <div className="project-tags">
                <span>React</span>
                <span>Tailwind</span>
                <span>Storybook</span>
              </div>
            </div>
            <div className="project-card">
              <div className="project-icon">📊</div>
              <h3>Analytics Dashboard</h3>
              <p>Real-time data visualization dashboard</p>
              <div className="project-tags">
                <span>Vite</span>
                <span>D3.js</span>
                <span>WebSocket</span>
              </div>
            </div>
            <div className="project-card">
              <div className="project-icon">🛒</div>
              <h3>E-commerce Platform</h3>
              <p>Full-stack shopping experience with modern stack</p>
              <div className="project-tags">
                <span>Next.js</span>
                <span>PostgreSQL</span>
                <span>Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Let's Connect</h2>
          <p className="contact-subtitle">Have a project in mind? I'd love to hear about it.</p>
          
          <div className="contact-wrapper">
            <div className="contact-info">
              <div className="info-item">
                <div className="info-icon">📧</div>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:eqangcon.student@asiancollege.edu.ph">eqangcon.student@asiancollege.edu.ph</a>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div>
                  <h4>Location</h4>
                  <p>Dumaguete, Philippines</p>
                </div>
              </div>
              <div className="social-links">
                <a href="https://github.com/DIT-Eangcon" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.698.83.578C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/edrael.angcon.73" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://instagram.com/edraelangcon" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              {isSubmitted && (
                <div className="success-message">
                  ✓ Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {errorMessage && (
                <div className="error-message">
                  ✗ {errorMessage}
                </div>
              )}
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  disabled={isLoading}
                ></textarea>
              </div>
              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2024 Edrael Q. Angcon. All rights reserved.</p>
      </footer>

      {/* Modal for Certificate Viewing */}
      {selectedCertificate && (
        <div className="modal-overlay" onClick={() => setSelectedCertificate(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCertificate(null)}>×</button>
            <img src={selectedCertificate.imageUrl} alt={selectedCertificate.title} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App