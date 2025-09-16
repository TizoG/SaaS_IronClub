from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date, datetime


class CreateClases(BaseModel):
    name: str
    tipo: str
    zona: str
    hora: datetime
    duracion: int
    capacidad: int
    profesor: str
    descripcion: str
    estado: str


class UpdateClases(BaseModel):
    name: Optional[str]
    tipo: Optional[str]
    zona: Optional[str]
    hora: Optional[datetime]
    duracion: Optional[int]
    capacidad: Optional[int]
    profesor: Optional[str]
    descripcion: Optional[str]
    estado: Optional[str]

    class Config:
        orm_mode = True


class ResponseClases(BaseModel):
    id: int
    name: str
    tipo: str
    zona: str
    hora: datetime
    duracion: int
    capacidad: int
    profesor: str
    descripcion: str
    estado: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
