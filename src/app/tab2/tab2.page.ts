import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

import { PhotoService } from '../services/photo.service';
import { Photo } from '../models/Photo';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public grid: boolean = true;

  constructor(
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController
  ) {}

  async ngOnInit(): Promise<void> {
    await this.photoService.loadSaved();
  }
  
  public addPhotoToGallery(): void {
    this.photoService.addNewToGallery();
  }

  public async showActionSheet(photo: Photo, position: number): Promise<void> {
    //in construction
  }

  public async showActionDeletePicture(photo: Photo, position: number): Promise<void> {
    const actionSheet = await this.actionSheetController.create({
      header: 'Fotos',
      buttons: [{
        text: 'Excluir',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {}
      }]
    });

    await actionSheet.present();
  }

  public changeGrid(): void {
    this.grid = !this.grid;
  }
}
