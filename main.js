async function init() {
	data = await d3.csv("https://raw.githubusercontent.com/apearsall20/apearsall20.github.io/master/US.csv");
	console.log(data[0]);
	return data;
}