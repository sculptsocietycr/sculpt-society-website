import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Founders from './components/Founders.jsx';
import Beliefs from './components/Beliefs.jsx';
import Community from './components/Community.jsx';
import NextEvent from './components/NextEvent.jsx';
import Included from './components/Included.jsx';
import BedazzlingBar from './components/BedazzlingBar.jsx';
import Agenda from './components/Agenda.jsx';
import RegistrationForm from './components/RegistrationForm.jsx';
import Events from './components/Events.jsx';
import Gallery from './components/Gallery.jsx';
import FAQ from './components/FAQ.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppFloat from './components/WhatsAppFloat.jsx';
import LogoDivider from './components/LogoDivider.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Founders />
        <Beliefs />
        <LogoDivider variant="cream" />
        <Community />
        <NextEvent />
        <Included />
        <BedazzlingBar />
        <Agenda />
        <RegistrationForm />
        <Events />
        <Gallery />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
