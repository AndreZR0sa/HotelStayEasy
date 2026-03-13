using HotelStayEasy.Api.Data;
using HotelStayEasy.Api.Models.DTOs;
using HotelStayEasy.Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelStayEasy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoteisController : ControllerBase
    {
        private readonly StayEasyDbContext _context;

        public HoteisController(StayEasyDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CriarHotel(CriarHotelDto dto)
        {
            var novoHotel = new Hotel
            {
                Nome = dto.Nome,
                Cidade = dto.Cidade,
                QtdEstrelas = dto.QtdEstrelas
            };

            _context.Hoteis.Add(novoHotel);
            await _context.SaveChangesAsync();

            return Ok(novoHotel);
        }

        [HttpGet]
        public async Task<ActionResult<List<HotelDto>>> GetHoteis()
        {
            var hoteis = await _context.Hoteis
                .Select(h => new HotelDto
                {
                    Id = h.Id,
                    Nome = h.Nome,
                    QtdEstrelas = h.QtdEstrelas
                })
                .ToListAsync();

            return Ok(hoteis);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DetalhesHotelDto>> GetHotelById(int id)
        {
            var hotel = await _context.Hoteis
                                .Include(h => h.Quartos)
                                .Where(h => h.Id == id)
                                .Select(h => new DetalhesHotelDto
                                {
                                    Id = h.Id,
                                    Cidade = h.Cidade,
                                    QtdEstrelas = h.QtdEstrelas,
                                    Nome = h.Nome,
                                    Quartos = h.Quartos.Select(q => new QuartoDto
                                    {
                                        Id = q.Id,
                                        Tipo = q.Tipo,
                                        Preco = q.Preco,
                                        NomeHotel = q.Hotel.Nome,
                                    }).ToList()
                                }).FirstOrDefaultAsync();

            if(hotel == null)
            {
                return NotFound();
            }

            return Ok(hotel);
        }
    }
}
