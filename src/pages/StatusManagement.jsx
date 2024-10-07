import { ApiProvider } from "../context/ApiContext";
import ContextComponentA from "../ContextComponentA";
import ContextComponentB from "../ContextComponentB";
import ContextComponentC from "../ContextComponentC";


export default function StatusManagement() {

    return (
        <ApiProvider>
            <div className="outerBox">
                <div className="innerBox">
                    <h2>Status Management</h2>
                    <p>This page demonstrates passing values from UseState to other components using <span>State Management</span>.</p>
                    <p>Component A</p>
                    <ContextComponentA />
                    <p>Component B</p>
                    <ContextComponentB />
                    <p>Component C</p>
                    <ContextComponentC />
                </div>
            </div>
        </ApiProvider>
    )
}