export class Inventory {
    stockEntryId:string
    activeStatus: string;
    stockItemName:string
    inventoryName:string
    inventoryTypeId:string
    stockOutDate:string
    stockInDate:string
    stockItemQuantity:string
    stockItemCode:string
    unitTypeName:string
    inventoryStockItemId:string
    unitTypeId:string
    responseModel: Inventory[];
    status: string;
    customerId: string;
    districtId: string;
    pageSize?: number;
    page?: number;
    count?: number
    statusMessage: string;
}
  