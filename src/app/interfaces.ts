export interface Result {
    id: number;
    image: string;
    name: string;
    species: string;
    status: string;
    type: string;
    gender: string;
    url: string;
    origin: { name: string; url: string; };
    location: { name: string; url: string; };
};

export interface Info {
    count: number;
    pages: number;
    next: string;
    prev: number | null;
};

export interface Character {
    results: Result[];
    info: Info;
};
