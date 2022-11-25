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
import shuffleArray from "utils/shuffleArray";

import isLoggedIn from "utils/isLoggedIn";

function Home() {
	const [newBlogModalOpen, setNewBlogModalOpen] = useState(false);
	const navigate = useNavigate();
	const [latestPosts, setLatestPosts] = useState([]);
	const [topBlogs, setTopBlogs] = useState([]);
	const [signedInAddress, setSignedInAddress] = useState("")
	const [signedInButtonVisible, setSignedInButtonVisible] = useState("none")

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

			const mapped = await Promise.all(response.posts.map(async (value, index) => {
				const {blog} = await getBlogById(value.BlogId)
				return { ...value, blogName: blog.name, blogAddress: blog.address }
			}))
			return mapped
		} catch (err) {
			navigate("/404");
		}

	};


	const getTopBlogs = async () => {
		const response = await retrieve("blog/", "GET");

		// shuffling blogs
		response.blogs = shuffleArray(response.blogs);
		// console.log("THE BLOGS: ", response.blogs);
		// console.log("SHUFFLED: ", response.blogs);

		// getting top 5 blogs
		const blogs = response.blogs.length < 5 ? response.blogs.slice(0, response.blogs.length) : response.blogs.slice(0, 5);
		return blogs;
	}

	useEffect(() => {
		getLatestPosts().then((e) => setLatestPosts(e));
		getTopBlogs().then((e) => setTopBlogs(e));
		isLoggedIn().then((status) => {
			if (status.loggedIn) {
				setSignedInAddress(status.blogAddress)
				setSignedInButtonVisible("block")
			}
		});
	}, [])

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

				{
					topBlogs?.map((value, index) => {
						console.log(index);
						return (
							<TopBlogItem
							clickHandler={() => {
								navigate(`${value.address}`)
							}}
							name={`${value.name}'s blog`}
							key={index}
							></TopBlogItem>
						)
					})
				}

			</div>
			</div>
		</div>
		</>
	);
}

export default Home;
