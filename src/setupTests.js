import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';
 
Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

// the line below is declared so we can test some of the components
// in the calendar accordingly
HTMLCanvasElement.prototype.getContext = () => {};