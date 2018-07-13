import nodes from "./nodes";

export const clearForm = () => {
	nodes.label.forEach(el => el.classList.remove('active'));
	nodes.input.forEach(el => el.value = '');
};
