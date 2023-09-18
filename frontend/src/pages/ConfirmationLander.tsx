import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ApiResponse, MutationOperationResult } from '../Models'
import {
    Container,
    Dimmer,
    Divider,
    Header,
    Icon,
    Loader,
    Segment,
} from 'semantic-ui-react'

const LandingPageIcon: React.FC<{ isError: boolean; isRegister: boolean }> = (
    props,
) => {
    const { isRegister, isError } = props

    return (
        <>
            {isError ? (
                <Icon
                    style={{ margin: 'auto' }}
                    size='massive'
                    color='red'
                    name='ban'
                />
            ) : (
                <Icon
                    style={{ margin: '0.2em' }}
                    size='massive'
                    color={isRegister ? 'green' : 'yellow'}
                    name={isRegister ? 'check circle' : 'hand spock'}
                />
            )}
        </>
    )
}

const ConfirmationLander: React.FC = () => {
    const { itemId, resetString } = useParams()
    const [isGreatSuccess, setGreatSuccess] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [result, setResult] = useState<MutationOperationResult | undefined>()

    const isRegister = result?.isRegister ?? true

    useEffect(() => {
        fetch(`/api/v1/confirm/${itemId}/${resetString}`, { method: 'POST' })
            .then((response) => {
                if (response.ok) {
                    return response.json() as Promise<
                        ApiResponse<MutationOperationResult>
                    >
                } else {
                    throw response
                }
            })
            .then((result) => {
                setResult(result.data)
                setGreatSuccess(true)
            })
            .catch(() => {
                setGreatSuccess(false)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    return (
        <Segment style={{ padding: '8em 0em' }} vertical basic>
            <Dimmer active={isLoading} inverted>
                <Loader>Učitavanje...</Loader>
            </Dimmer>
            {!isLoading && (
                <Container textAlign='center'>
                    <LandingPageIcon
                        isError={!isGreatSuccess}
                        isRegister={isRegister}
                    />
                </Container>
            )}
            <Container text textAlign='center' hidden={isLoading}>
                <div hidden={!isGreatSuccess} style={{ fontSize: '1.33em' }}>
                    <Header as='h3' style={{ fontSize: '2em' }}>
                        {isRegister
                            ? 'Hvala Vam na odabiru'
                            : 'Žao nam je što odlazite'}
                    </Header>
                    {isRegister ? (
                        <p>
                            Rezervirali ste artikl: &quot;{result?.item.name}
                            &quot; na svoje ime. Drago nam je da ste odlučili
                            sudjelovati u olakšanju života nas i bebe i što ste
                            koristili ovu aplikaciju za to!
                        </p>
                    ) : (
                        <p>
                            Odustali ste od artikla: &quot;{result?.item.name}
                            &quot;. Žao nam je što odlazite, no pogledajte još
                            jednom popis artikala pa možda Vam odgovara neki
                            drugi. Hvala Vam !
                        </p>
                    )}
                    <p>
                        Kliknite na link ispod ako želite rezervirati nešto
                        drugo
                    </p>
                </div>
                <div hidden={isGreatSuccess || isLoading}>
                    <Header as='h3' style={{ fontSize: '2em' }}>
                        Došlo je do pogreške
                    </Header>
                    <div style={{ fontSize: '1.33em' }}>
                        <p>
                            Molim Vas ponovite registraciju! Ili je link istekao
                            ili je došlo do greške. Pričekajte minutu dvije
                            prije nego što ponovite
                        </p>
                        <p>
                            Kontaktirajte{' '}
                            <a href='mailto:brbulic@codebase.hr'>me</a> za pomoć
                            ako ponovljena rezervacija ne upali
                        </p>
                    </div>
                </div>
                <div hidden={isLoading}>
                    <Divider
                        as='h4'
                        className='header'
                        horizontal
                        style={{
                            margin: '3em 0em',
                            textTransform: 'uppercase',
                        }}>
                        <a href='/'>babinje</a>
                    </Divider>
                </div>
            </Container>
        </Segment>
    )
}

export default ConfirmationLander
