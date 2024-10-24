import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getJob = query({
	async handler(ctx) {
		return await ctx.db.query("jobs").collect();
	},
});

export const createJob = mutation({
	args: {
		title: v.string(),
	},
	async handler(ctx, args) {
		await ctx.db.insert("jobs", {
			title: args.title,
		});
	},
});
