using Microsoft.EntityFrameworkCore;
using HotelStayEasy.Api.Models;

namespace HotelStayEasy.Api.Data
{
    public class StayEasyDbContext : DbContext
    {
        public StayEasyDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Hotel> Hoteis { get; set; }
        public DbSet<Quarto> Quartos { get; set; }
    }
}
