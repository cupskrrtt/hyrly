"use client";

import { SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";

export default function Home() {
	return (
		<main>
			<Unauthenticated>
				<SignInButton />
			</Unauthenticated>
			<Authenticated>
				<UserButton />
				<Content />
				<SignOutButton />
			</Authenticated>
		</main>
	);
}

function Content() {
	return <div>Authenticated content: ylp</div>;
}
