'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { NEXT_PUBLIC_CLIENT_API_URL } from "../../../../../config";
import React from "react"
import InputMask from "react-input-mask";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { successMessage, warningMessage, errorMessage } from "@/components/Utils";

type SubscriptionParams = {
    id: string;
    name: string;
    email: string;
    cpf: string;
}

export default function Subscribe({ params }: { params: SubscriptionParams }) {

    const { id } = params;
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await fetch(`${NEXT_PUBLIC_CLIENT_API_URL}/api/subscribers`, {
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
                    cpf: removecpfMask(cpf)
                })
            })

            const data = await response.json()

            if (!response.ok) {

                warningMessage(data.data ?? data.message)

                return
            }

            successMessage(data.data)

            setTimeout(() => {
                router.push('/events')
                router.refresh()
            }, 3000)

            return

        } catch (error) {
            errorMessage('Não foi possível realizar a inscrição no evento.')

            setTimeout(() => {
                router.push('/events')
                router.refresh()
            }, 3000)
            
            return
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex-col gap-3 flex">
            <ToastContainer />
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
            <InputMask
                mask="999.999.999-99" onChange={(e) => setCpf(e.target.value)} value={cpf}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Seu cpf"
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

function removecpfMask(value: string) {
    return value.replace(/[^\d]/g, '');
}