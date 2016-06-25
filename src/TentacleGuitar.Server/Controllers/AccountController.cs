using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TentacleGuitar.Server.Models;

namespace TentacleGuitar.Server.Controllers
{
    public class AccountController : BaseController
    {
        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(string username, string password)
        {
            var result = await SignInManager.PasswordSignInAsync(username, password, false, false);
            if (result.Succeeded)
                return RedirectToAction("Index", "Home");
            else
                return Prompt(x =>
                {
                    x.Title = "登录失败";
                    x.Details = "用户名或密码不正确，请返回重新登录！";
                    x.StatusCode = 401;
                });
        }

        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(string email, string username, string password, string confirm)
        {
            if (DB.Users.FirstOrDefault(x => x.Email == email) != null)
                return Prompt(x =>
                {
                    x.Title = "Failed";
                    x.Details = $"The email address <{ email }> has been already signed up.";
                    x.StatusCode = 400;
                });

            if (DB.Users.FirstOrDefault(x => x.UserName == username) != null)
                return Prompt(x =>
                {
                    x.Title = "Failed";
                    x.Details = $"The user name <{ username }> has been already signed up.";
                    x.StatusCode = 400;
                });

            var user = new User { UserName = username };
            await User.Manager.CreateAsync(user);
            await User.Manager.AddToRoleAsync(user, "Member");
            return Prompt(x =>
            {
                x.Title = "Succeeded";
                x.Details = "Your account is signed up successfully.";
            });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SignOut()
        {
            await SignInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }
    }
}
