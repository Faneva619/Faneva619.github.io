import { About, Blog, Gallery, Home, Newsletter, Person, Social } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Faneva",
  lastName: "Rivotiana",
  name: `RAVELONOMENJANAHARY Faneva Rivotiana`,
  role: "Étudiant en Data Science, IA & Physique",
  avatar: "/images/faneva-avatar.jpg",
  email: "contact@rivo.int.yt", // ← Ton email Comail (quand configuré)
  location: "Antananarivo, MDG",
  languages: ["Malgache", "Français", "Anglais"],
  locale: "fr",
};

const newsletter: Newsletter = {
  display: false,
  title: <>Newsletter</>,
  description: <></>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Faneva619",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/fanevaravelonomenjanahary/",
    essential: true,
  },
  {
    name: "Mastodon (Sciences)",
    icon: "globe",
    link: "https://social.sciences.re/@faneva_rivotiana",
    essential: true,
  },
  {
    name: "Mastodon",
    icon: "globe",
    link: "https://mastodon.social/@faneva_rivotiana",
    essential: false, // ← Pas essentiel pour éviter la surcharge
  },
  {
    name: "Bluesky",
    icon: "globe",
    link: "https://bsky.app/profile/rivo.int.yt",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Accueil",
  title: `Portfolio – ${person.name}`,
  description: `Portfolio de ${person.name}, étudiant en Data Science, Intelligence Artificielle et Physique à Antananarivo.`,
  headline: <>Data Science & Intelligence Artificielle</>,
  featured: {
    display: false,
    title: <></>,
    href: "/",
  },
  subline: (
    <>
      Exploration du monde des  <Text as="span" weight="strong">Datas</Text> et Construction des <Text as="span" weight="strong">Outils</Text> pour agir dessus. <br />
      Basé à Antananarivo, Madagascar.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "À propos",
  title: `À propos – ${person.name}`,
  description: `Parcours académique et compétences de ${person.name}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Passionné par la modélisation du monde réel, je navigue entre deux domaines fascinants : 
        la <Text as="span" weight="strong">Physique</Text>, pour comprendre les lois fondamentales de l'univers, 
        et la <Text as="span" weight="strong">Data Science</Text>, pour extraire de la connaissance et prédire des comportements complexes. 
        Mon objectif est de créer des solutions technologiques robustes, élégantes et scientifiquement fondées.
      </>
    ),
  },
  work: {
    display: true,
    title: "Parcours Académique",
    experiences: [
      {
        company: "Université (L3 Informatique)",
        timeframe: "En cours",
        role: "Spécialisation Data Science, IA & Robotique",
        achievements: [
          <>
            Approfondissement des algorithmes de Machine Learning et des architectures de réseaux de neurones.
          </>,
          <>
            Conception et implémentation de systèmes robotiques et traitement de données massives.
          </>,
        ],
        images: [],
      },
      {
        company: "Université (L1 Physique)",
        timeframe: "Validé",
        role: "Formation Fondamentale",
        achievements: [
          <>
            Étude approfondie de l'Électrostatique, de l'Électromagnétisme et de la Mécanique classique.
          </>,
          <>
            Développement d'une rigueur scientifique et de capacités de modélisation mathématique.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: false,
    title: "Studies",
    institutions: [],
  },
  technical: {
    display: true,
    title: "Compétences Techniques",
    skills: [
      {
        title: "Data Science & Intelligence Artificielle",
        description: (
          <>Modélisation, entraînement et déploiement de modèles prédictifs.</>
        ),
        tags: [
          { name: "Python", icon: "code" },
          { name: "Machine Learning", icon: "cpu" },
          { name: "Réseaux de neurones", icon: "grid" },
        ],
        images: [],
      },
      {
        title: "Administration Système & Développement",
        description: (
          <>Maîtrise des environnements de développement et des outils de versioning.</>
        ),
        tags: [
          { name: "Kali Linux", icon: "terminal" },
          { name: "Next.js", icon: "nextjs" },
          { name: "Git", icon: "github" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Articles et Réflexions",
  description: `Publications techniques et scientifiques par ${person.name}`,
};

const work: Work = {
  path: "/work",
  label: "Projets",
  title: `Projets – ${person.name}`,
  description: `Réalisations académiques et personnelles en IA, Physique et Développement.`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Galerie",
  title: `Galerie – ${person.name}`,
  description: `Collection visuelle`,
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };
