import { NextRequest, NextResponse } from "next/server";
import { Novu } from "@novu/node";
const novu = new Novu(process.env.NOVU_API_KEY!);

export async function POST(req: NextRequest) {
    const { message, subscriberId } = await req.json();

    console.log({ message, subscriberId })
    try {
        const response = await novu.trigger("headless", {
            to: {
                subscriberId: subscriberId
            },
            payload: {
                content: message
            }
        })
        console.log(response.data)
        return NextResponse.json(
		{ message: "Notification sent!" },
		{ status: 200 }
	);

       
    } catch (error) {
        return NextResponse.json(
		{ message: "Error!", error },
		{ status: 500 }
	);  
    }

	
}