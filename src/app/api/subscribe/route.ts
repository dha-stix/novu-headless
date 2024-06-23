import { NextRequest, NextResponse } from "next/server";
import { Novu } from "@novu/node";
const novu = new Novu(process.env.NOVU_API_KEY!);

export async function POST(req: NextRequest) {
    const { email, firstName, lastName } = await req.json();
    const generateSubscriberID = Math.random().toString(36).substring(2, 10);

	try {
		const subscriber = await novu.subscribers.identify(generateSubscriberID, {
			email,
			firstName,
			lastName
		});

		if (subscriber.data.data) {
			return NextResponse.json(
				{
					message: "Subscriber created successfully",
					data: subscriber.data.data,
				},

				{ status: 200 }
			);
		}
		return NextResponse.json(
			{ message: "An error occurred while creating subscriber" },
			{ status: 400 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "An error occurred while creating subscriber" },
			{ status: 400 }
		);
	}
}