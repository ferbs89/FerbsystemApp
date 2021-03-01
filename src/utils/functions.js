export function formatMoney(amount) {
	if (isNaN(amount))
		amount = 0;

	return amount.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
}

export function formatDate(value) {
	const date = value.split('-');
	return date[2] + '/' + date[1] + '/' + date[0];
}