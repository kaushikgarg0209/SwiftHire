export function getTimeAgo(date: string): string {
	const now = new Date();
	const postedDate = new Date(date);
	const diffInTime = now.getTime() - postedDate.getTime();
	const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

	return diffInDays === 0 ? 'Today' : `${diffInDays} days ago`;
}
