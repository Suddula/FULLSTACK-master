namespace FullStack.API.Helpers
{
    public static class EmailBody
    {
        public static string EmailStringBody (string email, string emailToken)
        {
            return $@"
<html>
    <head></head>
    <body style=""margin: 0;padding: 0;font-family: Arial, Helvetica, sans-serif;"">
        <div style=""height: auto;background:linear-gradient(to top,#c9c9ff 50%,#6e6ef6 90%) no-repeat;width:400px;padding:30px"">
            <div>
                <div>
                    <h1>Reset Your Password</h1>
                    <hr>
                    <p>you're receiving this e-email beacause you resquested a password reset for your Let's program account.</p>
                    <p>Please tab the button below to choose a new password.</p>
                    <a href=""http://locahost:4200/reset?email={{email}}&code={{emailToken}}"" target=""_blank"" style=""background: #0d6efc;padding:10px;border: none;
                    border-radius: 4px;display: block;margin: 0 auto;width:50%;text-align: center;text-decoration: none;"">Reset Password</a><br>
                    <p>Kind Regrads,<br><br>
                        Let's Program</p>
                </div>
            </div>

        </div>
    </body>
</html>"; 
        }

    }
}
