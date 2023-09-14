import React, { useEffect, useState } from 'react'
import { Card } from 'semantic-ui-react'
import { ApiResponse, BabinjeItem } from '../Models'
import BabinjeCard from '../components/BabinjeCard'

const ItemsList: React.FC = () => {
    const [items, setItems] = useState<Array<BabinjeItem>>([])

    const callback = (values) => {
        alert(JSON.stringify(values))
        // napravit api poziv za rezervaciju
    }

    useEffect(() => {
        fetch('api/v1/items')
            .then((response) => {
                if (response.ok) {
                    const result = response.json() as Promise<
                        ApiResponse<BabinjeItem[]>
                    >
                    return result
                } else {
                    throw response
                }
            })
            .then((json) => {
                setItems(json.data ?? [])
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return (
        <Card.Group centered>
            {items.map((it, idx) => (
                <BabinjeCard
                    key={idx + '_card_main'}
                    data={it}
                    onReserve={callback}
                    onRelease={() => {}}
                />
            ))}
        </Card.Group>
    )
}

export default ItemsList
