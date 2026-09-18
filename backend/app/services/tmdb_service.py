import httpx
from app.core.config import TMDB_API_KEY, TMDB_BASE_URL

HEADERS = {
    "Authorization": f"Bearer {TMDB_API_KEY}",
    "accept": "application/json",
}

async def get_trending_movies():
    url = f"{TMDB_BASE_URL}/trending/movie/week"
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=HEADERS)
        response.raise_for_status()
        return response.json()
    
async def get_popular_movies():
    url = f"{TMDB_BASE_URL}/movie/popular"
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=HEADERS)
        response.raise_for_status()
        return response.json()

async def get_upcoming_movies():
    url = f"{TMDB_BASE_URL}/movie/upcoming"
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=HEADERS)
        response.raise_for_status()
        return response.json()

async def search_movies(query: str):
    url = f"{TMDB_BASE_URL}/search/movie"
    params = {"query": query}
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=HEADERS, params=params)
        response.raise_for_status()
        return response.json()

async def get_movie_detail(movie_id: int):
    url = f"{TMDB_BASE_URL}/movie/{movie_id}"
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=HEADERS)
        response.raise_for_status()
        return response.json()

async def get_movie_videos(movie_id: int):
    url = f"{TMDB_BASE_URL}/movie/{movie_id}/videos"
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=HEADERS)
        response.raise_for_status()
        return response.json()

async def get_genre_list():
    url = f"{TMDB_BASE_URL}/genre/movie/list"
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=HEADERS)
        response.raise_for_status()
        return response.json()
    
async def discover_movies_by_genre(genre_id: int):
    url = f"{TMDB_BASE_URL}/discover/movie"
    params = {"with_genres": genre_id, "sort_by": "popularity.desc"}
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=HEADERS, params=params)
        response.raise_for_status()
        return response.json()