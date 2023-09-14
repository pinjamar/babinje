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

interface Props {
    data: BabinjeItem
    onReserve(obj): void
    onRelease(n): void
}

const BabinjeCard: React.FC<Props> = (props) => {
    const item = props.data

    const [open, setOpen] = useState(false)
    const [release, setRelease] = useState(false)

    const onReserveFormSubmitted = (e) => {
        e.preventDefault()

        const form = e.target
        const formData = new FormData(form)

        const obj = Object.fromEntries(formData.entries())
        props.onReserve(obj)
    }

    return (
        <Card>
            <Card.Content>
                <Image floated='right' size='mini' src={logo} />
                <Card.Header>{item.name}</Card.Header>
                <Card.Meta>{item.isBought ? 'Kupljeno' : 'Slobodno'}</Card.Meta>
                <Card.Description>
                    {item.link ? (
                        <>
                            <a href={item.link}>Link</a> - {item.desc}
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
                            <Button basic color='green'>
                                Rezerviraj
                            </Button>
                        }>
                        <Modal.Header>
                            Želite li rezervirati ovaj proizvod?
                        </Modal.Header>
                        <Modal.Content image>
                            <Form id='form' onSubmit={onReserveFormSubmitted}>
                                <Form.Field
                                    name='pala'
                                    control={Input}
                                    label='Ime'
                                    required
                                />
                                <Form.Field
                                    name='cinka'
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
                                form='form'
                                type='submit'
                                positive
                            />
                        </Modal.Actions>
                    </Modal>
                    <Modal
                        closeIcon
                        open={release}
                        trigger={
                            <Button basic color='red'>
                                Otpusti
                            </Button>
                        }
                        onClose={() => setRelease(false)}
                        onOpen={() => setRelease(true)}>
                        <Header icon='archive' content='Archive Old Messages' />
                        <Modal.Content>
                            <p>Ovaj prozivod je registriran na b***c@g**.*m</p>
                            <p>Potvride mail da bi odregsitrirali prozizvod</p>
                            <input name='email' />
                        </Modal.Content>
                        <Modal.Actions>
                            <Button
                                color='red'
                                onClick={() => setRelease(false)}>
                                <Icon name='remove' /> Ne
                            </Button>
                            <Button
                                color='green'
                                onClick={() => setRelease(false)}>
                                <Icon name='checkmark' /> Da
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </div>
            </Card.Content>
        </Card>
    )
}

export default BabinjeCard
