import * as config from '../src/system/config';
import * as qstr from '../src/system/qtools/qstr';
import { instantiate } from '../src/system/factories/controllerFactory';

const express = require('express');
const cors = require('cors');
const app = express();
const port = config.getBackendPort();

app.use(cors());
app.use(express.json());

app.post('/controller*', function (request: any, response: any) {
	const controllerIdCode = qstr.chopLeft(request.path, '/');
	const controller = instantiate(controllerIdCode, request, response);
	if (controller !== undefined) {
		controller.process();
	}
});

app.get('/', (req: any, res: any) => {
	res.send('dpod backend');
});

app.listen(port, () => {
	console.log(`backend listening on port ${port}...`);
});