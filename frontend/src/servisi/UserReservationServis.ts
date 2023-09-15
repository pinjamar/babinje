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

        return fetch(`/api/v1/item/${itemId}/mutate`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dto),
        })
            .then((response) => {
                if (response.ok) {
                    const result = response.json() as Promise<
                        ApiResponse<ReservationResult>
                    >
                    return result
                } else {
                    throw response
                }
            })
            .then((json) => {
                return json.data || { refresh_link: '' }
            })
    }
}

export default new _Servis() as UserReservationServis
