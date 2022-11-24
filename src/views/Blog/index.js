import "./style.scss";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "components/NavBar";
import Post from "components/Post";
import LoginModal from "components/LoginModal";
import BlogBanner from "components/BlogBanner";

import retrieve from "utils/retrieve";

import isLoggedIn from "utils/isLoggedIn";

import NewPostModal from "components/NewPostModal";
import { useLocation } from "react-router-dom";
function Blog() {
  const navigate = useNavigate();

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const location = useLocation().pathname.substring(1);
  const name = location.split("-")[0];

  const [loggedIn, setLoggedIn] = useState(false);
  const [loginToken, setLoginToken] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    retrieve("blog/" + location, 'GET').then((data) => {
        if (data.success) {
          setPosts(data.posts);
        } else {
          navigate('/404');
        }
      })
      .catch((e) => console.log(e));

    isLoggedIn().then((status) => {

      if(status.loggedIn && status.blogAddress == location){
        setLoggedIn(true);
        setLoginToken(status.token);
      } else {
        setLoggedIn(false);
      }

    });
  }, [location]);

  return (
    <>
      <NavBar
        buttons={
          !loggedIn && <div className="nav-item v-center">
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
        blogAddress={location}
        closeHandler={() => {
          setLoginModalOpen(false);
        }}
      ></LoginModal>

      <div className="posts-container">

        { loggedIn && <div
          className="btn no-effect"
          onClick={() => {
            setNewPostModalOpen(true);
          }}
        >
          Add post
        </div>}


        {posts?.map((item, index) => {
          return (
            <Post
              key={index}
              title={item.title}
              creationDate={item.creation_date.slice(0, 10)}
              content={item.content}
              canEdit={loggedIn}
            ></Post>
          );
        })}
      </div>
    </>
  );
}

export default Blog;
