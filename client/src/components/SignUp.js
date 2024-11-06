import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Components from './Components';


const SignUp = () => {
    const [isSignIn, setIsSignIn] = useState(true); // State to toggle sign-in and sign-up
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const collectData = async () => {
        try {
            console.warn(name, email, password);

            let result = await fetch("http://localhost:5000/register", {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (result.ok) {
                let data = await result.json();
                console.warn(data);
                localStorage.setItem("user", JSON.stringify(data));
                navigate('/');
            } else {
                console.error(`Error: ${result.statusText} (${result.status})`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    return (
        <Components.Container>
            {/* Sign Up Form */}
            <Components.SignUpContainer signinIn={isSignIn}>
                <Components.Form>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <Components.Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Components.Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Components.Button onClick={collectData} className='registerButton' type='button'>Sign Up</Components.Button>
                </Components.Form>
            </Components.SignUpContainer>

            {/* Sign In Form */}
            <Components.SignInContainer signinIn={isSignIn}>
                <Components.Form>
                    <Components.Title>Sign In</Components.Title>
                    <Components.Input type="email" placeholder="Email" />
                    <Components.Input type="password" placeholder="Password" />
                    <Components.Anchor href="#">Forgot your password?</Components.Anchor>
                    <Components.Button>Sign In</Components.Button>
                </Components.Form>
            </Components.SignInContainer>

            {/* Overlay for toggling between Sign In and Sign Up */}
            <Components.OverlayContainer signinIn={isSignIn}>
                <Components.Overlay signinIn={isSignIn}>
                    {/* Left Panel for Sign In */}
                    <Components.LeftOverlayPanel signinIn={isSignIn}>
                        <Components.Title>Welcome Back!</Components.Title>
                        <Components.Paragraph>
                            To keep connected with us please login with your personal info
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => setIsSignIn(true)}>
                            Sign In
                        </Components.GhostButton>
                    </Components.LeftOverlayPanel>

                    {/* Right Panel for Sign Up */}
                    <Components.RightOverlayPanel signinIn={isSignIn}>
                        <Components.Title>Hello, Friend!</Components.Title>
                        <Components.Paragraph>
                            Enter your personal details and start your journey with us
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => setIsSignIn(false)}>
                            Sign Up
                        </Components.GhostButton>
                    </Components.RightOverlayPanel>
                </Components.Overlay>
            </Components.OverlayContainer>
        </Components.Container>
    );
}

export default SignUp;
