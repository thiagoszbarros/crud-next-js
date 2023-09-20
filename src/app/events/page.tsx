import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi"
import { RiMailSendLine } from 'react-icons/ri';
import { API_URL } from "../../../config";
import DeleteButton from "@/components/DeleteButton";

type Event = {
    id: string,
    name: string,
    start_date: string,
    end_date: string,
    status: boolean
}

export default async function EventsList() {
    const events = await getEvents()

    return (
        <>
            <div className="flex-col gap-3 flex">
                <Link className='text-center bg-blue-600 font-bold text-white px-8 py-2' href={'/events/create'}>Criar</Link>

                {events.map((event: Event) => (
                    <div key={event.id} className='p-4 border border-slate-300 my-3 flex justify-between gap-5 items-center'>
                        <div>
                            <h2 className='font-bold text-2xl'>{event.name}</h2>
                            <div>De {event.start_date} até {event.end_date} </div>
                            <div>{event.status}</div>
                        </div>

                        <div className="flex gap-2">
                            <Link href={`/events/${event.id}/subscribers`}>
                                <RiMailSendLine size={24} />
                            </Link>
                            <Link href={`/events/${event.id}/edit`}>
                                <HiPencilAlt size={24} />
                            </Link>
                            <DeleteButton id={event.id} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

async function getEvents() {
    try {
        const response = await fetch(`${API_URL}/api/events`, {
            cache: 'no-store'
        })

        const data = await response.json()
        const events = data.data

        if (!response.ok) {
            alert(data.data)
            return
        }

        return events
    } catch (error) {
        return []
    }
}