from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import movies

app = FastAPI(title="CineScope API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(movies.router)

@app.get("/")
async def root():
    return {"message": "CineScope API is running"}