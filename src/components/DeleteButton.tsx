'use client'
import { HiOutlineTrash } from "react-icons/hi"
import { NEXT_PUBLIC_CLIENT_API_URL } from "../../config";
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }: any) {
    const router = useRouter();
    const handleDelete = async () => {
        const confirmed = confirm('Tem certeza que deseja deletar esse evento?')

        if (!confirmed) {
            return
        }

        const response = await fetch(`${NEXT_PUBLIC_CLIENT_API_URL}/api/events/${id}`, {
            method: 'DELETE'
        })

        const data = await response.json()

        if (!response.ok) {
            alert(data.data)
            return
        }

        alert(data.data)
        router.push('/events');
        router.refresh();
    }

    return (
        <>
            <button onClick={handleDelete} className="text-red-400">
                <HiOutlineTrash size={24} />
            </button>
        </>)
}