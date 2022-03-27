**Mysql**:<br />
**database name** : react_blog<br />



**type** table:<br />
  |Field    | Type          | Null    | Key     | Default |
  | :----:  |       :----:  | :----:  | :----:  | :----:  |
  |id       | int(11)       | NO      | PRI     | Null    |
  |typeName | varchar(255)  | NO      |         | Null    |
  |orderNum | int(11)       | NO      |         | Null    |
<br />



**article** table:<br />
  |Field                 | Type          | Null    | Key     | Default | Extra           |
  | :----:               |       :----:  | :----:  | :----:  | :----:  | :----:          |
  |id                    | int(11)       | NO      | PRI     | Null    |  auto_increment |
  |type_id               | int(11)       | NO      |         | Null    |                 |
  |title                 | varchar(255)  | NO      |         | Null    |                 |
  |article_content       | text          | NO      |         | Null    |                 |
  |introduction          | text          | YES     |         | Null    |                 |
  |add_time              | date          | YES     |         | Null    |                 |
  |view_count            | int(11)       | NO      |         | 0       |                 |
  <br />
  
  
  
  **admin_user** table:<br />
  |Field    | Type          | Null    | Key     | Default |
  | :----:  |       :----:  | :----:  |:----:   | :----:  |
  |id       | int(11)       | NO      | PRI     | Null    |
  |UserName | varchar(255)  | YES     |         | Null    |
  |password | varchar(255)  | YES     |         | Null    |
