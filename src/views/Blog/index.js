import "./style.scss";

import { useState, useEffect } from "react";

import NavBar from "components/NavBar";
import Post from "components/Post";
import LoginModal from "components/LoginModal";
import BlogBanner from "components/BlogBanner";

import NewPostModal from "components/NewPostModal";
import { useLocation } from "react-router-dom";
function Blog() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const location = useLocation().pathname.substring(1);
  const [name, setName] = useState()

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("http://localhost:5001/blog/" + location)
      .then((res) => res.json())
      .then((data) => {
        setName(data.blogTitle)
        setPosts(data.posts)
      })
      .catch((e) => console.log(e));
  }, [location]);

  return (
    <>
      <NavBar
        buttons={
          <div className="nav-item v-center">
            <div
              className="btn create-blog-btn"
              onClick={() => {
                setLoginModalOpen(true);
              }}
            >
              Login
            </div>
          </div>
        }
      ></NavBar>

      <NewPostModal
        open={newPostModalOpen}
        closeHandler={() => {
          setNewPostModalOpen(false);
        }}
      ></NewPostModal>

      <BlogBanner name={name + " blog"}></BlogBanner>

      <LoginModal
        open={loginModalOpen}
        closeHandler={() => {
          setLoginModalOpen(false);
        }}
      ></LoginModal>

      <div className="posts-container">
        <div
          className="btn no-effect"
          onClick={() => {
            setNewPostModalOpen(true);
          }}
        >
          Add post
        </div>

        {posts?.map((item, index) => {
          return (
            <Post
              key={index}
              title={item.title}
              creationDate={item.creation_date.slice(0, 10)}
              content={item.content}
              canEdit={true}
            ></Post>
          );
        })}
      </div>
    </>
  );
}

export default Blog;
