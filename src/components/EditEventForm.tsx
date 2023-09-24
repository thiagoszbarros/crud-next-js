'use client'

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NEXT_PUBLIC_CLIENT_API_URL } from "../../config";
import React from "react";
import InputMask from "react-input-mask";
import { addDateMask, removeDateMask, successMessage, warningMessage, errorMessage } from "./Utils";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type EditEvent = {
    id: string;
    name: string;
    startDate: string;
    endDate: string
}

export default function EditEventForm({ id, name, startDate, endDate }: EditEvent) {
    const [newName, setNewName] = useState(name);
    const [newStartDate, setNewStartDate] = useState(addDateMask(startDate));
    const [newEndDate, setNewEndDate] = useState(addDateMask(endDate));

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            name: newName,
            start_date: removeDateMask(newStartDate),
            end_date: removeDateMask(newEndDate)
        })
        try {
            const response = await fetch(`${NEXT_PUBLIC_CLIENT_API_URL}/api/events/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                },
                mode: 'cors',
                body: JSON.stringify({
                    name: newName,
                    start_date: removeDateMask(newStartDate),
                    end_date: removeDateMask(newEndDate)
                })
            });

            const data = await response.json();
            if (!response.ok) {
                
                warningMessage(data.data ?? data.message)

                return
            }

            successMessage(data.data)

            setTimeout(() => {
                router.push('/events')
                router.refresh()
            }, 3000)

        } catch (error) {
            errorMessage('Não foi possível editar o evento.')

            setTimeout(() => {
                router.push('/events')
                router.refresh()
            }, 3000)

            return
        }
    };

    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit} className="flex-col gap-3 flex">
                <input
                    onChange={(e) => setNewName(e.target.value)}
                    value={newName}
                    className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Nome do evento"
                    required
                />
                <InputMask
                    mask="99/99/9999"
                    onChange={(e) => setNewStartDate(e.target.value)}
                    value={newStartDate}
                    className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Data de início"
                    required
                />
                <InputMask
                    mask="99/99/9999"
                    onChange={(e) => setNewEndDate(e.target.value)}
                    value={newEndDate}
                    className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Data do fim"
                    required
                />

                <button type="submit" className="bg-green-600 font-bold text-white px-8 py-2">
                    Salvar
                </button>
                <Link className="text-center bg-blue-600 font-bold text-white px-8 py-2" href={'/events'}>
                    Voltar
                </Link>
            </form>
        </>
    );
}