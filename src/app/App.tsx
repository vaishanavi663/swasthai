import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

export default function App() {
  return (
    <div className="dark w-full h-screen bg-midnight">
      <RouterProvider router={router} />
    </div>
  );
}
