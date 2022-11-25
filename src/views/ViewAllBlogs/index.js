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

    const [searchButtonText, setSearchButtonText] = useState("Hide Search")
    const [searchBarHeight, setSearchBarHeight] = useState("50px");
    const [searchBarBorder, setSearchBarBorder] = useState("1px solid #1A1919")
    const [searchBarVisibility, setSearchBarVisbility] = useState("Shown")

    useEffect( () => {
        const data = retrieve("blog", "GET")
          // call the function

        isLoggedIn().then((status) => {
            if (status.loggedIn) {
                return status.blogAddress
                console.log("logged in");
            }
        }).then((address) => {
            data.then((actualData) => {
                console.log("loggedInAddress", address)
                if (actualData.success) {
                    console.log(actualData.blogs)
                    const changed = [];
                    actualData.blogs.forEach(value => {
                        if (value.address === address) {
                            changed.push({...value, currentlyLoggedIn: true})
                            return;
                        }
                        changed.push({...value, currentlyLoggedIn: false})
                    })

                    setAllBlogs(changed)
                    setReserveAllBlogs(changed)

                    console.log(changed)
                } else {
                    console.log("No Blogs")
                }
            })
        })
    }, [])


    function checkIfAnyBlogs() {
        if (allBlogs.length === 0) {
            return (
                <EmptySearchElement />
            )
        } else {
            return (
                allBlogs.map((blog) => {
                    return (
                        <>
                            <tbody>
                                <SearchElement blogData={blog}/>
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
                            setSearchButtonText("Hide Search")
                            setSearchBarVisbility("Shown")
                        } else {
                            setSearchBarHeight("0px")
                            setSearchBarBorder("none")
                            setSearchButtonText("Search")
                            setSearchBarVisbility("Hidden")
                        }
                    }}
                    >
                    {searchButtonText}
                    </div>
                </div>
                }
            ></NavBar>

            <SearchBar
                height={searchBarHeight}
                border={searchBarBorder}
                searchData={allBlogs}
                setSearchData={setAllBlogs}
                allBlogs={reserveAllBlogs}
                visibility={searchBarVisibility}
            />

            <table className="AllBlogsMainDiv">
                {checkIfAnyBlogs()}
            </table>
        </>
    )
}
export default ViewAll;
