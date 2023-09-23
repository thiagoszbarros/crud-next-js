'use client'

import { NEXT_PUBLIC_CLIENT_API_URL } from "../../../../../config";
import React, { useState, useEffect } from "react";
import { ParsedUrlQuery } from "querystring";
import Link from "next/link";
import { GrLinkPrevious, GrLinkNext } from 'react-icons/gr';

type Subscriber = {
    id: number;
    name: string;
    email: string;
    cpf: string;
};

export default function SubscribersList({ params }: { params: ParsedUrlQuery }) {
    const { id } = params;
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        loadSubscribers();
    }, [page, filter]);

    async function loadSubscribers() {
        try {
            const response = await fetch(`${NEXT_PUBLIC_CLIENT_API_URL}/api/events/${id}/subscribers?event_id=${id}`, {
                cache: "no-store",
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.data ?? data.message);
                return;
            }

            const filteredSubscribers = data.data.filter((subscriber: Subscriber) =>
                subscriber.name.toLowerCase().includes(filter.toLowerCase())
            );
            const offset = 10;
            const initialPage = (page - 1) * offset;
            const finalPage = initialPage + offset;
            const subscribersForPage = filteredSubscribers.slice(initialPage, finalPage);

            setSubscribers(subscribersForPage);
        } catch (error) {
            console.error("Error loading subscribers", error);
            setSubscribers([]);
        }
    }

    useEffect(() => {
        setPage(1);
    }, [filter]);

    return (
        <>
            <div className="flex-col gap-3 flex">
                <Link className="text-center bg-neutral-600 font-bold text-white px-8 py-2" href={"/events"}>
                    Voltar
                </Link>
                <div className="text-center">
                    <input
                        className="text-center"
                        id="nameFilter"
                        type="text"
                        placeholder="Filtar por nome"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
                <div className="flex justify-between">
                    <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                        <GrLinkPrevious />
                    </button>
                    <button onClick={() => setPage(page + 1)}>
                        <GrLinkNext />
                    </button>
                </div>
                {subscribers.map((subscriber: Subscriber) => (
                    <div
                        key={subscriber.id}
                        className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-center"
                    >
                        <div>
                            <h2 className="font-bold text-2xl">{subscriber.name}</h2>
                            <div>{subscriber.email}</div>
                            <div>{subscriber.cpf}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}