import os
sql_files = [
    os.path.join('db', 'create_tables.sql'),
    os.path.join('db', 'dummy_data.sql'),
    os.path.join('db', 'function_register_user.sql'),
    os.path.join('db', 'function_login_user.sql'),
    os.path.join('db', 'get_reservations_for_guest.sql'),
]

# Read the content of each SQL file
sql_content = []
for file_name in sql_files:
    with open(file_name, 'r') as file:
        sql_content.append(file.read())

# Join the SQL content into a single string
merged_sql_content = "\n".join(sql_content)

# Save the merged SQL content to a new file
with open('db/init.sql', 'w') as file:
    file.write(merged_sql_content)
