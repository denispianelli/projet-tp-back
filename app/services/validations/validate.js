// on va créer des générateurs de middleware
// les cas étant divers et variés (validation du body,
// de params ou de query, schémas multiples etc.)
// on appellera la bonne fonction en lui passant le schéma de validation

// Fonction middleware qui valide les données de la requête par rapport à un schéma spécifié
export default function validate(requestData, schema) {
  return async (request, _, next) => {
    try {
      await schema.validateAsync(request[requestData]);
      next();
    } catch (error) {
      error.status = 400;
      next(error);
    }
  };
}
