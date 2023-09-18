import React, { useEffect, useState } from 'react'
import {
    Button,
    Container,
    Dimmer,
    Form,
    FormProps,
    Header,
    Input,
    Loader,
    Modal,
    Segment,
    TextArea,
} from 'semantic-ui-react'
import babinjeProvider from '../servisi/BabinjeItemProvider'
import { BabinjeItemLinkParse } from '../Models'
import { useToast } from '../toast/ToastProvider'

interface result {
    name: string
    desc: string
    link: string
    isFungible: boolean
    imgUrl: string
}

interface Props {
    isOpen: boolean
    onClose(): void
    onSubmit?(n: result): void
}

const DEAFULT_FORM_VALUES = {
    name: '',
    link: '',
    imgUrl: '',
    desc: '',
}

const AddNewItemModal: React.FC<Props> = (props) => {
    const { isOpen } = props

    const [formValues, setFormValues] = useState<BabinjeItemLinkParse>(
        Object.assign({}, DEAFULT_FORM_VALUES),
    )
    const [isLinkParserLoading, setLinkParserLoading] = useState(false)
    const toast = useToast()

    useEffect(() => {
        if (!isOpen) {
            setFormValues(Object.assign({}, DEAFULT_FORM_VALUES))
        }
    }, [props.isOpen])

    const handleChange = (e, { name, value }) =>
        setFormValues({ [name]: value })

    const onCreate = (e: any, data: FormProps) => {
        e.preventDefault()

        const form = e.target
        const formData = new FormData(form)
        const values = Object.fromEntries(formData.entries())

        values.isFungible = 'isFungible' in values

        props.onSubmit?.(values)
    }

    const onChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const url = Object.fromEntries(formData.entries()).link2 as string

        setLinkParserLoading(true)
        try {
            const result = await babinjeProvider.checkLink(url)
            setFormValues(result)
        } catch (error) {
            toast.showError(error.message)
        }
        setLinkParserLoading(false)
    }

    return (
        <Modal open={isOpen}>
            <Modal.Header>Dodaj novi</Modal.Header>
            <Modal.Content>
                <Segment basic style={{ padding: '0em 0em 3em 0em' }}>
                    <Dimmer active={isLinkParserLoading} inverted>
                        <Loader>Loading...</Loader>
                    </Dimmer>
                    <Header
                        textAlign='center'
                        as='h3'
                        style={{ margin: '0.5em 0em' }}>
                        Automatski iz linka
                    </Header>
                    <Form onSubmit={onChange}>
                        <Form.Group widths={'equal'}>
                            <Form.Field
                                name='link2'
                                required
                                control={Input}
                                placeholder='Link do artikla'
                            />
                            <Button type='submit'>Probaj</Button>
                        </Form.Group>
                    </Form>
                </Segment>
                <Container textAlign='center' style={{ marginBottom: '1em' }}>
                    <Header as='h3'>Ručni unos</Header>
                </Container>
                <Container>
                    <Form id='nova-forma' onSubmit={onCreate}>
                        <Form.Group widths='equal'>
                            <Form.Field
                                name='name'
                                control={Input}
                                label='Ime'
                                value={formValues.name}
                                required
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field
                                name='link'
                                control={Input}
                                label='Link do artikla'
                                value={formValues.link}
                                onChange={handleChange}
                            />
                            <Form.Field
                                name='imgUrl'
                                control={Input}
                                label='Link do slike'
                                value={formValues.imgUrl}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Field
                            name='desc'
                            control={TextArea}
                            label='Opis'
                            required
                            placeholder='Opis'
                            value={formValues.desc}
                            onChange={handleChange}
                        />
                        <Form.Group widths='equal'>
                            <Form.Checkbox
                                name='isFungible'
                                label='Artikl je potrošna roba'
                            />
                        </Form.Group>
                    </Form>
                </Container>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    disabled={isLinkParserLoading}
                    onClick={props.onClose}
                    color='black'>
                    Cancel
                </Button>
                <Button
                    form='nova-forma'
                    disabled={isLinkParserLoading}
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
