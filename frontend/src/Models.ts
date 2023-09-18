interface BabinjeItem {
    id: number // = Column(Integer, primary_key=True)
    name: string // = Column(String(255), nullable=False)
    desc?: string // = Column(String(10000), nullable=True)
    imgUrl?: string // = Column(String(255), nullable=True)
    isBought: number // = Column(Integer, nullable=False, default=0)
    isFungible: boolean
    link?: string
    priceGrade?: string
    user?: User
}

interface BabinjeItemLinkParse {
    name: string
    desc: string
    imgUrl: string
    link: string
}

interface MutationOperationResult {
    isRegister: boolean
    item: BabinjeItem
}

interface User {
    id: number
    email: string
}

interface ApiResponse<T> {
    data?: T
}

export type {
    BabinjeItem,
    ApiResponse,
    User,
    BabinjeItemLinkParse,
    MutationOperationResult,
}
