import Joi from 'joi';

// Schéma de validation pour la connexion (signin)
export const signinSchema = Joi.object({
  username: Joi.string().pattern(/^[a-zA-Z0-9_]{2,50}$/), // Le pseudo doit contenir entre 2 et 50 caractères alphanumériques
  password: Joi.string().pattern(/^[a-zA-Z0-9$!?*_%]{8,64}$/), // Le mot de passe doit contenir entre 8 et 64 caractères alphanumériques ou spéciaux
}).required().length(2); // Les deux champs (username et password) sont requis

// Schéma de validation pour l'inscription (signup)
export const signupSchema = Joi.object({
  username: Joi.string().pattern(/^[a-zA-Z0-9_]{2,50}$/), // Le pseudo doit contenir entre 2 et 50 caractères alphanumériques
  email: Joi.string().email(), // L'email doit être une adresse email valide
  password: Joi.string().pattern(/^[a-zA-Z0-9$!?*_%]{8,64}$/), // Le mot de passe doit contenir entre 8 et 64 caractères alphanumériques ou spéciaux
}).required().length(3); // Les trois champs (username et password et email) sont requis

// Schéma de validation pour la demande de réinitialisation du mot de passe
export const requestPasswordResetSchema = Joi.object({
  username: Joi.string().pattern(/^[a-zA-Z0-9_]{2,50}$/),
  email: Joi.string().email(), // L'email doit être une adresse email valide
}).required(); // Le champ email est requis

// Schéma de validation pour la réinitialisation du mot de passe
export const resetPasswordSchema = Joi.object({
  newPassword: Joi.string().pattern(/^[a-zA-Z0-9!?*_%]{8,64}$/), // Le mot de passe doit contenir entre 8 et 64 caractères alphanumériques ou spéciaux
  passwordConfirmation: Joi.any().valid(Joi.ref('newPassword')).required(),
  token: Joi.string().required(),
}).required().length(3); // Les deux champs (password et newPassword) sont requis

// Schéma de validation pour la demande de réinitialisation du mot de passe
export const contactSchema = Joi.object({
  username: Joi.string().pattern(/^[a-zA-Z0-9_]{2,50}$/),
  email: Joi.string().email(), // L'email doit être une adresse email valide
  object: Joi.string().required(), // L'objet doit être une chaîne non vide et est requis
  message: Joi.string().required(), // Le message doit être une chaîne non vide et est requis
}).required().length(4); // Le champ email est requis
