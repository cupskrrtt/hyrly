import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";

// define the webhook handler
const handleClerkWebhook = httpAction(async (ctx, request) => {
	const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET!;

	if (!WEBHOOK_SECRET) {
		throw new Error(
			`Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local ${WEBHOOK_SECRET}`,
		);
	}

	const event = await validateRequest(request);

	if (!event) {
		return new Response("Error occured", { status: 400 });
	}

	switch (event.type /* ... */) {
	}
	return new Response(null, { status: 200 });
});

async function validateRequest(req: Request) {
	const payload = await req.json();
	const body = JSON.stringify(payload);

	const svixHeaders = {
		"svix-id": req.headers.get("svix-id") as string,
		"svix-timestamp": req.headers.get("svix-timestamp") as string,
		"svix-signature": req.headers.get("svix-signature") as string,
	};

	const wh = new Webhook(process.env.WEBHOOK_SECRET!);

	try {
		return wh.verify(body, svixHeaders) as WebhookEvent;
	} catch (error) {
		console.log(error);
		return new Response("Error occured", { status: 400 });
	}
}

// define the http router
const http = httpRouter();

// define the webhook route
http.route({
	path: "/api/clerk-users-webhook",
	method: "POST",
	handler: handleClerkWebhook,
});

export default http;
