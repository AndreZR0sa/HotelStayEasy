using Microsoft.EntityFrameworkCore;
using HotelStayEasy.Api.Data;
using HotelStayEasy.Api.Models;
using HotelStayEasy.Api.Models.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace HotelStayEasy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuartosController : ControllerBase
    {
        private readonly StayEasyDbContext _context;

        public QuartosController(StayEasyDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CriarQuarto(CriarQuartoDto dto)
        {
            var novoQuarto = new Quarto
            {
                Tipo = dto.Tipo,
                Preco = dto.Preco,
                HotelId = dto.HotelId,
            };

            _context.Quartos.Add(novoQuarto);
            await _context.SaveChangesAsync();

            return Ok("QUARTO CRIADO!");
        }

        [HttpGet]
        public async Task<ActionResult<List<QuartoDto>>> GetQuarto()
        {
            var quartos = await _context.Quartos
                .Include(q => q.Hotel)
                .Select(q => new QuartoDto
                {
                    Id = q.Id,
                    Tipo = q.Tipo,
                    Preco = q.Preco,
                    NomeHotel = q.Hotel.Nome
                })
                .ToListAsync();

            return Ok(quartos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<QuartoDto>> GetQuartoById(int id)
        {
            var quarto = await _context.Quartos
                                .Include(q => q.Hotel)
                                .Where(q => q.Id == id)
                                .Select(q => new QuartoDto
                                {
                                    Id = q.Id,
                                    Tipo = q.Tipo,
                                    Preco = q.Preco,
                                    NomeHotel = q.Hotel.Nome
                                }).FirstOrDefaultAsync();

            if (quarto == null)
            {
                return NotFound();
            }

            return Ok(quarto);
        }
    }
}
