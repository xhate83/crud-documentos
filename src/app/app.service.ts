// import { AngularFirestore} from '@angular/fire/compat/firestore';
// import { AngularFireStorage } from '@angular/fire/compat/storage';  
import { Observable, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';
import { finalize } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})
export class AppService
{
    private basePath = '/adjuntos';
    firestore = inject(Firestore  )
    storage = inject(AngularFireStorage);


  getDocumentos(): Observable<any> {
    const collections = collection(this.firestore, 'documentos');
    return collectionData(collections);
  }

  addDocumento(file: File, nombrePersonalizado: string): Observable<any> {
      const filePath = `${this.basePath}/${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, file);
      return uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.agregarDocumento(nombrePersonalizado, url, file);
          });
        })
      )
  }
      
  async agregarDocumento(nombrePersonalizado: string, archivoUrl: string, file: File): Promise<void> {
    const documentosCollection = collection(this.firestore, 'documentos');

    const extension = '.' + file.name.split('.').pop();
    const mimeType = file.type;
    const nombreReal = file.name;


    const nuevoDocumento = {
      nombrePersonalizado,
      archivo: archivoUrl,
      extension,
      mimeType,
      nombreReal
    };

    try {
      await addDoc(documentosCollection, nuevoDocumento);
      console.log('Documento agregado exitosamente');
    } catch (error) {
      console.error('Error al agregar el documento:', error);
    }
  }

  updateDocumento() {

  }

  deleteDocumento() {

  }
}