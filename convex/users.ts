import { auth } from "@clerk/nextjs/server";
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

export const getUserProfile = query({
	args: { clerk_id: v.string() },
	handler: async (ctx, args) => {
		// First get the user
		const user = await ctx.db
			.query("users")
			.filter((q) => q.eq(q.field("clerk_id"), args.clerk_id))
			.first();

		if (!user) return null;

		// Get profile using user._id
		const profile = await ctx.db
			.query("user_profile")
			.withIndex("by_user_id", (q) => q.eq("user_id", user._id))
			.first();

		if (!profile) return null;

		const socials = await ctx.db
			.query("user_social")
			.withIndex("by_user_id", (q) => q.eq("user_id", user._id))
			.collect();

		// Get projects
		const projects = await ctx.db
			.query("user_project")
			.withIndex("by_user_id", (q) => q.eq("user_id", user._id))
			.collect();

		// Get experiences
		const experiences = await ctx.db
			.query("user_experience")
			.withIndex("by_user_id", (q) => q.eq("user_id", user._id))
			.collect();

		const skills = await ctx.db
			.query("user_skill")
			.withIndex("by_user_id", (q) => q.eq("user_id", user._id))
			.collect();

		const education = await ctx.db
			.query("user_education")
			.withIndex("by_user_id", (q) => q.eq("user_id", user._id))
			.collect();

		return {
			user,
			profile,
			socials,
			projects,
			experiences,
			skills,
			education,
		};
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
		title: v.optional(v.string()),
		location: v.string(),
		about: v.string(),
		phone: v.string(),
		imageUrl: v.string(),
	},
	async handler(ctx, args) {
		await ctx.db.insert("user_profile", args);
	},
});

export const updateUserInfo = mutation({
	args: {
		name: v.string(),
		email: v.string(),
		title: v.optional(v.string()),
		location: v.string(),
		about: v.string(),
		phone: v.string(),
		imageUrl: v.optional(v.string()),
	},
	async handler(ctx, args) {
		const { userId } = await auth();

		const user = await ctx.db
			.query("users")
			.filter((q) => q.eq("clerk_id", userId))
			.collect();

		const userProfile = await ctx.db
			.query("user_profile")
			.withIndex("by_user_id", (q) => q.eq("user_id", user[0]._id))
			.collect();

		await ctx.db.patch(userProfile[0]._id, args);
	},
});
