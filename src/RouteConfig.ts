import { RouteProps } from "react-router-dom";
import QueryReports from "./molecules/QueryReports/QueryReports";
import LandingPage from "./pages/LandingPage/LandingPage";
import PostQueryPage from "./pages/PostQueryPage/PostQueryPage";
import Profile from "./pages/Profile/Profile";
import QueriesPage from "./pages/QueriesPage/QueriesPage";
import QueryDetailPage from "./pages/QueryDetailPage/QueryDetailPage";
import ReportPage from "./pages/ReportPage/ReportPage";
import SubmitPage from "./pages/SubmitPage/SubmitPage";

type RoutesConfigType = RouteProps & {
  isPrivate?: boolean;
};

const RouteConfig: RoutesConfigType[] = [
  {
    exact: true,
    path: "/",
    component: LandingPage,
  },
  {
    exact: true,
    path: "/queries",
    component: QueriesPage,
  },
  {
    exact: true,
    path: "/query/:section/:id",
    component: QueryDetailPage,
  },
  {
    exact: true,
    path: "/report/:id",
    component: ReportPage,
  },
  {
    exact: true,
    path: "/submit",
    component: SubmitPage,
  },
  {
    exact: true,
    path: "/post",
    component: PostQueryPage,
  },
  {
    exact: true,
    path: "/profile/:userName",
    component: Profile,
    isPrivate: true,
  },
];

export default RouteConfig;
