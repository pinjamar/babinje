import React, { PropsWithChildren, useState } from 'react'
import { BabinjeItem } from '../Models'
import {
    Card,
    Button,
    Image,
    Modal,
    Header,
    Icon,
    Form,
    Input,
    Container,
} from 'semantic-ui-react'
import RazredLabela from './RazredLabela'

const logo = new URL('../images/baby-logo.jpg', import.meta.url)

interface RegisterFormValues {
    itemId: number
    nameSurname?: string
    email: string
}

interface UnregisterFormValues {
    itemId: number
    email: string
}

interface Props {
    data: BabinjeItem
    onReserve(obj: RegisterFormValues): void
    onRelease(n: UnregisterFormValues): void
}

interface HrefProps extends PropsWithChildren {
    url?: string
}

const WrapInHref: React.FC<HrefProps> = (props) => {
    const { url, children } = props

    return (
        <>
            {url ? (
                <a href={url} target='_blank' rel='noreferrer'>
                    {children}
                </a>
            ) : (
                children
            )}
        </>
    )
}

const BabinjeCard: React.FC<Props> = (props) => {
    const item = props.data

    const [open, setOpen] = useState(false)
    const [release, setRelease] = useState(false)

    const onReserveFormSubmitted = (e) => {
        e.preventDefault()

        const { nameSurname, email } = e.target.elements
        props.onReserve({
            nameSurname: nameSurname.value,
            email: email.value,
            itemId: item.id,
        })
        setOpen(false)
    }

    const onReleaseFormSubmitted = (e) => {
        e.preventDefault()

        const { email } = e.target.elements
        props.onRelease({ email: email.value, itemId: item.id })
        setRelease(false)
    }

    return (
        <Card color={item.user ? 'red' : 'green'}>
            <Card.Content>
                <WrapInHref url={item.link}>
                    <Image
                        src={item.imgUrl ? item.imgUrl : logo}
                        label={<RazredLabela grade={item.priceGrade} />}
                    />
                </WrapInHref>
                <Card.Header
                    as={item.link && 'a'}
                    href={item.link}
                    target='_blank'>
                    {item.name}
                </Card.Header>
                {!item.isFungible && (
                    <Card.Meta>
                        {item.user ? 'Rezervirano' : 'Slobodno'}
                    </Card.Meta>
                )}
                <Card.Description>{item.desc}</Card.Description>
            </Card.Content>
            {!item.isFungible && (
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Modal
                            onClose={() => setOpen(false)}
                            onOpen={() => setOpen(true)}
                            open={open}
                            trigger={
                                <Button
                                    basic
                                    color='green'
                                    disabled={!!item.user}>
                                    Rezerviraj
                                </Button>
                            }>
                            <Header
                                icon='share'
                                content='Želite li rezervirati ovaj proizvod?'></Header>
                            <Modal.Content image>
                                <Container>
                                    <p style={{ textAlign: 'center' }}>
                                        Uspješnim unosom podataka dobijate mail
                                        u kojem potvrđujete Vašu rezervaciju!
                                    </p>
                                    <Form
                                        id='reserve_form'
                                        onSubmit={onReserveFormSubmitted}>
                                        <Form.Group widths='equal'>
                                            <Form.Field
                                                name='nameSurname'
                                                control={Input}
                                                label='Ime'
                                                required
                                            />
                                            <Form.Field
                                                name='email'
                                                control={Input}
                                                label='Email'
                                                required
                                            />
                                        </Form.Group>
                                    </Form>
                                    <p
                                        style={{
                                            fontSize: '0.8rem',
                                            textAlign: 'right',
                                        }}>
                                        Email će se koristiti u svrhu potvrde
                                        ili otkazivanja rezervacije i u nikakve
                                        druge svrhe
                                    </p>
                                </Container>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button
                                    color='black'
                                    onClick={() => setOpen(false)}
                                    negative>
                                    Neeću, falija san
                                </Button>
                                <Button
                                    content='Da, potvrdi!'
                                    labelPosition='right'
                                    icon='checkmark'
                                    form='reserve_form'
                                    type='submit'
                                    positive
                                />
                            </Modal.Actions>
                        </Modal>
                        <Modal
                            closeIcon
                            open={release}
                            trigger={
                                <Button basic color='red' disabled={!item.user}>
                                    Otpusti
                                </Button>
                            }
                            onClose={() => setRelease(false)}
                            onOpen={() => setRelease(true)}>
                            <Header
                                icon='user cancel'
                                content='Izbriši rezervaciju'
                            />
                            <Modal.Content>
                                <p>
                                    Ovaj proizvod je registriran na{' '}
                                    {item.user?.email}
                                </p>
                                <p>
                                    Potvrdite mail da bi odregistrirali proizvod
                                </p>
                                <Form
                                    id='release_form'
                                    onSubmit={onReleaseFormSubmitted}>
                                    <Form.Field
                                        name='email'
                                        control={Input}
                                        label='Email'
                                        required
                                    />
                                </Form>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button
                                    color='red'
                                    onClick={() => setRelease(false)}>
                                    <Icon name='remove' /> Ne
                                </Button>
                                <Button
                                    color='green'
                                    type='submit'
                                    form='release_form'>
                                    <Icon name='checkmark' /> Da
                                </Button>
                            </Modal.Actions>
                        </Modal>
                    </div>
                </Card.Content>
            )}
        </Card>
    )
}

export type { RegisterFormValues, UnregisterFormValues }
export default BabinjeCard
