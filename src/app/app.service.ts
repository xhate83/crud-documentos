import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { Documento } from './documento.model';
@Injectable({
    providedIn: 'root'
})
export class AppService
{
    firestore = inject(Firestore)

    getDocumentos(): Observable<any> {
        const collections = collection(this.firestore, 'documentos');
        return collectionData(collections);
    }

    addDocumento() {

    }

    removeDocumento() {

    }

    deleteDocumento() {
        
    }
}