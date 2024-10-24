import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	users: defineTable({
		name: v.string(),
		role: v.string(),
		tokenIdentifier: v.string(),
	}),
	jobs: defineTable({
		title: v.string(),
	}),
});
