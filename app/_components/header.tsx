"use client";

import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { AvatarImage } from "@radix-ui/react-avatar";

export default function Header() {
	return (
		<nav className="bg-muted">
			<HeaderProfile />
		</nav>
	);
}

function HeaderProfile() {
	const { user } = useUser();

	return (
		<>
			<Unauthenticated>
				<SignInButton />
			</Unauthenticated>
			<Authenticated>
				<DropdownMenu>
					<DropdownMenuTrigger>
						{user?.hasImage ? (
							<Avatar>
								<AvatarImage asChild src={user?.imageUrl as string}>
									<Image
										src={user?.imageUrl as string}
										alt={user?.fullName as string}
										fill
									/>
								</AvatarImage>
							</Avatar>
						) : (
							<Avatar>
								<AvatarFallback>{user?.fullName}</AvatarFallback>
							</Avatar>
						)}
					</DropdownMenuTrigger>
					<DropdownMenuContent className="flex flex-col gap-4">
						<div>
							<DropdownMenuLabel>Profile & Job</DropdownMenuLabel>
							<DropdownMenuItem asChild>
								<Link href={"/profile"}>Profile</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>My Applications</DropdownMenuItem>
							<DropdownMenuItem>Saved Jobs</DropdownMenuItem>
							<DropdownMenuSeparator />
						</div>
						<div>
							<DropdownMenuLabel>Communication</DropdownMenuLabel>
							<DropdownMenuItem>Message</DropdownMenuItem>
							<DropdownMenuItem>Notification</DropdownMenuItem>
							<DropdownMenuSeparator />
						</div>
						<div>
							<DropdownMenuLabel>Employer Tool</DropdownMenuLabel>
							<DropdownMenuItem>Company Dashboard</DropdownMenuItem>
							<DropdownMenuItem>Post a Job</DropdownMenuItem>
							<DropdownMenuSeparator />
						</div>
						<div>
							<DropdownMenuLabel>Account</DropdownMenuLabel>
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Resume Builder</DropdownMenuItem>
							<DropdownMenuSeparator />
						</div>
						<div>
							<DropdownMenuLabel>Support</DropdownMenuLabel>
							<DropdownMenuItem>Help center</DropdownMenuItem>
							<DropdownMenuItem>
								<SignOutButton />
							</DropdownMenuItem>
						</div>
					</DropdownMenuContent>
				</DropdownMenu>
			</Authenticated>
			<AuthLoading>Loading</AuthLoading>
		</>
	);
}
