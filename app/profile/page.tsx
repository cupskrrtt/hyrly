"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Download,
	Edit,
	Github,
	Linkedin,
	Mail,
	MapPin,
	Phone,
	Share2,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
	const { user } = useUser();

	return (
		<section>
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">Profile</h1>
				<div className="space-x-2">
					<Button variant="outline" size="sm">
						<Download className="mr-2 h-4 w-4" />
						Download CV
					</Button>
					<Button variant="outline" size="sm">
						<Share2 className="mr-2 h-4 w-4" />
						Share Profile
					</Button>
					<Button variant="default" size="sm">
						<Edit className="mr-2 h-4 w-4" />
						Edit Profile
					</Button>
				</div>
			</div>
			<Card>
				<CardContent className="flex items-center space-x-4 p-6">
					<Image
						src={user?.imageUrl as string}
						alt={user?.fullName as string}
						width={128}
						height={128}
						className="rounded-full"
					/>
					<div>
						<h2 className="text-2xl font-bold">John Doe</h2>
						<p className="text-muted-foreground">Senior Software Engineer</p>
						<p className="flex items-center mt-2">
							<MapPin className="mr-2 h-4 w-4" />
							San Francisco, CA
						</p>
						<div className="flex space-x-4 mt-2">
							<a
								href="mailto:john@example.com"
								className="text-muted-foreground hover:text-primary"
							>
								<Mail className="h-5 w-5" />
							</a>
							<a
								href="tel:+11234567890"
								className="text-muted-foreground hover:text-primary"
							>
								<Phone className="h-5 w-5" />
							</a>
							<a
								href="https://github.com/johndoe"
								className="text-muted-foreground hover:text-primary"
							>
								<Github className="h-5 w-5" />
							</a>
							<a
								href="https://linkedin.com/in/johndoe"
								className="text-muted-foreground hover:text-primary"
							>
								<Linkedin className="h-5 w-5" />
							</a>
						</div>
					</div>
				</CardContent>
			</Card>

			<Tabs defaultValue="overview">
				<TabsList>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="projects">Projects</TabsTrigger>
					<TabsTrigger value="experience">Experience</TabsTrigger>
				</TabsList>
				<TabsContent value="overview" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>About</CardTitle>
						</CardHeader>
						<CardContent>
							<p>
								Experienced software engineer with a passion for building
								scalable web applications and solving complex problems. Skilled
								in JavaScript, React, Node.js, and cloud technologies. Always
								eager to learn and adapt to new technologies and methodologies.
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Contact Information</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							<p className="flex items-center">
								<Mail className="mr-2 h-4 w-4" />
								john@example.com
							</p>
							<p className="flex items-center">
								<Phone className="mr-2 h-4 w-4" />
								+1 (123) 456-7890
							</p>
							<p className="flex items-center">
								<Github className="mr-2 h-4 w-4" />
								github.com/johndoe
							</p>
							<p className="flex items-center">
								<Linkedin className="mr-2 h-4 w-4" />
								linkedin.com/in/johndoe
							</p>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="projects">
					<Card>
						<CardHeader>
							<CardTitle>Projects</CardTitle>
						</CardHeader>
						<CardContent>
							<p>Projects content goes here.</p>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="experience">
					<Card>
						<CardHeader>
							<CardTitle>Experience</CardTitle>
						</CardHeader>
						<CardContent>
							<p>Experience content goes here.</p>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</section>
	);
}
