import { z } from 'zod';

const currentYear = new Date().getFullYear();

export const filterSchema = z.object({
  marque: z.string().min(2, {
    message: "La marque doit contenir au moins 2 caractères.",
  }),
  modele: z.string().min(1, {
    message: "Le modèle doit contenir au moins 1 caractère.",
  }),
  annee: z.number({
    required_error: "L'année est requise.",
    invalid_type_error: "L'année doit être un nombre.",
  }).int()
    .min(1990, { message: "L'année doit être au minimum 1990." })
    .max(currentYear + 1, { message: `L'année ne peut pas dépasser ${currentYear + 1}.` }),
  kilometrage: z.number({
    required_error: "Le kilométrage est requis.",
    invalid_type_error: "Le kilométrage doit être un nombre.",
  }).int()
    .min(0, { message: "Le kilométrage ne peut être inférieur à 0." })
    .max(500000, { message: "Le kilométrage ne peut dépasser 500000." }),
  carburant: z.enum(["Essence", "Diesel", "Hybride", "Electrique"]).optional(),
  boite: z.enum(["Manuelle", "Automatique"]).optional(),
});

export type SearchFilters = z.infer<typeof filterSchema>;
