import "./style.scss"
import NavBar from "components/NavBar";
import { useEffect, useState } from "react";
import SearchElement from "components/SearchElement"
import EmptySearchElement from "components/EmptySearchElement"
import SearchBar from "components/SearchBar"
import retrieve from "utils/retrieve";

function ViewAll() {

    const [allBlogs, setAllBlogs] = useState([])
    const [reserveAllBlogs, setReserveAllBlogs] = useState([])
    const [searchBarHeight, setSearchBarHeight] = useState(0);

    useEffect( () => {
        const data = retrieve("blog", "GET")
          // call the function
        data.then((actualData) => {
            console.log(actualData)
            if (actualData.success) {
                console.log(actualData.blogs)
                setAllBlogs(actualData.blogs)
                setReserveAllBlogs(actualData.blogs)
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
                        setSearchBarHeight(100)
                    }}
                    >
                    Search
                    </div>
                </div>
                }
            ></NavBar>

            <SearchBar height={searchBarHeight} searchData={allBlogs} setSearchData={setAllBlogs} allBlogs={reserveAllBlogs}/>

            <table className="AllBlogsMainDiv">
                {checkIfAnyBlogs()}
            </table>
        </>
    )
}
export default ViewAll;
