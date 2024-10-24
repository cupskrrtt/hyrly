"use client";

import { api } from "@/convex/_generated/api";
import { SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import {
	Authenticated,
	Unauthenticated,
	useMutation,
	useQuery,
} from "convex/react";

export default function Home() {
	const jobs = useQuery(api.jobs.getJob);
	const createJob = useMutation(api.jobs.createJob);

	return (
		<main>
			<Unauthenticated>
				<SignInButton />
			</Unauthenticated>
			<Authenticated>
				<UserButton />
				<SignOutButton />
				<button onClick={() => createJob({ title: "Penjaga Yalip" })}>
					Clieck met
				</button>
				{jobs?.map((job) => (
					<div id={job._id}>{job.role}</div>
				))}
			</Authenticated>
		</main>
	);
}
