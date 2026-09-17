from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.watchlist import Watchlist
from app.models.user import User
from app.schemas.watchlist import WatchlistCreate, WatchlistResponse

router = APIRouter(prefix="/watchlist", tags=["Watchlist"])

@router.post("", response_model=WatchlistResponse, status_code=status.HTTP_201_CREATED)
def add_to_watchlist(
    item: WatchlistCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    existing_item = (
        db.query(Watchlist)
        .filter(
            Watchlist.user_id == current_user.id,
            Watchlist.tmdb_movie_id == item.tmdb_movie_id,
        )
        .first()
    )
    if existing_item:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Movie is already in your watchlist",
        )
        
    new_item = Watchlist(
        user_id=current_user.id,
        tmdb_movie_id=item.tmdb_movie_id,
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    
    return new_item

@router.get("", response_model=List[WatchlistResponse])
def get_watchlist(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return (
        db.query(Watchlist)
        .filter(Watchlist.user_id == current_user.id)
        .order_by(Watchlist.added_at.desc())
        .all()
    )

@router.delete("/{tmdb_movie_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_from_watchlist(
    tmdb_movie_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    item = (
        db.query(Watchlist)
        .filter(
            Watchlist.user_id == current_user.id,
            Watchlist.tmdb_movie_id == tmdb_movie_id,
        )
        .first()
    )
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Movie not found in your watchlist",
        )
        
    db.delete(item)
    db.commit()
    return None