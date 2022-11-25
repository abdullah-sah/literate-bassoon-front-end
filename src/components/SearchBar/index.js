import { useState, useEffect } from "react"
import "./style.scss"
import FilterFunction from "../FilterFunction"

function SearchBar(props) {

    const [searchBarHeight, setSearchBarHeight] = useState(props.height)
    const [filterButtonTitle, setFilterButtonTitle] = useState("Filter")

    useEffect(() => {
        setSearchBarHeight(props.height)
        setFilterButtonTitle("Sort")
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
                            console.log("filteredData", filteredData)
                            props.setSearchData(filteredData)
                        } else {
                            console.log("nothing in the search input")
                            props.setSearchData(props.allBlogs)
                        }
                    }
                }></input>
                <button className="SearchBarFilterButton" onClick={
                    () => {
                        if (filterButtonTitle === "Sort") {
                            setSearchBarHeight("100px")
                            setFilterButtonTitle("Hide Sort")
                        } else  {
                            setSearchBarHeight(props.height)
                            setFilterButtonTitle("Sort")
                        }
                    }
                }>{filterButtonTitle}</button>
            </div>
            <div className="SearchBarFilterFunctionality">
                <div className="FilteringSection">
                    <h3>Sort By:</h3>

                    <FilterFunction
                    searchData={props.searchData}
                    setSearchData={props.setSearchData}
                    method={(a, b) => {
                        console.log("sorting")
                        const textA = a.name.toLowerCase();
                        const textB = b.name.toLowerCase();
                        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                    }}
                    title="A-Z" isChecked={true}></FilterFunction>

                    <FilterFunction
                    searchData={props.searchData}
                    setSearchData={props.setSearchData}
                    method={(a, b) => {
                        console.log("sorting")
                        const textA = a.name.toLowerCase();
                        const textB = b.name.toLowerCase();
                        return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
                    }}
                    title="Z-A" isChecked={false}></FilterFunction>

                    <FilterFunction
                    searchData={props.searchData}
                    setSearchData={props.setSearchData}
                    method={(a, b) => {
                        console.log("sorting")
                        const dateA = new Date(a.createdAt);
                        const dateB = new Date(b.createdAt);
                        return (dateA > dateB) ? -1 : (dateA <= dateB) ? 1 : 0;
                    }}
                    title="Latest" isChecked={false}></FilterFunction>

                    <FilterFunction
                    searchData={props.searchData}
                    setSearchData={props.setSearchData}
                    method={(a, b) => {
                        console.log("sorting")
                        const dateA = new Date(a.createdAt);
                        const dateB = new Date(b.createdAt);
                        return (dateA < dateB) ? -1 : (dateA >= dateB) ? 1 : 0;
                    }}
                    title="Earliest" isChecked={false}></FilterFunction>

                    <FilterFunction
                    searchData={props.searchData}
                    setSearchData={props.setSearchData}
                    method={(a, b) => {
                        return b.currentlyLoggedIn - a.currentlyLoggedIn
                    }}
                    title="Logged In At Top" isChecked={false}></FilterFunction>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;
