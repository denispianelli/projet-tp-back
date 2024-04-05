import sanitizeHtml from 'sanitize-html';

export default function sanitizeData(req, _res, next) {
  // Si req.body est un objet, désinfectez chaque propriété de l'objet
  if (typeof req.body === 'object' && req.body !== null) {
    Object.keys(req.body).forEach((prop) => {
      req.body[prop] = sanitizeHtml(req.body[prop], {
        allowedTags: [], // Liste des balises HTML autorisées
        allowedAttributes: {}, // Liste des attributs autorisés
      });
    });
  }

  if (typeof req.query === 'object' && req.query !== null) {
    Object.keys(req.query).forEach((prop) => {
      req.query[prop] = sanitizeHtml(req.query[prop], {
        allowedTags: [], // Liste des balises HTML autorisées
        allowedAttributes: {}, // Liste des attributs autorisés
      });
    });
  }

  if (typeof req.params === 'object' && req.params !== null) {
    Object.keys(req.params).forEach((prop) => {
      req.params[prop] = sanitizeHtml(req.params[prop], {
        allowedTags: [], // Liste des balises HTML autorisées
        allowedAttributes: {}, // Liste des attributs autorisés
      });
    });
  }

  next();
}
