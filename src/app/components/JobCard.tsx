'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { getTimeAgo } from '@/lib/getTimeAgo';
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog';
import { MapPin, DollarSign } from 'lucide-react';
import ApplicationForm from './ApplicationForm';
import { useState } from 'react';
import { IJob } from '@/constants/interfaces';

function JobCard({ job }: { job: IJob }) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<Card className="bg-slate-950 hover:bg-blend-lighten mb-4">
			<CardHeader>
				<CardTitle>{job.jobTitle}</CardTitle>
				<CardDescription className="flex items-center space-x-5">
					<span>{job.companyName}</span>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="mb-2 text-sm text-neutral-400">{job.jobDescription}</p>
				<div className="flex items-center space-x-5">
					<div className="flex items-center text-xs mb-1 text-neutral-400">
						<MapPin size={14} className="mr-1" />
						<span>{job.location}</span>
					</div>
					<div className="flex items-center text-neutral-400 text-xs">
						<DollarSign size={14} className="mr-1" />
						<span>CTC: ₹{job.CTC} LPA</span>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex justify-between text-xs text-neutral-400">
				<span>Posted: {getTimeAgo(job.createdAt)}</span>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button>Apply Now</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[800px] bg-neutral-800">
						<DialogHeader>
							<DialogTitle>Apply for {job.jobTitle}</DialogTitle>
							<DialogDescription className="text-gray-400">
								Submit your application for the {job.jobTitle} role at {job.companyName}.
							</DialogDescription>
						</DialogHeader>
						<ApplicationForm onClose={() => setIsDialogOpen(false)} job={job} />
					</DialogContent>
				</Dialog>
			</CardFooter>
		</Card>
	);
}

export default JobCard;
