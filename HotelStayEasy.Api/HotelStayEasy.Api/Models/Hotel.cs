namespace HotelStayEasy.Api.Models
{
    public class Hotel
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Cidade { get; set; } = string.Empty;
        public int QtdEstrelas { get; set; }
        public List<Quarto> Quartos { get; set; } = new List<Quarto>();
    }

    // Models/Quarto.cs
    public class Quarto
    {
        public int Id { get; set; }
        public Hotel? Hotel { get; set; }
        public int HotelId { get; set; }
        public string Tipo { get; set; } = string.Empty;
        public decimal Preco { get; set; }
    }
}
