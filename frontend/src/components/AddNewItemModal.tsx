import React, { useState } from 'react'
import {
    Button,
    Container,
    Dimmer,
    Form,
    FormProps,
    Header,
    Input,
    Modal,
    Segment,
    TextArea,
} from 'semantic-ui-react'
import babinjeProvider from '../servisi/BabinjeItemProvider'
import { BabinjeItemLinkParse } from '../Models'

interface result {
    name: string
    desc: string
    link: string
    imgUrl: string
}

interface Props {
    isOpen: boolean
    onClose(): void
    onSubmit?(n: result): void
}

const AddNewItemModal: React.FC<Props> = (props) => {
    const { isOpen } = props

    const [state, setState] = useState<BabinjeItemLinkParse>({
        name: '',
        link: '',
        imgUrl: '',
        desc: '',
    })

    const handleChange = (e, { name, value }) => setState({ [name]: value })

    const onCreate = (e: any, data: FormProps) => {
        e.preventDefault()

        const form = e.target
        const formData = new FormData(form)

        props.onSubmit?.(
            Object.fromEntries(formData.entries()) as any as result,
        )
    }

    const onChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const url = Object.fromEntries(formData.entries()).link2 as string

        try {
            const result = await babinjeProvider.checkLink(url)
            setState(result)
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <Modal open={isOpen}>
            <Modal.Header>Dodaj novi</Modal.Header>
            <Modal.Content>
                <Segment basic style={{ padding: 0 }}>
                    <Dimmer inverted>Loading</Dimmer>
                    <Form onSubmit={onChange}>
                        <Form.Group widths={'equal'}>
                            <Form.Field
                                name='link2'
                                control={Input}
                                placeholder='Link do artikla'
                            />
                            <Button type='submit'>Probaj</Button>
                        </Form.Group>
                    </Form>
                </Segment>
                <Container
                    textAlign='center'
                    style={{ 'margin-bottom': '1em' }}>
                    <Header as='h3'>Ručni unos</Header>
                </Container>
                <Container>
                    <Form id='nova-forma' onSubmit={onCreate}>
                        <Form.Group widths='equal'>
                            <Form.Field
                                name='name'
                                control={Input}
                                label='Ime'
                                value={state.name}
                                required
                                onChange={handleChange}
                            />
                            <Form.Field
                                name='link'
                                control={Input}
                                label='Link do artikla'
                                value={state.link}
                                onChange={handleChange}
                            />
                            <Form.Field
                                name='imgUrl'
                                control={Input}
                                label='Link do slike'
                                value={state.imgUrl}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Field
                            name='desc'
                            control={TextArea}
                            label='Opis'
                            required
                            placeholder='Opis'
                            value={state.desc}
                            onChange={handleChange}
                        />
                    </Form>
                </Container>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={props.onClose} color='black'>
                    Cancel
                </Button>
                <Button
                    form='nova-forma'
                    type='submit'
                    content='Napravi novi'
                    labelPosition='right'
                    icon='checkmark'
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default AddNewItemModal
