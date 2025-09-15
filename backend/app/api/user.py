from datetime import datetime
from typing import Optional
import bcrypt
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status


from app.schemas.user import CreateUser, LoginUser, ResponseUser, UpdateUser
from app.core.database import SessionLocal
from app.models.user import User


router = APIRouter(prefix="/users", tags=["users"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=ResponseUser)
def create_user(user: CreateUser, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="El correo ya existe.")

    # Haseamos la password
    hashed_password = bcrypt.hashpw(
        user.password.encode('utf-8'), bcrypt.gensalt())

    new_user = User(
        name=user.name,
        surname=user.surname,
        email=user.email,
        password=hashed_password.decode('utf-8'),
        phone=user.phone,
        birthdate=user.birthdate,
        role=user.role,
        membership=user.membership,
        photo=user.photo,
        address=user.address,
        emergency_contact=user.emergency_contact,
        tall=user.tall,
        weight=user.weight,
        fitness_level=user.fitness_level,
        fitness_objective=user.fitness_objective,
        medical_condition=user.medical_condition,
        allergies=user.allergies,
        class_reminder=user.class_reminder,
        payment_reminder=user.payment_reminder,
        class_summary=user.class_summary,
        promotions_offers=user.promotions_offers,
        social_updates=user.social_updates,
        visible_profile=user.visible_profile,
        share_progress=user.share_progress,
        show_ranking=user.show_ranking,
        state=user.state
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.post("/login", response_model=ResponseUser)
def login_user(user: LoginUser, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="El correo no existe.")

    if not bcrypt.checkpw(user.password.encode('utf-8'), db_user.password.encode('utf-8')):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="La contraseña es incorrecta.")

    # Actualizar last_login
    db_user.last_login = datetime.now()
    db.commit()
    db.refresh(db_user)
    return db_user


@router.get("/", response_model=list[ResponseUser])
def get_users(role: Optional[str] = "user", db: Session = Depends(get_db)):
    db_users = db.query(User).filter(User.role == role).all()

    return db_users


@router.get("/{status}", response_model=list[ResponseUser])
def get_users_by_status(status: str, db: Session = Depends(get_db)):
    db_users = db.query(User).filter(User.state == status).all()
    return db_users


@router.put("/{user_id}", response_model=ResponseUser)
def update_user(user_id: int, user: UpdateUser, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="El usuario no existe."
        )

    # Solo actualizar los campos que vienen
    update_data = user.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_user, key, value)

    db.commit()
    db.refresh(db_user)
    return db_user


@router.get("/{name}", response_model=list[ResponseUser])
def users_get_by_name(name: str, db: Session = Depends(get_db)):
    db_users = db.query(User).filter(User.name == name).all()
    return db_users
