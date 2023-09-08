import React from "react";
import { BabinjeItem } from "../Models";
import { Item } from "semantic-ui-react";

const logo = new URL('../images/baby-logo.jpg', import.meta.url);

interface Props
{
    item: BabinjeItem
}

const BabinjeListItem: React.FC<Props> = (props) => {
    const { name, link, desc, user } = props.item

    return (
        <Item>
            <Item.Image size='tiny' src={logo} alt="logo" />

            <Item.Content>
                <Item.Header>{name}</Item.Header>
                <Item.Meta><a href={link ?? "#"}>Link</a></Item.Meta>
                <Item.Description>                    
                    <p>{desc}</p>                    
                </Item.Description>
                <Item.Extra>
                    {user ? "Rezervirao: " + user.email : "Slobodno"}
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}

export default BabinjeListItem;