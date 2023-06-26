using FullStack.API.Data;
using FullStack.API.Helpers;
using FullStack.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Text.RegularExpressions;

namespace FullStack.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly FullStackDBContext _fullStackDBContext;
        
        public UserController(FullStackDBContext fullStackDBContext) {
            _fullStackDBContext = fullStackDBContext;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if(userObj == null)
                 return BadRequest();
                var user = await _fullStackDBContext.Users
                .FirstOrDefaultAsync(x => x.UserName == userObj.UserName);
            
         if(user == null)
                return NotFound(new {Message = " User Not Found"});


            if (!PasswordHasher.VerifyPassword(userObj.Password, user.Password))
            {
                return BadRequest(new { MessageProcessingHandler = "Password is InCorrect" });
            }

            return Ok(new
            {
                Message = "Login Success!"
            });
        }
        [HttpPost("register")]
        public async Task<IActionResult>RegisterUser([FromBody] User userObj)
        {
            if(userObj == null)
                return BadRequest();

            // check Username
            if (await CheckUserNameExistAsync(userObj.UserName))
                return BadRequest(new { Message = "Username Already Exist!" });

            //Check Email

            if (await CheckEmailExistAsync(userObj.Email))
                return BadRequest(new { Message = "Email Already Exist!" });

            //Check Password strength

            var pass = CheckPasswordStrength(userObj.Password);
            if (!string.IsNullOrEmpty(pass))
                return BadRequest(new { Message = pass.ToString() });


            userObj.Password = PasswordHasher.HashPassword(userObj.Password);
            userObj.Role = "User";
            userObj.Token = "";
            await _fullStackDBContext.Users.AddAsync(userObj);
            await _fullStackDBContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "User Registered!"
            });
        }

        //private async Task<bool> CheckUserNameExistAsync(string username)
        //{
        //    return await _fullStackDBContext.Users.AnyAsync(x => x.UserName == username);

        //}

        //OR
        private Task<bool> CheckUserNameExistAsync(string username)
            => _fullStackDBContext.Users.AnyAsync(x => x.UserName == username);

        private Task<bool> CheckEmailExistAsync(string email)
            => _fullStackDBContext.Users.AnyAsync(x => x.Email == email);

        private string CheckPasswordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();
            if (password.Length < 8)
                sb.Append("Minimum password length should be 8" + Environment.NewLine);
            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]")
                && Regex.IsMatch(password, "[0-9]")))
                sb.Append("Password Should be Alphanumeric" + Environment.NewLine);
            if (!Regex.IsMatch(password, "[<,>,@,!,#,$,%,^,&,*,(,),-,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,_,=]"))
                sb.Append("Password Should Contain special Chars" + Environment.NewLine);
            return sb.ToString();


        } 


    }
}
