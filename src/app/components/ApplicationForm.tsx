import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { getSlab } from '@/lib/getSlab';
import { IJob } from '@/constants/interfaces';

export const branchOptions = ['CSE', 'ISE', 'AIML'];

export const jobCriteria = [
	{
		criteria: 'GPA',
		type: 'integer',
		maxValue: 10,
		minValue: 8,
	},
	{
		criteria: '12th Percentage',
		type: 'integer',
		maxValue: 100,
		minValue: 80,
	},
	{
		criteria: 'Branch',
		type: 'dropdown',
		value: 'CSE',
	},
	{
		criteria: 'test',
		type: 'string',
		value: 'CSE',
	},
];

export const studentInformation = {
	resumeLink: 'https//sample-link',
	currentCTC: 5,
	criteria: [
		{
			criteria: 'GPA',
			value: 8,
		},
		{
			criteria: '12th Percentage',
			value: 80,
		},
	],
};

export default function ApplicationForm({ onClose, job }: { onClose: () => void; job: IJob }) {
	const [formData, setFormData] = useState<Record<string, any>>({});
	const [isEligible, setIsEligible] = useState(true);
	const [isPlacedInSlab, setIsPlacedInSlab] = useState(false);
	const [isCriteriaMet, setIsCriteriaMet] = useState(false);
	const { toast } = useToast();

	const missingCriteria = jobCriteria.filter(
		(jobCriterion) => !studentInformation.criteria.some((sc) => sc.criteria === jobCriterion.criteria)
	);

	useEffect(() => {
		let eligible = true;
		let placedInSlab = false;

		if (getSlab(job.CTC) === getSlab(studentInformation.currentCTC)) {
			placedInSlab = true;
		}

		jobCriteria.forEach((jobCriterion) => {
			const studentCriterion = studentInformation.criteria.find((sc) => sc.criteria === jobCriterion.criteria);

			if (studentCriterion) {
				if (jobCriterion.type === 'integer') {
					const studentValue = Number(studentCriterion.value);
					if (studentValue < jobCriterion.minValue! || studentValue > jobCriterion.maxValue!) {
						eligible = false;
					}
				}

				if (jobCriterion.type === 'dropdown' || jobCriterion.type === 'string') {
					const studentValue = String(studentCriterion.value);
					if (studentValue !== jobCriterion.value) {
						eligible = false;
					}
				}
			}
		});

		setIsEligible(eligible);
		setIsPlacedInSlab(placedInSlab);

		const allCriteriaMet = missingCriteria.every((criterion) => {
			const value = formData[criterion.criteria];
			if (criterion.type === 'integer') {
				return (
					(criterion.minValue === undefined || value >= criterion.minValue) &&
					(criterion.maxValue === undefined || value <= criterion.maxValue)
				);
			}
			return value === criterion.value;
		});

		setIsCriteriaMet(allCriteriaMet);
	}, [job, formData]);

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		toast({
			title: 'Application Submitted',
			// description: `${criterionName} has been updated`,
		});
		onClose();
	};

	const handleUpdate = (criterionName: string, value: any) => {
		setFormData({
			...formData,
			[criterionName]: value,
		});
	};

	const handleUpdateProfile = (criterionName: string) => {
		toast({
			title: 'Profile Updated',
			description: `${criterionName} has been updated`,
		});
	};

	return (
		<form onSubmit={handleFormSubmit}>
			{!isEligible && (
				<Alert variant="destructive">You are ineligible for this job based on your current qualifications.</Alert>
			)}
			{isPlacedInSlab && <Alert variant="destructive">You are already placed in this CTC slab.</Alert>}

			{jobCriteria.map((criterion) => {
				const studentCriterion = studentInformation.criteria.find((sc) => sc.criteria === criterion.criteria);
				const isMissingCriterion = missingCriteria.some((mc) => mc.criteria === criterion.criteria);

				return (
					<div key={criterion.criteria} className="mb-4 mt-6">
						<div className="flex justify-between">
							<div className="flex space-x-4">
								<Label className="block text-sm font-medium text-white">{criterion.criteria}</Label>
								{isMissingCriterion && (
									<Button
										type="button"
										variant={'link'}
										onClick={() => handleUpdateProfile(criterion.criteria)}
										className="-translate-y-2 text-blue-300 hover:text-blue-200"
									>
										Update this to your profile
									</Button>
								)}
							</div>
							<div className="text-neutral-400 text-right">
								Required Criteria:{' '}
								{criterion.type === 'integer' ? `${criterion.minValue} - ${criterion.maxValue}` : criterion.value}
							</div>
						</div>
						{criterion.type === 'dropdown' ? (
							<Select
								onValueChange={(value) => handleUpdate(criterion.criteria, value)}
								required
								value={formData[criterion.criteria] || ''}
							>
								<SelectTrigger className="mt-1 w-full border-white">
									{formData[criterion.criteria] || `Select ${criterion.criteria}`}
								</SelectTrigger>
								<SelectContent className="text-white bg-neutral-800 border-white">
									{branchOptions.map((branch) => (
										<SelectItem key={branch} value={branch}>
											{branch}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						) : (
							<Input
								type={criterion.type === 'integer' ? 'number' : 'text'}
								value={studentCriterion?.value || formData[criterion.criteria] || ''}
								disabled={!!studentCriterion && !isMissingCriterion}
								required
								className="mt-1 w-full"
								onChange={(e) => handleUpdate(criterion.criteria, e.target.value)}
							/>
						)}
					</div>
				);
			})}

			<div className="flex justify-end mt-4">
				<Button type="submit" disabled={!isEligible || isPlacedInSlab || !isCriteriaMet}>
					Submit Application
				</Button>
			</div>
		</form>
	);
}
