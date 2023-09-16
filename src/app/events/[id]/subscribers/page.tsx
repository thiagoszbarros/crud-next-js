import Link from "next/link"

export default async function subscribersList() {
    type Subscriber = {
        id: number,
        name: string,
        email: string,
        cpf: string,
    }

    const subscribers: Subscriber[] = await getSubscribers();

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

async function getSubscribers() {
    try {

        return [
            {
                id: 1,
                name: 'John Doe',
                email: 'jonh@doe.com',
                cpf: '99999999999',
            },
            {
                id: 2,
                name: 'John Doe',
                email: 'jonh@doe.com',
                cpf: '99999999999',
            },
        ]
    } catch (error) {
        return []
    }
}
