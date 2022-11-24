<<<<<<< HEAD
async function retrieve(urlEnd, method, body={}) {
    try {
        const result = await fetch(`http://localhost:5001/${urlEnd}`, {
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
=======
async function retrieve(urlEnd, method, body = {}) {
	try {
		const result = await fetch(`http://localhost:5001/${urlEnd}`, {
			method: method,
			headers: {
				"Content-Type": "application/json",
			},
			body: body,
		});
		const data = await result.json();
		return data;
	} catch (error) {
		return {
			success: false,
			error: error.message,
		};
	}
>>>>>>> main
}

export default retrieve;
