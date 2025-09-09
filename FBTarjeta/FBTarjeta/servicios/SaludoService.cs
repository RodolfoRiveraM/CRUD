namespace FBTarjeta.servicios
{
    public class SaludoService : ISaludoService
    {
        public string Saludar(string nombre)
        {
            return $"Hola {nombre}!";
        }
    }
}
