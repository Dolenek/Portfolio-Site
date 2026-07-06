import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ScrollSpyProvider } from "./providers/ScrollSpyProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { HomePage } from "./pages/HomePage";
import { AppLayout } from "./components/layout/AppLayout";
import { RouteScrollReset } from "./components/common/RouteScrollReset";

const AboutPage = lazy(() =>
  import("./pages/AboutPage").then((module) => ({ default: module.AboutPage }))
);
const ProjectsPage = lazy(() =>
  import("./pages/ProjectsPage").then((module) => ({ default: module.ProjectsPage }))
);

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ScrollSpyProvider>
          <RouteScrollReset />
          <Suspense fallback={null}>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="projects" element={<ProjectsPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </ScrollSpyProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
