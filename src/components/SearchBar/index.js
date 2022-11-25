function SearchBar(props) {
    return (
        <div>
            <input type="text" placeholder="Search for a blog..." style={{width: props.height}} className="SearchBarMain" onChange={
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
