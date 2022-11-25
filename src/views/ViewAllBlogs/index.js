import "./style.scss";
import NavBar from "components/NavBar";
import { useEffect, useState } from "react";
import SearchElement from "components/SearchElement";
import EmptySearchElement from "components/EmptySearchElement";
import SearchBar from "components/SearchBar";
import retrieve from "utils/retrieve";
import isLoggedIn from "utils/isLoggedIn";

function ViewAll() {

    const [allBlogs, setAllBlogs] = useState([]);
    const [reserveAllBlogs, setReserveAllBlogs] = useState([]);

    const [loggedInAddress, setLoggedInAddress] = useState("");

    const [searchButtonText, setSearchButtonText] = useState("Search")
    const [searchBarHeight, setSearchBarHeight] = useState("0px");
    const [searchBarBorder, setSearchBarBorder] = useState("none")

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

        isLoggedIn().then((status) => {
            if (status.loggedIn) {
                setLoggedInAddress(status.blogAddress)
                console.log("logged in");
            }
        });
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
                                <SearchElement blogData={blog} loggedInAddress={loggedInAddress}/>
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
                        if (searchButtonText === "Search") {
                            setSearchBarHeight("50px")
                            setSearchBarBorder("1px solid #1A1919")
                            setSearchButtonText("Hide")
                        } else {
                            setSearchBarHeight("0px")
                            setSearchBarBorder("none")
                            setSearchButtonText("Search")
                        }
                    }}
                    >
                    {searchButtonText}
                    </div>
                </div>
                }
            ></NavBar>

            <SearchBar height={searchBarHeight} border={searchBarBorder} searchData={allBlogs} setSearchData={setAllBlogs} allBlogs={reserveAllBlogs}/>

            <table className="AllBlogsMainDiv">
                {checkIfAnyBlogs()}
            </table>
        </>
    )
}
export default ViewAll;
