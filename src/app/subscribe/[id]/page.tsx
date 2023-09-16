import Link from "next/link"

export default function Subscribe() {
    return (
        <form className="flex-col gap-3 flex">
            <input className="border border-slate-500 px-8 py-2" type="text" placeholder="Seu nome" required />
            <input className="border border-slate-500 px-8 py-2" type="email" placeholder="Seu melhor email" required />
            <input className="border border-slate-500 px-8 py-2" type="text" placeholder="Seu CPF" required />
            <button className="bg-green-600 font-bold text-white px-8 py-2">
                Realizar inscrição
            </button>
            <Link className="text-center bg-blue-600 font-bold text-white px-8 py-2" href={'/'}>Voltar</Link>
        </form>
    )
}