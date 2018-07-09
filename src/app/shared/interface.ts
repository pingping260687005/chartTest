interface ICustomerRaw {
    customer_id: number;
    customer_name: string;
    hospital: string;
}


interface ICustomerRawData{
    '@odata.count':number;
    value: ICustomerRaw[]
}

interface ICustomer {
    id: number;
    name: string;
    hospital: string;
    department: string;
}