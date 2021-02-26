const express = require("express");
const app = express();
const PORT = 9000;

app.get("/api/getWeather", (req ,res) => {
	res.json({
		weather: "weather"
	})
})

app.listen(PORT, () => {
	console.log(`API server started on port: ${PORT}`);
})
