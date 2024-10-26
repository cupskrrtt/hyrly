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
		title: v.optional(v.string()),
		location: v.optional(v.string()),
		about: v.optional(v.string()),
		phone: v.optional(v.string()),
		imageUrl: v.optional(v.string()),
	}).index("by_user_id", ["user_id"]),
	user_social: defineTable({
		user_id: v.id("users"),
		platform: v.string(),
		url: v.string(),
	}).index("by_user_id", ["user_id"]),
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
	user_skill: defineTable({
		user_id: v.id("users"),
		proficiency: v.string(),
		name: v.string(),
	}).index("by_user_id", ["user_id"]),
	user_education: defineTable({
		user_id: v.id("users"),
		title: v.string(),
		school: v.string(),
		year: v.string(),
	}).index("by_user_id", ["user_id"]),
	jobs: defineTable({
		title: v.string(),
	}),
});
