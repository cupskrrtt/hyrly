import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	IconBriefcase,
	IconDownload,
	IconEdit,
	IconMail,
	IconMapPin,
	IconPhone,
	IconSchool,
} from "@tabler/icons-react";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
	DialogDescription,
} from "@/components/ui/dialog";
import { auth } from "@clerk/nextjs/server";
import EditProfileForm from "./_components/edit-profile-form";
import { Doc } from "@/convex/_generated/dataModel";

export default async function ProfilePage() {
	const { userId } = await auth();

	const userProfile = await fetchQuery(api.users.getUserProfile, {
		clerk_id: userId || "",
	});

	return (
		<div className="container mx-auto p-4 space-y-6">
			<Card>
				<CardContent className="p-6 space-y-4">
					<div className="flex flex-col md:flex-row gap-6 items-center justify-between">
						<div className="flex flex-col md:flex-row gap-6 items-center">
							<Avatar className="w-32 h-32">
								<AvatarImage
									src={userProfile?.profile.imageUrl}
									alt={userProfile?.profile.name}
								/>
							</Avatar>
							<div className="space-y-2">
								<h1 className="text-3xl font-bold">
									{userProfile?.profile.name}
								</h1>
								<p className="text-xl text-muted-foreground">
									{userProfile?.profile.title}
								</p>
								<div className="flex flex-wrap gap-2">
									<Badge
										variant="secondary"
										className="flex items-center gap-1"
									>
										<IconMapPin className="w-3 h-3" />
										{userProfile?.profile.location}
									</Badge>
									<Badge
										variant="secondary"
										className="flex items-center gap-1"
									>
										<IconMail className="w-3 h-3" />
										{userProfile?.profile.email}
									</Badge>
									<Badge
										variant="secondary"
										className="flex items-center gap-1"
									>
										<IconPhone className="w-3 h-3" />
										{userProfile?.profile.phone}
									</Badge>
								</div>
							</div>
						</div>
						<Dialog>
							<DialogTrigger asChild className="self-start">
								<Button>
									<IconEdit />
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>Edit Profile</DialogHeader>
								<DialogDescription>
									Make change to your profile
								</DialogDescription>
								<EditProfileForm
									userProfile={userProfile?.profile as Doc<"user_profile">}
								/>
							</DialogContent>
						</Dialog>
					</div>
					<hr className="w-full" />
					<div>
						<p>{userProfile?.profile.about}</p>
					</div>
				</CardContent>
			</Card>

			<div className="grid md:grid-cols-3 gap-6">
				<Card className="md:col-span-2">
					<CardHeader>
						<CardTitle>Projects</CardTitle>
					</CardHeader>
					<CardContent></CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Skills</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<h3 className="font-semibold mb-2">Expert</h3>
							<div className="flex flex-wrap gap-2">
								{["JavaScript", "React", "Node.js"].map((skill) => (
									<Badge key={skill} variant="default">
										{skill}
									</Badge>
								))}
							</div>
						</div>
						<div>
							<h3 className="font-semibold mb-2">Proficient</h3>
							<div className="flex flex-wrap gap-2">
								{["TypeScript", "AWS", "Python", "GraphQL"].map((skill) => (
									<Badge key={skill} variant="secondary">
										{skill}
									</Badge>
								))}
							</div>
						</div>
						<div>
							<h3 className="font-semibold mb-2">Knowledgeable</h3>
							<div className="flex flex-wrap gap-2">
								{["Docker", "Kubernetes", "Machine Learning", "Rust"].map(
									(skill) => (
										<Badge key={skill} variant="outline">
											{skill}
										</Badge>
									),
								)}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Experience</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{[
						{
							title: "Senior Software Engineer",
							company: "Tech Innovators Inc.",
							period: "2019 - Present",
							description:
								"Lead development of cloud-based enterprise solutions.",
						},
						{
							title: "Software Engineer",
							company: "StartUp Solutions",
							period: "2016 - 2019",
							description:
								"Developed and maintained multiple web applications using React and Node.js.",
						},
					].map((job, index) => (
						<div key={index} className="flex gap-4">
							<IconBriefcase className="w-5 h-5 mt-1 text-muted-foreground" />
							<div>
								<h3 className="font-semibold">{job.title}</h3>
								<p className="text-sm text-muted-foreground">
									{job.company} | {job.period}
								</p>
								<p className="mt-1">{job.description}</p>
							</div>
						</div>
					))}
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Education</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{[
						{
							degree: "Master of Science in Computer Science",
							school: "Tech University",
							year: "2016",
						},
						{
							degree: "Bachelor of Science in Software Engineering",
							school: "State University",
							year: "2014",
						},
					].map((edu, index) => (
						<div key={index} className="flex gap-4">
							<IconSchool className="w-5 h-5 mt-1 text-muted-foreground" />
							<div>
								<h3 className="font-semibold">{edu.degree}</h3>
								<p className="text-sm text-muted-foreground">
									{edu.school} | {edu.year}
								</p>
							</div>
						</div>
					))}
				</CardContent>
			</Card>

			<div className="flex justify-center space-x-4">
				<Button size="lg" className="flex items-center gap-2">
					<IconEdit className="w-4 h-4" />
					Edit Profile
				</Button>
				<Button size="lg" variant="outline" className="flex items-center gap-2">
					<IconDownload className="w-4 h-4" />
					Download Resume
				</Button>
			</div>
		</div>
	);
}
