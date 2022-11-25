import "./style.scss"

function SearchBar(props) {
    return (
        <div style={{height: props.height, borderBottom: props.border}} className="SearchBarContainer">
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

        </div>
    )
}

export default SearchBar;
