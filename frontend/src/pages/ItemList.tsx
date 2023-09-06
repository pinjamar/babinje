import React, { useEffect, useState } from "react";

import { Card, CardGroup } from "semantic-ui-react";
import { ApiResponse, BabinjeItem } from "../Models";
import BabinjeCard from "../components/BabinjeCard";

const ItemsList: React.FC = () => {
    const [ items, setItems ] = useState<Array<BabinjeItem>>([])

    useEffect(() => {
        fetch("api/v1/items")
        .then(response => {
            if (response.ok) {
                let result = response.json() as Promise<ApiResponse<BabinjeItem[]>>
                return result
            }
            else 
            {
                throw response
            }
        })
        .then(json => {
            setItems(json.data ?? []);
        })
        .catch(error => {
            console.error(error);
        });            
    }, []);


    return (<CardGroup>
        {items.map(it => <BabinjeCard data={it} />)}
    </CardGroup>
    )
}

export default ItemsList;