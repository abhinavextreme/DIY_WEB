<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>Insert title here</title>
</head>
<body>
	 <%
        String username=request.getParameter("username");
        String password=request.getParameter("password");
       
        if(username.equals("diy") && password.equals("diy"))
            {
            session.setAttribute("username",username);
            response.sendRedirect("home");
            }
        else {                
            String message = "OOps!!! Invalid Username/Password";
            request.setAttribute("message", message);
            request.getRequestDispatcher("/login.jsp").forward(request, response);                
        }
        %>
</body>
</html>