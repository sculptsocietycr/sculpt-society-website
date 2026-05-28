import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Concept from './components/Concept.jsx';
import Experience from './components/Experience.jsx';
import BedazzlingBar from './components/BedazzlingBar.jsx';
import ForWho from './components/ForWho.jsx';
import DressCode from './components/DressCode.jsx';
import Details from './components/Details.jsx';
import Agenda from './components/Agenda.jsx';
import RegistrationForm from './components/RegistrationForm.jsx';
import Founders from './components/Founders.jsx';
import FAQ from './components/FAQ.jsx';
import Closing from './components/Closing.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppFloat from './components/WhatsAppFloat.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Concept />
        <Experience />
        <BedazzlingBar />
        <ForWho />
        <DressCode />
        <Details />
        <Agenda />
        <RegistrationForm />
        <Founders />
        <FAQ />
        <Closing />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
