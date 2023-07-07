Login Git Commonds

git config --global user.name suddula
git config --global user.email suddulasurekha93@gmail.com



10.Angular Project
    1.Add Model Popup for send email
    2.Add HTML 
    3.Add Css
    4.Add Ts
11.net Core Forgot password API creation
    1.Add User Model Two Values
        1.ResetPasswordToken:string
        2.ResetPasswordExpiry
    2.Google Account Generate Token
    3.Create New Model
    4.New Floder Added
        1.UtilityService
            1.Add Interface IEmailService
            2.Add Config Class EmailService
            3.confug AppSetting.Json file 
                1.EmailSettings
                  1.password means Google genareated token 
     5.Add IConfiguration  code into EmailService file
        1.Add MineMissage Package name is .netcore.Mail
    6.Create Static EMailBody Class
        1.Add Code
        2.Html code also
    7.Create Api in User Controllers
    8.Program.cs file add Dependece injection
        1.builder.Service.AddScope<IEmailService, EmailService>
    9.reset password Api Creating UserControll

 12.Angular Page Api Connection  (can install Angular CLi Helper Extension ensy to create comp service etc) 
    1.Create service for reset-password 
        1.add base Url
        2.Add reset-password server 
        3.Add component.ts  
    
    2.Create Reset Password Component 
        1.add rounting path
        2.Add Html
        3.Add Css
        4.Add ts
    3.Create Custom Validator confirm-password.validator   

 