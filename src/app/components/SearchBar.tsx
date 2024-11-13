'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Search, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Filters from './Filters';
import { DialogTitle } from '@radix-ui/react-dialog';

export default function SearchBar() {
	const [searchQuery, setSearchQuery] = useState<string>('');

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Search submitted:', searchQuery);
	};

	return (
		<form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 mb-4 mx-2">
			<div className="col-span-2 flex space-x-1">
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="ghost" className="md:hidden">
							<Menu className="size-8" />
						</Button>
					</SheetTrigger>
					<SheetContent side="left">
						<DialogTitle className="sr-only">Filters</DialogTitle>
						<Filters />
					</SheetContent>
				</Sheet>

				<Input
					type="text"
					value={searchQuery}
					onChange={handleSearch}
					placeholder="Search By Title or Company Name ..."
				/>
			</div>

			<Button type="submit" className="flex items-center space-x-2">
				<Search />
				<span>Find</span>
			</Button>
		</form>
	);
}
