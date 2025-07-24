import { z } from "zod";

// Interface za prodajalca
export interface Seller {
  name: string;
  phone: string;
  email: string;
  address?: string;
  website?: string;
}

// Interface za nepremičnino
export interface Property {
  id: number;
  title: string;
  location: string;
  area: number;              // m²
  price: number;             // EUR
  floor: string | number;
  rooms?: number;
  description: string;
  features: string[];
  heating?: string;
  energyClass?: string;
  reference?: string;
  images: string[];
  mapEmbedUrl?: string;
  seller: Seller;
}

// Zod shema za validacijo
export const propertySchema = z.object({
  id: z.number(),
  title: z.string().min(3),
  location: z.string(),
  area: z.number().positive(),
  price: z.number().positive(),
  floor: z.union([z.string(), z.number()]),
  rooms: z.number().optional(),
  description: z.string(),
  features: z.array(z.string()),
  heating: z.string().optional(),
  energyClass: z.string().optional(),
  reference: z.string().optional(),
  images: z.array(z.string().url()),
  mapEmbedUrl: z.string().url().optional(),
  seller: z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email(),
    address: z.string().optional(),
    website: z.string().url().optional(),
  }),
});

// Mock data generator
export const generateMockProperty = (id: number): Property => ({
  id,
  title: `Testna nepremičnina ${id}`,
  location: "Ljubljana, Center",
  area: 85,
  price: 250000,
  floor: 2,
  description: "Popolnoma prenovljeno stanovanje z razgledom.",
  features: ["Balkon", "Internet", "Klet"],
  heating: "Toplovod",
  energyClass: "B",
  reference: `REF-${id}`,
  images: [
    "https://via.placeholder.com/800x600?text=Slika+1",
    "https://via.placeholder.com/800x600?text=Slika+2",
  ],
  mapEmbedUrl: "https://maps.google.com/?q=Ljubljana",
  seller: {
    name: "Muster d.o.o.",
    phone: "+386 40 999 999",
    email: "info@muster.si",
    address: "Musterjeva 1, 1000 Ljubljana",
    website: "https://www.muster.si",
  },
});
