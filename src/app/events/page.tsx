import Link from "next/link";
import { HiOutlineTrash, HiPencilAlt } from "react-icons/hi"
import { RiMailSendLine } from 'react-icons/ri';

export default async function EventsList() {

    type Event = {
        id: number,
        name: string,
        start_date: string,
        end_date: string,
        status: boolean
    }

    const events = await getEvents()

    return (
        <>
            <div className="flex-col gap-3 flex">
                <Link className='text-center bg-blue-600 font-bold text-white px-8 py-2' href={'/events/create'}>Criar</Link>

                {events.map((event: Event) => (
                    <div key={event.id} className='p-4 border border-slate-300 my-3 flex justify-between gap-5 items-center'>
                        <div>
                            <h2 className='font-bold text-2xl'>{event.name}</h2>
                            <div>De {dateToBrazilianLocation(event.start_date)} até {dateToBrazilianLocation(event.end_date)} </div>
                            <div>{event.status}</div>
                        </div>

                        <div className="flex gap-2">
                            <Link href={`/events/${event.id}/subscribers`}>
                                <RiMailSendLine size={24} />
                            </Link>
                            <Link href={`/events/edit/${event.id}`}>
                                <HiPencilAlt size={24} />
                            </Link>
                            <button className="text-red-400">
                                <HiOutlineTrash size={24} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

async function getEvents() {
    try {
        const response = await fetch('https://demo.ws.itarget.com.br/event.php', {
            cache: 'no-store'
        })

        if (!response.ok) {
            throw new Error('Houve um erro ao buscar os eventos.')
        }

        const data = await response.json()
        const events = data.data
        return events
    } catch (error) {
        return []
    }
}

function dateToBrazilianLocation(date: string) {
    return new Date(date).toLocaleDateString('pt-BR')
}