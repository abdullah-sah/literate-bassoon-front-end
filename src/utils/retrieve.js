async function retrieve(urlEnd, method, body={}) {
    try {
        let result;
        if (method === "GET") {
            result = await fetch(`http://localhost:5001/${urlEnd}`, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            }})
        } else {
            result = await fetch(`http://localhost:5001/${urlEnd}`, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: body
            })
        }
        const data = await result.json()
        return data
    } catch (error) {
        return {
            success: false,
            error: error.message
        }
    }
}

export default retrieve;
