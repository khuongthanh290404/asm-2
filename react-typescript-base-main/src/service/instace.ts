import axios from "axios";

const instace = axios.create({
	baseURL: "http://localhost:3000",
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 3000,
});

instace.interceptors.request.use((config) => {
	const token = localStorage.getItem("accessToken");
	if (token) {
		config.headers["Authorization"] = `Bearer ${token}`;
	}
	return config;

})

export default instace;