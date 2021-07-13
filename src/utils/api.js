import axios from "axios";

const articlesApi = axios.create({
  baseURL: "https://nc-news24-app.herokuapp.com/api",
});

export const getTopics = async () => {
  //Using promise
  //   articlesApi.get("/topics").then((response) => {
  //     console.log(response.data);
  //   });

  //Using async-await
  const { data } = await articlesApi.get("/topics");
  return data.topics;
};

export const getArticles = async (topic) => {
  // let path = "/articles";
  // if (topic) path += `?topic=${topic}`;
  const { data } = await articlesApi.get("/articles", {
    params: {
      topic: topic,
    },
  });
  return data.articles;
};

export const getArticle = async (article_id) => {
  const { data } = await articlesApi.get(`/articles/${article_id}`);
  return data.article;
};

export const patchVotes = async (article_id) => {
  const { data } = await articlesApi.patch(`/articles/${article_id}`, {
    inc_votes: 1,
  });
  console.log(data.article);
};

export const getComments = async (article_id) => {
  const { data } = await articlesApi.get(`/articles/${article_id}/comments`);
  return data.comments;
};
