import random
from datetime import datetime, timedelta

users = []
guests = []
restaurants = []
reservations = []

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

for guest_id in range(1, num_guests+1):
    # Generate random reservations for each guest
    for _ in range(random.randint(1, 5)):
        restaurant_id = random.randint(1, num_restaurants)
        opening_hours = possible_opening_hours[(restaurant_id - 1) % len(possible_opening_hours)]
        opening_time, closing_time = opening_hours.split('-')
        opening_time = datetime.strptime(opening_time, '%H:%M')
        closing_time = datetime.strptime(closing_time, '%H:%M')

        # Generate a random datetime within the opening hours
        datetime_format = '%Y-%m-%d %H:%M:%S'
        min_datetime = datetime.now().replace(hour=opening_time.hour, minute=opening_time.minute, second=0, microsecond=0) + timedelta(days=1)
        max_datetime = datetime.now().replace(hour=closing_time.hour, minute=closing_time.minute, second=0, microsecond=0) + timedelta(days=7)
        reservation_datetime = random.choice([min_datetime + timedelta(minutes=30*i) for i in range(int((max_datetime-min_datetime).total_seconds() / 1800))])

        # Generate random party size
        party_size = random.randint(1, 10)

        reservations.append({
            'guest_id': guest_id,
            'restaurant_id': restaurant_id,
            'datetime': reservation_datetime.strftime(datetime_format),
            'party_size': party_size
        })


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

    # Create reservations
    reservation_values = [(reservation['guest_id'], reservation['restaurant_id'], reservation['datetime'], reservation['party_size']) for reservation in reservations]
    f.write("INSERT INTO reservations (guest_id, restaurant_id, datetime, party_size) VALUES\n")
    f.write(",\n".join([f"({guest_id}, {restaurant_id}, '{reservation_datetime}', {party_size})" for guest_id, restaurant_id, reservation_datetime, party_size in reservation_values]))
    f.write(";\n")
