import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AIChatAssistant from "@/components/shared/AIChatAssistant";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import Careers from "@/pages/Careers";
import Press from "@/pages/Press";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import CaseStudies from "@/pages/CaseStudies";
import Guides from "@/pages/Guides";
import Webinars from "@/pages/Webinars";
import HelpCenter from "@/pages/HelpCenter";
import ViewAllProjects from "@/pages/ViewAllProjects";

function Router() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/services/:serviceId" component={ServiceDetail} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        <Route path="/blog" component={Blog} />
        <Route path="/careers" component={Careers} />
        <Route path="/press" component={Press} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/case-studies" component={CaseStudies} />
        <Route path="/guides" component={Guides} />
        <Route path="/webinars" component={Webinars} />
        <Route path="/help-center" component={HelpCenter} />
        <Route path="/projects" component={ViewAllProjects} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
      <AIChatAssistant />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
