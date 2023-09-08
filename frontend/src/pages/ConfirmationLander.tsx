import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiResponse, MutationOperationResult } from '../Models';
import { Container, Divider, Header, Icon, Segment } from 'semantic-ui-react';

const ConfirmationLander: React.FC = () => {
  const { itemId, resetString } = useParams();
  const [isGreatSuccess, setGreatSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [result, setResult] = useState<MutationOperationResult | undefined>();

  useEffect(() => {
    fetch(`/api/v1/confirm/${itemId}/${resetString}`, { method: 'POST' })
      .then((response) => {
        if (response.ok) {
          return response.json() as Promise<
            ApiResponse<MutationOperationResult>
          >;
        } else {
          throw response;
        }
      })
      .then((result) => {
        setResult(result.data);
        setGreatSuccess(true);
      })
      .catch((it) => {
        setGreatSuccess(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Segment hidden={!isLoading}>Loading</Segment>
      <Segment style={{ padding: '8em 0em' }} vertical hidden={isLoading}>
        <Container text textAlign="center">
          {isGreatSuccess ? (
            <Icon
              style={{ margin: 'auto' }}
              size="massive"
              color="green"
              name={result?.isRegister ? 'check circle' : 'hand spock'}
            />
          ) : (
            <Icon
              style={{ margin: 'auto' }}
              size="massive"
              color="red"
              name="ban"
            />
          )}
          <div hidden={!isGreatSuccess} style={{ fontSize: '1.33em' }}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              {result?.isRegister
                ? 'Hvala Vam na odabiru'
                : 'Žao nam je što odlazite'}
            </Header>
            {result?.isRegister ? (
              <p>
                Rezervirali ste artikl: "{result?.item.name}" na svoje ime.
                Drago nam je da ste odlučili sudjelovati u olakšanju života nas
                i bebe i što ste koristili ovu aplikaciju za to!
              </p>
            ) : (
              <p>
                Odustali ste od artikla: "{result?.item.name}". Žao nam je što
                odlazite, no pogledajte još jednom popis artikala pa možda Vam
                odgovara neki drugi. Hvala Vam !
              </p>
            )}
            <p>Kliknite na link ispod ako želite rezervirati nešto drugo</p>
          </div>
          <div hidden={isGreatSuccess}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              Došlo je do pogreške
            </Header>
            <div style={{ fontSize: '1.33em' }}>
              <p>
                Molim Vas ponovite registraciju! Ili je link istekao ili je
                došlo do greške.
              </p>
              <p>
                Kontaktirajte brbulic@codebase.hr za pomoć ako ponovljena
                rezervacija ne upali
              </p>
            </div>
          </div>
          <Divider
            as="h4"
            className="header"
            horizontal
            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
          >
            <a href="/">babinje</a>
          </Divider>
        </Container>
      </Segment>
    </>
  );
};

export default ConfirmationLander;
