import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface Member {
  name: string;
  affiliation: string;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(() => {
    // Detectar hash al cargar la página
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  });

  /* ---------- DATA ---------- */
  const organizingCommittee: Member[] = [
    { name: 'Roberto Cavoretto', affiliation: 'University of Turin, Italy' },
    { name: 'Clemente Cesarano', affiliation: 'Uninettuno University, Italy' },
    { name: 'Alessandra De Rossi', affiliation: 'University of Turin, Italy' },
    { name: 'Incoronata Notarangelo', affiliation: 'University of Turin, Italy' },
    { name: 'Alvise Sommariva', affiliation: 'University of Padua, Italy' },
  ];

  const scientificCommittee: Member[] = [
    { name: 'Praveen Agarwal', affiliation: 'ANAND ICE College, Jaipur, India' },
    { name: 'Roberto Cavoretto', affiliation: 'University of Turin, Italy' },
    { name: 'Clemente Cesarano', affiliation: 'Uninettuno University' },
    { name: "Francesco Dell'Accio", affiliation: 'University of Calabria, Italy' },
    { name: 'Alessandra De Rossi', affiliation: 'University of Turin, Italy' },
    { name: 'Luisa Fermo', affiliation: 'University of Cagliari, Italy' },
    { name: 'Francisco Marcellan', affiliation: 'University Carlos III Madrid, Spain' },
    { name: 'Nicola Mastronardi', affiliation: 'IAC - CNR, Italy' },
    { name: 'Amir Noorizadegan', affiliation: 'Hong Kong Baptist University' },
    { name: 'Incoronata Notarangelo', affiliation: 'University of Turin, Italy' },
    { name: 'Donatella Occorsio', affiliation: 'University of Basilicata, Italy' },
    { name: 'Giuseppe Rodriguez', affiliation: 'University of Cagliari, Italy' },
    { name: 'Maria Grazia Russo', affiliation: 'University of Basilicata, Italy' },
    { name: 'Alvise Sommariva', affiliation: 'University of Padua, Italy' },
  ];

  const navItems = [
    'Home',
    'About',
    'Committees',
    'Lecturers',
    'Working Groups',
    'Posters and Seminars',
    'Program',
    'Registration',
    'Important Dates',
    'Venue',
  ];

  const handleNavClick = (section: string) => {
    const sectionId = section.toLowerCase().replace(/ /g, '-');
    setActiveSection(sectionId);
    setIsMenuOpen(false);

    // Actualizar hash en la URL
    window.location.hash = sectionId;
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
            organizingCommittee={organizingCommittee}
            scientificCommittee={scientificCommittee}
          />
        );
      case 'lecturers':
        return <LecturersSection />;
      case 'working-groups':
        return <WorkingGroupsSection scientificCommittee={scientificCommittee} />;
      case 'posters-and-seminars':
        return <PostersSection />;
      case 'program':
        return <ProgramSection />;
      case 'registration':
        return <RegistrationSection />;
      case 'important-dates':
        return <ImportantDatesSection />;
      case 'venue':
        return <VenueSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
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

/* ---------- SECTION WRAPPER ---------- */
const SectionWrapper: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div>
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 text-center">
      <h2 className="text-4xl font-bold">{title}</h2>
    </section>
    <section className="py-16 bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 text-base leading-relaxed">
      {children}
    </section>
  </div>
);

