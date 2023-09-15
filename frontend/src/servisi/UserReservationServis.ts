import { ApiResponse } from '../Models'

interface ReservationResult {
    refresh_link: string
}

interface UserReservationServis {
    register(
        itemId: number,
        email: string,
        nameSurname?: string,
    ): Promise<ReservationResult>
    // unregister(itemId: string, email: string): Promise<boolean>
}

async function parseError(e: Response): Promise<string> {
    try {
        const json = await e.json()
        return `Greška: ${json.message}, kod ${json.code}`
    } catch {
        return 'Nepoznata greška - ' + e.status
    }
}

class _Servis implements UserReservationServis {
    async register(
        itemId: number,
        email: string,
        nameSurname?: string,
    ): Promise<ReservationResult> {
        const dto = {
            name: nameSurname,
            email: email,
        }

        const response = await fetch(`/api/v1/item/${itemId}/mutate`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dto),
        })

        if (response.ok) {
            const result =
                (await response.json()) as ApiResponse<ReservationResult>
            return result.data || { refresh_link: '' }
        }

        throw new Error(await parseError(response))
    }
}

export default new _Servis() as UserReservationServis
