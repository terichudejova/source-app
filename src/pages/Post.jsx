//both fetch and axios are shown

import { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";



export default function Post() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    const API_URL = `http://localhost:3500/posts/${id}`;

    // const fetchPost = async () => {
    //     try {
    //         const response = await fetch(API_URL);
    //         if (!response.ok) throw Error("Could not load any data.");
    //         const data = await response.json();
    //         setFetchError(null);
    //         setPost(data);
    //         console.log(data);
    //     } catch (err) {
    //         setFetchError(err.message);
    //     }
    // }

    const fetchPost = async () => {
        try {
            const response = await axios.get(API_URL);
            setFetchError(null);
            setPost(response.data);
        } catch (err) {
            setFetchError(err.message);
        }
    }

    useEffect(() => {
        fetchPost();
    }, [])

    return (
        <div className="outerBox">
            <div className="innerBox">
                <p className="back" onClick={() => navigate(-1)}>&lt; Back</p>
                <div className="individualPost">
                    {post && 
                        <div>
                            <h4>{post.title}</h4>
                            <p>{post.body}</p>
                            <NavLink to={`/source-app/api/${post.id}/edit`} className="linkToPost"><button>Edit post</button></NavLink>
                        </div>
                    }
                    {fetchError && <p>Could not load any post.</p>}
                </div>
            </div>
        </div>
        
        
    )
}