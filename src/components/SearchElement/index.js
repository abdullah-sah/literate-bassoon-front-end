import "./style.scss"
import { useEffect, useState} from "react"
import createPrettyDate from "utils/createPrettyDate"

import { useNavigate } from "react-router-dom";

function SearchElement(props) {

    const blogData = props.blogData;
    const loggedInAddress = props.loggedInAddress;
    const navigate = useNavigate()
    const [creationDate, setCreationDate] = useState()

    const [loggedIn, setLoggedIn] = useState("")
    const [loggedInVisibility, setLoggedInVisibility] = useState("none")

    console.log(blogData)
    useEffect(() => {
        const prettyDate = createPrettyDate(blogData.createdAt)
        setCreationDate(prettyDate)

        console.log("Address", loggedInAddress)
        if (blogData.address === loggedInAddress) {
            setLoggedIn("Logged In")
            setLoggedInVisibility("flex")
        }

    })

    return (
        <div className="AllBlogsElementContainer"
            onClick={() => {
                navigate(`/${blogData.address}`);
            }}>
            <section>
                <div className="name-and-profile-icon">
                    <div className="profile-icon"></div>
                    <div className="name-and-publish-date-div">
                        <h1>{blogData.name}</h1>
                        <h4>Published: {creationDate}</h4>
                    </div>
                </div>
            </section>

            <section className="url-and-logged-in-div">
                <h2>/{blogData.address}</h2>
                <div style={
                    {
                        display:loggedInVisibility,
                        flexDirection: "row",
                        justifyContent: "end"
                    }
                }>
                    <h4 className="LoggedInString">{loggedIn}</h4>
                </div>
            </section>


        </div>
    )
}

export default SearchElement
