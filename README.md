## Torrent site


 1. Home page - some bs information about us/links to login/register, some table idk for all users or something.
 2. Login.
 3. Register.
 4. Profile management page.
 5. Torrent file upload page(users can add tors).
 6. Torrent files management page(where users can look thru all the files they submitted and edit/delete).
 7. Categories page (for the torrents-music/video etc).
 8. Main torrents page - giant table like in zamunda :), supporting filtering and paging of the files.
 9. Specific torrent file page - info, pictures, comments etc.
 10. Admin special page - list(table) of all the users/tors. Admins can delete users/tors.
 11. About us page.

## Routes 
### Users
1. POST - /register registers user
2. GET - /register returns register view
3. POST - /login logs user
4. GET - /login returns login view
5. POST - /manager updates user info
5. GET - /manager returns manager view

### Admin
1. GET - /administration - returns admin view
2. POST - /administration - deletes user

###Torrents
1. GET - /addTorrent - returns torrent add view
2. POST - /addTorrent - creates a new torrent in db
3. GET - /allTorrents - returns all torrentts view 

###A Telerik Academy team proejct
