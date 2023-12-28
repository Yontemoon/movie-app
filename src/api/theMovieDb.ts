// import fetch from 'node-fetch';

export const url:string = "https://api.themoviedb.org/3"

type APIOptionsTypes = {
    method: string;
    headers: {
        accept: string,
        Authorization: string
    }
}

export const options:APIOptionsTypes = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjE1OWUxMzNmY2U1MWYzYjgzNTVjYzI1ZTBjMmZmNCIsInN1YiI6IjU0YmU2ZTE3YzNhMzY4NmM2MTAwY2I0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EwXgaHVl28xvznKNf7di1MaK1J5LMZ0uygw4cADqLTU'
    }
  };
  

