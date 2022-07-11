export class InventoryType {
    status: string;
    activeStatus: string;
    inventoryTypeName: string;
    public inventoryTypeId: string = '';
    customerId: string;
    districtId: string;
    pageSize?: number;
    page?: number;
    count?: number
    statusMessage: string
    statusCode:string
    responseModel: InventoryType[];
}
