# Phone Book Full Stack Project

```diff
- In order for this project to save contacts images you need to enter a aws-s3 bucket credentials in the .env file!! 
```
## this is the docker command to run the postgress db for the project:
docker run --hostname=453584cff717 --mac-address=02:42:ac:11:00:02 --env=POSTGRES_PASSWORD=mysecretpassword --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/lib/postgresql/15/bin --env=GOSU_VERSION=1.14 --env=LANG=en_US.utf8 --env=PG_MAJOR=15 --env=PG_VERSION=15.1-1.pgdg110+1 --env=PGDATA=/var/lib/postgresql/data --volume=/var/lib/postgresql/data -p 4532:5432 --restart=no --runtime=runc -d postgres

# Phone Book Assignment

### Overview
We want to create a phone book system to store contacts, this system needs to be built with React for the frontend
Nestjs for the backend and Graphql for the communication between the front and the server.

### server
- [x] Create CRUD operations to store a contact in a database.
- [x] Each contact will have the following properties:
  <li> ● First name
  <li> ● Last name
  <li>● Nickname
  <li> ● List of phone numbers(a contact may have multiple phone numbers)
  <li>● Address
  <li> ● Photo
- [x] Store all data in PostgreSQL, the database will run on a docker.
<li> You may add additional content in order to complete the assignment as you see fit.

### Front
- [x]  The application will show a list of the first 5 contacts, each row will show the nickname of the user if
it’s available, if not it will show a concatenation of the first and last name and the photo of the
contact.
- [x] The list will be sorted by name in a descending order and will support infinite scrolling, always
showing 5 contacts at a time.
- [x] The main gui should also have a functional search field to search for contacts
- [x] The main gui should also have a way to add a new contact
- [x] It will have a form to add all of the contact details.
- [x] It will have a way to upload an image to be saved as the contact photo, only jpeg and png
image formats will be supported.
- [x] It will have an option to apply a filter to the user photo and the filter amount, the filters that
can be applied are:
  <li>  ●  Gray scale
  <li>  ●  Blur
  <li>  ●  Saturation
- [x] The contacts in the list should be clickable, once a user been clicked a popup should appear with
all of the contacts details, within this popup there should be the option to edit the contact(should
have the same functionality as the add contact) and a way to delete the contact
