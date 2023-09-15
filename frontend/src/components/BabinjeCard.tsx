import React, { useState } from 'react'
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
} from 'semantic-ui-react'

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
        <Card>
            <Card.Content>
                <Image floated='right' size='mini' src={logo} />
                <Card.Header>{item.name}</Card.Header>
                <Card.Meta>{item.user ? 'Rezervirano' : 'Slobodno'}</Card.Meta>
                <Card.Description>
                    {item.link ? (
                        <>
                            <a
                                href={item.link}
                                target='_blank'
                                rel='noreferrer'>
                                Link
                            </a>{' '}
                            - {item.desc}
                        </>
                    ) : (
                        <div>{item.desc}</div>
                    )}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Modal
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        trigger={
                            <Button basic color='green' disabled={!!item.user}>
                                Rezerviraj
                            </Button>
                        }>
                        <Modal.Header>
                            Želite li rezervirati ovaj proizvod?
                        </Modal.Header>
                        <Modal.Content image>
                            <Form
                                id='reserve_form'
                                onSubmit={onReserveFormSubmitted}>
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
                            </Form>
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
                        <Header icon='archive' content='Archive Old Messages' />
                        <Modal.Content>
                            <p>
                                Ovaj proizvod je registriran na{' '}
                                {item.user?.email}
                            </p>
                            <p>Potvrdite mail da bi odregistrirali proizvod</p>
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
        </Card>
    )
}

export type { RegisterFormValues, UnregisterFormValues }
export default BabinjeCard
