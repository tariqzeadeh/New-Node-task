import { movieModel } from "../models";
import axios from "axios";
import { generateError } from "../../helpers";

const attributes = [
  "id",
  "adult",
  "backdrop_path",
  "title",
  "release_date",
  "poster_path",
  "popularity",
  "overview",
];

export const moviesRepo = {
  list: async () => {
    const { count, rows } = await movieModel.findAndCountAll({
      attributes: attributes,
    });
    return rows ? { moviesCount: count, moviesList: rows } : [];
  },

  get: async (id) => {
    const movie = await movieModel.findByPk(id, { attributes: attributes });
    return movie ? movie : generateError(404, "Movie Not Found");
  },

  update: async (id, fields) => {
    const movie = await movieModel.update(
      {
        ...fields,
      },
      { where: { id: id } }
    );
    return movie[0]
      ? { message: "Updated Successfully." }
      : generateError(500, "Some Thing Went Wrong.");
  },

  delete: async (id) => {
    const movie = await movieModel.destroy({ where: { id } });
    return movie
      ? { message: "Deleted successfully." }
      : generateError(500, "Some Thing Went Wrong.");
  },

  create: async (
    id,
    adult,
    backdrop_path,
    title,
    release_date,
    poster_path,
    popularity,
    overview
  ) => {
    const movie = await movieModel.findOne({ where: { id } });
    if (movie) return generateError(400, "This Movie Is Already Stored");
    const newMovie = await movieModel.create({
      id,
      adult,
      backdrop_path,
      title,
      release_date,
      poster_path,
      popularity,
      overview,
    });
    return newMovie ? newMovie : generateError(500, "Some Thing Went Wrong.");
  },
  seed: async (page) => {
    const result = await axios.get(
      `https://api.themoviedb.org/3/discover/movie/?api_key=${process.env.MOVIES_API_KEY}&language=en-US&sort_by=popularity.asc&page=${page}`
    );
    const movies = [];

    for (let i = 0; i < result.data.results.length; i++) {
      movies.push({
        id: result.data.results[i].id,
        adult: result.data.results[i].adult,
        backdrop_path: result.data.results[i].backdrop_path,
        title: result.data.results[i].title,
        release_date: result.data.results[i].release_date,
        poster_path: result.data.results[i].poster_path,
        popularity: result.data.results[i].popularity,
        overview: result.data.results[i].overview,
      });
    }

    const dbMovies = await movieModel.bulkCreate(movies);
    return dbMovies ? dbMovies : generateError(500, "Some Thing Went Wrong.");
  },
};
