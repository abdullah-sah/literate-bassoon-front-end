import "./style.scss"
import { useEffect, useState} from "react"
import createPrettyDate from "utils/createPrettyDate"

import { useNavigate } from "react-router-dom";

function SearchElement({blogData}) {

    const navigate = useNavigate()

    const [creationDate, setCreationDate] = useState()

    console.log(blogData)
    useEffect(() => {
        const prettyDate = createPrettyDate(blogData.createdAt)
        setCreationDate(prettyDate)
    }, [blogData.createdAt])

    return (
        <div className="AllBlogsElementContainer"
            onClick={() => {
                navigate(`/${blogData.address}`);
            }}>
            <section>
                <div className="name-and-profile-icon">
                    <div className="profile-icon"></div>
                    <div>
                        <h1>{blogData.name}</h1>
                        <h4>Published: {creationDate}</h4>
                    </div>
                </div>
            </section>

            <section>
                <h2>/{blogData.address}</h2>
            </section>


        </div>
    )
}

export default SearchElement
