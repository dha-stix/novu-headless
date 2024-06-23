export default function NotificationFeed({
	notifications,
}: {
	notifications: any[];
	}) {
	
	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		const options: Intl.DateTimeFormatOptions = {
			year: "numeric",
		month: "short",
		day: "2-digit",
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	};

	return date.toLocaleString("en-US", options);
	};
	

	
	return (
		<>
			{notifications.map((notification) => (
				<div
					className=' w-full mb-6 relative py-4  px-12'
					key={notification._id}
				>
					<section>
						<h3 className='text-[#AF8F6F] mb-4 text-xl'>
							{formatDate(notification.createdAt)}
						</h3>
						<p className='text-gray-50 text-sm'>{notification.content}</p>
					</section>
					<div className='absolute w-[55px] h-[55px] flex items-center justify-center rounded-full border-2 border-[#FEB941] bg-[#322C2B] -left-7 top-0 z-10'>
						<p className='text-2xl text-center'> 🎉</p>
					</div>
				</div>
			))}
		</>
	);
}