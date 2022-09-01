export const generateError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  throw err;
};
