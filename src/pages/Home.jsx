export default function Home() {
    return (
        <div className="outerBox">
            <div className="innerBox">  
                <p>
                    This page does not focus on graphic design but showcases various functionalities of components, React hooks, routing, and more. For more information about the page, check out my <a href="https://www.linkedin.com/in/tereza-chud%C4%9Bjov%C3%A1-b41986180/" target="_blank">LinkedIn account</a> or the source code on <a href="https://github.com/terichudejova/source-app" target="_blank">GitHub</a>.<br/><br/>
                    If you're interested in my work on complex websites, including design, please check out <a href="https://www.terezachudejova.cz/" target="_blank">my portfolio</a>.<br/><br/>
                    The database for the API is running at: npx json-server --watch data/db.json --port 3500.<br/><br/>
                    The registration form is available at: npx json-server --watch src/data/registration.json --port 4000.
                </p>
            </div>
        </div>
    )
}