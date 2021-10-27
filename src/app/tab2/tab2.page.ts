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

  constructor(
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController
  ) {}

  async ngOnInit() {
    await this.photoService.loadSaved();
  }
  
  public addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  public async showActionSheet(photo: Photo, position: number) {
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
}
