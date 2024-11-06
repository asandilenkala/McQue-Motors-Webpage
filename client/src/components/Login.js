import React, { useState } from "react";
import * as Components from './Components';

function Login() {
    // State to toggle between Sign In and Sign Up forms
    const [isSignIn, setIsSignIn] = useState(true);

    return (
        <Components.Container>
            {/* Sign Up Form */}
            <Components.SignUpContainer signinIn={isSignIn}>
                <Components.Form>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type="text" placeholder="Name" />
                    <Components.Input type="email" placeholder="Email" />
                    <Components.Input type="password" placeholder="Password" />
                    <Components.Button>Sign Up</Components.Button>
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

export default Login;
