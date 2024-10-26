import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getUser = query({
	args: {
		clerk_id: v.string(),
	},
	async handler(ctx, args) {
		return await ctx.db
			.query("users")
			.filter((q) => q.eq(q.field("clerk_id"), args.clerk_id))
			.collect();
	},
});

export const createUser = mutation({
	args: {
		clerk_id: v.string(),
		role: v.string(),
	},
	async handler(ctx, args) {
		await ctx.db.insert("users", args);
	},
});

export const createUserProfile = mutation({
	args: {
		user_id: v.id("users"),
		name: v.string(),
		email: v.string(),
		title: v.string(),
		location: v.string(),
		about: v.string(),
		phone: v.string(),
	},
	async handler(ctx, args) {
		await ctx.db.insert("user_profile", args);
	},
});
