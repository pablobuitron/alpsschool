import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

/* ---------- TYPES ---------- */
interface Member {
  name: string;
  affiliation: string;
}

/* ---------- MAIN APP ---------- */
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  /* ---------- DATA ---------- */
  const organizingCommittee: Member[] = [
    { name: 'Alessandra De Rossi', affiliation: 'University of Turin, Italy' },
    { name: 'Alvise Sommariva', affiliation: 'University of Padua, Italy' },
    { name: 'Clemente Cesarano', affiliation: 'Uninettuno University, Italy' },
    { name: 'Incoronata Notarangelo', affiliation: 'University of Turin, Italy' },
    { name: 'Roberto Cavoretto', affiliation: 'University of Turin, Italy' },
  ];

  const scientificCommittee: Member[] = [
    { name: 'Amir Noorizadegan', affiliation: 'Hong Kong Baptist University' },
    { name: 'Alessandra De Rossi', affiliation: 'University of Turin, Italy' },
    { name: 'Alvise Sommarima', affiliation: 'University of Padua, Italy' },
    { name: 'Clemente Cesarano', affiliation: 'Uninettuno University' },
    { name: 'Donatella Occorsio', affiliation: 'University of Basilicata, Italy' },
    { name: "Francesco Dell'Accio", affiliation: 'University of Calabria, Italy' },
    { name: 'Francisco Marcellan', affiliation: 'University Carlos III Madrid, Spain' },
    { name: 'Giuseppe Rodriguez', affiliation: 'University of Cagliari, Italy' },
    { name: 'Incoronata Notarangelo', affiliation: 'University of Turin, Italy' },
    { name: 'Luisa Fermo', affiliation: 'University of Cagliari, Italy' },
    { name: 'Maria Grazia Russo', affiliation: 'University of Basilicata, Italy' },
    { name: 'Nicola Mastronardi', affiliation: 'IAC - CNR, Italy' },
    { name: 'Praveen Agarwal', affiliation: 'ANAND ICE College, Jaipur, India' },
    { name: 'Roberto Cavoretto', affiliation: 'University of Turin, Italy' },
  ];

  const sortByLastName = (arr: Member[]) =>
    [...arr].sort((a, b) => {
      const lastA = a.name.split(' ').slice(-1)[0].toLowerCase();
      const lastB = b.name.split(' ').slice(-1)[0].toLowerCase();
      return lastA.localeCompare(lastB);
    });

  const navItems = [
    'Home',
    'About',
    'Committees',
    'Lecturers',
    'Working Groups',
    'Program',
    'Registration',
    'Venue',
  ];

  const handleNavClick = (section: string) => {
    setActiveSection(section.toLowerCase().replace(/ /g, '-'));
    setIsMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection />;
      case 'about':
        return <AboutSection />;
      case 'committees':
        return (
          <CommitteesSection
            organizingCommittee={sortByLastName(organizingCommittee)}
            scientificCommittee={sortByLastName(scientificCommittee)}
          />
        );
      case 'lecturers':
        return <LecturersSection />;
      case 'working-groups':
        return <WorkingGroupsSection scientificCommittee={scientificCommittee} />;
      case 'program':
        return <ProgramSection />;
      case 'registration':
        return <RegistrationSection />;
      case 'venue':
        return <VenueSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-blue-900">AASM 2026</h1>

            {/* Desktop menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeSection === item.toLowerCase().replace(/ /g, '-')
                        ? 'bg-blue-100 text-blue-900'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-900'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-900"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    activeSection === item.toLowerCase().replace(/ /g, '-')
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-900'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">{renderContent()}</main>
    </div>
  );
}

/* ---------- SECTION WRAPPER ---------- */
const SectionWrapper: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div>
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 text-center">
      <h2 className="text-4xl font-bold">{title}</h2>
    </section>
    <section className="py-16 bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </section>
  </div>
);

/* ---------- HOME (con logos de nuevo) ---------- */
const HomeSection: React.FC = () => (
  <>
    {/* Hero azul */}
    <section className="relative bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 text-white min-h-screen py-32 flex items-center">
      <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row items-center justify-between gap-16 w-full">
        {/* Texto */}
        <div className="flex-1 text-left space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Alps Approximation <br /> School and Meeting
          </h1>
          <h2 className="text-3xl md:text-4xl font-light text-blue-100">
            AASM 2026
          </h2>
          <div className="text-xl md:text-2xl text-blue-100 space-y-2">
            <p>June 1–5, 2026</p>
            <p>Bardonecchia (TO), Italy</p>
          </div>
        </div>

        {/* Imagen grande */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src="/sito-foro.jpg"
            alt="Bardonecchia landscape"
            className="w-full max-w-2xl rounded-2xl shadow-2xl border border-blue-300 object-cover"
          />
        </div>
      </div>
    </section>

    {/* Logos (parte blanca) */}
    <section className="relative z-10 bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto items-center justify-items-center">
          <div className="flex justify-center items-center">
            <img
              src="/torinologo.png"
              alt="University of Turin"
              className="h-32 object-contain bg-white p-2 rounded-lg"
            />
          </div>
          <div className="flex justify-center items-center">
            <img
              src="/uninetlogo.png"
              alt="Uninettuno University"
              className="h-28 object-contain bg-white p-2 rounded-lg"
            />
          </div>
        </div>
        <div className="flex justify-center items-center mt-12">
          <img
            src="/padovalogo.png"
            alt="University of Padua"
            className="h-28 object-contain bg-white p-2 rounded-lg"
          />
        </div>
      </div>
    </section>
  </>
);

/* ---------- ABOUT ---------- */
const AboutSection: React.FC = () => (
  <SectionWrapper title="About AASM 2026">
    <div className="max-w-3xl mx-auto text-gray-700 space-y-4 leading-relaxed">
      <p className="text-lg font-semibold">
        Summer School and Scientific Meeting on Approximation Theory
      </p>
      <p>
        This scientific meeting and summer school will take place in Bardonecchia (To)
        from June 1 to 5, 2026.
      </p>
      <p>
        The program focuses on Approximation Theory, combining theoretical insights
        and applied implementations. Its main objective is to develop effective
        solutions for mathematical models arising in industrial and applied sciences.
      </p>
      <p>
        The school will include lectures, collaborative working groups, and software
        development activities, targeting PhD students, post-docs, and young researchers.
      </p>
    </div>
  </SectionWrapper>
);

/* ---------- COMMITTEES ---------- */
const CommitteesSection: React.FC<{
  organizingCommittee: Member[];
  scientificCommittee: Member[];
}> = ({ organizingCommittee, scientificCommittee }) => (
  <SectionWrapper title="Committees">
    <div className="max-w-3xl mx-auto space-y-10">
      <div>
        <h3 className="text-2xl font-semibold text-blue-900 mb-4">
          Organizing Committee
        </h3>
        <ul className="space-y-1 text-gray-700">
          {organizingCommittee.map((m, i) => (
            <li key={i}>
              {m.name} <span className="text-gray-500">({m.affiliation})</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-blue-900 mb-4">
          Scientific Committee
        </h3>
        <ul className="space-y-1 text-gray-700">
          {scientificCommittee.map((m, i) => (
            <li key={i}>
              {m.name} <span className="text-gray-500">({m.affiliation})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </SectionWrapper>
);

/* ---------- RESTO DE SECCIONES ---------- */
const WorkingGroupsSection: React.FC<{ scientificCommittee: Member[] }> = ({
  scientificCommittee,
}) => {
  const affiliation = (name: string) =>
    scientificCommittee.find((p) => p.name.includes(name))?.affiliation || '';

  const groups = [
    {
      names: ['Luisa Fermo', 'Giuseppe Rodriguez'],
      topic: 'Numerical integration and applications to integral equations',
    },
    {
      names: ['Clemente Cesarano', 'Praveen Agarwal'],
      topic: 'Operator theory in describing and analyzing special polynomials',
    },
    {
      names: ['Nicola Mastronardi', 'Francisco Marcellan'],
      topic: '[To be announced]',
    },
    {
      names: ["Francesco Dell'Accio"],
      topic:
        'Approximation by Algebraic Functions: From One to Several Variables, with Applications',
    },
    {
      names: ['Donatella Occorsio', 'Maria Grazia Russo'],
      topic: 'Approximation methods for functional equations',
    },
    {
      names: ['Amir Noorizadegan', 'Roberto Cavoretto'],
      topic: 'Meshless methods and scientific Machine Learning',
    },
  ];

  const sortedGroups = groups.sort((a, b) => {
    const lastA = a.names[0].split(' ').slice(-1)[0].toLowerCase();
    const lastB = b.names[0].split(' ').slice(-1)[0].toLowerCase();
    return lastA.localeCompare(lastB);
  });

  return (
    <SectionWrapper title="Working Groups">
      <div className="max-w-3xl mx-auto text-gray-700 space-y-6">
        <ol className="list-decimal list-inside space-y-3">
          {sortedGroups.map((g, i) => (
            <li key={i}>
              <strong>
                {g.names
                  .sort((a, b) =>
                    a.split(' ').slice(-1)[0].localeCompare(b.split(' ').slice(-1)[0])
                  )
                  .join(' and ')}
                :
              </strong>{' '}
              {g.names.map((n) => (
                <span key={n} className="text-gray-500">
                  {' '}
                  ({affiliation(n)})
                </span>
              ))}
              <br />
              {g.topic}
            </li>
          ))}
        </ol>
      </div>
    </SectionWrapper>
  );
};

const LecturersSection: React.FC = () => (
  <SectionWrapper title="Lecturers">
    <div className="max-w-3xl mx-auto space-y-6 text-gray-700">
      <div>
        <h3 className="text-xl font-semibold">Teresa Perez</h3>
        <p className="italic">
          Department of Mathematics, University of Granada, Spain
        </p>
        <p>
          “Orthogonal Polynomials in Several Variables: From Hermite to Zernike and
          Beyond. Applications in Optics.”
        </p>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Nick Hale</h3>
        <p className="italic">
          Applied Mathematics, Stellenbosch University, South Africa
        </p>
        <p>“Computational Approximation with Cheb.”</p>
      </div>
    </div>
  </SectionWrapper>
);

const ProgramSection: React.FC = () => (
  <SectionWrapper title="Program">
    <p className="text-center text-gray-600">
      The detailed program will be announced soon.
    </p>
  </SectionWrapper>
);

const RegistrationSection: React.FC = () => (
  <SectionWrapper title="Registration">
    <p className="text-center text-gray-600">
      Registration details will be available in upcoming updates.
    </p>
  </SectionWrapper>
);

const VenueSection: React.FC = () => (
  <SectionWrapper title="Venue">
    <p className="text-center text-gray-600">
      Venue details will be provided later.
    </p>
  </SectionWrapper>
);

export default App;
