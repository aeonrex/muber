vvps-engine
=============

###What is it?

	It's going to help you get a server running, yo!


###How to use:

	Prep app structure:

		/
			config/
				|
				environments/
				|
				anything else.json
			app/
				|
				controllers/
					<api-controllers>
			server.js

	In da main just do dis:

```javascript
var engine = require('vvps-engine').bootstrap({}, function () {
	console.log('YOU RUNNING BITCH');
});
```
