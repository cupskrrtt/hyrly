import { api } from "@/convex/_generated/api";
import { auth } from "@clerk/nextjs/server";
import { fetchMutation } from "convex/nextjs";
import { revalidatePath } from "next/cache";

interface FormState {
	message: string;
}

export async function updateProfileInfo(_state: FormState, data: FormData) {
	const { userId } = await auth();

	if (!userId) {
		return new Error("You are not authed");
	}

	await fetchMutation(api.users.updateUserInfo, {
		name: data.get("name") as string,
		title: data.get("title") as string,
		location: data.get("location") as string,
		email: data.get("email") as string,
		phone: data.get("phone") as string,
		about: data.get("about") as string,
	});
	revalidatePath("/profile");

	return {
		message: "Success",
	};
}
