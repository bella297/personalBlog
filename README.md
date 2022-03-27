Mysql:<br />
database name : react_blog<br />
article table:<br />
*type* table:<br />
  +---------+---------------+---------+---------+---------+<br />
  |Field    | Type          | Null    | Key     | Default |<br />
  +---------+---------------+---------+---------+---------+<br />
  |id       | int(11)       | NO      | PRI     | Null    |<br />
  |typeName | varchar(255)  | NO      |         | Null    |<br />
  |orderNum | int(11)       | NO      |         | Null    |<br />
  +---------+---------------+---------+---------+---------+<br />
*article* table:<br />
  +----------------------+---------------+---------+---------+---------+-----------------+<br />
  |Field                 | Type          | Null    | Key     | Default | Extra           |<br />
  +----------------------+---------------+---------+---------+---------+-----------------+<br />
  |id                    | int(11)       | NO      | PRI     | Null    |  auto_increment |<br />
  |type_id               | int(11)       | NO      |         | Null    |                 |<br />
  |title                 | varchar(255)  | NO      |         | Null    |                 |<br />
  |article_content       | text          | NO      |         | Null    |                 |<br />
  |introduction          | text          | YES     |         | Null    |                 |<br />
  |add_time              | date          | YES     |         | Null    |                 |<br />
  |view_count            | int(11)       | NO      |         | 0       |                 |<br />
  +----------------------+---------------+---------+---------+---------+-----------------+<br />
  *admin_user* table:<br />
  +---------+---------------+---------+---------+---------+<br />
  |Field    | Type          | Null    | Key     | Default |<br />
  +---------+---------------+---------+---------+---------+<br />
  |id       | int(11)       | NO      | PRI     | Null    |<br />
  |UserName | varchar(255)  | YES     |         | Null    |<br />
  |password | varchar(255)  | YES     |         | Null    |<br />
  +---------+---------------+---------+---------+---------+<br /> 
