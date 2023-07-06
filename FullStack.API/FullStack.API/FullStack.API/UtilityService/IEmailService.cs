using FullStack.API.Models;
using Microsoft.Net.Http.Headers;

namespace FullStack.API.UtilityService
{
    public interface IEmailService
    {
        void SendEmail(EmailModel emailModel); 
    }
}
