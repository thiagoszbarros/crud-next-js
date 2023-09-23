import Link from 'next/link';
import { RiMailSendLine } from 'react-icons/ri';
import { NEXT_PUBLIC_API_URL } from '../../config';


type Event = {
    id: number,
    name: string,
    start_date: string,
    end_date: string,
    status: boolean
}

export default async function EventsList() {
    const events = await getEvents()

    return (
        <>
            {events.map((event: Event) => (
                <div key={event.id} className='p-4 border border-slate-300 my-3 flex justify-between gap-5 items-center'>
                    <div>
                        <h2 className='font-bold text-2xl'>{event.name}</h2>
                        <div>De {event.start_date} até {event.end_date} </div>
                        <div>{event.status}</div>
                    </div>

                    <div className='flex gap-2 justify-between'>
                        <Link className='p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start cursor-pointer' href={`events/${event.id}/subscribe`}>
                            <label className='cursor-pointer'>Inscrição</label>
                            <RiMailSendLine size={24} />
                        </Link>
                    </div>
                </div>
            ))}

        </>
    )
}

async function getEvents() {
    try {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/events`, {
            cache: 'no-store'
        })

        const data = await response.json()

        if (!response.ok) {
            alert(data.data ?? data.message)
            return
        }

        return data.data
    } catch (error) {
        return []
    }
}