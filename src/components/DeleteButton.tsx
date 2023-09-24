'use client'


import { HiOutlineTrash } from "react-icons/hi"
import { NEXT_PUBLIC_CLIENT_API_URL } from "../../config";
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import { successMessage, warningMessage, errorMessage } from "./Utils";
import 'react-toastify/dist/ReactToastify.css';

export default function DeleteButton({ id }: { id: string }) {
    const router = useRouter();
    const handleDelete = async () => {
        const confirmed = confirm('Tem certeza que deseja deletar esse evento?')

        if (!confirmed) {
            return
        }

        try {
            const response = await fetch(`${NEXT_PUBLIC_CLIENT_API_URL}/api/events/${id}`, {
                method: 'DELETE'
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

        } catch (error) {
            errorMessage('Não foi possível editar o evento.')

            setTimeout(() => {
                router.push('/events')
                router.refresh()
            }, 3000)

            return
        }
    }

    return (
        <>
            <ToastContainer />
            <button onClick={handleDelete} className="text-red-400">
                <HiOutlineTrash size={24} />
            </button>
        </>)
}