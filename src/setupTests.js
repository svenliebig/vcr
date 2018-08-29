import 'raf/polyfill';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
    adapter: new Adapter()
});

window.localStorage = {};
window.localStorage.getItem = () => {
    return null;
}
window.localStorage.setItem = () => {
    return null;
}
window.localStorage.removeItem = () => {
    return null;
}