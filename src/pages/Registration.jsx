import FormularComponent from "../FormularComponent";

export default function Registration() {
    return (
        <div className="outerBox">
            <div className="innerBox">  
                <h2>Registration</h2>
                <p>The first form submits data to <span>Google Forms</span> using <span>await fetch</span>. The second form <span>validates the username and password</span> and sends the data to the file data/registration.json (port 4000) using <span>await axios</span>.</p>
                <div className="formular">
                    <FormularComponent />
                </div>
            </div>
        </div>
    )
}