import React, { Component, PropsWithChildren, useContext } from 'react'
import { ToastType, ToastItem } from './ToastItem'

import Toast from './Toast'

export const ToastContext = React.createContext<_ToastContextApi>({
    showMessage: () => {},
    showError: () => {},
})

interface _ToastContextApi {
    showMessage(item: ToastItem): void
    showError(message: string): void
}

class ToastWrapper {
    id: string
    item: ToastItem

    constructor(item: ToastItem) {
        this.id = new Date().toISOString()
        this.item = item
    }

    type(): any {
        switch (this.item.type) {
            case ToastType.ERROR:
                return { error: true }
            case ToastType.INFO:
                return { info: true }
            case ToastType.SUCCESS:
                return { success: true }
            case ToastType.WARNING:
                return { warning: true }
        }
    }

    icon(): string {
        switch (this.item.type) {
            case ToastType.ERROR:
                return 'exclamation'
            case ToastType.INFO:
                return 'info circle'
            case ToastType.SUCCESS:
                return 'check'
            case ToastType.WARNING:
                return 'warning sign'
        }
    }
}

export function useToast() {
    return useContext(ToastContext)
}

export type { ToastWrapper }

class Provider extends Component<
    PropsWithChildren<object>,
    { list: ToastWrapper[] }
> {
    state = {
        list: [],
    }

    showToast(toast: ToastItem): void {
        const newList = [...this.state.list, new ToastWrapper(toast)]
        this.setState({
            list: newList,
        })
    }

    render() {
        const self = this
        return (
            <>
                <Toast
                    toastList={this.state.list}
                    autoDelete={true}
                    dismissTime={3000}
                    position='bottom-right'
                />
                <ToastContext.Provider
                    value={{
                        showMessage: (item: ToastItem) => {
                            self.showToast(item)
                        },
                        showError: (txt: string) => {
                            self.showToast({
                                type: ToastType.ERROR,
                                title: 'Babinje',
                                description: txt,
                            })
                        },
                    }}
                >
                    {this.props.children}
                </ToastContext.Provider>
            </>
        )
    }
}

export default Provider
