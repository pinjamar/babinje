import { ApiResponse, BabinjeItem, BabinjeItemLinkParse } from '../Models'

interface BabinjeItemCreate {
    name: string
    desc: string
    link?: string
    imgUrl?: string
}

interface BabinjeItemProvider {
    getAll(): Promise<Array<BabinjeItem>>
    create(item: BabinjeItemCreate): Promise<BabinjeItem>
    delete(itemId: number): Promise<boolean>
    checkLink(url: string): Promise<BabinjeItemLinkParse>
}

async function parseError(e: Response): Promise<string> {
    try {
        const json = await e.json()
        return `Greška: ${json.message}, kod ${json.code}`
    } catch {
        return 'Nepoznata greška - ' + e.status
    }
}
class _BabinjeItem implements BabinjeItemProvider {
    async getAll(): Promise<BabinjeItem[]> {
        return fetch('api/v1/items')
            .then((response) => {
                if (response.ok) {
                    const result = response.json() as Promise<
                        ApiResponse<BabinjeItem[]>
                    >
                    return result
                } else {
                    throw response
                }
            })
            .then((json) => {
                return json.data || []
            })
    }

    async create(itemDto: BabinjeItemCreate): Promise<BabinjeItem> {
        const response = await fetch(
            '/api/v1/44ba0bb01331a2c0c9d6a835d0091c2c9033721afd612c30',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemDto),
            },
        )

        const jsonResult = (await response.json()) as ApiResponse<BabinjeItem>
        if (!jsonResult.data) {
            throw response
        }

        return jsonResult.data
    }

    async checkLink(url: string): Promise<BabinjeItemLinkParse> {
        const dto = {
            url,
        }
        const response = await fetch('/api/v1/parseUrl', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dto),
        })

        if (response.ok) {
            const jsonResult =
                (await response.json()) as ApiResponse<BabinjeItemLinkParse>
            return jsonResult.data
        }

        throw new Error(await parseError(response))
    }

    async delete(itemId: number): Promise<boolean> {
        const response = await fetch(
            `/api/v1/bde372d8c36a146728d84419179a703f0d1bb63f530e384e/${itemId}`,
            {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                },
            },
        )

        if (response.ok) {
            const jsonResult = (await response.json()) as ApiResponse<boolean>
            return jsonResult.data ?? false
        }

        throw new Error(await parseError(response))
    }
}

export default new _BabinjeItem() as BabinjeItemProvider
