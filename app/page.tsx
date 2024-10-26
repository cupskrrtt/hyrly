"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

export default function Home() {
	const jobs = useQuery(api.jobs.getJob);
	const createJob = useMutation(api.jobs.createJob);

	return (
		<div>
			{jobs?.map((job) => (
				<Card key={job._id}>
					<CardHeader>
						<CardTitle>{job.title}</CardTitle>
					</CardHeader>
				</Card>
			))}
			<Button onClick={() => createJob({ title: "yalipiawan" })}>kontol</Button>
		</div>
	);
}
