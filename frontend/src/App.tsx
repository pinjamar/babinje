import React from 'react'
import { Outlet } from 'react-router-dom'

import { Container, Menu, Image, Header, Divider } from 'semantic-ui-react'
import ToastProvider from './toast/ToastProvider'

const logo = new URL('./images/baby-logo.jpg', import.meta.url)
const ENV = process.env.NODE_ENV

const App: React.FC = () => {
    const isProduction = ENV === 'production'

    return (
        <ToastProvider>
            <Menu>
                <Container>
                    <Menu.Item as='a' header href='/'>
                        <Image
                            circular
                            size='mini'
                            src={logo}
                            alt='logo'
                            style={{ marginRight: '1.5em' }}
                        />
                        Babinje
                    </Menu.Item>
                    <Menu.Item as='a' href='/'>
                        Artikli
                    </Menu.Item>
                    <Menu.Item as='a' href='/potrosna'>
                        Potrošna roba
                    </Menu.Item>
                    {!isProduction && (
                        <Menu.Item
                            as='a'
                            href='/95a0bd0ed04ad8e8b93cef059bf99ac0b338b259e6bd084e'>
                            Admin
                        </Menu.Item>
                    )}
                </Container>
            </Menu>

            <Container>
                <Outlet />
            </Container>
            <Container textAlign='center'>
                <Divider as='h4' horizontal>
                    <Header as='h4'>Babinje - CODE BASE d.o.o. - 2023.</Header>
                </Divider>
                <Image
                    circular
                    size='tiny'
                    src={logo}
                    alt='logo'
                    style={{ margin: 'auto', padding: 0 }}
                />
            </Container>
        </ToastProvider>
    )
}

export default App
