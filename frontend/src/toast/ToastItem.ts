enum ToastType {
    SUCCESS = 1,
    ERROR,
    INFO,
    WARNING
}

interface ToastItem {
    type: ToastType,
    title: string
    description: string
}

export type { ToastItem }
export {ToastType}