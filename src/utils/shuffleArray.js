const shuffleArray = (arr) => {
	for (let i = arr.length - 1; i > 0; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1));
		const temp = arr[i];
		arr[i] = arr[randomIndex];
		arr[randomIndex] = temp;
	}
	return arr;
}

export default shuffleArray;