export default function EditEventForm() {
    return (
        <form className="flex-col gap-3 flex">
            <input className="border border-slate-500 px-8 py-2" type="text" placeholder="Nome do evento" />
            <input className="border border-slate-500 px-8 py-2" type="text" placeholder="Descrição do evento" />
            <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
                Editar evento
            </button>
        </form>
    )
}