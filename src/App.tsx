import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ScrollSpyProvider } from "./providers/ScrollSpyProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { AboutPage } from "./pages/AboutPage";
import { HomePage } from "./pages/HomePage";
import { AppLayout } from "./components/layout/AppLayout";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ScrollSpyProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ScrollSpyProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
