import React, { Component } from 'react';
import '../App.css';
export default class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render(){

        let WithoutLogin = (
            <>
                <div className="Top-Bar">
                    <div className="Todoist-Logo" />
                
                    <div className="Login-Buttons">
                        <ul id="Login-Menu">
                            <li><a href="https://www.google.com"> How It Works </a></li>
                            <li><a href="https://www.google.com"> Templates</a></li>
                            <li><a href="https://www.google.com"> Premium </a></li>
                            <li><a href="https://www.google.com"> Business </a></li>   
                            {/* <li><a href="/auth/todoist">Log in</a></li>
                            <li><a href="/auth/todoist">Sign up</a></li> */}
                            <li><a href="http://localhost:4000/auth/todoist">Log in</a></li>
                            <li><a href="http://localhost:4000/auth/todoist">Sign up</a></li>
                        </ul>
                    </div>    
                </div>

                <section className="First-Section">
                    <div className="First-Section-1">
                        <p className="First-Section-1-Heading">
                            <span className="First-Section-1-Heading-1">Organize life</span><br/>
                            <span id="First-Section-1-Heading-2">Then go enjoy it...</span>
                        </p>

                        <p className="First-Section-1-Text">
                            Life can feel overwhelming, but it doesn’t have to. Todoist lets you keep track of everything in one place, so you can get it all done and enjoy more peace of mind along the way.
                        </p>

                        <button id="get-started" onClick={() => this.setmodalSignupVisible(true)}>Get Started - It's Free</button>
                        <p id="wondering">Wondering how it works? <span id="watch-video">Watch a video</span></p>
                    </div>
                    
                    <div className="First-Section-2">
                
                    </div>
                </section>
            </>
        );
        return (
            <>  
                {WithoutLogin}
            
            </>
        );
    }
}