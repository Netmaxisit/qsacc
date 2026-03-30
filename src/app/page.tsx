import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Services from "@/components/Services";
import About from "@/components/About";
import AppointmentCTA from "@/components/AppointmentCTA";
import MTD from "@/components/MTD";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Partners />
      <Services />
      <About />
      <AppointmentCTA />
      <MTD />
      <Contact />
      <Footer />
    </main>
  );
}
