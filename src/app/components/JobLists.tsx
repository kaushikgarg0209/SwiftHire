import { Card } from '@/components/ui/card';
import React from 'react';
import { jobs } from '@/constants/jobs';
import JobCard from './JobCard';
import SearchBar from './SearchBar';

function JobLists() {
	return (
		<Card className="bg-gray-900 p-4">
			<SearchBar />
			{jobs.map((job, index) => (
				<JobCard key={index} job={job} />
			))}
		</Card>
	);
}

export default JobLists;
