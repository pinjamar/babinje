import React, { useEffect, useState } from "react";
import { BabinjeItem } from "../Models";
import { Button, Container, Dimmer, Divider, Header, Item, Loader, Segment } from "semantic-ui-react";
import BabinjeListItem from "../components/BabinjeListItem";
import AddNewItemModal from "../components/AddNewItemModal";
import babinjeProvider from "../servisi/BabinjeItemProvider"


const Dodavac: React.FC = () => {
    const [items, setItems] = useState<BabinjeItem[]>([]);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = () => {
      babinjeProvider.getAll()
      .then((govna) => {
        setItems(govna);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setTimeout(() => setIsLoading(false), 1000) );
    }

    const processAddItem = async (e) => {
      babinjeProvider.create(e).then(it => {
        fetchData()
        setIsAddOpen(false)
      }).catch(it => {
        alert("Neko sranje! Opis: " + it)
      })
    }
    useEffect(() => fetchData(), []);

      return (
        <>
        <Dimmer active={isLoading}><Loader /></Dimmer>
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
                setIsLoading(true)
                processAddItem(a)
            }} />
        </Container>
        </>
      )
}

export default Dodavac