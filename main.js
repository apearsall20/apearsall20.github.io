async function init() {
	data = await d3.csv("https://raw.githubusercontent.com/apearsall20/apearsall20.github.io/master/by_state.csv");
	console.log(data);
	return data;
}