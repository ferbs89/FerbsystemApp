export function formatMoney(amount) {
	if (isNaN(amount))
		amount = 0;

	return amount.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
}

export function formatDateDMY(value) {
	const datetime = value.split('T');
	const date = datetime[0].split('-');
	return date[2] + '/' + date[1] + '/' + date[0];
}

export function formatDateYMD(value) {
	const datetime = value.split('T');
	return datetime[0];
}
