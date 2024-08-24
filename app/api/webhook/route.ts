import { headers } from "next/headers"
import Stripe from "stripe"
import { stripe } from "@/lib/stripe"
import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(req: Request){
    const body = await req.text()
    const signature = headers().get("Stripe-Signature") as string

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body, signature, process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any) {
        return new  NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    const session = event.data.object as Stripe.Checkout.Session
    const userId = session?.metadata?.userId
    const courseId = session?.metadata?.courseId

    if (event.type === "checkout.session.completed") {
        if (!userId || !courseId) {
            return new NextResponse("Missing userId or courseId", { status: 400 })            
        }

        await db.purchase.create({
            data: {
                userId: userId,
                courseId: courseId
            }
        })
    } else{
        return new NextResponse(`Webhook Error: Unhandled event type ${event.type}`, { status: 200 })
    }

    return new NextResponse(null, { status: 200 })
}