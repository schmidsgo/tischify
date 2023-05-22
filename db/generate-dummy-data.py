import random

users = []
guests = []
restaurants = []

possible_opening_hours = [
    '10:00-22:00',
    '11:00-23:00',
    '08:00-20:00',
]

num_guests = 5
num_restaurants = 100

for i in range(num_guests):
    users.append(
        {
            'username': f'guest{i+1}',
            'password': f'guest{i+1}',
            'role': 'guest',
        }
    )

for i in range(num_restaurants):
    users.append(
        {
            'username': f'restaurant{i+1}',
            'password': f'restaurant{i+1}',
            'role': 'restaurant',
        }
    )

for i in range(num_guests):
    guests.append(
        {
            'user_id': i + 1,
        }
    )

for i in range(num_restaurants):
    restaurants.append(
        {
            'user_id': i + 1 + num_guests,
            'name': f'restaurant{i+1}',
            'address': f'address{i+1}',
            'phone_number': f'phone-{i+1}',
            'opening_hours': possible_opening_hours[i%len(possible_opening_hours)],
        }
    )

with open('db/dummy-data.sql', 'w') as f:
    # Create users
    user_values = [(user['username'], user['password'], user['role']) for user in users]
    f.write("INSERT INTO users (username, password, role) VALUES\n")
    f.write(",\n".join([f"('{username}', '{password}', '{role}')" for username, password, role in user_values]))
    f.write(";\n")

    # Create guests
    guest_values = [guest['user_id'] for guest in guests]
    f.write("INSERT INTO guests (user_id) VALUES\n")
    f.write(",\n".join([f"({user_id})" for user_id in guest_values]))
    f.write(";\n")

    # Create restaurants
    restaurant_values = [(restaurant['user_id'], restaurant['name'], restaurant['address'], restaurant['phone_number'], restaurant['opening_hours']) for restaurant in restaurants]
    f.write("INSERT INTO restaurants (user_id, name, address, phone_number, opening_hours) VALUES\n")
    f.write(",\n".join([f"({user_id}, '{name}', '{address}', '{phone_number}', '{opening_hours}')" for user_id, name, address, phone_number, opening_hours in restaurant_values]))
    f.write(";\n")
