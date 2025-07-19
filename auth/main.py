from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, constr
from sqlalchemy import create_engine, Column, String
from sqlalchemy.orm import declarative_base, sessionmaker
import uuid


DATABASE_URL = "postgresql://postgres:changemeinprod!@localhost:5432/skillflix_db"

Base = declarative_base()
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)


class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

Base.metadata.create_all(bind=engine)


class SignupRequest(BaseModel):
    username: constr(strip_whitespace=True, min_length=6)
    password: constr(min_length=6)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/login")
def login(credentials: LoginRequest):
    db = SessionLocal()
    user = db.query(User).filter(
        User.username == credentials.username,
        User.password == credentials.password
    ).first()
    db.close()
    print(user)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    return {
        "user_id": user.id,
        "username": user.username,
        "password": user.password
    }


@app.post("/signup")
def signup(user: SignupRequest):
    db = SessionLocal()

    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        db.close()
        raise HTTPException(status_code=400, detail="Username already exists")

    new_user = User(username=user.username, password=user.password, favorite_course_id=None)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    db.close()

    return {"message": "User created successfully", "user_id": new_user.id}
