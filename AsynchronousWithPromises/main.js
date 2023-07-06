function createflight(flight, from, status, color = "lightgreen") {
	let row = document.createElement("tr");

	let statusColumn = document.createElement("td");
	statusColumn.innerText = status;
	statusColumn.style.color = color;

	let flightColumn = document.createElement("td");
	flightColumn.innerText = flight;

	let fromColumn = document.createElement("td");
	fromColumn.innerText = from;

	row.appendChild(flightColumn);
	row.appendChild(fromColumn);
	row.appendChild(statusColumn);

	let parentnode = document.getElementById("arrivalList");
	parentnode.appendChild(row);
}

function getflightdetails(flightnumber) {
	return fetch("flightsdetails.json")
		.then((res) => res.json())
		.then((res) => res.find((f) => f.flight === flightnumber));
}

function getflightsummary() {
	return fetch("flightsummary.json")
		.then((res) => res.json())
		.then((data) => {
			data.forEach((element) => {
				getflightdetails(element.flight).then((details) => {
					createflight(element.flight, element.from, details.status);
				});
			});
		});
}


getflightsummary();

