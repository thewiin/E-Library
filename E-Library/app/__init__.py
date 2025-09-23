from flask import Flask
from flask.cli import load_dotenv
from app.extensions import db, bcrypt, ma, migrate, jwt
from app.route.auth_route import auth_bp
from app.route.user_route import user_bp
from app.route.book_route import book_bp
from app.route.borrow_route import borrow_bp
from app.route.comment_route import comment_bp
from flask_cors import CORS

def create_app():
    load_dotenv()
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    CORS(app)
    CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

    db.init_app(app)
    bcrypt.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(user_bp, url_prefix="/api/users")
    app.register_blueprint(book_bp, url_prefix="/api/books")
    app.register_blueprint(borrow_bp, url_prefix="/api/borrow")
    app.register_blueprint(comment_bp, url_prefix="/api/comments")

    from app import models

    return app