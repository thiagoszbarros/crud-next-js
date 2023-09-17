import Link from "next/link"
import { API_URL } from "../../../../../config";

export default async function subscribersList({ params }: any) {

    const { id } = params;

    type Subscriber = {
        id: number,
        name: string,
        email: string,
        cpf: string,
    }

    const subscribers: Subscriber[] = await getSubscribers(id);

    return (
        <>
            <div className="flex-col gap-3 flex">
                <Link className='text-center bg-neutral-600 font-bold text-white px-8 py-2' href={'/events'}>Voltar</Link>
                {subscribers.map((subscriber: Subscriber) => (
                    <div key={subscriber.id} className='p-4 border border-slate-300 my-3 flex justify-between gap-5 items-center'>
                        <div>
                            <h2 className='font-bold text-2xl'>{subscriber.name}</h2>
                            <div>{subscriber.email}</div>
                            <div>{subscriber.cpf}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

async function getSubscribers(id: string) {
    try {
        const response = await fetch(`${API_URL}/api/events/${id}/subscribers?event_id=${id}`, {
            cache: 'no-store'
        })

        const data = await response.json()

        const subscribers = data.data

        if (!response.ok) {
            alert(data.data)
            return
        }

        return subscribers
    } catch (error) {
        return []
    }
}
