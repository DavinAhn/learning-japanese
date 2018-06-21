export const Logger = () => next => action => {
  console.log(action);
  return next(action);
};
