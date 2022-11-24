import "./style.scss";
import retrieve from "utils/retrieve";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "components/Modal";

function NewBlogModal(props) {
	const [blogTitle, setBlogTitle] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleCreateBlog = async () => {
		const response = await retrieve(
			"blog/",
			"PUT",
			JSON.stringify({
				blogTitle: blogTitle,
				password: password,
			})
		);
		if (response.success) {
			navigate(`/${response.blogAddress}`);
			localStorage.set("token", response.token);
		} else {
			navigate(`/404`);
		}
	};

	return (
		<Modal
			open={props.open}
			closeHandler={props.closeHandler}
			children={
				<>
					<h1>Create new blog</h1>

					<input
						type="text"
						placeholder="Blog name"
						className="nice-input"
						onChange={(event) => setBlogTitle(event.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						className="nice-input"
						onChange={(event) => setPassword(event.target.value)}
					/>

					<div className="btn no-shift" onClick={handleCreateBlog}>
						Create blog
					</div>
				</>
			}
		></Modal>
	);
}

export default NewBlogModal;
