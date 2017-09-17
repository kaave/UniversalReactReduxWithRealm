import dev from './development';
import prod from './production';

export default process.env.NODE_ENV === 'development' ? dev : prod;
