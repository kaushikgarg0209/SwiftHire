'use client';

import React from 'react';
import { Menubar, MenubarMenu } from '@/components/ui/menubar';
import { appRoutes } from '../constants/appRoutes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Bell } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Appbar = () => {
	const pathname = usePathname();

	return (
		<Menubar className="bg-gray-950/70 backdrop-blur-md py-8 text-gray-400 flex justify-between items-center sticky top-0 z-50">
			<div className="ml-4 p-4">
				<Link href="/">
					<Image src="/logo.png" alt="Logo" width={40} height={40} />
				</Link>
			</div>

			<div className="flex justify-center space-x-4">
				{appRoutes.map((appRoute) => {
					const isActive = pathname === appRoute.route;
					return (
						<MenubarMenu key={appRoute.id}>
							<Link
								href={appRoute.route}
								className={`hover:underline hover:decoration-2 ${isActive && 'text-white'}`}
								style={{ textUnderlineOffset: '25px' }}
							>
								<div>{appRoute.id}</div>
							</Link>
						</MenubarMenu>
					);
				})}
			</div>

			<div className="flex items-center space-x-4 mr-4 p-4">
				<button className="p-2 rounded-full hover:bg-slate-700">
					<Bell className="w-6 h-6 text-slate-400 hover:text-white" />
				</button>

				<Avatar>
					<AvatarImage src="/path/to/avatar.jpg" alt="User Avatar" />
					<AvatarFallback>U</AvatarFallback>
				</Avatar>
			</div>
		</Menubar>
	);
};

export default Appbar;
