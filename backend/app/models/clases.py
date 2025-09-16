from sqlalchemy import Boolean, Column, Date, DateTime, Float, Integer, String, func
from app.core.database import Base


class Clase(Base):
    __tablename__ = "clases"

    id = Column(Integer, autoincrement=True, primary_key=True)
    name = Column(String(100), nullable=False)
    tipo = Column(String(100), nullable=False)
    zona = Column(String(100), nullable=False)
    hora = Column(DateTime, nullable=False)
    duracion = Column(Integer, nullable=False)
    capacidad = Column(Integer, nullable=False)
    profesor = Column(String(100), nullable=False)
    descripcion = Column(String(255), nullable=False)
    estado = Column(String(100), nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
