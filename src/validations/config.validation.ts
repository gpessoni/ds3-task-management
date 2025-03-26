const validateId = (id: string) => {
    if (!id) {
      return {
        error: "ID é obrigatório",
        message: "ID é obrigatório",
      };
    }
  
    const numberId = Number(id);
    if (isNaN(numberId) || !/^\d+$/.test(id)) {
      return {
        error: "ID deve ser um número",
        message: "ID inválido",
      };
    }
  
    if (numberId <= 0) {
      return {
        error: "ID deve ser maior que zero",
        message: "ID inválido",
      };
    }
  
    return {
      error: null,
      message: null,
    };
  };

  const validateUpdateBody = (body: any) => {
    if (!body || Object.keys(body).length === 0) {
      return {
        error: "Corpo da requisição vazio",
        message: "Dados para atualização são obrigatórios"
      };
    }
  
    if (!body.level && body.default === undefined) {
      return {
        error: "Pelo menos um campo deve ser fornecido para atualização",
        message: "Dados inválidos para atualização"
      };
    }
  
    return { error: null };
  };

  const isValidHexColor = (color: string) => {
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexColorRegex.test(color);
  };
  
  
  export { validateId, validateUpdateBody, isValidHexColor };
  