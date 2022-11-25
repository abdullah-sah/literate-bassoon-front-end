import "./style.scss";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import HomeBanner from "components/HomeBanner";
import NavBar from "components/NavBar";
import PostPreview from "components/PostPreview";
import TopBlogItem from "components/TopBlogItem";
import NewBlogModal from "components/NewBlogModal";
import retrieve from "utils/retrieve";

function Home() {
	const [newBlogModalOpen, setNewBlogModalOpen] = useState(false);
	const navigate = useNavigate();
  const [latestPosts, setLatestPosts] = useState([]);


  const getBlogById = async (id) => {
    try {
      const response = await retrieve(`blog/blogId/${id}`, "GET");
      return response;
    } catch (err) {
      navigate("/404");
    }
  }
  
	const getLatestPosts = async () => {
    try {
      const response = await retrieve("blog/posts", "GET");
      // sorting by last created post (largest value for id)
      response.posts.sort((a, b) => b.id - a.id);
      
      // adding keys of 'blogName' and 'blogAddress' to each post
      // const mapped = response.posts.map(async (value, index) => {
      //   const { success, blog } = await getBlogById(value.BlogId);
      //   value = { ...value, blogName: blog.name, blogAddress: blog.address };
      //   return value;
      // });

      const mapped = response.posts.map((value, index) => {
        getBlogById(value.BlogId).then(({ blog }) =>{ return { ...value, blogName: blog.name, blogAddress: blog.address } })
      })
      // setLatestPosts(response.posts);
      // console.log("response is", response.posts);
      console.log("THIS IS MAPPED", mapped);
      return response.posts;
    } catch (err) {
      console.log(err);
      navigate("/404");
    }
    
	};

	useEffect(() => {
		window.scrollTo(0, 0);
    getLatestPosts().then((e) => setLatestPosts(e));
	}, []);

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
								navigate("/all-blogs");
							}}
						>
							View All Blogs
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

            {
              latestPosts?.map((value, index) => {
                console.log(value);
                return (
                  <PostPreview
                  clickHandler={() => {
                    navigate(`/${value.blogAddress}`);
                    }}
                    blogName={`${value.blogAddress}`}
                    title={`${value.title}`}
                    creationDate={`${value.createdAt}`}
                    content={`${value.content}`}
                    key={index}
                  ></PostPreview>
                )
              })
            }
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
