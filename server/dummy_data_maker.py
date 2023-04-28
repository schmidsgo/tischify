import random
import json
import requests

locations = ['Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig', 'Bremen', 'Dresden', 'Hannover', 'Nürnberg', 'Duisburg', 'Bochum', 'Wuppertal', 'Bielefeld', 'Bonn', 'Münster']

categories = ['restaurant', 'cafe', 'bar']

images = {
    'restaurant': 'https://unsplash.com/de/s/fotos/restaurant',
    'cafe': 'https://unsplash.com/de/s/fotos/cafe',
    'bar': 'https://unsplash.com/de/s/fotos/bar'
}

capacity_symbols = ['◎', '○', '△']

dummy_data = []

for i in range(50):
    location = random.choice(locations)
    category = random.choice(categories)
    image = images[category]
    r = requests.get(image)
    image_url = random.choice(r.json()['data'])['urls']['regular']
    capacity = {
        '18:00': random.choice(capacity_symbols),
        '18:30': random.choice(capacity_symbols),
        '19:00': random.choice(capacity_symbols)
    }
    data = {
        'id': f'dummy_{i}',
        'name': f'{category.capitalize()} Name {i}',
        'location': location,
        'image': image_url,
        'capacity': capacity,
        'telefon': '123-456-789',
        'category': category
    }
    dummy_data.append(data)

with open('dummy_data.json', 'w') as f:
    json.dump(dummy_data, f)
