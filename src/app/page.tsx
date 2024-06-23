"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => { 
		e.preventDefault();
		const response = await fetch("/api/subscribe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ firstName, lastName, email }),
		});
		if (response.ok) {
			const {data} = await response.json();
			localStorage.setItem("subscriberId", data.subscriberId);
			router.push("/feed");
		}
		setEmail("");
		setFirstName("");
		setLastName("");
	}

	return (
		<div className='w-full min-h-screen bg-[#322C2B] flex items-center flex-col justify-center px-6'>
			<h2 className='mb-8 text-3xl font-bold text-[#FEB941]'>
				Lichess Feed with Novu
			</h2>
			<form className='md:w-2/3 w-full' onSubmit={handleSubmit}>
				<label
					className='block text-gray-300 text-sm font-bold mb-2'
					htmlFor='email'
				>
					Email Address
				</label>
				<input
					className='px-4 py-3 w-full rounded border-none outline-none  mb-4'
					id='email'
					type='email'
					required
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>

				<label
					className='block text-gray-300 text-sm font-bold mb-2'
					htmlFor='firstName'
				>
					First Name
				</label>
				<input
					className='px-4 py-3 w-full rounded border-none outline-none  mb-4'
					id='firstName'
					type='text'
					required
					value={firstName}
					onChange={e => setFirstName(e.target.value)}
				/>

				<label
					className='block text-gray-300 text-sm font-bold mb-2'
					htmlFor='lastName'
				>
					Last Name
				</label>
				<input
					className='px-4 py-3 w-full rounded border-none outline-none  mb-4'
					id='lastName'
					type='text'
					required
					value={lastName}
					onChange={e => setLastName(e.target.value)}
				/>

				<button className='w-full px-4 py-3 rounded text-lg bg-[#FEB941]'>
					Sign in
				</button>
			</form>
		</div>
	);
}