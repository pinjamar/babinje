import React, { useEffect, useState } from "react";

import { Container, Header } from "semantic-ui-react";
import { ApiResponse, BabinjeItem } from "../Models";

const ItemsList: React.FC = () => {
    const [ items, setItems ] = useState<Array<BabinjeItem>>([])

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/items")
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


    return (<div>
            {items.map(it => <div>{it.name}</div>)}
        </div>
    )
}

export default ItemsList;