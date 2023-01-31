from pydantic import BaseModel


class KeyboardCreate(BaseModel):
    name: str
    switches: str
    stabilisers: str
    keycaps: str
    manufacturer: str


class Keyboard(BaseModel):
    id: int
    name: str
    switches: str
    stabilisers: str
    keycaps: str
    manufacturer: str

    class Config:
        orm_mode = True
