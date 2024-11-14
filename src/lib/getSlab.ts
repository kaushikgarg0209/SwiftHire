export const getSlab = (CTC: number) => {
	if (CTC <= 7) return 1;
	else if (CTC > 7 && CTC <= 20) return 2;
	else return 3;
};
