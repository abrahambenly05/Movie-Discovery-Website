from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import movies, auth, watchlist
from app.core.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="CineScope API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(movies.router)
app.include_router(auth.router)
app.include_router(watchlist.router)

@app.get("/")
async def root():
    return {"message": "CineScope API is running"}