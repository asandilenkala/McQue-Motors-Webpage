import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../components/logo.png';

const Profile = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const collectData = async (e) => {
        e.preventDefault(); // Prevent the form from reloading the page
    
        try {
            console.warn(fullname, email, message);
    
            let result = await fetch("http://localhost:5000/clients", {
                method: "POST",
                body: JSON.stringify({ fullname, email, message }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (result.ok) {
                let data = await result.json();
                console.warn(data);
                alert('Message Sent Successfully!');
                navigate('/'); // Redirect the user on success
            } else {
                console.error(`Error: ${result.statusText} (${result.status})`);
                alert(`Failed to send the message: ${result.statusText} (${result.status})`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('An error occurred while sending the message. Please try again.');
        }
    };
    
    
    return (
        <>
            <div className="profile-header">
                <h1>Welcome to MCQUE MOTORS</h1>
            </div>
            <div className="profile-details">
                <div className="aboutImage">
                    <img src={logo} alt="Dealership Logo" className="about-logo" />
                </div>
                <div className="profile-info">
                    <h2>MCQUE MOTORS</h2>
                    <p>DRIVEN BY INTEGRITY, BUILT ON TRUST</p>
                    <div className="profile-contact">
                        <p><strong>Address:</strong> EDIT THIS WENJA!!!!</p>
                        <p><strong>Phone:</strong> 060 129 6879</p>
                        <p><strong>Email:</strong> Sales@mcqueauto.com</p>
                    </div>
                </div>
            </div>
            {/* Contact Section */}
            <div className="contact">
                <h1>Contact Us</h1>
                <form className="contact-form" onSubmit={collectData}>
                    <label htmlFor="name">Full Name:</label>
                    <input className="placeholders" type="text" id="name" placeholder="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)} required />

                    <label htmlFor="email">Email:</label>
                    <input className="placeholders" type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <label htmlFor="message">Message:</label>
                    <textarea className="placeholders" id="message" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>

                    <button className='submitButton' type="submit">Submit</button>
                </form>
            </div>
        </>
    );
};

export default Profile;
