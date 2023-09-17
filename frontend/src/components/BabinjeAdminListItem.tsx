import React, { useState } from 'react'
import { BabinjeItem } from '../Models'
import { Button, Confirm, Item } from 'semantic-ui-react'

const logo = new URL('../images/baby-logo.jpg', import.meta.url)

interface Props {
    item: BabinjeItem
    onDelete()
}

const BabinjeAdminListItem: React.FC<Props> = (props) => {
    const { name, link, desc, user, imgUrl } = props.item

    const [isConfirmOpen, setConfirmOpen] = useState(false)

    const onClose = () => setConfirmOpen(false)

    const onDelete = async () => {
        await props.onDelete()
        onClose()
    }

    return (
        <Item>
            <Item.Image size='tiny' src={imgUrl ?? logo} alt='logo' />

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
