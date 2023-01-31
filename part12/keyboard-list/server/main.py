from typing import List
from fastapi import FastAPI, status, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine, SessionLocal
from sqlalchemy.orm import Session
import models
import schemas

Base.metadata.create_all(engine)

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


@app.get("/")
def root():
    return "keyboard"


@app.post(
    "/keyboard",
    response_model=schemas.Keyboard,
    status_code=status.HTTP_201_CREATED
)
def create_keyboard(
    keyboard: schemas.KeyboardCreate,
    session: Session = Depends(get_session)
):

    keyboard_db = models.Keyboard(
        name=keyboard.name,
        switches=keyboard.switches,
        stabilisers=keyboard.stabilisers,
        keycaps=keyboard.keycaps,
        manufacturer=keyboard.manufacturer
    )

    session.add(keyboard_db)
    session.commit()
    session.refresh(keyboard_db)

    return keyboard_db


@app.get("/keyboard/{id}", response_model=schemas.Keyboard)
def read_keyboard(id: int):

    session = SessionLocal()
    keyboard = session.query(models.Keyboard).get(id)
    session.close()

    if not keyboard:
        raise HTTPException(
            status_code=404,
            detail=f"keyboard with id {id} not found"
        )

    return keyboard


@app.put("/keyboard/{id}", response_model=schemas.Keyboard)
def update_keyboard(id: int, name: str):

    session = SessionLocal()
    keyboard = session.query(models.Keyboard).get(id)

    if keyboard:
        keyboard.name = name
        session.commit()

    session.close()

    if not keyboard:
        raise HTTPException(
            status_code=404,
            detail=f"keyboard with id {id} not found"
        )

    return keyboard


@app.delete("/keyboard/{id}")
def delete_keyboard(id: int):

    session = SessionLocal()
    keyboard = session.query(models.Keyboard).get(id)

    if keyboard:
        session.delete(keyboard)
        session.commit()
        session.close()
    else:
        raise HTTPException(
            status_code=404,
            detail=f"keyboard with id {id} not found"
        )

    return f"keyboard with id {id} deleted"


@app.get("/keyboard", response_model=List[schemas.Keyboard])
def read_keyboard_list():

    session = SessionLocal()
    keyboard_list = session.query(models.Keyboard).all()
    session.close()

    return keyboard_list
