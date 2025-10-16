import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  /* ---------- DATA ---------- */
  const organizingCommittee = [
    { name: 'Alessandra De Rossi', affiliation: 'University of Turin, Italy' },
    { name: 'Alvise Sommariva', affiliation: 'University of Padua, Italy' },
    { name: 'Clemente Cesarano', affiliation: 'Uninettuno University, Italy' },
    { name: 'Incoronata Notarangelo', affiliation: 'University of Turin, Italy' },
    { name: 'Roberto Cavoretto', affiliation: 'University of Turin, Italy' },
  ];

  const scientificCommittee = [
    { name: 'Amir Noorizadegan', affiliation: 'Hong Kong Baptist University' },
    { name: 'Alessandra De Rossi', affiliation: 'University of Turin, Italy' },
    { name: 'Alvise Sommariva', affiliation: 'University of Padua, Italy' },
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

  /* Ordenar por apellido */
  const sortByLastName = (arr: { name: string; affiliation: string }[]) =>
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
        return (
          <WorkingGroupsSection
            scientificCommittee={scientificCommittee}
          />
        );
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

/* ---------- SECTIONS ---------- */

const SectionWrapper = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
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

/* ---------- HOME ---------- */
const HomeSection = () => (
  <section
    className="relative bg-cover bg-center bg-no-repeat text-white"
    style={{ backgroundImage: "url('/sito-foro.jpg')" }}
  >
    <div className="absolute inset-0 bg-blue-900/70"></div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
        Alps Approximation School and Meeting
      </h1>
      <h2 className="text-2xl md:text-3xl font-light mb-8 text-blue-100">
        AASM 2026
      </h2>
      <div className="text-xl">
        June 1–5, 2026 — Bardonecchia (TO), Italy
      </div>
    </div>

    {/* Spacer */}
    <div className="h-32 md:h-48 lg:h-64"></div>

{/* Logos */}
    <div className="relative z-10 bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto items-center justify-items-center">
          {/* Top row: Turin + Uninettuno */}
          <div className="flex justify-center items-center">
            <img
              src="/torinologo.png"
              alt="University of Turin"
              className="h-30 object-contain"
            />
          </div>
          <div className="flex justify-center items-center">
            <img
              src="/uninetlogo.png"
              alt="Uninettuno University"
              className="h-28 object-contain"
            />
          </div>
        </div>

        {/* Bottom row: Padova centered */}
        <div className="flex justify-center items-center mt-12">
          <img
            src="/padovalogo.png"
            alt="University of Padua"
            className="h-28 object-contain"
          />
        </div>
      </div>
    </div>
  </section>
);

/* ---------- ABOUT ---------- */
const AboutSection = () => (
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
const CommitteesSection = ({
  organizingCommittee,
  scientificCommittee,
}: {
  organizingCommittee: Array<{ name: string; affiliation: string }>;
  scientificCommittee: Array<{ name: string; affiliation: string }>;
}) => (
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

/* ---------- WORKING GROUPS ---------- */
const WorkingGroupsSection = ({
  scientificCommittee,
}: {
  scientificCommittee: Array<{ name: string; affiliation: string }>;
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
      topic: 'Approximation by Algebraic Functions: From One to Several Variables, with Applications',
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

/* ---------- PROGRAM ---------- */
const ProgramSection = () => (
  <SectionWrapper title="Program">
    <p className="text-center text-gray-600">
      The detailed program will be announced soon.
    </p>
  </SectionWrapper>
);

/* ---------- REGISTRATION ---------- */
const RegistrationSection = () => (
  <SectionWrapper title="Registration">
    <p className="text-center text-gray-600">
      Registration details will be available in upcoming updates.
    </p>
  </SectionWrapper>
);

/* ---------- LECTURERS ---------- */
const LecturersSection = () => (
  <SectionWrapper title="Lecturers">
    <div className="max-w-3xl mx-auto space-y-6 text-gray-700">
      <div>
        <h3 className="text-xl font-semibold">Teresa Perez</h3>
        <p className="italic">
          Department of Mathematics, University of Granada, Spain
        </p>
        <p>
          “Orthogonal Polynomials in Several Variables: From Hermite to Zernike
          and Beyond. Applications in Optics.”
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

/* ---------- VENUE ---------- */
const VenueSection = () => (
  <SectionWrapper title="Venue">
    <p className="text-center text-gray-600">
      Venue details will be provided later.
    </p>
  </SectionWrapper>
);

export default App;
