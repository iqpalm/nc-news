export const compare = (a, b) => {
  const dateA = a.created_at;
  const dateB = b.created_at;

  let comparison = 0;
  if (dateA > dateB) {
    comparison = 1;
  } else if (dateA < dateB) {
    comparison = -1;
  }
  return comparison * -1;
};
