import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ScrollSpyProvider } from "./providers/ScrollSpyProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { AboutPage } from "./pages/AboutPage";
import { HomePage } from "./pages/HomePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { AppLayout } from "./components/layout/AppLayout";
import { RouteScrollReset } from "./components/common/RouteScrollReset";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ScrollSpyProvider>
          <RouteScrollReset />
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="projects" element={<ProjectsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ScrollSpyProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
