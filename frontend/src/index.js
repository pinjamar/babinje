import { createRoot } from 'react-dom/client'
import React from 'react'
import Error from './router/Error'
import ItemList from './pages/ItemList'
import Dodavac from './pages/Dodavac'
import ConfirmationLander from './pages/ConfirmationLander'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: '',
                element: <ItemList isFungible={false} />,
            },
            {
                path: 'potrosna',
                element: <ItemList isFungible={true} />,
            },
            {
                path: '95a0bd0ed04ad8e8b93cef059bf99ac0b338b259e6bd084e',
                element: <Dodavac />,
            },
            {
                path: 'confirm/:itemId/:resetString',
                element: <ConfirmationLander />,
            },
        ],
    },
])

createRoot(document.getElementById('app')).render(
    <RouterProvider router={router} />,
)
