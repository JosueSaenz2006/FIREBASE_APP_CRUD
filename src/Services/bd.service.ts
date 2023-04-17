import { Firestore,setDoc,doc,collection, WithFieldValue, DocumentData, query,
getDocs,collectionData,deleteDoc} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class BdService {


  constructor(private firestore:Firestore) { } //Este es el constructor de la clase y define un parámetro "firestore" de tipo Firestore para que se pueda usar en otros métodos.

  createId(enlace:string){// Este método crea un nuevo ID aleatorio para un documento en una colección específica. Toma una cadena "enlace" que es el nombre de la colección en la que se creará el documento y devuelve un ID de documento aleatorio.
    const ref = doc(collection(this.firestore, enlace));
    return ref.id;
  }

  async add<T extends WithFieldValue<DocumentData>>(data:T,enlace:string,id:string){//Este método agrega un nuevo documento a una colección específica. Toma un objeto "data" que representa los datos a agregar, una cadena "enlace" que es el nombre de la colección en la que se agregará el documento, y una cadena "id" que es el ID del documento. Devuelve una promesa que se resuelve una vez que se completa la operación de escritura.
    const ref = doc(this.firestore,enlace,id);
    return await setDoc(ref, data);
  }

  get<T>(enlace:string):Observable<T[]>{
    const ref = collection(this.firestore,enlace);
    return collectionData(ref,{idField:'id'}) as Observable<T[]>;
  }

  delete<T>(enlace:string,id:string){
    const ruta:string = `${enlace}/${id}`
    const ref = doc(this.firestore,ruta);
    return deleteDoc(ref);
  }

  async getChanges(enlace:string,converter:any){
    const q = query(collection(this.firestore, enlace));
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }
  edit(){

  }
}
