import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saludo',
  templateUrl: './saludo.component.html',
  styleUrls: ['./saludo.component.css']
})
export class SaludoComponent implements OnInit {
  titulo: string = '¡Bienvenido a Angular!';
  mensaje: string = 'Este es un componente de saludo creado en Angular.';

  constructor() { }

  ngOnInit(): void {
  }
}
