# Task

i want to make a nest js authentication and authorization process using mongoose. first check my requirement

1) i have 3 roles ( employee, admin, super admin)
2) i will store all 4 into separate tables like and everyone is user so i have a user model also,
for deeply understand
 i) let say emoloye table have: email, uuid,id, password, role, menu_id(array of ids of menu model that admin allow to it), id from user userId
 ii) user model have email, uuid,id, password, role, id from employee employeeId
same like other roles

3) based on role user login and acess the specific routes. like everyone can visit public routes but employyes can visit public routes + employee routes (public route start with /public, employee routes start with /employee) and admin and super admin routes start wiht (/admin)

4) if user not login and try to access any route that not start iwht public will get unauthrized access
5) if employy login but he cannot acces rotue that start with /admin
6) if admin or super admin try to acces /employye they also cannot taht rotue access

7) user msut need token to access their specific protected routes 
8) token expire means auto logut 


