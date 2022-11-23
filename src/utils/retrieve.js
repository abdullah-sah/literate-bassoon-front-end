async function retrieve(urlEnd, method, body={}) {
    try {
        const result = await fetch(`http://server.ronak.dev:3000/${urlEnd}`, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        })
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