/* ---------- HOME ---------- */
const HomeSection: React.FC = () => (
  <>
    <section className="relative bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 text-white min-h-screen py-32 flex items-center">
      <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row items-center justify-between gap-16 w-full">
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

        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src="./sito-foro.jpg"
            alt="Bardonecchia landscape"
            className="w-full max-w-2xl rounded-2xl shadow-2xl border border-blue-300 object-cover"
          />
        </div>
      </div>
    </section>

    <section className="relative z-10 bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto items-center justify-items-center">
          <div className="flex justify-center items-center">
            <img
              src="./torinologo.png"
              alt="University of Turin"
              className="h-42 object-contain bg-white p-2 rounded-lg"
            />
          </div>
          <div className="flex justify-center items-center">
            <img
              src="./uninetlogo.png"
              alt="Uninettuno University"
              className="h-28 object-contain bg-white p-2 rounded-lg"
            />
          </div>
        </div>
        <div className="flex justify-center items-center mt-12">
          <img
            src="./padovalogo.jpeg"
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
    <div className="max-w-3xl mx-auto text-gray-800 text-base leading-relaxed space-y-4">
      <p>
        The <strong>Alps Approximation School and Meeting (AASM 2026)</strong> will be held
        in <strong>Bardonecchia (TO), Italy</strong>, from <strong>June 1 to 5, 2026</strong>.
      </p>

      <p>
        This international event combines a <strong>Summer School</strong> and a{" "}
        <strong>Scientific Meeting</strong> devoted to{" "}
        <strong>Approximation Theory</strong>, bringing together mathematicians,
        researchers, and students interested in both fundamental advances and applied
        perspectives.
      </p>

      <p>
        The program will explore <strong>theoretical frameworks</strong>,{" "}
        <strong>computational methods</strong>, and{" "}
        <strong>applications</strong> of approximation techniques to problems arising in{" "}
        <strong>industrial and applied sciences</strong>.
      </p>

      <p>
        The School will feature <strong>lectures by leading experts</strong>,{" "}
        <strong>collaborative working sessions</strong>, and{" "}
        <strong>hands-on software development activities</strong>, with a particular focus
        on <strong>PhD students</strong>, <strong>postdoctoral fellows</strong>, and{" "}
        <strong>early-career researchers</strong>.
      </p>

      <p>
        <strong>A certificate of attendance and number of 4 ECTS will be assigned</strong>.
      </p>

      {/* Confirmed Lecturers */}
      <p className="font-semibold mt-8">Confirmed Lecturers</p>
      <ul className="list-disc list-outside ml-6 space-y-2">
        <li>
          <strong>Teresa Pérez</strong> (University of Granada, Spain):{" "}
          <em>
            “Orthogonal Polynomials in Several Variables: From Hermite to Zernike and
            Beyond. Applications in Optics.”
          </em>
        </li>
        <li>
          <strong>Nick Hale</strong> (Stellenbosch University, South Africa):{" "}
          <em>“Computational Approximation with Chebfun.”</em>
        </li>
      </ul>

      {/* Working Groups */}
      <p className="font-semibold mt-8">Working Groups</p>

      <div className="space-y-4">
        <p>
          Working Groups are designed to foster in-depth discussion and collaboration
          on specific research topics. They offer participants the opportunity to
          exchange ideas, develop joint projects, and explore emerging issues in
          their field. Results of the participants’ research may also be presented
          during the poster session. The following Working Groups will be organized:
        </p>

      <ul className="list-disc list-outside ml-6 space-y-2">
        <li>
          <strong>Luisa Fermo</strong> and <strong>Giuseppe Rodriguez</strong> (University
          of Cagliari, Italy): Numerical integration and applications to integral equations
        </li>
        <li>
          <strong>Francisco Marcellán</strong> (University Carlos III Madrid, Spain) and{" "}
          <strong>Nicola Mastronardi</strong> (IAC – CNR, Italy): Sobolev orthogonal
          polynomials: theoretical and computational aspects
        </li>
        <li>
          <strong>Francesco Dell’Accio</strong> (University of Calabria, Italy):
          Approximation by algebraic functions: from one to several variables, with
          applications
        </li>
        <li>
          <strong>Donatella Occorsio</strong> and <strong>Maria Grazia Russo</strong>{" "}
          (University of Basilicata, Italy): Approximation methods for functional equations
        </li>
        <li>
          <strong>Roberto Cavoretto</strong> (University of Turin, Italy) and{" "}
          <strong>Amir Noorizadegan</strong> (Hong Kong Baptist University): Meshless
          methods and scientific machine learning
        </li>
        <li>
          <strong>Praveen Agarwal</strong> (ANAND ICE College, Jaipur, India) and{" "}
          <strong>Clemente Cesarano</strong> (Uninettunno University): Operator theory in
          describing and analyzing special polynomials
        </li>
      </ul>

      {/* Poster session (nuevo bloque) */}
      <p className="font-semibold mt-8">Poster session</p>
      <ul className="list-disc list-outside ml-6 space-y-2">
        <li>
            <strong>Incoronata Notarangelo</strong> (University of Turin, Italy) and{" "}
            <strong>Alvise Sommariva</strong> (University of Padua, Italy)
        </li>
      </ul>
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
        <ul className="space-y-1">
          {organizingCommittee.map((m, i) => (
            <li key={i}>
              {m.name} ({m.affiliation})
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-blue-900 mb-4">
          Scientific Committee
        </h3>
        <ul className="space-y-1">
          {scientificCommittee.map((m, i) => (
            <li key={i}>
              {m.name} ({m.affiliation})
            </li>
          ))}
        </ul>
      </div>
    </div>
  </SectionWrapper>
);

/* ---------- WORKING GROUPS ---------- */
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
      names: ['Nicola Mastronardi', 'Francisco Marcellan'],
      topic: 'Sobolev orthogonal polynomials: theoretical and computational aspects',
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
    {
      names: ['Clemente Cesarano', 'Praveen Agarwal'],
      topic: 'Operator theory in describing and analyzing special polynomials',
    },
  ];

  const sortNamesByLastName = (names: string[]) =>
    [...names].sort((a, b) => {
      const lastA = a.split(' ').slice(-1)[0].toLowerCase();
      const lastB = b.split(' ').slice(-1)[0].toLowerCase();
      return lastA.localeCompare(lastB);
    });

  const normalizedGroups = groups.map((g) => ({
    ...g,
    names: sortNamesByLastName(g.names),
  }));

  return (
    <SectionWrapper title="Working Groups">
      <div className="max-w-3xl mx-auto space-y-6 text-base leading-relaxed">
        <ol className="list-decimal list-inside space-y-4">
          {normalizedGroups.map((g, i) => (
            <li key={i}>
              {g.names.map((n, idx) => (
                <React.Fragment key={n}>
                  <strong>{n}</strong> ({affiliation(n)})
                  {idx < g.names.length - 1 ? ' and ' : ''}
                </React.Fragment>
              ))}
              : {g.topic}
            </li>
          ))}
        </ol>
      </div>
    </SectionWrapper>
  );
};

/* ---------- POSTERS ---------- */
const PostersSection: React.FC = () => (
  <SectionWrapper title="Posters and Seminars">
    <div className="max-w-3xl mx-auto text-gray-800 text-base leading-relaxed space-y-4">
      <p>
        Participants are encouraged to present their research results during the poster session.
        Poster abstracts (one page in PDF format) should be submitted by <strong>February 28, 2026</strong>,
        via email to <strong>Incoronata Notarangelo</strong> (incoronata.notarangelo@unito.it)
        and <strong>Alvise Sommariva</strong> (alvise@math.unipd.it).
      </p>
      <p>
        <strong>Notification of acceptance</strong> will be sent by <strong>March 15, 2026</strong>.
      </p>
    </div>
  </SectionWrapper>
);


/* ---------- LECTURERS ---------- */
const LecturersSection: React.FC = () => (
  <SectionWrapper title="Lecturers">
    <div className="max-w-3xl mx-auto space-y-6 text-base leading-relaxed">
      <div>
        <h3 className="text-xl font-semibold">Teresa Perez</h3>
        <p>Department of Mathematics, University of Granada, Spain</p>
        <p>
          “Orthogonal Polynomials in Several Variables: From Hermite to Zernike
          and Beyond. Applications in Optics.”
        </p>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Nick Hale</h3>
        <p>Applied Mathematics, Stellenbosch University, South Africa</p>
        <p>“Computational Approximation with Chebfun.”</p>
      </div>
    </div>
  </SectionWrapper>
);

/* ---------- PROGRAM / REGISTRATION / VENUE ---------- */
const ProgramSection: React.FC = () => (
  <SectionWrapper title="Program">
    <p className="text-center text-gray-600">
      The detailed program will be announced soon.
    </p>
  </SectionWrapper>
);


/*--------REGISTRATION------ */
const RegistrationSection: React.FC = () => (
  <SectionWrapper title="Registration">
    <div className="max-w-3xl mx-auto text-gray-800 text-base leading-relaxed space-y-6">
      <p>
        All the activities of <strong>AASM 2026</strong> will be held at the <strong>VILLAGGIO OLIMPICO BARDONECCHIA.</strong> 
      </p>

      <ul className="list-none space-y-2">
        <li>
          <strong>Dates:</strong> June 1st – June 5th, 2026
        </li>
        <li>
          <strong>Mode of Study:</strong> on campus
        </li>
        <li>
          <strong>Application deadline:</strong> March 15th, 2026
        </li>
      </ul>

      <p>
        You can register{" "}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScbcc7g6VgkQ2ntFqlQ6NZVAJJplLAVgj4on-L3CVabdcu24g/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline hover:text-blue-900"
        >
          here
        </a>
        .
      </p>

      <p>
        Please be informed that as of <strong>March 15th, 2026</strong>, those who have
        filled out the application form will be contacted via email by{" "}
        <strong>Dr. Tiziana Giovannelli</strong> (
        <a
          href="mailto:tiziana.giovannelli@uninettunouniversity.net"
          className="text-blue-700 underline hover:text-blue-900"
        >
          tiziana.giovannelli@uninettunouniversity.net
        </a>
        ), who will send you a link to complete the final registration and payment for the{" "}
        <strong>Alps Approximation School and Meeting (AASM 2026)</strong>.
      </p>
      

      <p>
        <strong>AASM 2026 PACKAGES</strong> include accommodation, coffee breaks, meals (breakfast, lunch and dinner)*, registration fee, school and meeting kit, social dinner, welcome drink (* from the dinner of the first day till the lunch of the last day)
      </p>

      <p>
        <strong>AASM 2026 PACKAGES</strong>
      </p>

      <p>
        <u><strong>Packages with Reduced Rates</strong> (applied to WG organizers, PhD students, post-docs)</u>
      </p>  
      
      <ul className="list-none space-y-2">
        <li>
          [P1] 4 NIGHTS (1-5 June) in SHARED room - 500 Eur
        </li>
        <li>
          [P2] 5 NIGHTS (1-6 June) in SHARED room - 600 Eur
        </li>
        <li>
          [P3] 4 NIGHTS (1-5 June) in SINGLE room - 650 Eur
        </li>
        <li>
          [P4] 5 NIGHTS (1-6 June) in SINGLE  room - 750 Eur
        </li>
      </ul>

       <p>
        <u><strong>Packages with Regular Rates</strong> (applied to all other participants, not eligible for a reduced rate)</u>
      </p>  
      
      <ul className="list-none space-y-2">
        <li>
          [P5] 4 NIGHTS (1-5 June) in SHARED room - 600 Eur
        </li>
        <li>
          [P6] 5 NIGHTS (1-6 June) in SHARED room - 700 Eur
        </li>
        <li>
          [P7] 4 NIGHTS (1-5 June) in SINGLE room - 750 Eur
        </li>
        <li>
          [P8] 5 NIGHTS (1-6 June) in SINGLE  room - 850 Eur
        </li>
      </ul>



    </div>
  </SectionWrapper>
);

/* ---------- IMPORTANT DATES ---------- */
const ImportantDatesSection: React.FC = () => (
  <SectionWrapper title="Important Dates">
    <ul className="list-none space-y-2">
        <li>
          <strong>February 15, 2026:</strong> Deadline to contact the Working Group organizers to be included in a Working Group
        </li>
        <li>
          <strong>February 28, 2026:</strong> Poster abstract submission deadline
        </li>
        <li>
          <strong>February 28, 2026:</strong> Working Group participant list due (to be provided by WG organizers)
        </li>
        <li>
          <strong>March 15, 2026:</strong> Registration deadline
        </li>
        <li>
          <strong>March 31, 2026:</strong> Payment deadline
        </li>
      </ul>
  </SectionWrapper>
);



const VenueSection: React.FC = () => (
  <SectionWrapper title="Venue">
    <div className="max-w-3xl mx-auto text-gray-800 text-base leading-relaxed space-y-6">
      <div className="text-center">
        <p className="font-semibold">VILLAGGIO OLIMPICO BARDONECCHIA</p>
        <p>Viale della Vittoria 46 – 10052 Bardonecchia (TO)</p>
        <p>
          <a
            href="https://www.villaggiobardonecchia.it"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline hover:text-blue-900"
          >
            www.villaggiobardonecchia.it
          </a>
        </p>
      </div>

      <p>
        The venue is in the <strong>Villaggio Olimpico Bardonecchia</strong>, and can be
        reached with public transports as follows:
      </p>

      <ol className="list-decimal list-outside ml-6 space-y-2">
        <li>
          arrive to the <strong>Torino Porta Nuova railway station</strong> in train or bus;
        </li>
        <li>
          arrive to the <strong>Bardonecchia railway station</strong> in train (from the
          Torino Porta Nuova railway station);
        </li>
        <li>
          arrive to the <strong>Villaggio Olimpico Bardonecchia</strong> (from the
          Bardonecchia railway station)
        </li>
      </ol>

      <div>
        <p className="font-semibold mt-8">
          Arrive to the Torino Porta Nuova railway station:
        </p>
        <ul className="list-disc list-outside ml-6 space-y-2">
          <li>
            if you arrive in Torino by train, you should aim for the Torino Porta Nuova
            railway station.
          </li>
          <li>
            if you arrive by plane at the{" "}
            <a
              href="https://www.aeroportoditorino.it/en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline hover:text-blue-900"
            >
              Torino Airport
            </a>{" "}
            there are buses going to the Torino Porta Nuova railway station in ~45 min (the
            timetables are available{" "}
            <a
              href="https://torino.arriva.it/en/airport-line-torino-malpensa-airport/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline hover:text-blue-900"
            >
              here
            </a>
            ).
          </li>
          <li>
            if you arrive by plane at the{" "}
            <a
              href="https://www.milanomalpensa-airport.com/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline hover:text-blue-900"
            >
              Milano Malpensa Airport
            </a>{" "}
            there are buses going to Torino Autostazione, in front of the Torino Porta Susa
            railway station, in ~2 hours (the timetables are available{" "}
            <a
              href="https://torino.arriva.it/en/airport-line-torino-malpensa-airport/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline hover:text-blue-900"
            >
              here
            </a>
            ). And then you can take the metro/subway in order to get to the Torino Porta Nuova railway
            station: 3 stops in “Lingotto” direction from “Porta Susa” stop to “Porta Nuova” stop
            (information about tickets available{" "}
            <a
              href="https://www.gtt.to.it/cms/en/fares"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline hover:text-blue-900"
            >
              here
            </a>
            ).
          </li>
          <li>
            If you arrive by plane at the{" "}
            <a
              href="https://www.milanolinate-airport.com/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline hover:text-blue-900"
            >
              Milano Linate Airport
            </a>{" "}
            or at the{" "}
            <a
              href="https://www.milanbergamoairport.it/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline hover:text-blue-900"
            >
              Milano Bergamo Airport
            </a>{" "}
            you should get by bus to the Milano Centrale railway station (timetables and
            tickets available{" "}
            <a
              href="https://www.airportbusexpress.it/?lang=en-GB"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline hover:text-blue-900"
            >
              here
            </a>
            ), and then reach by train the Torino Porta Nuova railway station (there are trains
            provided by{" "}
            <a
              href="https://www.trenitalia.com/en.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline hover:text-blue-900"
            >
              Trenitalia
            </a>{" "}
            and{" "}
            <a
              href="https://www.italotreno.it/en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline hover:text-blue-900"
            >
              Italo
            </a>
            ).
          </li>
        </ul>
      </div>

      <div>
        <p className="font-semibold mt-8">
          Arrive to the Bardonecchia railway station:
        </p>
        <ul className="list-disc list-outside ml-6 space-y-2">
          <li>
            if you are at the Torino Porta Nuova railway station, you should take a train
            going to Bardonecchia in ~1 hr 30 min (timetables are available{" "}
            <a
              href="https://www.trenitalia.com/en.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline hover:text-blue-900"
            >
              here
            </a>
            ).
          </li>
        </ul>
      </div>

      <div>
        <p className="font-semibold mt-8">
          Arrive to the Villaggio Olimpico Bardonecchia:
        </p>
        <ul className="list-disc list-outside ml-6 space-y-2">
          <li>
            if you are at the Bardonecchia railway station, you can reach the Villaggio
            Olimpico Bardonecchia in ~12 min by foot (~850 m), see the path{" "}
            <a
              href="https://www.google.com/maps/dir/Bardonecchia,+Bardonecchia,+TO/Villaggio+Olimpico,+Viale+della+Vittoria,+Bardonecchia+TO/@45.074663,6.7002626,16z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x4789ec9235e3afeb:0xff6769dd8185fb9c!2m2!1d6.7098611!2d45.0763604!1m5!1m1!1s0x4789ecf2496d3377:0xa0af6595cf98ac2a!2m2!1d6.701289!2d45.0731627!3e2?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline hover:text-blue-900"
            >
              here
            </a>
            .
          </li>
        </ul>
      </div>
    </div>
  </SectionWrapper>
);



export default App;
