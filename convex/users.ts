import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
	args: {
		clerk_id: v.string(),
		role: v.string(),
		email: v.string(),
	},
	async handler(ctx, args) {
		await ctx.db.insert("users", {
			clerk_id: args.clerk_id,
			role: args.role,
			email: args.email,
		});
	},
});
