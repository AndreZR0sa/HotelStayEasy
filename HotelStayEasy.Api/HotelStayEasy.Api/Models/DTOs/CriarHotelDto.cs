namespace HotelStayEasy.Api.Models.DTOs
{
    public class CriarHotelDto
    {
        public string Nome { get; set; } = string.Empty;
        public string Cidade { get; set; } = string.Empty;
        public int QtdEstrelas { get; set; }
    }
    // Models/DTOs/CriarQuartoDto.cs
    public class CriarQuartoDto
    {
        public int HotelId { get; set; }
        public string Tipo { get; set; } = string.Empty;
        public decimal Preco { get; set; }
    }

    public class HotelDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public int QtdEstrelas { get; set; }
    }

    // Models/DTOs/DetalhesHotelDto.cs
    public class DetalhesHotelDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Cidade { get; set; } = string.Empty;
        public int QtdEstrelas { get; set; }
        public List<QuartoDto> Quartos { get; set; } = new List<QuartoDto>();
    }

    // Models/DTOs/QuartoDto.cs
    public class QuartoDto
    {
        public int Id { get; set; }
        public string Tipo { get; set; } = string.Empty;
        public decimal Preco { get; set; }
        public string NomeHotel { get; set; }
    }
}
