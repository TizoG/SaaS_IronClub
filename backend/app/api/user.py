import bcrypt
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status


from app.schemas.user import CreateUser, LoginUser, ResponseUser
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
        show_ranking=user.show_ranking
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

    return db_user
