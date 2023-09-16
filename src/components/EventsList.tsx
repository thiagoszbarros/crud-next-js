import Link from "next/link";
import RemoveButton from "./RemoveButton";
import { HiPencilAlt } from "react-icons/hi";

export default function EventsList() {
    return (
        <>
        <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
            <div>
                <h2 className="font-bold text-2xl">Nome do Evento</h2>
                <div>Descrição do evento</div>
            </div>

            <div className="flex gap-2">
                <RemoveButton />
                <Link href={'/editEvent/1'}>
                    <HiPencilAlt size={24} />
                </Link>
            </div>
        </div>
        </>
    )
}