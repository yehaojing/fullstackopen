from sqlalchemy import Column, Integer, String
from database import Base


class Keyboard(Base):
    __tablename__ = 'keyboard'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    switches = Column(String(50))
    stabilisers = Column(String(50))
    keycaps = Column(String(50))
    manufacturer = Column(String(50))
