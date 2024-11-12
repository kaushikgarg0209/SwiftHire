import Container from '@/components/Container';
import React from 'react';
import Filters from './Filters';
import JobLists from './JobLists';

function Home() {
	return (
		<Container>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
				<div className="hidden md:block">
					<Filters />
				</div>
				<div className="col-span-1 md:col-span-2">
					<JobLists />
				</div>
			</div>
		</Container>
	);
}

export default Home;
