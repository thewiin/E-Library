from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_marshmallow import Marshmallow

db = SQLAlchemy()
bcrypt = Bcrypt()
ma = Marshmallow()
migrate = Migrate()
jwt = JWTManager()