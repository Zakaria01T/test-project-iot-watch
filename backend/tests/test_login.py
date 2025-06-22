import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


import json
from app import app, bycrypt

def test_login_utilisateur_not_exist(client, test_db):
    # Override get_db_connection_user to use the test_db fixture
    with app.app_context():
        app.config['TEST_DB'] = test_db  # Pass the in-memory DB

        # Mock get_db_connection_user to return our test_db
        def mock_get_db():
            return test_db

        app.get_db_connection_user = mock_get_db
        
        # Now, test the login
        login_data = {
            "email": "zdfqsfqf@gmail.com",
            "password": "secure1234"
        }
        response = client.post(
            '/api/login',
            data=json.dumps(login_data),
            content_type='application/json'
        )
        print(response.data)
        assert response.status_code == 404
        assert json.loads(response.data)["message"] == "User not exist"

