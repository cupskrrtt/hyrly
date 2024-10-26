import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	users: defineTable({
		role: v.string(),
		clerk_id: v.string(),
	}),
	user_profile: defineTable({
		user_id: v.id("users"),
		name: v.string(),
		email: v.string(),
		title: v.string(),
		location: v.string(),
		about: v.string(),
		phone: v.string(),
	}).index("by_user_id", ["user_id"]),
	user_social: defineTable({
		profile_id: v.id("user_profile"),
		platform: v.string(),
		url: v.string(),
	}).index("by_profile_id", ["profile_id"]),
	user_project: defineTable({
		user_id: v.id("users"),
		title: v.string(),
		description: v.string(),
		start_date: v.string(),
		end_date: v.string(),
	}).index("by_user_id", ["user_id"]),
	user_experience: defineTable({
		user_id: v.id("users"),
		company: v.string(),
		position: v.string(),
		description: v.string(),
		start_date: v.string(),
		end_date: v.string(),
	}).index("by_user_id", ["user_id"]),
	jobs: defineTable({
		title: v.string(),
	}),
});
