import homeRoutes from 'pages/Home/routes';
import loginRoutes from 'pages/Login/routes';


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
