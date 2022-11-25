import "./style.scss";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import HomeBanner from "components/HomeBanner";
import NavBar from "components/NavBar";
import PostPreview from "components/PostPreview";
import TopBlogItem from "components/TopBlogItem";
import NewBlogModal from "components/NewBlogModal";

import isLoggedIn from "utils/isLoggedIn";

function Home() {
  const [newBlogModalOpen, setNewBlogModalOpen] = useState(false);
  const [signedInAddress, setSignedInAddress] = useState("")
  const [signedInButtonVisible, setSignedInButtonVisible] = useState("none")
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0,0)
    isLoggedIn().then((status) => {
      if (status.loggedIn) {
          setSignedInAddress(status.blogAddress)
          setSignedInButtonVisible("block")
      }
    });
  })

  return (
    <>
      <NavBar
        buttons={
          <div className="nav-item v-center-horizontal">
            <div
              className="btn create-blog-btn"
              onClick={() => {
                setNewBlogModalOpen(true);
              }}
            >
              Create blog
            </div>
            <div
              className="btn create-blog-btn"
                onClick={() => {
                  navigate("/all-blogs")
                }}
              >
                View All Blogs
              </div>
            <div
              className="btn create-blog-btn"
              style={{
                display: signedInButtonVisible,
                backgroundColor: "#FFFFFF",
                color: "#1A1919",
                fontWeight: "400"
              }}
                onClick={() => {
                  navigate(`/${signedInAddress}`)
                }}
              >
                Signed In
              </div>
          </div>
        }
      ></NavBar>

      <HomeBanner></HomeBanner>

      <NewBlogModal
        open={newBlogModalOpen}
        closeHandler={() => {
          setNewBlogModalOpen(false);
        }}
      ></NewBlogModal>

      <div className="main">
        <div className="flex">
          <div className="latest-posts-container">
            <h4>Latest posts</h4>

            <PostPreview
              clickHandler={() => {
                navigate("/bobs-blog");
              }}
              blogName="Bob's blog"
              title="This post is cool on epic proportions"
              creationDate="23 Nov"
              content="On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
            ></PostPreview>

            <PostPreview
              clickHandler={() => {
                navigate("/janes-blog");
              }}
              blogName="Jane's blog"
              title="This post should be read by everyone immediately"
              creationDate="6 Jul, 2021"
              content="There are seconds, they come only five or six at a time, and you suddenly feel the presence of eternal harmony, fully achieved. It is nothing earthly; not that it's heavenly, but man cannot endure it in his earthly state. One must change physically or die. The feeling is clear and indisputable. As if you suddenly sense the whole of nature and suddenly say: yes, this is true. God, when he was creating the world, said at the end of each day of creation: 'Yes, this is true, this is good.' This . . . this is not tenderheartedness, but simply joy. You don't forgive anything, because there is no longer anything to forgive. You don't really love — oh, what is here is higher than love! What's most frightening is that it's so terribly clear, and there's such joy. If it were longer than five seconds — the soul couldn't endure it and would vanish. In those five seconds I live my life through, and for them I would give my whole life, because it's worth it."
            ></PostPreview>
          </div>

          <div className="top-blogs-container">
            <h4>Top blogs</h4>

            <TopBlogItem
              clickHandler={() => {
                navigate("/bobs-blog");
              }}
              name="Bob's blog"
            ></TopBlogItem>
            <TopBlogItem
              clickHandler={() => {
                navigate("/janes-blog");
              }}
              name="Jane's blog"
            ></TopBlogItem>

          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
