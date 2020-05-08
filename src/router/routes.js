import loginRoutes from 'pages/Login/routes';
import homeRoutes from 'pages/Home/routes';


const routes = [
  homeRoutes,
  loginRoutes,
  {
    path: '*', // fallback
    redirect: '/',
  },
];

export default routes;
