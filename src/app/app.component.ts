import { Component, inject } from '@angular/core';
import { AppService } from './app.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud-documentos';
  appService = inject(AppService);
  adjuntoCargado!: File;
  nombrePersonalizadoControl: FormControl = new FormControl();
  items: any[] = [];

  constructor() {
    this.appService.getDocumentos().subscribe(res => this.items = [...res]);
  }

  
  cargarDocumento(event: any): void {
    this.adjuntoCargado = event.target.files[0];
    console.log(this.adjuntoCargado)
  }


  agregarDocumento(): void {

    console.log(this.adjuntoCargado, this.nombrePersonalizadoControl.value)
    if(!this.nombrePersonalizadoControl.value || !this.adjuntoCargado){
      return;
    }

    this.appService.addDocumento(this.adjuntoCargado, this.nombrePersonalizadoControl.value).subscribe();
  }

}
