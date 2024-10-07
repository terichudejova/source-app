
//both fetch and axios are shown
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditPost() {

    const { id } = useParams();
    const navigate = useNavigate();

    const API_URL = `http://localhost:3500/posts/${id}`;

    const [fetchError, setFetchError] = useState(null);
    const [newTitle, setNewTitle] = useState("");
    const [newBody, setNewBody] = useState("");

    // const fetchPost = async () => {
    //     try {
    //         const response = await fetch(API_URL);
    //         if (!response.ok) throw Error("Could not load any data.");
    //         const data = await response.json();
    //         setNewTitle(data.title);
    //         setNewBody(data.body);
    //         setFetchError(null);
    //     } catch (err) {
    //         setFetchError(err.message);
    //     }
    // };

    const fetchPost = async () => {
        try {
            const response = await axios.get(API_URL);
            setNewTitle(response.data.title);
            setNewBody(response.data.body);
            setFetchError(null);
        } catch (err) {
            setFetchError(err.message);
        }
    };

    useEffect(() => {
        fetchPost();
    }, []);


    // const savePost = async () => {
    //     const newPost = {id: id, title: newTitle, body: newBody};

    //     const patchOption = {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(newPost)
    //     };

    //     try {
    //         const response = await fetch(API_URL, patchOption);
    //         if (!response.ok) throw Error("Could not save the data.");
    //         navigate(-2);
    //     } catch (err) {
    //         console.log(err.message);
    //     }
    // }

    const savePost = async () => {
        const newPost = {id: id, title: newTitle, body: newBody};

        try {
            const response = await axios.patch(API_URL, newPost);
            navigate(-2);
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className="outerBox">
            <div className="innerBox">
                <div className="individualPost">
                    <div className="formularWindow">
                        <label htmlFor="title" className="label">Title:</label>
                        <input
                                id="title"
                                name="title"
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className="inputStyle"
                        />   
                    </div>
                    <div className="formularWindow">
                        <label htmlFor="body" className="label">Post:</label>
                        <textarea
                            id="body"
                            name="body"
                            value={newBody}
                            onChange={(e) => setNewBody(e.target.value)}
                            className="textArea"
                        />
                    </div>
                    <button onClick={savePost}>Save</button>
                </div>
            </div>
        </div>
    )
}