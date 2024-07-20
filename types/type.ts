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
}
