from flask import Flask
from flask.cli import load_dotenv
from app.extensions import db, bcrypt, ma, migrate
from app.route.auth_route import auth_bp
from app.route.book_route import book_bp

def create_app():
    load_dotenv()
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    db.init_app(app)
    bcrypt.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(book_bp, url_prefix="/api/books")

    from app import models

    return app