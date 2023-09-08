import React, { useEffect, useState } from "react";
import { ApiResponse, BabinjeItem } from "../Models";
import { Button, Container, Divider, Grid, Header, Item, Segment } from "semantic-ui-react";
import BabinjeListItem from "../components/BabinjeListItem";
import AddNewItemModal from "../components/AddNewItemModal";


const Dodavac: React.FC = () => {
    const [items, setItems] = useState<BabinjeItem[]>([]);
    const [isAddOpen, setIsAddOpen] = useState(false);

    useEffect(() => {
        fetch('api/v1/items')
          .then((response) => {
            if (response.ok) {
              let result = response.json() as Promise<ApiResponse<BabinjeItem[]>>;
              return result;
            } else {
              throw response;
            }
          })
          .then((json) => {
            setItems(json.data ?? []);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);

      return (
        <Container>
            <Header as="h2">Popis stvari</Header>
            <p>Lista stvari koje se nalaze trenutno</p>
            <Segment basic textAlign="right">
                <Button
                    color='teal'
                    content='Dodaj novi artikl'
                    icon='add'
                    onClick={() => setIsAddOpen(true)}
                    labelPosition='left'
                />
            </Segment>
            <Divider horizontal></Divider>
            <Container>
            <Item.Group divided>
                {items.map(it => <BabinjeListItem item={it} />)}            
            </Item.Group>
            </Container>
            <AddNewItemModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onSubmit={(a) => {
                alert(JSON.stringify(a))
                setIsAddOpen(false)
            }} />
        </Container>
      )
}

export default Dodavac