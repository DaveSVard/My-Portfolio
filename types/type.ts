export interface IFadeIn {
  direction: string;
  type: string;
  delay: number;
  duration: number;
}

export interface INavigationLinks {
  name: string;
  path: string;
}

export interface IAbout {
  name: string;
  specialization: string;
  interest: string;
}

export interface IStats {
  value: number;
  infoText: string;
}

export interface IResumeAbout {
  title: string;
  description: string;
  info: {
    fieldName: string;
    fieldValue: string;
  }[];
}

export interface IExperience {
  title: string;
  description: string;
  items: {
    company: string;
    position: string;
    duration: string;
  }[];
}

export interface ISkills {
  title: string;
  description: string;
  technologies: {
    name: string;
    icon: string;
  }[]
}

export interface IWorks {
  id: number;
  num: string;
  category: string;
  title: string;
  description: string;
  stack: {name: string}[];
  image: string;
  live: string;
  gitHub: string;
}

export interface IData {
  navigationLinks: INavigationLinks[];
  logo: {
    name: string;
    url: string;
  };
  heroSection: {
    about: IAbout;
    stats: IStats[];
  };
  resume: {
    about: IResumeAbout;
    experience: IExperience;
    skills: ISkills;
  };
  works: IWorks[];
}
