import { Component, inject, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crud-documentos';
  appService = inject(AppService);
  adjuntoCargado!: File;
  nombrePersonalizadoControl: FormControl = new FormControl();
  displayedColumns: string[] = ['nombrePersonalizado', 'nombreReal', 'extension', 'archivo', 'mimeType'];
  dataSource: any[] = [];
  dataSourceFiltrado: any[] = [];

  filtroNombrePersonalizado: FormControl = new FormControl();

  constructor() {
    this.appService.getDocumentos().subscribe(res => {
      this.dataSource = [...res]
      this.dataSourceFiltrado = [...res]
    });
  }

  ngOnInit(): void {
    this.filtroNombrePersonalizado.valueChanges.subscribe(texto => {
      if(texto && texto.length > 1) {
        this.dataSourceFiltrado = this.dataSource.filter((x) => x.nombrePersonalizado.toLowerCase().includes(texto.toLowerCase()));
      } else {
        this.dataSourceFiltrado = [...this.dataSource];
      }
    })
  }

  
  cargarDocumento(event: any): void {
    this.adjuntoCargado = event.target.files[0];
  }


  agregarDocumento(): void {
    if(!this.nombrePersonalizadoControl.value || !this.adjuntoCargado){
      return;
    }
    this.appService.addDocumento(this.adjuntoCargado, this.nombrePersonalizadoControl.value).subscribe();
  }

}
