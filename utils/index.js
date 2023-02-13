import moment from "moment";

export const DEFAULT_TODOS = [
	{
		id: 1,
		name: "Initial Test Event",
		date: moment(),
		services: ["General Cleaning", "Wash Clothes"],
		files: [],
	},
];

export const SERVICES = [
	{ id: 1, name: "General Cleaning" },
	{ id: 2, name: "Wash Clothes" },
	{ id: 3, name: "Maintenance" },
];
