import { API_URL } from "../../../../../config";
import EventInput from "@/components/EventInput";

export default async function Edit({ params }: any) {
    type Event = {
        id: number,
        name: string,
        start_date: string,
        end_date: string,
        status: boolean
    }

    const { id } = params;

    const event: Event = await getEvent(id)

    const name = event.name
    const startDate = event.start_date
    const endDate = event.end_date

    return  <EventInput id={id} name={name} startDate={startDate} endDate={endDate} />
}

async function getEvent(id: string) {
    try {
        const response = await fetch(`${API_URL}/api/events/${id}`, {
            cache: 'no-store'
        })

        if (!response.ok) {
            throw new Error('Houve um erro ao buscar os eventos.')
        }

        const data = await response.json()
        const event = data.data
        return event
    } catch (error) {
        return [{}]
    }
}