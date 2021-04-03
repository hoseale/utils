async function linkAsync(arr, cb) {
	try {
		const len = arr.length;
		let index = 0;
		const hand = async (ls) => {
			cb && await cb(ls[index]);
			if (index < len - 1) {
				index++;
				await hand(ls)
			}
		}
		await hand(arr)
	} catch (error) {

	}

}
