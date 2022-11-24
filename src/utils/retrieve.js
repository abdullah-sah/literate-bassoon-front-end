async function retrieve(urlEnd, method, body = null) {
	try {

		let reqObj = {
			method: method,
			headers: {
				"Content-Type": "application/json",
			}
		}

		if(body !== null){
			reqObj['body'] = body;
		}

		const result = await fetch(`http://localhost:5001/${urlEnd}`, reqObj);
		const data = await result.json();
		return data;
	} catch (error) {
		return {
			success: false,
			error: error.message,
		};
	}
}

export default retrieve;
