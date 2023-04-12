export const checkEmptyField = (fields) => {
	const emptyFields = [];
	Object.entries(fields).forEach(([key, value]) => {
		if (!value || value.length === 0) {
			emptyFields.push(key);
		}
	});
	return emptyFields.length ? emptyFields : false;
};
