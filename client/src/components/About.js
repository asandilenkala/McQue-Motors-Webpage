import React from 'react';
import logo from '../components/logo.png';

const About = () => {
    return (
        <>
            <div className="about-page">
                <div className="aboutImage">
                    <img src={logo} alt="Dealership Logo" className="about-logo" />
                </div>

                <div className="about-content">
                    <div className="about-us">
                        <h2>About Us</h2>
                        <p>Welcome to our car dealership! We offer a wide selection of vehicles for both sale and rental. Our mission is to provide you with the best cars at the most affordable prices.</p>
                        <ul>
                            <li>At <strong>McQue Motors</strong>, we're dedicated to providing an exceptional car-buying experience grounded in integrity and quality.</li>
                            <li>We offer a range of high-quality new and used cars, priced to fit various budgets.</li>
                            <li>Our streamlined sales process includes straightforward trade-in options and transparent finance arrangements.</li>
                            <li>We build lasting relationships with customers who value quality, affordability, and exceptional service.</li>
                        </ul>
                    </div>

                    <div className="vision">
                        <h2>Our Vision</h2>
                        <p>To be the premier choice for car buyers in Gauteng, known for our commitment to quality, affordability, and exceptional service.</p>
                    </div>

                    <div className="why-us">
                        <h2>Why Choose Us?</h2>
                        <ul>
                            <li><strong>Top-Quality Vehicles:</strong> Diverse selection of high-quality cars, rigorously inspected.</li>
                            <li><strong>Exceptional Customer Service:</strong> Friendly, transparent, and efficient experience.</li>
                            <li><strong>Affordable Prices:</strong> Competitive pricing that makes owning a great car within reach.</li>
                            <li><strong>Trusted Integrity:</strong> Building trust through honesty and commitment.</li>
                            <li><strong>Future Growth:</strong> Dedicated to continually improving our services.</li>
                        </ul>
                    </div>

                    <div className="mission">
                        <h2>Our Mission</h2>
                        <p>To deliver exceptional vehicles and service while maintaining the highest standards of integrity.</p>
                    </div>
                </div>

                <h3 className="location-header">Our Location</h3>
                <div className="map-container">
                    <iframe
                        title="dealership-map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.130968795787!2d144.96315781531635!3d-37.81421797975198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43e0e1f4a3%3A0x5045675218ce540!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1615851854247!5m2!1sen!2sus"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </>
    );
};

export default About;
