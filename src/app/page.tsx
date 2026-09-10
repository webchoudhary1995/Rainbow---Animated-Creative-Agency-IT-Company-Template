import Navbar   from "@/components/Navbar";
import Hero      from "@/components/sections/Hero";
import Services  from "@/components/sections/Services";
import Story     from "@/components/sections/Story";
import About     from "@/components/sections/About";
import Portfolio from "@/components/sections/Portfolio";
import Pricing   from "@/components/sections/Pricing";
import Careers   from "@/components/sections/Careers";
import Contact   from "@/components/sections/Contact";
import Footer    from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Story />
        <About />
        <Portfolio />
        <Pricing />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
