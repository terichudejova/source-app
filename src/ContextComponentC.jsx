import { useCallback, useContext } from "react";
import { ApiContext } from "./context/ApiContext";


export default function ContextComponentA() {

    const { value, setValue } = useContext(ApiContext);

    const toggleStatus = useCallback(() => {
        const valueCopy = {...value, isOnline: !value.isOnline};
        setValue(valueCopy);
    }, [value])

    const increaseAge = useCallback(() => {
        if (value.age < 100) {
            const increasedAge = value.age + 1;
            const valueCopy = {...value, age: increasedAge};
            setValue(valueCopy);
        } 
    }, [value.age])

    const decreaseAge = useCallback(() => {
        if (value.age > 0) {
            const decreasedAge = value.age - 1;
            const valueCopy = {...value, age: decreasedAge};
            setValue(valueCopy);
        }
    }, [value.age])

    return (
        <div className="component">
            <button onClick={toggleStatus}>Change status</button>
            {value.isOnline ? <p>Online</p> : <p>Offline</p>}
            <button onClick={increaseAge}>Age +1</button>
            <button onClick={decreaseAge}>Age -1</button>
            <p>{value.age}</p>
        </div>
    )
}