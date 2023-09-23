'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { NEXT_PUBLIC_CLIENT_API_URL } from "../../../../config";

export default function Create() {

    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        try {
            const response = await fetch(`${NEXT_PUBLIC_CLIENT_API_URL}/api/events`, {
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
                    name: name,
                    start_date: startDate,
                    end_date: endDate
                })
            })

            const data = await response.json()

            if (!response.ok) {
                alert(data.message)
                return
            }

            alert(data.data)
            router.push('/events')
            router.refresh()

        } catch (error) {
            return
        }
    }

    return <form onSubmit={handleSubmit} className="flex-col gap-3 flex">
        <input onChange={(e) => setName(e.target.value)}
            value={name}
            className="border border-slate-500 px-8 py-2"
            type="text"
            placeholder="Nome do evento"
            required
        />
        <input
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
            className="border border-slate-500 px-8 py-2"
            type="text"
            placeholder="Data de início (yyyy-mm-dd)"
            required
        />
        <input
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
            className="border border-slate-500 px-8 py-2"
            type="text"
            placeholder="Data do fim (yyyy-mm-dd)"
            required
        />
        <button type="submit" className="bg-green-600 font-bold text-white px-8 py-2">
            Criar
        </button>
        <Link className="text-center bg-blue-600 font-bold text-white px-8 py-2"
            href={'/events'}>
            Voltar
        </Link>
    </form>
}