import Link from 'next/link';
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
            {events.map((event: Event) => (
                <div className='p-4 border border-slate-300 my-3 flex justify-between gap-5 items-center'>
                    <div>
                        <h2 className='font-bold text-2xl'>{event.name}</h2>
                        <div>De {brazilianStandard(event.start_date)} até {brazilianStandard(event.end_date)} </div>
                        <div>{event.status}</div>
                    </div>

                    <div className='flex gap-2 justify-between'>
                        <Link className='p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start cursor-pointer' href={`/subscribe/${event.id}`}>
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
        return [{}]
    }
}

function brazilianStandard(date: string) {
    return new Date(date).toLocaleDateString('pt-BR')
}