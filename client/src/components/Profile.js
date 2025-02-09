import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../components/logo.png';

const Home = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const contactRef = useRef(null); // Reference for the Contact Section

    const collectData = async (e) => {
        e.preventDefault(); 
    
        try {
            let result = await fetch("http://localhost:5000/clients", {
                method: "POST",
                body: JSON.stringify({ fullname, email, message }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (result.ok) {
                alert('Message Sent Successfully!');
                navigate('/');
            } else {
                alert(`Failed to send the message: ${result.statusText}`);
            }
        } catch (error) {
            alert('An error occurred while sending the message. Please try again.');
        }
    };

    const scrollToContact = () => {
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="home-container">
            {/* Hero Section */}
            <header className="hero-section">
                <div className="overlay">
                    <h1>Welcome to <span>MCQUE MOTORS</span></h1>
                    <p>Driven by Integrity, Built on Trust</p>
                    <button onClick={scrollToContact} className="cta-button">Contact Us</button>
                </div>
            </header>

            {/* About Section */}
            <section className="about-section">
                <div className="section-content">
                    <img src={logo} alt="Dealership Logo" className="about-logo" />
                    <div className="about-text">
                        <h2>MCQUE MOTORS</h2>
                        <pp>We offer top-quality vehicles and exceptional customer service. Whether you're looking for a brand-new car or a pre-owned one, we have the perfect vehicle for you.</pp>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section ref={contactRef} className="contact-section">
                <h2>Contact Us</h2>
                <p>Have a question? Reach out to us and we’ll be happy to assist!</p>
                <form className="contact-form" onSubmit={collectData}>
                    <input type="text" placeholder="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                    <button className='submitButton' type="submit">Send Message</button>
                </form>
            </section>
        </div>
    );
};

export default Home;
