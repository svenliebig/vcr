import Enzyme from 'enzyme';
import 'raf/polyfill';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// global.requestAnimationFrame = function(callback) {
// 	setTimeout(callback, 0);
// };

global.localStorage = {};
global.localStorage.getItem = () => {
	return null;
}
global.localStorage.setItem = () => {
	return null;
}
global.localStorage.removeItem = () => {
	return null;
}