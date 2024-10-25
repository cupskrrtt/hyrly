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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
	const { user } = useUser();
	return (
		<div className="bg-muted">
			<Unauthenticated>
				<SignInButton />
			</Unauthenticated>
			<Authenticated>
				<DropdownMenu>
					<DropdownMenuTrigger>
						{user?.hasImage ? (
							<Avatar>
								<AvatarImage src={user.imageUrl} />
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
		</div>
	);
}
