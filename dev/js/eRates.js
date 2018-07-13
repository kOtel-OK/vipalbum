//global object for exchange rates values
	const eRates = {
		rur: null,
		usd: null
	};

//global JSONP function for exchange rates
	const success = (data) => {
		try {
			eRates.rur = data[data.findIndex(el => el.ccy === 'RUR')]['buy'];
			eRates.usd = data[data.findIndex(el => el.ccy === 'USD')]['buy'];

		} catch(err) {
			noRates();
		}
	};

//script injection for crossdomain access
	const addScript = (src) => {

		const script = document.createElement('script');

		script.src = src;
		script.type = 'text/javascript';
		document.head.appendChild(script);

		script.addEventListener('error', () => {
			noRates();
		})

	};

//show error if rates unavailable
	const noRates = () => {
		const currencyError = document.querySelector('.currency_error');

		currencyError.style = 'display: block';
	};

	addScript('https://api.privatbank.ua/p24api/pubinfo?jsonp=success&exchange&coursid=5');

