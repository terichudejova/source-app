import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { v4 as uuid} from "uuid";
import axios from "axios";

export default function LocalApi() {

    const API_URL = "http://localhost:3500/posts";
    const [fetchError, setFetchError] = useState(null);
    const [posts, setPosts] = useState([]);
    const [newTitle, setNewTitle] = useState("")
    const [newBody, setNewBody] = useState("");

    //both fetch and axios versions shown

    // const fetchPosts = async () => {
    //     try {
    //         const response = await fetch(API_URL);
    //         if (!response.ok) throw Error("Data could not load.");
    //         const data = await response.json();
    //         setPosts(data);
    //         setFetchError(null);
    //     } catch (err) {
    //         setFetchError(err.message);
    //     }
    // };

    const fetchPosts = async () => {
        try {
            const response = await axios.get(API_URL);
            setPosts(response.data);
            setFetchError(null);
        } catch (err) {
            setFetchError(err.message);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [])
   
    // const deletePost = async (id) => {
    //     const deleteOption = { method: "DELETE" };
    //     const reqUrl = `${API_URL}/${id}`;

    //     try {
    //         const response = await fetch(reqUrl, deleteOption);
    //         if (!response.ok) throw Error("Error while deleting the data.");
    //         fetchPosts();
    //     } catch (err) {
    //         console.log(err.message);
    //     }
    // };

    const deletePost = async (id) => {
        const reqUrl = `${API_URL}/${id}`;

        try {
            const response = await axios.delete(reqUrl);
            //případně jen await axios.delete(reqUrl); , protože s response už dále nepracujeme
            fetchPosts();
        } catch (err) {
            console.log(err.message);
        }
    };

    // const addPost = async () => {
    //     const newPost = {id: uuid(), title: newTitle, body: newBody};
    //     const postOption = {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(newPost)
    //     };

    //     try {
    //         const response = await fetch(API_URL, postOption);
    //         if (!response.ok) throw Error("Error while posting the data.")
    //         fetchPosts();
    //         setNewBody("");
    //         setNewTitle("");
    //     } catch (err) {
    //         console.log(err.message);
    //     }
    // };

    const addPost = async () => {
        const newPost = {id: uuid(), title: newTitle, body: newBody};

        try {
            const response = await axios.post(API_URL, newPost);
            // opět bychom mohli použít jen await axios.post(API_URL, newPost);
            fetchPosts();
            setNewBody("");
            setNewTitle("");
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className="outerBox">
            <div className="innerBox">  
                <h1>API posts</h1>
                <p>If you run <span>npx json-server --watch data/db.json --port 3500</span>, you can create posts that will be saved to the db.json file. By clicking on the post title, you can view the full post and its content. Posts can also be edited.</p>
                <div className="posts">
                    {fetchError ?
                    <p style={{color: "red"}}>Error. Could not load any data.</p>
                    :
                    posts.length > 0 ?
                        posts.slice().reverse().map(post => {
                            return (
                                <div key={post.id} className="post">
                                    <NavLink to={`/source-app/api/${post.id}`} className="linkToPost"><h4>{post.title}</h4></NavLink>
                                    {post.body.length > 40 ?
                                    <p>{post.body.slice(0, 40)}...</p>
                                    :
                                    <p>{post.body}</p>
                                    }
                                    <button onClick={() => deletePost(post.id)}>Delete</button>
                                </div> 
                            )
                        })
                        :
                        <p>No posts yet.</p>
                    }
                </div>
                <div className="newPost">
                    <div className="formularWindow">
                        <label htmlFor="title">Title:</label>
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
                        <label htmlFor="body">Post:</label>
                        <textarea
                            id="body"
                            name="body"
                            value={newBody}
                            onChange={(e) => setNewBody(e.target.value)}
                            className="textArea"
                        />
                    </div>
                    <button onClick={addPost}>Add Post</button>
                </div>
            </div>
        </div>
    )
}