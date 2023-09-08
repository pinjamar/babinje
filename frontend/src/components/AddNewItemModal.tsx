import React from "react";
import { Button, Form, FormProps, Header, Input, Modal, TextArea } from "semantic-ui-react";

interface result
{
    name: string
    desc: string
    link: string
}

interface Props
{
    isOpen: boolean
    onClose(): void
    onSubmit?(n: result): void 
}

const AddNewItemModal: React.FC<Props> = (props) => {
    const { isOpen } = props

    const onCreate = (e: any, data: FormProps) => {
        e.preventDefault()

        const form = e.target;
        const formData = new FormData(form);

        props.onSubmit?.(Object.fromEntries(formData.entries()) as any as result)
    }

    const error={
        content: 'Unesite vrijednost',
        pointing: 'below',
    }

    return (
        <Modal open={isOpen}>
        <Modal.Header>Želite li rezervirati ovaj proizvod?</Modal.Header>
        <Modal.Content>
        <Form id="nova-forma" onSubmit={onCreate}> 
            <Form.Group widths='equal'>
                <Form.Field
                    name='name'
                    control={Input}
                    label='Ime'
                    required
                />
                <Form.Field
                    name='link'
                    control={Input}
                    label='Link do artikla'                    
                />
            </Form.Group>
                <Form.Field
                name='desc'
                control={TextArea}
                label='Opis'
                required
                placeholder='Opis'
                />
        </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={props.onClose} color="black">
            Cancel
          </Button>
          <Button
            form="nova-forma" type="submit"
            content="Napravi novi"
            labelPosition="right"
            icon="checkmark"
            positive
          />
        </Modal.Actions>
      </Modal>
    )
}

export default AddNewItemModal