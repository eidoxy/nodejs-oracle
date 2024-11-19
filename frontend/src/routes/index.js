import { lazy } from "react";

const HomePage = lazy(() => import('../pages/Home'));
const KaryawanPage = lazy(() => import('../pages/Karyawan'));

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/karyawan',
    component: KaryawanPage,
  },
];

export default routes;