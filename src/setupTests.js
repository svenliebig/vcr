import 'raf/polyfill';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
    adapter: new Adapter()
});

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