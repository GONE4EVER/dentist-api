import loginRoutes from 'pages/Login/routes';
import homeRoutes from 'pages/Home/routes';


const routes = [
  homeRoutes,
  loginRoutes,

  // fallback
  {
    path: '*',
    redirect: '/',
  },
];

export default routes;
