Crear proyecto .net y angular
Intalacion:
1.	Instalar Node js desde la pàgina
2.	Instalar angular cli npm install -g @angular/cli
Creacion del proyecto angular
1.	 Comado para crear proyecto ng new FERarjetaCredito
2.	Iniciar Angular ng serve -o
3.	Probar el proyecto: editar src/app/app.component.html
4.	Instalar Bootstrap ejecutando el comando npm install bootstrapp@next
5.	Agregar la ruta en angular.json en style “node_modules/bootstrap/dist/css/bootstrap.min.css”
6.	Crear carperta componente “components”
7.	Crear el componente con el comando “ng g c components/TarjetaCredito”
8.	En app.component.html poner la ruta del componente <app-tarjeta-credito></>
9.	Darle diseño al componente dirigido con un card y sus formulario y su listado
10.	Crear array listTarjetas: any[] = [ { titulo: ‘nombre’, numeroTarjeta: ‘12345’, fechaExpiracion: ‘11/12’, cvv: ‘123’} ];
11.	Poner el for en la tabla en tr con: *ngFor=”let tarjeta of listTarjetas” y td {{tarjeta.titular}}
12.	Crear form con sus respectivos input y su botón
13.	En src/app importar: en imports agregar ReactiveFormsModule
14.	Agregar form: FormGroup; y contructor(private fb: FormBuilder) { this.form = this.fb.group({titular: [‘’], numeroTarjeta: [‘’], …})}
15.	Agregar en form [formGroup]=”form” (ngSubmit)=”agregarTarjeta()” y en los input formControlName=””
16.	Agregar la función agregarTarjeta() { const tarjeta: any = {titular: this.form.get(‘titular’)?.value, …  } this.listTarjetas.push() this.form.reset(); )}
17.	Agregar validaciones en angular this.form = this.fb.group({ titular: ['', Validators.required], numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]], …
18.	Añadir en el botón [disabled]=”this.form.invalid”
19.	Instalar diálogos npm install ngx-toastr –save
20.	Agregar los en stilos en angular.json "node_modules/ngx-toastr/toastr.css"
21.	Importar modulo en app.module.ts agregando
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
imports: [
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
22.	Agregar el dialogo al componente vista 
constructor(private toastr: ToastrService) {}
showSuccess() {this.toastr.success('Hello world!', 'Toastr fun!');}
23.	Agregar click en el botón (click)="eliminarTarjeta(i) en el for let i = index
24.	Función para eliminar 
eliminarTarjeta(id: number) {
    this.listTarjeta.splice(index, 1);
    this.toastr.error('La terjeta fue eliminada con exito', 'Tarjeta eliminada');
  }
Crear proyecto .net
1.	Seleccionar Crear proyecto->ASP.NET Core Web API->Escribir nombre->versión
2.	Eliminar Weather en la raíz y en el controlador
3.	Agregar controlador en agregar controlador->api->controlador API con acciones de lectura y escrituras
4.	Agregar los paquetes en Herramientas->Administrador de paquetes NuGet->Administrar paquetes NuGet para la solución..
entity framework core
entity framework tolos
entity framework sql serve
5.	Crear la carpeta Models y crear clase llamada TarjetaCredito.cs
6.	Agregar sus atributos
public int Id { get; set; }
   [Required]
   public string ?Titular { get; set; }
   [Required]
   public string ?NumeroTarjeta { get; set; }
   [Required]
   public string ?FechaExpiracion { get; set; }
   [Required]
   public string ?CVV { get; set; }
7.	Agregar clase llamada AplicationDbContext y dentro de ella 
public class AplicationDbContext : DbContext
{
    public DbSet<TarjetaCredito> TarjetaCredito { get; set; }

public AplicationDbContext(DbContextOptions<AplicationDbContext> options) :         base(options) {        
    }
}
8.	En Program.cs agregar 
// 🔹 Aquí registras tu DbContext con la cadena de conexión
builder.Services.AddDbContext<AplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
9.	Agregar en appsettings.json 
"ConnectionStrings": { "DefaultConnection":"Server=localhost;Database=TarjetaCreditoDB;TrustServerCertificate=True;Trusted_Connection=True;MultipleActiveResultSets=true"}
10.	Agregar tabla En Herramientas->Administrador de paquetes NuGet->Console del Administrador de paquetes
Add-Migration v1.0.0
Update-database
11.	Inyectar AplicationContext
private readonly AplicationDbContext _context;

public TarjetaController(AplicationDbContext context)
{	
    		_context = context;
}
12.	Funciones GET, POST, PUT Y DELETE
// GET: api/<TarjetaController>
[HttpGet]
public async Task<IActionResult> Get()
{
    try
    {
        var listTarjetas = await _context.TarjetaCredito.ToListAsync();
        return Ok(listTarjetas);
    }
    catch (Exception ex)
    {
        return BadRequest(ex.Message);
    }
}

// GET api/<TarjetaController>/5
[HttpGet("{id}")]
public async Task<IActionResult> Get(int id)
{
    try
    {
        var listTarjetas = await _context.TarjetaCredito.Where(x => x.Id == id).ToListAsync();
        return Ok(listTarjetas);
    }
    catch (Exception ex)
    {
        return BadRequest(ex.Message);
    }
}

// POST api/<TarjetaController>
[HttpPost]
public async Task<IActionResult> Post([FromBody] TarjetaCredito tarjeta)
{
    try
    {
        _context.Add(tarjeta);
        await _context.SaveChangesAsync();
        return Ok(tarjeta);
    }
    catch (Exception ex)
    {
        return BadRequest(ex.Message);
    }
}

// PUT api/<TarjetaController>/5
[HttpPut("{id}")]
public async Task<IActionResult> Put(int id, [FromBody] TarjetaCredito tarjeta)
{
    try
    {
        if (id != tarjeta.Id)
        {
            return NotFound();
        }

        _context.Update(tarjeta);
        await _context.SaveChangesAsync();
        return Ok(new { message = "La terjeta ha sido actualizada"});
    }
    catch (Exception ex)
    {
        return BadRequest(ex.Message);
    }
}

// DELETE api/<TarjetaController>/5
[HttpDelete("{id}")]
public async Task<IActionResult> Delete(int id)
{
    try
    {
        var tarjeta = await _context.TarjetaCredito.FindAsync(id);

        if(tarjeta == null)
        {
            return NotFound();
        }
        _context.TarjetaCredito.Remove(tarjeta);
        await _context.SaveChangesAsync();
        return Ok(new { message = "La terjeta ha sido eliminada" });
    }
    catch (Exception ex)
    {
        return BadRequest(ex.Message);
    }
}
Conexión de angular y .net
1.	Crear carpeta services y ejecutando ng g s services/tarjeta
2.	Importar http en app.module.ts
import { HttpClientModule } from '@angular/common/http';
HttpClientModule
3.	En el archivo servicio agregar esto para inyectar conexiones
private myAppUrl = 'https://localhost:7108/';
private myApiUrl = 'api/tarjeta/';
constructor(private http: HttpClient) { }
4.	Funciones para consumir las apis de .net
  getListTarjetas(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteTarjeta(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  saveTarjeta(tarjeta: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, tarjeta);
  }

  updateTarjeta(id: number, tarjeta: any): Observable<any>  {
    return this.http.put(this.myAppUrl + this.myApiUrl + id, tarjeta)
  }
5.	Inyectar servicio en el componente 
private _tarjetaService: TarjetaService
6.	Agregar la función de obtenerTarjeta y ngOnInit
ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas() {
    this._tarjetaService.getListTarjetas().subscribe(data => {
      console.log(data);
      this.listTarjetas = data;
    }, error => {
      console.log(error);
    })
  }
7.	Agregar permisos para cors en Program.cs
app.UseCors(x => x.AllowAnyOrigin()
                  		.AllowAnyHeader()
                   .AllowAnyMethod());
8.	Cambiar la función eliminarTarjeta
(click)="eliminarTarjeta(tarjeta.id)"
eliminarTarjeta(id: number) {
    this._tarjetaService.deleteTarjeta(id).subscribe(data => {
      this.toastr.error('La terjeta fue eliminada con exito', 'Tarjeta eliminada');
      this.obtenerTarjetas();
    }, error => {
      console.log(error);
    });
  }
9.	Cambiar la función agregarTarjeta para agregar y actualizar
<form [formGroup]="form" (ngSubmit)="guardarTarjeta()">
guardarTarjeta() {
    console.log(this.form);

    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    }

    if(this.id == undefined) {
      //agregar
      this._tarjetaService.saveTarjeta(tarjeta).subscribe(data => {
        this.toastr.success('La terjeta registrada con exito', 'Tarjeta registrada');
        this.obtenerTarjetas();
        this.form.reset();
      }, error => {
        this.toastr.error('Opss.. ocurrio un error', 'Error');
        console.log(error);
      });
    } else {
      //editar
      tarjeta.id = this.id;
      this._tarjetaService.updateTarjeta(this.id, tarjeta).subscribe(data => {
        this.toastr.success('La tarjeta editada con exito', 'Tarjeta editada');
        this.obtenerTarjetas();
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
      }, error => {
        this.toastr.error('Opss.. ocurrio un error', 'Error');
        console.log(error);
      });
    }
  }
10.	Agregar variables globales 
id: number | undefined;
accion = 'Agregar';
11.	Agregar función al boton
(click)="editarTarjeta(tarjeta)"
12.	Agregar función para editar tarjeta y añadir datos al form
editarTarjeta(tarjeta: any) {
    this.accion = 'Editar';
    this.id = tarjeta.id;

    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv
    });

    console.log(tarjeta);
  }


Subir proyecto
git init
git add .
git commit -m "Proyecto inicial"
git remote add origin https://github.com/RodolfoRiveraM/CRUD.git
git push -u origin main

Dado si lo pone como subdominio
cd ~/Desktop/pruebadfd/CRUD
git rm --cached FETarjetaCredito
git commit -m "Quitando FETarjetaCredito como submódulo"
rm -rf FETarjetaCredito/.git
git add FETarjetaCredito
git commit -m "Agregando FETarjetaCredito como carpeta normal"
git push origin main
