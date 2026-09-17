from pydantic import BaseModel
from datetime import datetime

class WatchlistCreate(BaseModel):
    tmdb_movie_id: int
    
class WatchlistResponse(BaseModel):
    id: int
    tmdb_movie_id: int
    added_at: datetime
    
    class Config:
        from_attributes = True