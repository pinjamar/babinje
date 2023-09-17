import React, { useState } from 'react'
import { BabinjeItem } from '../Models'
import { Button, Confirm, Dropdown, Item } from 'semantic-ui-react'
import RazredLabela from './RazredLabela'

const logo = new URL('../images/baby-logo.jpg', import.meta.url)

interface Props {
    item: BabinjeItem
    onDelete()
    onRazredUpdate(id, razred: string)
}

const options = [
    { key: 1, value: 'A', text: 'A' },
    { key: 2, value: 'B', text: 'B' },
    { key: 3, value: 'C', text: 'C' },
    { key: 4, value: 'D', text: 'D' },
    { key: 5, value: 'F', text: 'F' },
]

const BabinjeAdminListItem: React.FC<Props> = (props) => {
    const { name, link, desc, user, imgUrl } = props.item

    const [isConfirmOpen, setConfirmOpen] = useState(false)

    const onClose = () => setConfirmOpen(false)

    const onDelete = async () => {
        await props.onDelete()
        onClose()
    }

    const onChange = (id, value) => {
        props.onRazredUpdate(id, value)
    }

    return (
        <Item>
            <Item.Image size='tiny' src={imgUrl ? imgUrl : logo} alt='logo' />

            <Item.Content>
                <Item.Header>{name}</Item.Header>
                <Item.Meta>
                    <a href={link ?? '#'} target='_blank' rel='noreferrer'>
                        Link
                    </a>
                </Item.Meta>
                <Item.Description>
                    <p>{desc}</p>
                </Item.Description>
                <Item.Extra>
                    <Button size='mini' onClick={() => setConfirmOpen(true)}>
                        Izbriši
                    </Button>
                    <RazredLabela grade={props.item.priceGrade} />
                    <Dropdown
                        options={options}
                        clearable
                        placeholder='Razred cijene'
                        value={props.item.priceGrade}
                        onChange={(d, v) => onChange(props.item.id, v.value)}
                    />
                    <Confirm
                        open={isConfirmOpen}
                        content={'Želite li izbrisat ' + name + '?'}
                        onCancel={onClose}
                        onConfirm={onDelete}
                    />
                    {user ? 'Rezervirao: ' + user.email : 'Slobodno'}
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}

export default BabinjeAdminListItem
