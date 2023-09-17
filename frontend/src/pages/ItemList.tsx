import React, { useEffect, useState } from 'react'
import {
    Card,
    Container,
    Dimmer,
    Header,
    Loader,
    Segment,
} from 'semantic-ui-react'
import { ApiResponse, BabinjeItem } from '../Models'
import BabinjeCard, { RegisterFormValues } from '../components/BabinjeCard'

import servis from '../servisi/UserReservationServis'
import { useToast } from '../toast/ToastProvider'
import { ToastType } from '../toast/ToastItem'
import IndeksCijena from '../components/IndeksCijena'

const ItemsList: React.FC<{ isFungible: boolean }> = (props) => {
    const { isFungible } = props
    const [items, setItems] = useState<Array<BabinjeItem>>([])
    const [isLoading, setLoading] = useState(false)
    const toast = useToast()

    const callback = (values: RegisterFormValues) => {
        setLoading(true)
        servis
            .register(values.itemId, values.email, values.nameSurname)
            .then(() => {
                toast.showMessage({
                    title: 'Babinje Win',
                    description:
                        'Zahtjev uspješan. Pogledajte mail za koji trenutak!',
                    type: ToastType.SUCCESS,
                })
            })
            .catch((error) => {
                toast.showError(error.message)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        setLoading(true)
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
                const artikli = json.data ?? []
                setItems(artikli.filter((it) => it.isFungible == isFungible))
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => setLoading(false))
    }, [])

    return (
        <Segment basic>
            <Container text textAlign='center'>
                {items.length == 0 ? (
                    <Header as='h2' style={{ marginBottom: '1em' }}>
                        Nema ničeg, dođite posli!
                    </Header>
                ) : (
                    <p style={{ fontSize: '2em', marginBottom: '1em' }}>
                        &#128104; &#128105; &#128118; &#128049;
                    </p>
                )}
            </Container>
            <IndeksCijena hidden={items.length === 0} />
            <Card.Group centered>
                <Dimmer active={isLoading} inverted>
                    <Loader inverted>Loading</Loader>
                </Dimmer>
                {items.map((it, idx) => (
                    <BabinjeCard
                        key={idx + '_card_main'}
                        data={it}
                        onReserve={callback}
                        onRelease={callback}
                    />
                ))}
            </Card.Group>
        </Segment>
    )
}

export default ItemsList
