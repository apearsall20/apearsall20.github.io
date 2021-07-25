function load_data(file) {
	d3.csv(file);
	console.log(data);
	return data;
}

data = load_data("by_state.csv");
