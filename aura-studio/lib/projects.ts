export interface Project {
  id: number;
  name: string;
  type: 'Residential' | 'Commercial' | 'Hospitality';
  location: string;
  year: number;
  image: string;
  description: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    name: "Void House",
    type: "Residential",
    location: "Singapore",
    year: 2024,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80",
    description: "An extraction of volume. Parallel planes define a void where light is the only occupant.",
    featured: true
  },
  {
    id: 2,
    name: "Mass & Light",
    type: "Hospitality",
    location: "Kyoto",
    year: 2024,
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=80",
    description: "The interaction between heavy monolithic forms and transient atmospheric conditions.",
    featured: true
  },
  {
    id: 3,
    name: "The Quiet Room",
    type: "Residential",
    location: "Oslo",
    year: 2023,
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=900&q=80",
    description: "A sanctuary of acoustic and visual silence. Minimalist geometry meets Nordic isolation.",
    featured: true
  },
  {
    id: 4,
    name: "Negative Space",
    type: "Commercial",
    location: "Berlin",
    year: 2023,
    image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=900&q=80",
    description: "Defining presence through absence. A workspace structured around circulation and clarity.",
    featured: false
  },
  {
    id: 5,
    name: "Monolith II",
    type: "Residential",
    location: "Sydney",
    year: 2023,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80",
    description: "Strict tonal uniformity and material weight. An exploration of cast concrete and shadow.",
    featured: false
  },
  {
    id: 6,
    name: "Axis Pavilion",
    type: "Hospitality",
    location: "Dubai",
    year: 2022,
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=900&q=80",
    description: "Linear precision in an expansive landscape. Structured alignment with the desert horizon.",
    featured: false
  }
];
