export class PaginationDTO {
	limit: number = 5;
	offset: number = 0;
	sortByKey: string;
	sortByType: string;
	searchWith: string;
	vehicleType: string;
	fuelType: string;
	filterType: string;
	totalSize: number = 0; // total items in the mysql table
	academic_year_id: string // for teacher portal
	batch_id: string // for teacher portal
}
