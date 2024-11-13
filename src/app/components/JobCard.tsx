import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { getTimeAgo } from '@/lib/getTimeAgo';
import { Star, MapPin, DollarSign } from 'lucide-react';

function JobCard({ job }) {
	const rating = job.rating;
	const maxRating = 5;

	const stars = Array.from({ length: maxRating }, (_, index) => {
		if (index < rating) {
			return <Star key={index} size={16} className="text-yellow-400" />;
		} else {
			return <Star key={index} size={16} className="text-gray-400" />;
		}
	});

	return (
		<Card className="bg-slate-950 hover:bg-blend-lighten mb-4">
			<CardHeader>
				<CardTitle>{job.jobTitle}</CardTitle>
				<CardDescription className="flex items-center space-x-5">
					<span>{job.companyName}</span>
					<div className="flex items-center">
						{stars}
						<span className="ml-1">{job.rating}</span>
					</div>
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
				<Button>Apply Now</Button>
			</CardFooter>
		</Card>
	);
}

export default JobCard;
