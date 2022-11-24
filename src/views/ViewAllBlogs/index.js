import "./style.scss"
import NavBar from "components/NavBar";
import { useEffect, useState } from "react";
import SearchElement from "components/SearchElement"
import EmptySearchElement from "components/EmptySearchElement"

function ViewAll() {

    const [allBlogs, setAllBlogs] = useState([])

    useEffect(() => {
        fetch("http://localhost:5001/blog") //Change port for own machine
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                console.log(data.blogs)
                setAllBlogs(data.blogs)
            } else {
                console.log("No Blogs")
            }
        })
    }, [])


    function checkIfAnyBlogs() {
        console.log("Function called")
        if (allBlogs.length === 0) {
            return (
                <EmptySearchElement />
            )
        } else {
            console.log("Adding blogs")
            return (
                allBlogs.map((blog) => {
                    return (
                        <>
                            <tbody>
                                <SearchElement blogData={blog} />
                            </tbody>
                        </>
                    )
                })
            )
        }
    }

    return (
        <>
            <NavBar
                buttons={
                <div className="nav-item v-center">
                    <div
                    className="btn create-blog-btn"
                    onClick={() => {

                    }}
                    >
                    Search
                    </div>
                </div>
                }
            ></NavBar>

            <table className="AllBlogsMainDiv">
                {checkIfAnyBlogs()}
            </table>
        </>
    )
}
export default ViewAll;
