import { JikanClient } from "./index.ts";


const client = new JikanClient();

// This main is a simple example of how to use the library

async function main() {
	while (true) {
		client.requestManager.request({
			endpoint: "/anime/1",
			method: "GET",
			params: undefined,
		}).then(response => {
			response?.json().then(json => {
				console.log(json);
			});
		})
		console.log("heartbeating...");
		await new Promise(resolve => setTimeout(resolve, 200));
	}
}

main();
