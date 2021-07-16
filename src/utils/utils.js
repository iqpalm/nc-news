const compare = (a, b) => {
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

export const sortComments = (comments) => {
  const sortedComments = [...comments].sort(compare);
  //console.log(sortedComments);

  if (sortedComments.length !== 0) {
    sortedComments.forEach((comment) => {
      const date = new Date(comment.created_at);
      const month = date.getMonth();
      const resultMonth = month < 10 ? "0" + month : month;
      const day = date.getDate();
      const resultDay = day < 10 ? "0" + day : day;
      comment.new_created_at = `${resultDay}-${resultMonth}-${date.getFullYear()}`;
    });
  }

  return sortedComments;
};
