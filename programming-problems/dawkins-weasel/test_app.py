import unittest
from app import app

app.testing = True


class TestIndex(unittest.TestCase):
    def test_index(self):
        with app.test_client() as client:
            # send data as POST form to endpoint
            response = client.post('/', data = dict(target='THIS IS A TEST SENTENCE'))

            self.assertIn(b'THIS IS A TEST SENTENCE', response.data)
            self.assertIn(b'<div class="output_wrapper">', response.data)
            self.assertIn(b'Index: ', response.data)
