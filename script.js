function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}
const store = Redux.createStore(todo);
function todo(state = [], action) {
	switch (action.type) {
		case 'add':
			return (state = state.concat({
				text: document.querySelector('input').value,
				id: uuidv4(),
				completed: false,
			}));
		case 'remove':
			return (state = state.filter((b) => {
				return b.id != action.id;
			}));
		case 'completed':
			return (state = state.filter((b) => {
				if (b.id == action.id) return (b.completed = true);
				else {
					return b;
				}
			}));
		default:
			return state;
	}
}

document.querySelector('input').addEventListener('keyup', (e) => {
	if (e.keyCode == 13) {
		store.dispatch({ type: 'add' });
	}
});

store.subscribe(() => {
	Array.from(document.querySelectorAll('h2')).map((x) => {
		x.remove();
	});
	store.getState().map((a) => {
		var b = document.createElement('h2');
		if (a.completed == true) {
			b.style.textDecoration = 'line-through';
		}
		b.id = a.id;
		b.innerText = a.text;
		document.querySelector('body').append(b);
	});
	document.querySelectorAll('h2').forEach((a) => {
		a.addEventListener('dblclick', () => {
			store.dispatch({ type: 'remove', id: a.id });
		});
	});
	document.querySelectorAll('h2').forEach((a) => {
		a.addEventListener('click', () => {
			store.dispatch({ type: 'completed', id: a.id });
		});
	});
});
