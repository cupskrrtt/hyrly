"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { updateProfileInfo } from "@/lib/actions/user-actions";
import { Preloaded } from "convex/react";
import { useFormState } from "react-dom";

export default function EditProfileForm({
	userProfile,
}: {
	userProfile: Preloaded<typeof api.users.getUserProfile._returnType.profile>;
}) {
	const [_state, formAction] = useFormState(updateProfileInfo, {
		message: "",
	});

	return (
		<form action={formAction} className="space-y-4">
			<div>
				<Label htmlFor="name">Name</Label>
				<Input id="name" name="name" defaultValue={userProfile?.name} />
			</div>
			<div>
				<Label htmlFor="title">Title</Label>
				<Input id="title" name="title" defaultValue={userProfile?.title} />
			</div>
			<div>
				<Label htmlFor="location">Location</Label>
				<Input
					id="location"
					name="location"
					defaultValue={userProfile?.location}
				/>
			</div>
			<div>
				<Label htmlFor="email">Email</Label>
				<Input id="email" name="email" defaultValue={userProfile?.email} />
			</div>
			<div>
				<Label htmlFor="phone">Phone Number</Label>
				<Input
					id="phone"
					name="phone"
					type="tel"
					defaultValue={userProfile?.phone}
				/>
			</div>
			<div>
				<Label htmlFor="about">About</Label>
				<Textarea
					id="about"
					name="about"
					className="resize-none h-40"
					defaultValue={userProfile?.about}
				/>
			</div>
			<Button className="w-full">Update personal info</Button>
		</form>
	);
}
