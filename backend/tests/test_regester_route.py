import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


import json
from app import app,bycrypt
"""
assert :permet de vérifier que la condition est vraie ou lève une exception si elle est fausse.
"""
def test_register_success(client, test_db):
    # Override get_db_connection_user to use the test_db fixture
    with app.app_context():
        app.config['TEST_DB'] = test_db  # Pass the in-memory DB

        # Mock get_db_connection_user to return our test_db
        def mock_get_db():
            return test_db
        app.get_db_connection_user = mock_get_db

        hashed_password = bycrypt.generate_password_hash("secure1234").decode('utf-8')

        # Test data
        data = {
            "email": "test110@test.com",
            "password": hashed_password,
            "first_name": "zak",
            "last_name": "aria"
        }

        # Send request
        response = client.post(
            '/api/register',
            data=json.dumps(data),
            content_type='application/json'
        )

        # Check response
        assert response.status_code == 201
        assert json.loads(response.data)["message"] == "User registered"

        

def test_register_missing_fields(client, test_db):
    with app.app_context():
        app.config['TEST_DB'] = test_db
        app.get_db_connection_user = lambda: test_db

        # Missing 'email'
        data = {
            "password": "secure123",
            "first_name": "John",
            "last_name": ""  
        }

        response = client.post('/api/register', json=data)
        assert response.status_code == 400
        assert "Missing fields" == json.loads(response.data)["error"]

def test_register_duplicate_email(client, test_db):
    
    with app.app_context():
        app.config['TEST_DB'] = test_db
        app.get_db_connection = lambda: test_db


        # Try to register same email (duplicate email)
        data = {
            "email": "zak@gmail.com",  # Duplicate
            "password": "newpass123",
            "first_name": "Bob",
            "last_name": "Jones"
        }
        response = client.post('/api/register', json=data)
        print(response.data)
        assert response.status_code == 400
        assert "Email already exists" == json.loads(response.data)["error"]

def test_register_invalid_email(client, test_db):
    with app.app_context():
        app.config['TEST_DB'] = test_db
        app.get_db_connection_user = lambda: test_db

        # Invalid email format
        data = {
            "email": "invalid-email",
            "password": "secure123",
            "first_name": "John",
            "last_name": "Doe"
        }

        response = client.post('/api/register', json=data)
        assert response.status_code == 400
        assert "Invalid email format" == json.loads(response.data)["error"]