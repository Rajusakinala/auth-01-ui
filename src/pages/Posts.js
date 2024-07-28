import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import privateAxios from "../auth/services/privateAxios";

const Posts = () => {
  const [publicPosts, setPublicPosts] = useState();
  const [privatePosts, setPrivatePosts] = useState();
  const publicPostsHAndler = () => {
    axios.get("http://localhost:4000/api/v1/posts/public").then((res) => {
      setPublicPosts(res.data);
    });
    //both can work
    // privateAxios.get("/api/v1/posts/public").then((res) => {
    //   setPublicPosts(res.data);
    // });
  };
  const PrivatePostsHandler = () => {
    privateAxios
      .get("/api/v1/posts/private")
      .then((res) => {
        setPrivatePosts(res.data);
        console.log("private post successfull");
      })
      .catch((err) => {
        // setPrivatePosts({
        //   posts: {
        //     title: "accessToken expired",
        //     description: "accessToken expired",
        //   },
        // });

        setPrivatePosts(null);
        console.log("private post failed");
      });
  };
  return (
    <div>
      {/* // Public posts */}
      <Button onClick={publicPostsHAndler}>Public Data</Button>
      <div>
        <div>{publicPosts?.posts.title}</div>
        <div>{publicPosts?.posts.description}</div>
      </div>

      {/* // Private posts */}
      <Button onClick={PrivatePostsHandler}>Private Data</Button>
      <div>
        <div>{privatePosts?.posts.title}</div>
        <div>{privatePosts?.posts.description}</div>
      </div>
    </div>
  );
};

export default Posts;
