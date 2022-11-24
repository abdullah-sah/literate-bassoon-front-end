function SearchBar(props) {
    return (
        <div>
            <input type="text" placeholder="Search for a blog..." style={{width: props.height}} className="SearchBarMain"></input>

        </div>
    )
}

export default SearchBar;
