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



const getflightdetails = async (flightnumber) => {
	const result = await fetch("flightsdetails.json")   //it returns a response instead of promise
	const data = await result.json();     //Store the result in an object
    //
	return data.find(f => f.flight === flightnumber)
}
 
const getflightsummary = async () => {
    const result = await fetch("flightsummary.json");
    const data = await result.json();    
    data.forEach(async (f) => {
        console.log(f.flight)
        const flightdetails = await getflightdetails(f.flight)
       
        createflight(f.flight, f.from, flightdetails.status);
    });
}
getflightsummary();

