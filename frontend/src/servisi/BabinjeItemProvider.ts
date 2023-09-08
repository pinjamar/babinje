import { ApiResponse, BabinjeItem } from "../Models"

interface BabinjeItemCreate
{
    name: string
    desc: string
    link?: string
}

interface BabinjeItemProvider
{
    getAll(): Promise<Array<BabinjeItem>>
    create(item: BabinjeItem): Promise<BabinjeItem>
}

class _BabinjeItem implements BabinjeItemProvider
{
    async getAll(): Promise<BabinjeItem[]> {
        return fetch('api/v1/items')
        .then((response) => {
            if (response.ok) {
                let result = response.json() as Promise<ApiResponse<BabinjeItem[]>>;
                return result;
            } else {
                throw response;
            }
        })
        .then((json) => {
            return json.data || []
        })
    }
    
    
    async create(itemDto: BabinjeItem): Promise<BabinjeItem> {
        const response = await fetch("/api/v1/44ba0bb01331a2c0c9d6a835d0091c2c9033721afd612c30", { 
            method: "POST", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(itemDto)
        })

        const jsonResult = await response.json() as ApiResponse<BabinjeItem>
        if (!jsonResult.data) { throw response }

        return jsonResult.data
    }
    
}

export default new _BabinjeItem() as BabinjeItemProvider