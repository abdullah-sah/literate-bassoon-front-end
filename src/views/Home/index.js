import "./style.scss";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import HomeBanner from "components/HomeBanner";
import NavBar from "components/NavBar";
import PostPreview from "components/PostPreview";
import TopBlogItem from "components/TopBlogItem";
import NewBlogModal from "components/NewBlogModal";
import retrieve from "utils/retrieve";
import createPrettyDate from "utils/createPrettyDate";

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

			const mapped = await Promise.all(response.posts.map(async (value, index) => {
				const {blog} = await getBlogById(value.BlogId);
				return { ...value, blogName: blog.name, blogAddress: blog.address };
			}))
			return mapped;
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
									return (
									<PostPreview
										clickHandler={() => {
											navigate(`/${value.blogAddress}`);
											}}
										blogName={`${value.blogAddress}`}
										title={`${value.title}`}
										creationDate={`${createPrettyDate(value.createdAt)}`}
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
