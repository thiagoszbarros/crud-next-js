import Link from "next/link"
import EventInput from "@/components/EventInput"

export default function create() {
    return <form className="flex-col gap-3 flex">
        <EventInput />
        <button className="bg-green-600 font-bold text-white px-8 py-2">
            Criar
        </button>
        <Link className="text-center bg-blue-600 font-bold text-white px-8 py-2" href={'/events'}>Voltar</Link>
    </form>
}