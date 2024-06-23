"use client";
import { HeadlessService } from "@novu/headless";
import { useEffect, useState, useCallback, useRef } from "react";
import NotificationFeed from "../components/NotificationFeed";
import { FaBell } from "react-icons/fa";
import NovuBell from "../components/NovuBell";

export default function Home() {
	const [notifications, setNotifications] = useState<any[]>([]);
	const [showNotifications, setShowNotifications] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");
	const headlessServiceRef = useRef<HeadlessService | null>(null);
	const [subscriberID, setSubscriberID] = useState<string>("")
	const toggleNotifications = () => setShowNotifications(!showNotifications);

	const handleSendNotification = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		try {
			const request = await fetch("/api/notify", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message,
					subscriberId: subscriberID,
				}),
			});
			const response = await request.json();
			console.log(response);
			setMessage("");
			toggleNotifications();
		} catch (err) {
			console.error(err);
		}
	};

    const fetchNotifications = useCallback(() => {
        const headlessService = headlessServiceRef.current;
        if (headlessService) {
            headlessService.fetchNotifications({
                listener: ({ data, error, isError, isFetching, isLoading, status }) => {
                    // Handle the state of the fetching process and errors here.
                },
                onSuccess: (response) => {
					console.log({ notif: response.data })
                    // Handle the fetched notifications here.
                    setNotifications(response.data); // Store notifications in the state
                },
                page: 1, // page number to be fetched
            });
        }
    }, [])


	useEffect(() => {
		const subscriberId = localStorage.getItem("subscriberId")
		if (subscriberId) {
			setSubscriberID(subscriberId)
			 const headlessService = new HeadlessService({
            applicationIdentifier: process.env.NEXT_PUBLIC_NOVU_APP_ID!,
				 subscriberId: subscriberId,
			 });
			

        headlessService.initializeSession({
            listener: (res) => {
            },
            onSuccess: (session) => {
                headlessServiceRef.current = headlessService;
                fetchNotifications();
            },
            onError: (error) => {
                console.log("headlessService error:", error);
            },
        })
			
		}

       

    }, [fetchNotifications])

	return (
		<div className='w-full min-h-screen bg-[#322C2B] py-10 md:px-[100px] px-16'>
			<div className=' mb-8 flex items-center justify-between'>
				<h2 className='text-gray-50 text-2xl'>Notification Feed</h2>
				<NovuBell subscriberId={'zjdxsbj9'} />
				{showNotifications ? (
					<button
						onClick={toggleNotifications}
						className='bg-[#FEB941] md:p-4 p-2 rounded md:text-sm text-xs'
					>
						Send Notification
					</button>
				) : (
					<FaBell
						className='text-[#FEB941] text-3xl cursor-pointer'
						onClick={toggleNotifications}
					/>
				)}
			</div>

			{!showNotifications ? (
				<main className='w-full min-h-[70vh] flex flex-col items-center justify-center'>
					<form className='w-full' onSubmit={handleSendNotification}>
						<textarea
							placeholder='Message'
							rows={3}
							className='w-full p-4 rounded mb-4'
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							required
						/>
						<button className='bg-[#FEB941] p-3 rounded'>
							Send Notification
						</button>
					</form>
				</main>
			) : (
				<main className='w-full border-l-2 border-l-[#FEB941] relative '>
					{notifications.length === 0 ? (
						<div className='w-full h-full flex items-center justify-center'>
							<p className='text-gray-50 text-lg'>No notifications yet</p>
						</div>
					) : (
						<NotificationFeed notifications={notifications} />
					)}
				</main>
			)}
		</div>
	);
}