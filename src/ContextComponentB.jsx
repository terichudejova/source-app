import { useContext } from "react";
import { ApiContext } from "./context/ApiContext";


export default function ContextComponentA() {

    const { value } = useContext(ApiContext);

    return (
        <div className="component">
            <p>Component A age: {value.age}</p>
            {value.isOnline ?
            <p>Component A status: Online</p>
            :
            <p>Component A status: Offline</p>}
        </div>
    )
}