import { Component, inject } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { Documento } from './documento.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud-documentos';
  appService = inject(AppService);

  items: Documento[] = [];

  constructor() {
    this.appService.getDocumentos().subscribe((res) => this.items = [...res]);
  }
}
