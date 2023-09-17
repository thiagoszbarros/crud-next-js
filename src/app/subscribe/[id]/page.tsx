'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { API_URL } from "../../../../config";

export default function subscribe({ params }: any) {

    const { id } = params;

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [CPF, setCPF] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        try {
            const response = await fetch(`${API_URL}/api/subscribers`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                },
                mode: 'cors',
                body: JSON.stringify({
                    event_id: id,
                    name: name,
                    email: email,
                    cpf: CPF
                })
            })

            const data = await response.json()

            if (!response.ok) {
                alert(data.message)
                return
            }

            alert(data.data)
            router.push('/')
            router.refresh()

        } catch (error) {

        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex-col gap-3 flex">
            <input onChange={(e) => setName(e.target.value)}
                value={name}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Seu nome"
                required
            />
            <input onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border border-slate-500 px-8 py-2"
                type="email"
                placeholder="Seu melhor email"
                required
            />
            <input onChange={(e) => setCPF(e.target.value)}
                value={CPF}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Seu CPF"
                required
            />
            <button type="submit"
                className="bg-green-600 font-bold text-white px-8 py-2">
                Realizar inscrição
            </button>
            <Link className="text-center bg-blue-600 font-bold text-white px-8 py-2"
                href={'/'}>Voltar
            </Link>
        </form>
    )
}