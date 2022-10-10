import { createRoot } from 'react-dom/client';
import App from './App';
import memoryUtils from './utils/memoryUtils';
import storageUtils from './utils/storageUtils';

const user = storageUtils.getUser()
memoryUtils.user = user

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App/>);