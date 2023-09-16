export default function EventInput() {
    return (
        <>
            <input className="border border-slate-500 px-8 py-2" type="text" placeholder="Nome do evento" required />
            <input className="border border-slate-500 px-8 py-2" type="text" placeholder="Data de início" required />
            <input className="border border-slate-500 px-8 py-2" type="text" placeholder="Data do fim" required />
        </>
    )
}