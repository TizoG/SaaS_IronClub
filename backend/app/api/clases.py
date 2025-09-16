from datetime import datetime
from typing import Optional
import bcrypt
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status


from app.schemas.clases import CreateClases, ResponseClases, UpdateClases
from app.core.database import SessionLocal
from app.models.clases import Clase

router = APIRouter(prefix="/clases")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=ResponseClases)
def create_clase(clase: CreateClases, db: Session = Depends(get_db)):

    new_clase = Clase(
        name=clase.name,
        tipo=clase.tipo,
        zona=clase.zona,
        hora=clase.hora,
        duracion=clase.duracion,
        capacidad=clase.capacidad,
        profesor=clase.profesor,
        descripcion=clase.descripcion,
        estado=clase.estado
    )

    db.add(new_clase)
    db.commit()
    db.refresh(new_clase)

    return new_clase


@router.get("/", response_model=list[ResponseClases])
def get_clases(db: Session = Depends(get_db)):
    db_clases = db.query(Clase).all()
    return db_clases


@router.get("/{tipo}", response_model=list[ResponseClases])
def get_clases_by_tipo(tipo: str, db: Session = Depends(get_db)):
    db_class = db.query(Clase).filter(Clase.tipo == tipo).all()
    return db_class


@router.put("/{clase_id}", response_model=ResponseClases)
def update_class(clase_id: int, clase: UpdateClases, db: Session = Depends(get_db)):
    db_clase = db.query(Clase).filter(Clase.id == clase_id).first()
    if not db_clase:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="La clase no existe."

        )

    update_data = clase.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_clase, key, value)

    db.commit()
    db.refresh(db_clase)
    return db_clase


@router.get("/{name}", response_model=list[ResponseClases])
def clases_get_by_name(name: str, db: Session = Depends(get_db)):
    db_clases = db.query(Clase).filter(Clase.name == name).all()
    return db_clases


@router.delete("/{clase_id}", response_model=ResponseClases)
def delete_clase(clase_id: int, db: Session = Depends(get_db)):
    db_clase = db.query(Clase).filter(Clase.id == clase_id).first()
    if not db_clase:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="La clase no existe."
        )

    db.delete(db_clase)
    db.commit()
    return db_clase
