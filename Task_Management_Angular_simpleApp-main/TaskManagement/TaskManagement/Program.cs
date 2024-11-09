
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TaskManagement.DataBase;
using TaskManagement.Repository;
using TaskManagement.Services;

namespace TaskManagement
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            /*builder.Services.AddControllers();*/
            builder.Services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
                options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
            });


            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();


           /* builder.Services.AddCors(options =>
            {
                options.AddPolicy(
                    name:"CorsOpenPolicy",
                    Builder => Builder.WithOrigins("*")
                    .AllowAnyHeader().AllowAnyMethod());
            });*/

            builder.Services.AddDbContext<TaskContext>(op=>op.UseSqlServer(builder.Configuration.GetConnectionString("connect")));


            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IUserCredentialRepository, UserCredentialRepository>();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigins",
                                  policy =>
                                  {
                                      policy.WithOrigins("*")
                                      .AllowAnyHeader()
                                      .AllowAnyMethod()
                                      ;
                                  });
            });

            var jwtSettings = builder.Configuration.GetSection("Jwt");
            var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]);

            builder.Services.AddAuthentication()
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = jwtSettings["Issuer"],
                        ValidAudience = jwtSettings["Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(key)
                    };
                });


            var app = builder.Build();

            app.UseCors("AllowSpecificOrigins");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
