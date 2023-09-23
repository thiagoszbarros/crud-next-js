import EditEventForm from "@/components/EditEventForm";
import { NEXT_PUBLIC_API_URL } from "../../../../../config";

type Event = {
    id: number,
    name: string,
    start_date: string,
    end_date: string,
    status: boolean
}

export default async function Edit({ params }: any) {

    const { id } = params;
    const event: Event = await getEvent(id)
    const name = event.name
    const startDate = event.start_date
    const endDate = event.end_date

    return <EditEventForm id={id} name={name} startDate={startDate} endDate={endDate} />
}

async function getEvent(id: string) {
    try {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/events/${id}`, {
            cache: 'no-store'
        })
        const data = await response.json()

        if (!response.ok) {
            alert(data.data ?? data.message)
            return
        }

        return data.data
    } catch (error) {
        return {}
    }
}