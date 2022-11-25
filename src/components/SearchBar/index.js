import { useState, useEffect } from "react"
import "./style.scss"

function SearchBar(props) {

    const [searchBarHeight, setSearchBarHeight] = useState(props.height)
    const [filterButtonTitle, setFilterButtonTitle] = useState("Filter")

    useEffect(() => {
        setSearchBarHeight(props.height)
        setFilterButtonTitle("Filter")
    }, [props.visibility])

    return (
        <div style={{height: searchBarHeight, borderBottom: props.border}} className="SearchBarContainer">
            <div className="SearchBarMain">
                <input type="text" placeholder="Search for a blog..." className="SearchBarMainInput" onChange={
                    (event) => {
                        const lowerCaseSearchInput = (event.target.value.trim()).toLowerCase()
                        console.log(lowerCaseSearchInput)
                        if (lowerCaseSearchInput !== "") {
                            const filteredData = props.searchData.filter((element) => {
                                const lowerCaseName = element.name.toLowerCase()
                                if (lowerCaseName.includes(lowerCaseSearchInput) || element.address.includes(lowerCaseSearchInput)) {
                                    return true
                                }
                                return false
                            })
                            props.setSearchData(filteredData)
                        } else {
                            console.log("nothing in the search input")
                            props.setSearchData(props.allBlogs)
                        }
                    }
                }></input>
                <button className="SearchBarFilterButton" onClick={
                    () => {
                        if (filterButtonTitle === "Filter") {
                            setSearchBarHeight("100px")
                            setFilterButtonTitle("Hide Filter")
                        } else  {
                            setSearchBarHeight(props.height)
                            setFilterButtonTitle("Filter")
                        }
                    }
                }>{filterButtonTitle}</button>
            </div>
            <div className="SearchBarFilterFunctionality">
                <div className="FilteringSection">

                </div>
            </div>
        </div>
    )
}

export default SearchBar;
