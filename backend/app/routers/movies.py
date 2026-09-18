from fastapi import APIRouter, HTTPException
from app.services import tmdb_service

router = APIRouter(prefix="/movies", tags=["Movies"])

@router.get("/trending")
async def trending_movies():
    try:
        return await tmdb_service.get_trending_movies()
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))

@router.get("/popular")
async def popular_movies():
    try:
        return await tmdb_service.get_popular_movies()
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))
    
@router.get("/upcoming")
async def upcoming_movies():
    try:
        return await tmdb_service.get_upcoming_movies()
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))
    
@router.get("/search")
async def search(query: str):
    try:
        return await tmdb_service.search_movies(query)
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))
    
@router.get("/genres")
async def genres():
    try:
        return await tmdb_service.get_genre_list()
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))
    
@router.get("/discover")
async def discover_by_genre(genre_id: int):
    try:
        return await tmdb_service.discover_movies_by_genre(genre_id)
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))
    
@router.get("/{movie_id}")
async def movie_detail(movie_id: int):
    try:
        detail = await tmdb_service.get_movie_detail(movie_id)
        videos = await tmdb_service.get_movie_videos(movie_id)
        detail["videos"] = videos.get("results", [])
        return detail
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))