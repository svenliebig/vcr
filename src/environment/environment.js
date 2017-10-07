import * as prod from './prod.environment';
import * as test from './test.environment';
import * as devel from './development.environment';

let environment = null;

if (process.env.NODE_ENV === "test") {
	environment = test.default;
}

if (process.env.NODE_ENV === "production") {
	environment = prod.default;
}

if (process.env.NODE_ENV === "development") {
	environment = devel.default;
}

export default environment;