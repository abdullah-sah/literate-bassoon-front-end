import {retrieve} from "./retrieve.js"

async function isLoggedIn() {
    const blogToken = localStorage.getItem("blogToken")
    if (blogToken !== null) {
        const loggedIn = await retrieve("loginStatus", "POST", {token: blogToken})
        if (loggedIn.success) {
            return {
                loggedIn: true,
                blogAddress: loggedIn.blogAddress,
                token: localStorage.getItem("blogToken")
            }
        } else {
            return {
                loggedIn: false,
                error: loggedIn.error
            }
        }
    }
}

export default isLoggedIn;
