import retrieve from "utils/retrieve.js";

async function isLoggedIn() {
  const blogToken = localStorage.getItem("blogToken");
  if (blogToken !== null) {
    const loggedIn = await retrieve(
      "blog/loginStatus",
      "POST",
      JSON.stringify({ token: blogToken })
    );
    if (loggedIn.success) {
      return {
        loggedIn: true,
        blogAddress: loggedIn.blogAddress,
        token: localStorage.getItem("blogToken"),
      };
    } else {
      return {
        loggedIn: false,
        error: loggedIn.error,
      };
    }
  } else {
    return {
      loggedIn: false,
      error: "No login token",
    };
  }
}

export default isLoggedIn;
