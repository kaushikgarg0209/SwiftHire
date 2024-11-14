'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { CircleX } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { filters } from '@/constants/filter';
import { indianCities } from '@/constants/indianCities';

function Filters() {
	const [selectedLocation, setSelectedLocation] = useState('');

	return (
		<Card className="bg-gray-900 p-4 sticky top-20">
			<CardHeader className="flex flex-row justify-between items-center">
				<CardTitle>Filters</CardTitle>
				<CardDescription className="flex text-neutral-400 items-center cursor-pointer hover:text-white">
					Clear Filters
					<CircleX size={16} className="ml-1" />
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="mb-6">
					<h3 className="mb-2 text-white">Location</h3>
					<Select onValueChange={(value) => setSelectedLocation(value)}>
						<SelectTrigger className="text-neutral-400">
							<SelectValue placeholder="Select a location" />
						</SelectTrigger>
						<SelectContent>
							{indianCities.map((city) => (
								<SelectItem key={city} value={city}>
									{city}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{filters.map((filter) => (
					<div key={filter.id} className="mb-6">
						<h3 className="mb-2 text-white">{filter.id}</h3>
						<div className="space-y-2">
							{filter.values.map((value) => (
								<label key={value} className="flex items-center space-x-2 text-neutral-400">
									<Checkbox value={value} />
									<span className="text-sm text-neutral-400">{value}</span>
								</label>
							))}
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}

export default Filters;
